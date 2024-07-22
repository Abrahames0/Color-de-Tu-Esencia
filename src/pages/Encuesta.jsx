import React from "react";
import StepperTest from "../components/StepperTest";
import { DarkModeProvider, useDarkMode } from "../components/DarkModeContext";
import Footer from "../components/Footers";
import Navbar from "../components/Nadvar";

function MainContent() {
  const { darkMode, toggleDarkMode } = useDarkMode();


  return (
    <div className="relative">
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main className="dark:bg-gray-900 dark:text-white">
        <StepperTest />
      </main>
      <div className="mb-2">
      <Footer />
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