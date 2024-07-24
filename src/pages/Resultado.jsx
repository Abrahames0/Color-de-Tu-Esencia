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
    <div className="relative">
      <BackGradients />
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main className="dark:bg-gray-900 dark:text-white">
        <Gracias />
      </main>
      <Footer /> 
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
