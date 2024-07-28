import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { uploadData } from 'aws-amplify/storage'; // Asegúrate de que aws-amplify esté correctamente configurado
import { DataStore } from '@aws-amplify/datastore';
import { Modelos } from '../models';
import { signIn } from 'aws-amplify/auth'; // Asegúrate de que signIn esté disponible de esta forma

function TestForm() {
    const [file, setFile] = useState(null);
    const [kMax, setKMax] = useState(10);
    const [elbowImage, setElbowImage] = useState('');
    const [pcaImage, setPcaImage] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [clusteredData, setClusteredData] = useState([]);
    const [modelFilename, setModelFilename] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleKMaxChange = (event) => {
        setKMax(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setUploadMessage('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('k_max', kMax);

        try {
            const response = await fetch('http://127.0.0.1:5000/test-k', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                setUploadMessage(errorData.error || 'Error processing file');
                return;
            }

            const data = await response.json();
            setElbowImage(data.elbow);
            setPcaImage(data.pca);
            setClusteredData(data.clustered_data);
            if (data.model_filename) {
                setModelFilename(data.model_filename);
                setUploadMessage('File uploaded and processed successfully');
            } else {
                setUploadMessage('Model filename is not defined in response');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadMessage('Error uploading file');
        }
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF('portrait');
        doc.text('Cluster Analysis Report', 10, 10);
        doc.addImage(elbowImage, 'PNG', 10, 20, 180, 100);
        doc.addImage(pcaImage, 'PNG', 10, 130, 180, 100);

        doc.addPage('landscape');
        if (clusteredData.length > 0) {
            const headers = Object.keys(clusteredData[0]);
            const data = clusteredData.map(row => Object.values(row));

            doc.autoTable({
                head: [headers],
                body: data,
                startY: 20,
                theme: 'grid',
                headStyles: { fillColor: [0, 0, 0] },
                styles: { fontSize: 8, cellPadding: 1 },
                columnStyles: {
                    0: { cellWidth: 'wrap' },
                },
                margin: { top: 20, right: 10, bottom: 20, left: 10 },
                tableWidth: 'wrap',
            });
        }

        doc.save('Cluster_Report.pdf');
    };

    const handleDownloadExcel = () => {
        if (clusteredData.length > 0) {
            const ws = XLSX.utils.json_to_sheet(clusteredData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Clusters');
            XLSX.writeFile(wb, 'Cluster_Data.xlsx');
        }
    };

    const handleSignInAndUpload = async () => {
        try {
            const { isSignedIn, nextStep } = await signIn({ username: 'abtaham0212@gmail.com', password: 'Linux123!!' });
            if (isSignedIn) {
                console.log('User signed in successfully');
                handleUploadToS3();
            } else if (nextStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
                console.log('New password required');
                // Implement logic for handling new password requirement
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setUploadMessage('Error signing in');
        }
    };

    const handleUploadToS3 = async () => {
        if (modelFilename) {
            console.log('Attempting to fetch model from backend...');
            try {
                const response = await fetch(`http://127.0.0.1:5000/send_model?model_filename=${modelFilename}`);
                if (response.ok) {
                    console.log('Model fetched successfully. Processing file...');
                    const blob = await response.blob();
                    console.log('Blob received:', blob);

                    const filename = modelFilename.split('/').pop();
                    console.log('Uploading model to S3 with filename:', filename);

                    try {
                        const result = await uploadData({
                            key: filename,
                            data: blob,
                            level: 'public',
                            contentType: 'application/octet-stream'
                        });

                        if (result) {
                            console.log('Succeeded: ', result);
                            const fileUrl = `https://worklinkerd500aa700a28476bb7438a0dbef726b3222139-prod.s3.amazonaws.com/public/${filename}`;
                            console.log('File URL:', fileUrl);

                            console.log('Saving model URL to DataStore...');
                            await DataStore.save(
                                new Modelos({
                                    Modelurl: fileUrl,
                                })
                            );
                            setUploadMessage('Model uploaded to S3 and saved to DataStore successfully');
                        } else {
                            console.error('Failed to upload model to S3');
                            setUploadMessage('Error uploading model to S3');
                        }
                    } catch (error) {
                        console.error('Error uploading to S3:', error);
                        setUploadMessage(`Error uploading to S3: ${error.message}`);
                    }
                } else {
                    console.error('Error fetching model from backend:', response.statusText);
                    setUploadMessage(`Error fetching model from backend: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error during upload process:', error);
                setUploadMessage(`Error during upload process: ${error.message}`);
            }
        } else {
            console.error('Model filename is not defined');
            setUploadMessage('Model filename is not defined');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Select file:
                        <input type="file" onChange={handleFileChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Max K:
                        <input type="number" value={kMax} onChange={handleKMaxChange} />
                    </label>
                </div>
                <button type="submit">Upload and Test</button>
            </form>
            {uploadMessage && <p>{uploadMessage}</p>}
            {elbowImage && <img src={`data:image/png;base64,${elbowImage}`} alt="Elbow Method" />}
            {pcaImage && <img src={`data:image/png;base64,${pcaImage}`} alt="PCA Plot" />}
            {clusteredData.length > 0 && (
                <div>
                    <button onClick={handleDownloadPDF}>Download PDF</button>
                    <button onClick={handleDownloadExcel}>Download Excel</button>
                    <button onClick={handleSignInAndUpload} style={{ backgroundColor: "red" }}>Sign In and Upload Model to S3</button>
                </div>
            )}
        </div>
    );
}

export default TestForm;
