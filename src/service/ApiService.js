// services.js

export async function sendModelData(modelFilename, respuestas) {
    try {
      const response = await fetch('http://localhost:5000/probar-modelo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelFilename, respuestas }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  