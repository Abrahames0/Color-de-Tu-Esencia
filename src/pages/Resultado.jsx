import React from 'react';
import { Preguntas } from '../models';
import { DataStore } from 'aws-amplify/datastore';

function Resultado({ answers, handleReset }) {
    const mapping = {
        "Nunca": 0,
        "Raramente": 1,
        "A veces": 2,
        "A menudo": 3,
        "Siempre": 4
    };

    const fieldMapping = {
        1: 'motivacion',
        2: 'relajacion',
        3: 'satisfaccion',
        4: 'aprendizaje',
        5: 'estres',
        6: 'ayuda',
        7: 'seguridad',
        8: 'actividadFisica',
        9: 'amistadFamilia',
        10: 'gratitud',
        11: 'pasatiempos',
        12: 'inspiracion',
        13: 'reflexion',
        14: 'comunicacion',
        15: 'creatividad'
    };

    const mappedAnswers = Object.keys(answers).reduce((acc, key) => {
        const fieldKey = fieldMapping[key];
        if (fieldKey && answers[key] in mapping) {
            acc[fieldKey] = mapping[answers[key]];
        } else {
            console.warn(`Key ${key} with value ${answers[key]} not found in mapping or fieldMapping`);
            acc[fieldKey] = null;
        }
        return acc;
    }, {});

    const handleSaveResults = async () => {
        const surveyResult = new Preguntas({
            motivacion: mappedAnswers.motivacion ?? 0,
            relajacion: mappedAnswers.relajacion ?? 0,
            satisfaccion: mappedAnswers.satisfaccion ?? 0,
            aprendizaje: mappedAnswers.aprendizaje ?? 0,
            estres: mappedAnswers.estres ?? 0,
            ayuda: mappedAnswers.ayuda ?? 0,
            seguridad: mappedAnswers.seguridad ?? 0,
            actividadFisica: mappedAnswers.actividadFisica ?? 0,
            amistadFamilia: mappedAnswers.amistadFamilia ?? 0,
            gratitud: mappedAnswers.gratitud ?? 0,
            pasatiempos: mappedAnswers.pasatiempos ?? 0,
            inspiracion: mappedAnswers.inspiracion ?? 0,
            reflexion: mappedAnswers.reflexion ?? 0,
            comunicacion: mappedAnswers.comunicacion ?? 0,
            creatividad: mappedAnswers.creatividad ?? 0
        });

        try {
            await DataStore.save(surveyResult);
            alert('Resultados guardados exitosamente');
        } catch (error) {
            console.error('Error guardando los resultados:', error);
            alert('Hubo un error guardando los resultados');
        }
    };

    return (
        <div>
            <p className="text-xl font-semibold">Todas los preguntas completados</p>
            
            <button onClick={handleSaveResults} className="mt-4 px-4 py-2 back-main rounded-full hover:bg-pink-400 active:bg-pink-500 transition-all">Enviar Resultados</button><br/>
            <button onClick={handleReset} className="mt-4 px-4 py-2 back-main rounded-full hover:bg-pink-400 active:bg-pink-500 transition-all">Reiniciar</button>
        </div>
    );
}

export default Resultado;