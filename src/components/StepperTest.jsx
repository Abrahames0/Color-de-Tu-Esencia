import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions.json';
import { TextField, Typography, Snackbar, Alert } from '@mui/material';
import { Button, ProgressBar } from 'react-bootstrap';
import Loader from '../components/Loader'; // Asegúrate de tener un componente Loader

function StepperTest({ respuestas, setRespuestas }) {
  const [activeStep, setActiveStep] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();

  const handleNext = async () => {
    const currentQuestion = questions[activeStep];
    if (!respuestas[currentQuestion.id]) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    if (activeStep < questions.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setLoading(true); // Comienza la carga
      // Aquí puedes realizar cualquier operación de procesamiento de datos antes de la navegación
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de proceso asincrónico
      setLoading(false); // Termina la carga
      navigate('/resultado');
    }
  };

  const handleInputChange = (id, value) => {
    setRespuestas({
      ...respuestas,
      [id]: value,
    });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const progress = (activeStep / questions.length) * 100;

  return (
    <div className="w-full text-center p-4">
      {loading ? (
        <Loader /> // Muestra el componente Loader mientras loading es true
      ) : (
        <>
          <p className="text-2xl font-bold mb-2">Selecciona</p>
          <p className="text-lg mb-4">la respuesta que creas adecuada</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-4" style={{ height: '10px', width: '60%', textAlign: 'center' }}/>
          </div>
          <div className="mb-5">
            <StepContent step={activeStep} respuestas={respuestas} handleInputChange={handleInputChange} />
          </div>
          <div className="flex justify-center space-x-4 mt-2">
            <button disabled={activeStep === 0} onClick={() => setActiveStep(prev => prev - 1)} className="px-4 py-2 bg-gray-400 text-gray-700 rounded-full disabled:opacity-10">
              Atrás
            </button>
            <button onClick={handleNext} className="px-4 py-2 text-white back-main rounded-full hover:bg-indigo-400 active:bg-indigo-500 transition-all">
              {activeStep === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
            </button>
          </div>
          <Snackbar open={showAlert} autoHideDuration={15000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleCloseAlert} severity="error">
              Por favor, responde la pregunta antes de avanzar.
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
}

function StepContent({ step, respuestas, handleInputChange }) {
  const question = questions[step];

  if (!question) return <p>Contenido desconocido</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography className='mb-2' variant="h4" component="h4" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        {question.question}
      </Typography>
      <div className='mb-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{color: '#e05beb' ,width: '40%', height: '40%', textAlign: 'center', border: '1px black solid' }}></div>
      </div>
      {question.options && question.options.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outlined"
              color={respuestas[question.id] === option ? 'primary' : 'default'}
              onClick={() => handleInputChange(question.id, option)}
              style={{
                textTransform: 'none',
                borderColor: respuestas[question.id] === option ? 'black' : 'rgba(0, 0, 0, 0.23)',
                backgroundColor: respuestas[question.id] === option ? '#cae1fd' : '#c9c9c9',
                borderWidth: '1px',
                padding: '6px 16px',
                minWidth: '350px',
                borderRadius: '12px'
              }}
            >
              {option}
            </Button>
          ))}
        </div>
      ) : (
        <TextField
          type="text"
          value={respuestas[question.id] || ''}
          onChange={(e) => handleInputChange(question.id, e.target.value)}
          fullWidth
          variant="outlined"
        />
      )}
    </div>
  );
}

export default StepperTest;