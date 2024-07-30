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
  const [color, setColor] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);

  useEffect(() => {
    // Recuperar color desde localStorage al cargar el componente
    const storedColor = localStorage.getItem('testColor');
    if (storedColor) {
      setColor(storedColor);
    }

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
    if (testCompleted) return;  
    setTestCompleted(true);  

    const prefix = "https://worklinkerd500aa700a28476bb7438a0dbef726b3222139-prod.s3.amazonaws.com/public/";
    let result = null;

    if (modeloUrl) {
      result = modeloUrl.replace(prefix, ""); 
    } else {
      console.error("Modelo URL no está disponible.");
      return;
    }

    const formattedResponses = {};
    Object.keys(questionMapping).forEach((key) => {
      const questionId = parseInt(key, 10);
      const attribute = questionMapping[questionId];
      const value = mapping[respuestas[questionId]];

      if (attribute && value !== undefined) {
        formattedResponses[attribute] = value;
      } else {
        console.error(`Error mapeando la clave ${questionId} o el valor ${respuestas[questionId]}`);
      }
    });

    const dataToSend = {
      modelFilename: result,
      respuestas: [formattedResponses]
    };

    console.log("Datos enviados al backend:", dataToSend);

    try {
      const data = await sendModelData(result, [formattedResponses]);
      console.log("Respuesta del backend:", data);
      if (data.color) {
        console.log("Color recibido del backend:", data.color);
        setColor(data.color);
        localStorage.setItem('testColor', data.color); // Guardar color en localStorage
      } else {
        console.error("El color no está definido en la respuesta del backend.");
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleReset = () => {
    // Limpiar localStorage y reiniciar estado
    localStorage.removeItem('testColor');
    setColor(null);
    setStep(0);
    setModelo(null);
    setRespuestas({});
    setModeloUrl(null);
    setTestCompleted(false);
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <main className="dark:bg-gray-900 dark:text-white">
          {step === 0 ? (
            <SeleccionaModelo onStartTest={handleStartTest} setModelo={setModelo} />
          ) : (
            <StepperTest
              respuestas={respuestas}
              setRespuestas={setRespuestas}
              modelo={modelo}
              onTestComplete={handleCompleteTest} // Pasa handleCompleteTest como prop
            />
          )}
          {color && (
            <>
              {console.log("Propiedad color enviada a ResultadoColor:", color)}
              <ResultadoColor color={color} onCompleteTest={handleCompleteTest} />
            </>
          )}
        </main>
        <Footer className='mt-auto'/>
        <button onClick={handleReset} className="px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600">
          Volver al inicio
        </button>
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
