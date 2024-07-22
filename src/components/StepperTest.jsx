import React, { useState } from 'react';
import questions from '../data/questions.json';
import { TextField, Typography } from '@mui/material';
import { Button, ProgressBar } from 'react-bootstrap';

function StepContent({ step, answers, handleInputChange }) {
  const question = questions[step];

  if (!question) return <p>Contenido desconocido</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography className='mb-2' variant="h4" component="h4" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        {question.question}
      </Typography>
      <div className='mb-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="dark:bg-gray-900 dark:text-white" style={{ width: '40%', height: '40%', textAlign: 'center', border: '1px black solid' }}></div>
      </div>
      {question.options.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          {question.options.map((option, index) => (
            <Button key={index} variant="outlined"
            color={answers[question.id] === option ? 'primary' : 'default'}
            onClick={() => handleInputChange(question.id, option)}
            style={{
            textTransform: 'none',
            borderColor: answers[question.id] === option ? 'black' : 'rgba(0, 0, 0, 0.23)',
            backgroundColor: answers[question.id] === option ? '#cae1fd' : '#c9c9c9',
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
          value={answers[question.id] || ''}
          onChange={(e) => handleInputChange(question.id, e.target.value)}
          fullWidth
          variant="outlined"
        />
      )}
    </div>
  );
};

function StepperTest() {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (activeStep < questions.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setAnswers({});
    setCompleted(false);
  };

  const handleInputChange = (id, value) => {
    setAnswers({
      ...answers,
      [id]: value,
    });
  };

  const progress = (activeStep / questions.length) * 100;

  return (
    <div className="w-full text-center p-4">
      <p className="text-2xl font-bold mb-2">Selecciona</p>
      <p className="text-lg mb-4">la respuesta que creas adecuada</p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-4" style={{ height: '10px', width: '60%', textAlign: 'center',  }}/>
      </div>
      <div className="mb-5">
        {completed ? (
          <div>
            <p className="text-xl font-semibold">Todos los pasos completados</p>
            <p className="mb-4">Respuestas:</p>
            <pre className="text-left">{JSON.stringify(answers, null, 2)}</pre>
            <button onClick={handleReset} className="mt-4 px-4 py-2 back-main rounded-full hover:bg-pink-400 active:bg-pink-500 transition-all">Reiniciar</button>
          </div>
        ) : (
          <StepContent step={activeStep} answers={answers} handleInputChange={handleInputChange} />
        )}
      </div>
      {!completed && (
        <div className="flex justify-center space-x-4 mt-2">
          <button
            disabled={activeStep === 0}
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full disabled:opacity-50"
          >
            Atrás
          </button>
          <button onClick={handleNext} className="px-4 py-2 text-white back-main rounded-full hover:bg-pink-400 active:bg-pink-500 transition-all">
            {activeStep === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      )}
    </div>
  );
}

export default StepperTest;