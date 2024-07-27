import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { TextField } from "@mui/material";
import LogoProyecto from '../assets/img/Logo.png';

function TestForm() {
  const [file, setFile] = useState(null);
  const [kMax, setKMax] = useState(10);
  const [elbowImage, setElbowImage] = useState("");
  const [pcaImage, setPcaImage] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
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
      setUploadMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("k_max", kMax);

    try {
      const response = await fetch("http://127.0.0.1:5000/test-k", {
        method: "POST",
        body: formData,
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
      setUploadMessage("File uploaded and processed successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("Error uploading file");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF("portrait"); // Comienza con orientación vertical
  
    doc.addImage(LogoProyecto, "PNG", 10, 10, 60, 15); // Ajusta las dimensiones y posición del logo

    doc.setFontSize(15); // Ajusta el tamaño de fuente del título si es necesario
    doc.text("Informe de análisis de conglomerados", 55, 40); // Ajusta la posición del texto del título
  
    doc.setFontSize(10); // Ajusta el tamaño de fuente del título si es necesario
    doc.text("Graficas", 55, 50); // Ajusta la posición del texto del título

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

  return (
    <div className="p-2 bg-white rounded-lg shadow-md text-center justify-center items-center">
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
          className="w-[50%] py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cargar y probar
        </button>
      </form>
      {uploadMessage && <p className="mt-4 text-green-600">{uploadMessage}</p>}
      {elbowImage && (
        <img
          src={`data:image/png;base64,${elbowImage}`}
          alt="Elbow Method"
          className="mt-4 w-[50%] rounded-md"
        />
      )}
      {pcaImage && (
        <img
          src={`data:image/png;base64,${pcaImage}`}
          alt="PCA Plot"
          className="mt-4 w-[50%] rounded-md"
        />
      )}
      {clusteredData.length > 0 && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleDownloadPDF}
            className="flex-1 py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Descargar PDF
          </button>
          <button
            onClick={handleDownloadExcel}
            className="flex-1 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Descargar Excel
          </button>
        </div>
      )}
    </div>
  );
}

export default TestForm;
