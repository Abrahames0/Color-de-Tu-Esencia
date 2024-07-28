import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { Alert, CircularProgress, InputAdornment, Snackbar, TextField } from "@mui/material";
import LogoProyecto from "../assets/img/Logo.png";
import { uploadData } from "aws-amplify/storage"; // Asegúrate de que aws-amplify esté correctamente configurado
import { DataStore } from "@aws-amplify/datastore";
import { Modelos } from "../models";
import { BiSolidArchiveOut } from "react-icons/bi";

import { signIn } from 'aws-amplify/auth';


function TestForm() {
  const [file, setFile] = useState(null);
  const [kMax, setKMax] = useState(10);
  const [elbowImage, setElbowImage] = useState('');
  const [pcaImage, setPcaImage] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [clusteredData, setClusteredData] = useState([]);
  const [filename, setFilename] = useState('');
  const [modelFilename, setModelFilename] = useState('');
  const [loading, setLoading] = useState(false);


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
          setFilename(data.filename);
          setUploadMessage('File processed successfully');
      } catch (error) {
          console.error('Error uploading file:', error);
          setUploadMessage('Error uploading file');
      }
  };
  const handleTrainModel = async () => {
    try {
        const formData = new FormData();
        formData.append('filename', filename);
        formData.append('k_max', kMax);

        const response = await fetch('http://127.0.0.1:5000/train-model', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            setUploadMessage(errorData.error || 'Error training model');
            return;
        }

        const data = await response.json();
        console.log('Received data from backend:', data); // Log para verificar la respuesta
        if (data.model_filename) {
            setModelFilename(data.model_filename);
            setUploadMessage('Model trained and saved successfully');
        } else {
            console.error('Model filename is not defined in response');
            setUploadMessage('Model filename is not defined in response');
        }
    } catch (error) {
        console.error('Error training model:', error);
        setUploadMessage('Error training model');
    }
};
  const handleDownloadPDF = () => {
    const doc = new jsPDF("portrait"); // Comienza con orientación vertical

    doc.addImage(LogoProyecto, "PNG", 10, 10, 60, 15); // Ajusta las dimensiones y posición del logo

    doc.setFontSize(15); // Ajusta el tamaño de fuente del título si es necesario
    doc.text("Informe de análisis de conglomerados", 55, 40); // Ajusta la posición del texto del título

    // Agrega las imágenes en orientación vertical
    if (elbowImage) {
      doc.addImage(elbowImage, "PNG", 10, 40, 180, 100); // Imagen del método del codo
    }
    if (pcaImage) {
      doc.addImage(pcaImage, "PNG", 10, 150, 180, 100); // Imagen del PCA
    }

    // Nueva página en orientación horizontal para la tabla
    doc.addPage("landscape");

    if (clusteredData.length > 0) {
      const headers = Object.keys(clusteredData[0]);
      const data = clusteredData.map((row) => Object.values(row));

      doc.autoTable({
        head: [headers],
        body: data,
        startY: 20,
        theme: "grid",
        headStyles: { fillColor: [0, 0, 0] },
        styles: { fontSize: 5.6, cellPadding: 1 }, // Tamaño de fuente más pequeño y padding reducido
        columnStyles: {
          0: { cellWidth: "wrap" }, // Ajusta el ancho para la primera columna
          // Añadir más estilos de columna según sea necesario
        },
        margin: { top: 15, right: 10, bottom: 15, left: 10 },
        tableWidth: "wrap",
      });
    }

    // Guardar el PDF
    doc.save("Cluster_Report.pdf");
  };

  const handleDownloadExcel = () => {
    if (clusteredData.length > 0) {
      // Convert data to a worksheet
      const ws = XLSX.utils.json_to_sheet(clusteredData);
      // Create a new workbook and append the worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Clusters");
      // Generate Excel file and trigger download
      XLSX.writeFile(wb, "Cluster_Data.xlsx");
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

  const getAlertSeverity = () => {
    if (uploadMessage.toLowerCase().includes("error")) {
      return "error";
    } else if (uploadMessage.toLowerCase().includes("exitosamente")) {
      return "success";
    }
    return "info";
  };

  return (
    <div className="p-2 mb-2 md:mt-20 mobile:mt-40 rounded-lg text-center justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-1/2 text-center">
          <TextField
            label="Selecciona un archivo"
            type="file"
            onChange={handleFileChange}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BiSolidArchiveOut style={{ fontSize: '1.5em', color: '#3f51b5' }} />
                </InputAdornment>
              ),
            }}
            style={{
              padding: '10px 0', // Adjust the padding for better visual balance
              borderRadius: '5px', // Optional: Rounding the corners for a softer look
            }}
          />
          </div>
        </div>
        <div className="flex justify-center items-center w-full h-full flex-col">
          <div className="w-1/2 text-center">
            <TextField
              label="Max K"
              type="number"
              value={kMax}
              onChange={handleKMaxChange}
              fullWidth
              variant="outlined"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-[50%] py-2 px-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Cargar y probar"}
        </button>
      </form>
      {elbowImage && (
        <img src={`data:image/png;base64,${elbowImage}`} alt="Elbow Method" className="mt-4 w-[50%] rounded-md"/>
      )}
      {pcaImage && (
        <img src={`data:image/png;base64,${pcaImage}`} alt="PCA Plot" className="mt-4 w-[50%] rounded-md"/>
      )}
      {clusteredData.length > 0 && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 py-2 px-4 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Descargar PDF
          </button>
          <button
            onClick={handleDownloadExcel}
            className="flex-1 py-2 px-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Descargar Excel
          </button>
          
          <button
            className="flex-1 py-2 px-4 bg-sky-500 text-white font-semibold rounded-full hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            onClick={handleTrainModel}
          >
           Entrenar modelo
          </button>

          <button
            className="flex-1 py-2 px-4 bg-sky-500 text-white font-semibold rounded-full hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            onClick={handleSignInAndUpload}
          >
            Cargar modelo a S3
          </button>
        </div>
      )}
      <Snackbar open={!!uploadMessage} autoHideDuration={6000} onClose={() => setUploadMessage('')} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setUploadMessage('')} variant="filled" severity={getAlertSeverity()}>
          {uploadMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TestForm;
