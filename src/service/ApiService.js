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
