import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

function TestForm() {
    const [file, setFile] = useState(null);
    const [kMax, setKMax] = useState(10);
    const [elbowImage, setElbowImage] = useState('');
    const [pcaImage, setPcaImage] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [clusteredData, setClusteredData] = useState([]);

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
                setUploadMessage(errorData.error);
                return;
            }

            const data = await response.json();
            setElbowImage(data.elbow);
            setPcaImage(data.pca);
            setClusteredData(data.clustered_data); // Receives clustered data
            setUploadMessage('File uploaded and processed successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadMessage('Error uploading file');
        }
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF('portrait'); // Start with portrait orientation
        doc.text('Cluster Analysis Report', 10, 10);
        doc.addImage(elbowImage, 'PNG', 10, 20, 180, 100); // Add elbow image
        doc.addImage(pcaImage, 'PNG', 10, 130, 180, 100); // Add PCA image

        // New page for the table in landscape orientation
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
                styles: { fontSize: 8, cellPadding: 1 }, // Smaller font and reduced padding
                columnStyles: {
                    0: { cellWidth: 'wrap' }, // Adjust the width for the first column
                    // Add more column styles as needed
                },
                margin: { top: 20, right: 10, bottom: 20, left: 10 },
                tableWidth: 'wrap',
            });
        }

        doc.save('Cluster_Report.pdf');
    };

    const handleDownloadExcel = () => {
        if (clusteredData.length > 0) {
            // Convert data to a worksheet
            const ws = XLSX.utils.json_to_sheet(clusteredData);
            // Create a new workbook and append the worksheet
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Clusters');
            // Generate Excel file and trigger download
            XLSX.writeFile(wb, 'Cluster_Data.xlsx');
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
                </div>
            )}
        </div>
    );
}

export default TestForm;
