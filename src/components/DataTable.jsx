import React, { useEffect, useState } from "react";
import { Preguntas } from "../models";
import { DataStore } from "aws-amplify/datastore";
import * as XLSX from "xlsx";

const valueMapping = {
  0: "Nunca",
  1: "Raramente",
  2: "A veces",
  3: "A menudo",
  4: "Siempre"
};

const tabla = [
  { name: 'Id' },
  { name: 'Motivación' },
  { name: 'Relajacion' },
  { name: 'Satisfaccion' },
  { name: 'Aprendizaje' },
  { name: 'Estres' },
  { name: 'Ayuda' },
  { name: 'Seguridad' },
  { name: 'Actividad Fisica' },
  { name: 'Amistad/Familia' },
  { name: 'Gratitud' },
  { name: 'Pasatiempos' },
  { name: 'Inspiracion' },
  { name: 'Reflexion' },
  { name: 'Comunicacion' },
  { name: 'Creatividad' },
];

function TableData() {
  const [preguntas, setPreguntas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const preguntasData = await DataStore.query(Preguntas);
        setPreguntas(preguntasData);
      } catch (error) {
        console.error("Error fetching preguntas:", error);
      }
    };

    fetchData();
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(preguntas.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = preguntas.slice(startIndex, startIndex + itemsPerPage);

  const handleDownloadExcel = () => {
    const dataForExcel = preguntas.map(pregunta => {
      const total =
        pregunta.motivacion +
        pregunta.relajacion +
        pregunta.satisfaccion +
        pregunta.aprendizaje +
        pregunta.estres +
        pregunta.ayuda +
        pregunta.seguridad +
        pregunta.actividadFisica +
        pregunta.amistadFamilia +
        pregunta.gratitud +
        pregunta.pasatiempos +
        pregunta.inspiracion +
        pregunta.reflexion +
        pregunta.comunicacion +
        pregunta.creatividad;

      return {
        motivacion: pregunta.motivacion,
        relajacion: pregunta.relajacion,
        satisfaccion: pregunta.satisfaccion,
        aprendizaje: pregunta.aprendizaje,
        estres: pregunta.estres,
        ayuda: pregunta.ayuda,
        seguridad: pregunta.seguridad,
        actividadFisica: pregunta.actividadFisica,
        amistadFamilia: pregunta.amistadFamilia,
        gratitud: pregunta.gratitud,
        pasatiempos: pregunta.pasatiempos,
        inspiracion: pregunta.inspiracion,
        reflexion: pregunta.reflexion,
        comunicacion: pregunta.comunicacion,
        creatividad: pregunta.creatividad,
        total
      };
    });

    const ws = XLSX.utils.json_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Preguntas");
    XLSX.writeFile(wb, "Preguntas_Data.csv");
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {tabla.map((item) => (
                <th scope="col" className="px-6 py-3" key={item.name}>{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((pregunta) => (
              <tr
                key={pregunta.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {pregunta.id}
                </th>
                <td className="px-6 py-4">{valueMapping[pregunta.motivacion]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.relajacion]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.satisfaccion]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.aprendizaje]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.estres]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.ayuda]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.seguridad]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.actividadFisica]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.amistadFamilia]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.gratitud]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.pasatiempos]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.inspiracion]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.reflexion]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.comunicacion]}</td>
                <td className="px-6 py-4">{valueMapping[pregunta.creatividad]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col items-center mt-4">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(startIndex + itemsPerPage, preguntas.length)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{preguntas.length}</span> Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Atras
            </button>
            <button onClick={handleNextPage} disabled={currentPage === Math.ceil(preguntas.length / itemsPerPage)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Siguente
            </button>
            <button onClick={handleDownloadExcel} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-green-600 rounded-e hover:bg-green-700">
              Descargar en Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableData;