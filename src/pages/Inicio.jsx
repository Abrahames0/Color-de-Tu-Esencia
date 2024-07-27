// Inicio.js
import React from "react";
import Footer from "../components/Footers";
import Navbar from "../components/Nadvar";
import Home from "../components/Home";
import BackGradients from "../components/BackGradients";
import { DarkModeProvider, useDarkMode } from "../components/DarkModeContext";

function MainContent() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="relative flex flex-col min-h-screen">
      <BackGradients />
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main className="flex-grow dark:bg-gray-900 dark:text-white">
        <Home />
      </main>
      <Footer className="mt-auto mb-4"/>
    </div>
  );
}

function Inicio() {
  return (
    <DarkModeProvider>
      <MainContent />
    </DarkModeProvider>
  );
}

export default Inicio;