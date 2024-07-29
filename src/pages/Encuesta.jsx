import React, { useState } from "react";
import StepperTest from "../components/StepperTest";
import { DarkModeProvider, useDarkMode } from "../components/DarkModeContext";
import Footer from "../components/Footers";
import Navbar from "../components/Nadvar";
import SeleccionaModelo from "../components/SeleccionaModelo";

function MainContent() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [step, setStep] = useState(0); 

  const handleStartTest = () => {
    setStep(1);
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <main className="dark:bg-gray-900 dark:text-white">
        {step === 0 ? (
        <SeleccionaModelo onStartTest={handleStartTest} />
      ) : (
        <StepperTest />
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
