// Inicio.js
import React from "react";
import Footer from "../components/Footers";
import { DarkModeProvider } from "../components/DarkModeContext";
import NadvarModelos from "../components/NadvarModelos";
import TestDataSet from "../components/TestDataSet";

function MainContent() {

  return (
    <div className="flex flex-col min-h-screen">
  <div className="flex-grow">
    <NadvarModelos />
    <main className="dark:bg-gray-900 dark:text-white">
      <TestDataSet />
    </main>
  </div>
  <Footer className="mt-auto" />
</div>

  );
}

function ProbarDataSet() {
  return (
    <DarkModeProvider>
      <MainContent />
    </DarkModeProvider>
  );
}

export default ProbarDataSet;
