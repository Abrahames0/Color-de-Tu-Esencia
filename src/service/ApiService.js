// src/services/apiService.js
const baseUrl = 'http://localhost:5000'; // Ensure this matches your Flask app's address

export const fetchClusters = async () => {
    try {
        const response = await fetch(`${baseUrl}/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

export const postTestData = async (data) => {
    try {
        const response = await fetch(`${baseUrl}/test`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

export const trainModel = async (data) => {
    try {
        const response = await fetch('http://localhost:5000/train', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};
// src/service/ApiService.js
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { message: 'Upload failed' };
    }
};

// Assuming you have an endpoint /test-k in your Flask app
export const testKMeans = async (data) => {
    try {
        const response = await fetch('http://localhost:5000/test-k', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return { message: 'Test failed' };
    }
};


// Ejemplo de función para enviar datos al backend
function enviarDatos(modelo,answers) {
    const modeloSeleccionado = modelo;
    const respuestas = {
        motivacion:0,
        relajacion:0,
        satisfaccion: 1,
        aprendizaje: 3,
        estres: 1,
        ayuda: 1,
        seguridad: 3,
        actividad_fisica: 1,
        amistad_familia: 3,
        gratitud: 1,
        pasatiempos: 1,
        inspiracion: 1,
        reflexion: 4,
        comunicacion: 1,
        creatividad: 1,
        total:15
    };
  
    fetch('http://localhost:5000/probar-modelo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modelo: modeloSeleccionado, respuestas }),
    })
    .then(response => response.json())
    .then(data => {
      // Manejar la respuesta del backend
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  