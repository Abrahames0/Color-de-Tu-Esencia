import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from 'react-use/lib/useWindowSize';
import colores from '../data/colores.json';

import ColorNegro from '../assets/img/colores/Color_negro.jpg';
import RojoColor from '../assets/img/colores/Rojo_color.png';
import AzulColor from '../assets/img/colores/Azul_color.png';
import VerdeColor from '../assets/img/colores/Color_verde.jpg';
import BlancoColor from '../assets/img/colores/Color_Blanco.png';
import Loader from "./Loader";

const imageMap = {
  "Color_negro.jpg": ColorNegro,
  "Rojo_color.png": RojoColor,
  "Azul_color.png": AzulColor,
  "Color_verde.jpg": VerdeColor,
  "Color_Blanco.png": BlancoColor
};

function formatDescription(description) {
  const words = description.split(' ');
  const lines = [];
  for (let i = 0; i < words.length; i += 10) {
    lines.push(words.slice(i, i + 10).join(' '));
  }
  return lines;
}

function ResultadoColor({ onCompleteTest }) {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkColor = () => {
      const storedColor = localStorage.getItem('testColor');
      if (storedColor) {
        setColor(storedColor);
        setLoading(false);  // Deja de mostrar el Loader
      } else {
        setTimeout(checkColor, 500); // Reintentar cada 500 ms hasta que se encuentre el color
      }
    };

    checkColor();

    // Llama a la función para completar el test
    if (onCompleteTest) {
      onCompleteTest();
    }

    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, [onCompleteTest]);

  const colorInfo = color ? colores.find(c => c.color && c.color.toLowerCase() === color.toLowerCase()) : null;

  const handleBackToHome = () => {
    // Limpiar localStorage al volver al inicio
    localStorage.removeItem('testColor');
    window.location.href = "/";
  };

  return (
    <div>
      {loading ? (
        <div className="text-center mt-10">
          <Loader />  {/* Usa el componente Loader mientras loading es true */}
        </div>
      ) : (
        <>
          {showConfetti && <Confetti width={width} height={height} />}
          <div className="flex text-center justify-center items-center flex-col">
            <div className="z-10 mb-80 md:mt-40 mobile:mt-50">
              <div className="font-bold txt-light mobile:text-[70px] lg:text-[65px] dark:text-white">
                Gracias por responder 
                <br />
                <span className="txt-main">&nbsp;El color que te representa es:<br/> {colorInfo ? colorInfo.color : "Desconocido"}</span>
              </div>
              {colorInfo && (
                <div className="text-center text-lg mt-4 justify-center items-center">
                  <img src={imageMap[colorInfo.imagen.split('/').pop()]} alt={colorInfo.color} className="mx-auto mb-4 rounded-full w-48 h-48 border-0.9 border-black"/>
                  <div>
                    {formatDescription(colorInfo.descripcion).map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  <p className="mt-4"><strong>Tipo:</strong> {colorInfo.tipo.join(", ")}</p>
                </div>
              )}
              <button
                onClick={handleBackToHome}
                className="text-white back-main px-[55px] py-[15px] mt-10 rounded-full text-[18px] hover:bg-indigo-800 active:bg-indigo-900 transition-all"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ResultadoColor;
