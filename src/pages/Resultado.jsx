// Inicio.js
import React from "react";
import Footer from "../components/Footers";
import Navbar from "../components/Nadvar";
import BackGradients from "../components/BackGradients";
import { DarkModeProvider, useDarkMode } from "../components/DarkModeContext";
import Gracias from "../components/Gracias";

function MainContent() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="relative flex flex-col min-h-screen">
      <BackGradients />
      <div className="flex-grow">
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main className="flex-grow dark:bg-gray-900 dark:text-white">
        <Gracias />
      </main>
      <Footer className='mt-auto' />
      </div>
    </div>
  );
}

function Resultado() {
  return (
    <DarkModeProvider>
      <MainContent />
    </DarkModeProvider>
  );
}

export default Resultado;
