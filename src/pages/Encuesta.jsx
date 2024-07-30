import React from "react";
import { DarkModeProvider, useDarkMode } from "../components/DarkModeContext";
import Footer from "../components/Footers";
import Nadvar from "../components/Nadvar";
import TestStepper from "../components/TestSepper";

function MainContent() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  

  return (
    <div className="relative">
      <div className="relative z-10">
        <Nadvar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <main className="dark:bg-gray-900 dark:text-white">
          <TestStepper />
        </main>
        <div className="mb-2">
          <Footer />
        </div>
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