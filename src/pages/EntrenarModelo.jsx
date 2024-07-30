import React, { useState, useEffect } from "react";
import StepperTest from "../components/StepperTest";
import { DarkModeProvider, useDarkMode } from "../components/DarkModeContext";
import Footer from "../components/Footers";
import Navbar from "../components/Nadvar";
import SeleccionaModelo from "../components/SeleccionaModelo";
import { Modelos } from "../models";
import { DataStore } from "aws-amplify/datastore";
import { mapping, questionMapping } from "../data/catalogos";
import { sendModelData } from '../service/ApiService'; 
import ResultadoColor from "../components/ResultadoColor";

function MainContent() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [step, setStep] = useState(0); 
  const [modelo, setModelo] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [modeloUrl, setModeloUrl] = useState(null);
  const [cluster, setCluster] = useState(null);

  useEffect(() => {
    if (modelo) {
      DataStore.query(Modelos, modelo).then(modeloData => {
        if (modeloData) {
          setModeloUrl(modeloData.Modelurl);
        }
      }).catch(error => {
        console.error("Error fetching model URL:", error);
      });
    }
  }, [modelo]);

  const handleStartTest = () => {
    if (modelo) {
      setStep(1);
    } else {
      alert("Por favor, seleccione un modelo antes de continuar.");
    }
  };

  const handleCompleteTest = async () => {
    console.log("Respuestas antes de enviar:", respuestas);
    const prefix = "https://worklinkerd500aa700a28476bb7438a0dbef726b3222139-prod.s3.amazonaws.com/public/";
    let result = null;

    if (modeloUrl) {
      result = modeloUrl.replace(prefix, ""); 
      console.log("Model filename:", result);
    } else {
      console.error("Modelo URL no está disponible.");
      return;
    }

    // Aplica el mapeo de texto a valores numéricos y ajusta las claves
    const mappedResponses = {};
    for (const key in respuestas) {
      if (respuestas.hasOwnProperty(key)) {
        const attribute = questionMapping[key];
        const value = mapping[respuestas[key]];

        if (attribute && value !== undefined) {
          mappedResponses[attribute] = value;
        } else {
          console.error(`Error mapeando la clave ${key} o el valor ${respuestas[key]}`);
        }
      }
    }
    const formattedResponses = {
      ...mappedResponses,
      total: Object.values(mappedResponses).reduce((sum, val) => sum + val, 0)
    };

    console.log("Enviando datos:", { modelFilename: result, respuestas: formattedResponses });

    try {
      const data = await sendModelData(result, formattedResponses);
      console.log("Resultados del modelo:", data);
      if (data.cluster) {
        setCluster(data.cluster);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <main className="dark:bg-gray-900 dark:text-white">
          {step === 0 ? (
            <SeleccionaModelo onStartTest={handleStartTest} setModelo={setModelo} />
          ) : (
            <StepperTest respuestas={respuestas} setRespuestas={setRespuestas} modelo={modelo} onComplete={handleCompleteTest} />
          )}
          {cluster && (
            <ResultadoColor respuestas={respuestas} cluster={cluster} />
          )}
        </main>
        <Footer className='mt-auto'/>
      </div>
    </div>
  );
}

function EntrenarModelo() {
  return (
    <DarkModeProvider>
      <MainContent />
    </DarkModeProvider>
  );
}

export default EntrenarModelo;