import React, { useEffect, useState } from "react";
import { Modelos } from "../models";
import { DataStore } from "aws-amplify/datastore";
import BackGradients from "./BackGradients";
import { Alert, Snackbar } from "@mui/material";



function SeleccionaModelo({ onStartTest,setModelo  }) {
  const [modelos, setModelos] = useState([]);
  const [selectedModelo, setSelectedModelo] = useState("");
  const [showAlert, setShowAlert] = useState(false);



  useEffect(() => {
    async function fetchModelos() {
      try {
        const modelosData = await DataStore.query(Modelos);
        setModelos(modelosData);
      } catch (error) {
        console.error("Error fetching modelos:", error);
      }
    }

    fetchModelos();
  }, []);

  const handleChange = (event) => {
    const modeloSeleccionado = event.target.value;
    setSelectedModelo(modeloSeleccionado);
    setModelo(modeloSeleccionado); // Actualiza el modelo en el componente padre
  };

  const getFilenameFromUrl = (url) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  const handleStartTest = () => {
    if (selectedModelo) {
      onStartTest();
    } else {
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <BackGradients />
      <div className="w-full text-center p-4 flex-col mb-4">
        <form className="max-w-sm mx-auto">
          <p className="text-2xl font-bold mb-2">Seleccione un Modelo</p>
          <p className="text-lg mb-4">Por favor, elija el modelo que desea utilizar</p>
          <select id="models" value={selectedModelo} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" disabled>
              Seleccione un modelo
            </option>
            {modelos.map((modelo) => (
              <option key={modelo.id} value={modelo.id}>
                {getFilenameFromUrl(modelo.Modelurl)}
              </option>
            ))}
          </select>
        </form>
        <div className="flex justify-center space-x-4 mt-3">
          <button onClick={handleStartTest} className="px-4 py-2 text-white back-main rounded-full hover:bg-indigo-400 active:bg-indigo-500 transition-all">
            Comenzar
          </button>
        </div>
      </div>
      <Snackbar open={showAlert} autoHideDuration={15000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseAlert} severity="error">
          Por favor, elige el modelo antes de continuar.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SeleccionaModelo;