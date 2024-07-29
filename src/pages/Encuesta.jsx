import React, { useState, useEffect } from "react";
import StepperTest from "../components/StepperTest";
import { DarkModeProvider, useDarkMode } from "../components/DarkModeContext";
import Footer from "../components/Footers";
import Navbar from "../components/Nadvar";
import SeleccionaModelo from "../components/SeleccionaModelo";
import { Modelos } from "../models";
import { DataStore } from "aws-amplify/datastore";

function MainContent() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [step, setStep] = useState(0); 
  const [modelo, setModelo] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [modeloUrl, setModeloUrl] = useState(null);
  const [cluster, setCluster] = useState(null);

  const mapping = {
    "Nunca": 0,
    "Raramente": 1,
    "A veces": 2,
    "A menudo": 3,
    "Siempre": 4
  };

  const questionMapping = {
    1: 'motivacion',
    2: 'relajacion',
    3: 'satisfaccion',
    4: 'aprendizaje',
    5: 'estres',
    6: 'ayuda',
    7: 'seguridad',
    8: 'actividad_fisica',
    9: 'amistad_familia',
    10: 'gratitud',
    11: 'pasatiempos',
    12: 'inspiracion',
    13: 'reflexion',
    14: 'comunicacion',
    15: 'creatividad'
  };

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

  const handleCompleteTest = () => {
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

    // Formatea las respuestas en la estructura necesaria
    const formattedResponses = {
      ...mappedResponses,
      total: Object.values(mappedResponses).reduce((sum, val) => sum + val, 0)
    };

    console.log("Enviando datos:", { modelFilename: result, respuestas: formattedResponses });

    fetch('http://localhost:5000/probar-modelo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modelFilename: result, respuestas: formattedResponses }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Resultados del modelo:", data);
      if (data.cluster) {
        setCluster(data.cluster);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
            <div className="mt-4">
              <h2>Resultado del Clúster</h2>
              <p>El modelo pertenece al clúster: {cluster}</p>
            </div>
          )}
        </main>
        <Footer className='mt-auto'/>
      </div>
    </div>
  );
}

function Encuesta() {
  return (
    <DarkModeProvider>
      <MainContent />
    </DarkModeProvider>
  );
}

export default Encuesta;
