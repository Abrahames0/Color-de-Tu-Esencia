import React, { useState } from 'react';
import { postTestData, trainModel, uploadFile, testKMeans } from '../service/ApiService';

function TestForm() {
    const [inputData, setInputData] = useState({});
    const [file, setFile] = useState(null);
    const [iterations, setIterations] = useState(50);
    const [numClusters, setNumClusters] = useState(3);
    const [cluster, setCluster] = useState(null);
    const [message, setMessage] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [testMessage, setTestMessage] = useState('');

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            setUploadMessage('Please select a file to upload.');
            return;
        }
        const result = await uploadFile(file);
        setUploadMessage(result.message);
    };

    const handleTrain = async (event) => {
        event.preventDefault();
        const result = await trainModel({ iterations, numClusters });
        setMessage(result.message);
    };

    const handleTestKMeans = async (event) => {
        event.preventDefault();
        const result = await testKMeans({ numClusters });
        setTestMessage(result.message);
    };

    const handleTest = async (event) => {
        event.preventDefault();
        const result = await postTestData(inputData);
        setCluster(result.cluster);
    };

    const handleChange = (event) => {
        switch (event.target.name) {
            case "iterations":
                setIterations(event.target.value);
                break;
            case "numClusters":
                setNumClusters(event.target.value);
                break;
            case "feature1":
                setInputData({ ...inputData, [event.target.name]: event.target.value });
                break;
            case "file":
                setFile(event.target.files[0]);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <form onSubmit={handleUpload} style={{ marginBottom: '20px' }}>
                <input type="file" onChange={handleChange} style={{ margin: '10px' }} />
                <button type="submit" style={{ padding: '10px' }}>Upload CSV</button>
            </form>
            {uploadMessage && <p>{uploadMessage}</p>}

            <form onSubmit={handleTestKMeans} style={{ marginBottom: '20px' }}>
                <label htmlFor="numClusters">Number of Clusters (k):</label>
                <input
                    type="number"
                    name="numClusters"
                    value={numClusters}
                    onChange={handleChange}
                    style={{ margin: '10px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>Test k Value</button>
            </form>
            {testMessage && <p>{testMessage}</p>}

            <form onSubmit={handleTrain} style={{ marginBottom: '20px' }}>
                <label htmlFor="iterations">Iterations:</label>
                <input
                    type="number"
                    name="iterations"
                    value={iterations}
                    onChange={handleChange}
                    style={{ margin: '10px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>Train Model</button>
            </form>
            {message && <p>{message}</p>}

            <form onSubmit={handleTest}>
                <label htmlFor="feature1">Feature Input:</label>
                <input
                    type="number"
                    name="feature1"
                    onChange={handleChange}
                    style={{ margin: '10px' }}
                />
                <button type="submit" style={{ padding: '10px' }}>Test Model</button>
            </form>
            {cluster !== null && <p>Cluster: {cluster}</p>}
        </div>
    );
}

export default TestForm;
