import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from 'react-use/lib/useWindowSize';
import colores from '../data/colores.json';

// Importar las imágenes
import ColorNegro from '../assets/img/colores/Color_negro.jpg';
import RojoColor from '../assets/img/colores/Rojo_color.png';
import AzulColor from '../assets/img/colores/Azul_color.png';
import VerdeColor from '../assets/img/colores/Color_verde.jpg';
import BlancoColor from '../assets/img/colores/Color_Blanco.png';

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

function ResultadoColor({ respuestas, /* cluster */ }) {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  const cluster = 2; 
  const color = colores.find(color => color.id === cluster);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000); 
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div>
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="flex text-center justify-center items-center flex-col">
        <div className="z-10 mb-80 md:mt-40 mobile:mt-50">
          <div className="font-bold txt-light mobile:text-[70px] lg:text-[65px] dark:text-white">
            Gracias por responder 
            <br />
            <span className="txt-main">&nbsp;El color que te representa es:<br/> {color ? color.color : "Desconocido"}</span>
          </div>
          {color && (
            <div className="text-center text-lg mt-4 justify-center items-center">
              <img src={imageMap[color.imagen.split('/').pop()]} alt={color.color} className="mx-auto mb-4 rounded-full w-48 h-48 border-0.9 border-black"/>
              <div>
                {formatDescription(color.descripcion).map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <p className="mt-4"><strong>Tipo:</strong> {color.tipo.join(", ")}</p>
            </div>
          )}
          <button
            onClick={() => (window.location.href = "/")}
            className="text-white back-main px-[55px] py-[15px] mt-10 rounded-full text-[18px] hover:bg-indigo-800 active:bg-indigo-900 transition-all"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultadoColor;