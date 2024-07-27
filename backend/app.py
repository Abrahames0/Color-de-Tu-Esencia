import os
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import pdfkit


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'csv'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def leer_datos(filepath):
    if filepath.endswith('.xlsx'):
        return pd.read_excel(filepath)
    elif filepath.endswith('.csv'):
        return pd.read_csv(filepath)
    else:
        raise ValueError("Unsupported file format. Please use a .csv or .xlsx file")

def entrenar_modelo(filepath, num_clusters=9, num_iteraciones=50):
    df = leer_datos(filepath)
    df_numeric = df.select_dtypes(include=[np.number])
    df_numeric.fillna(df_numeric.mean(), inplace=True)

    scaler = StandardScaler()
    df_escalado = scaler.fit_transform(df_numeric)

    kmeans = KMeans(n_clusters=num_clusters, max_iter=num_iteraciones, random_state=42)
    kmeans.fit(df_escalado)

    # Save the scaler and model to disk for future use
    joblib.dump(scaler, 'scaler.pkl')
    joblib.dump(kmeans, 'kmeans_model.pkl')

    return df, kmeans, scaler

def probar_modelo(filepath, num_clusters=9, num_iteraciones=50, k_max=10):
    df = leer_datos(filepath)
    df_numeric = df.select_dtypes(include=[np.number])
    df_numeric.fillna(df_numeric.mean(), inplace=True)

    scaler = StandardScaler()
    df_escalado = scaler.fit_transform(df_numeric)

    kmeans = KMeans(n_clusters=num_clusters, max_iter=num_iteraciones, random_state=42)
    kmeans.fit(df_escalado)

    df['Cluster'] = kmeans.labels_
    elbow_image = plot_elbow_method(df_escalado, k_max)
    pca_image = visualizar_clusters(df)

    # Convert the dataframe to a list of dictionaries for JSON response
    clustered_data = df.to_dict(orient='records')

    return df, kmeans, scaler, elbow_image, pca_image, clustered_data

def plot_elbow_method(data, k_max):
    wcss = []
    for i in range(1, k_max + 1):  # k_max is the user-defined maximum for k
        kmeans = KMeans(n_clusters=i, init='k-means++', max_iter=300, n_init=10, random_state=0)
        kmeans.fit(data)
        wcss.append(kmeans.inertia_)
    plt.figure(figsize=(10, 5))
    plt.plot(range(1, k_max + 1), wcss)
    plt.title('Elbow Method')
    plt.xlabel('Number of clusters')
    plt.ylabel('WCSS (inertia)')
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    return base64.b64encode(buf.getvalue()).decode('utf-8')

def visualizar_clusters(df):
    pca = PCA(n_components=2)
    df_reducido = pca.fit_transform(df.select_dtypes(include=[np.number]))
    
    plt.figure(figsize=(10, 7))
    scatter = plt.scatter(df_reducido[:, 0], df_reducido[:, 1], c=df['Cluster'], cmap='viridis', marker='o')
    plt.colorbar(scatter, label='Cluster')
    plt.xlabel('Componente Principal 1')
    plt.ylabel('Componente Principal 2')
    plt.title('Distribución de Clusters')
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    return base64.b64encode(buf.getvalue()).decode('utf-8')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return jsonify({'message': 'File uploaded successfully'}), 200
    return jsonify({'error': 'Unsupported file format'}), 400

@app.route('/test-k', methods=['POST'])
def test_k():
    if 'file' not in request.files or 'k_max' not in request.form:
        return jsonify({'error': 'Missing file or k_max parameter'}), 400
    file = request.files['file']
    k_max = int(request.form['k_max'])
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        df, kmeans, scaler, elbow_image, pca_image, clustered_data = probar_modelo(filepath, num_clusters=k_max, k_max=k_max)

        return jsonify({'elbow': elbow_image, 'pca': pca_image, 'clustered_data': clustered_data})
    else:
        return jsonify({'error': 'Unsupported file format'}), 400

if __name__ == '__main__':
    app.run(debug=True)
