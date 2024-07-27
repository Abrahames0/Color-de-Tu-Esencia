// Inicio.js
import React from "react";
import Footer from "../components/Footers";
import { DarkModeProvider } from "../components/DarkModeContext";
import TestForm from "./TestForm";
import NadvarModelos from "../components/NadvarModelos";

function MainContent() {

  return (
    <div className="flex flex-col min-h-screen">
  <div className="flex-grow">
    <NadvarModelos />
    <main className="dark:bg-gray-900 dark:text-white">
      <TestForm />
    </main>
  </div>
  <Footer className="mt-auto" />
</div>

  );
}

function ProbarModelo() {
  return (
    <DarkModeProvider>
      <MainContent />
    </DarkModeProvider>
  );
}

export default ProbarModelo;
