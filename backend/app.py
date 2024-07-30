import os
import json
import pandas as pd
import numpy as np
import joblib
from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
from flask_cors import CORS
from sklearn.cluster import KMeans, AgglomerativeClustering
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['MODEL_FOLDER'] = 'models/'
app.config['ALLOWED_EXTENSIONS'] = {'csv', 'xlsx'}

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

if not os.path.exists(app.config['MODEL_FOLDER']):
    os.makedirs(app.config['MODEL_FOLDER'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def leer_datos(filepath):
    if filepath.endswith('.xlsx'):
        return pd.read_excel(filepath)
    elif filepath.endswith('.csv'):
        return pd.read_csv(filepath)
    else:
        raise ValueError("Unsupported file format. Please use a .csv or .xlsx file")

def plot_elbow_method(data, k_max):
    wcss = []
    for i in range(1, k_max + 1):
        kmeans = KMeans(n_clusters=i, init='k-means++', max_iter=300, n_init=10, random_state=0)
        kmeans.fit(data)
        wcss.append(kmeans.inertia_)
    plt.figure(figsize=(10, 5))
    plt.plot(range(1, k_max + 1), wcss, marker='o')
    plt.title('Método del Codo')
    plt.xlabel('Número de clusters')
    plt.ylabel('WCSS')
    plt.grid(True)
    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
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
    buf.seek(0)
    plt.close()
    return base64.b64encode(buf.getvalue()).decode('utf-8')

def asignar_color_majoritario(kmeans_labels):
    color_map = ['Negro', 'Rojo', 'Azul', 'Verde', 'Blanco']
    label_counts = pd.Series(kmeans_labels).value_counts().sort_values(ascending=False)
    cluster_color_mapping = {}
    for i, (label, _) in enumerate(label_counts.items()):
        cluster_color_mapping[label] = color_map[i % len(color_map)]
    return cluster_color_mapping
def asignar_color_majoritario(kmeans_labels):
    # Define the color mapping based on the cluster label
    color_map = {0: 'Negro', 1: 'Rojo', 2: 'Azul', 3: 'Verde', 4: 'Blanco'}
    return color_map

def asignar_color_majoritario(kmeans_labels):
    # Define the color mapping based on the cluster label
    color_map = {0: 'Negro', 1: 'Rojo', 2: 'Azul', 3: 'Verde', 4: 'Blanco'}
    return color_map

def determinar_color_numerico(row, modelo, scaler, pca):
    mode_vals = row.mode()
    color_map = asignar_color_majoritario(modelo.labels_)  # Use the color_map generated for the clusters
    if len(mode_vals) == 1:
        selected_color = color_map.get(mode_vals.iloc[0], 'Color no definido')
    else:
        row_values = scaler.transform([row])
        row_pca = pca.transform(row_values)
        cluster_label = modelo.predict(row_pca)[0]
        selected_color = color_map.get(cluster_label, 'Color no definido')
    return selected_color

def asignar_color(df, modelo, scaler, pca):
    df['Color'] = df.apply(lambda row: determinar_color_numerico(row, modelo, scaler, pca), axis=1)
    return df

def entrenar_modelo(filepath, num_clusters=5, num_iteraciones=50):
    df = leer_datos(filepath)
    df_numeric = df.select_dtypes(include=[np.number])
    df_numeric.fillna(df_numeric.mean(), inplace=True)

    scaler = StandardScaler()
    df_escalado = scaler.fit_transform(df_numeric)

    jerarquico = AgglomerativeClustering(n_clusters=num_clusters)
    jerarquico_labels = jerarquico.fit_predict(df_escalado)
    df['Cluster_Jerarquico'] = jerarquico_labels

    kmeans = KMeans(n_clusters=num_clusters, max_iter=num_iteraciones, random_state=42)
    kmeans.fit(df_escalado)
    df['Cluster'] = kmeans.labels_

    # Assign colors based on the cluster label
    colores_finales = asignar_color_majoritario(df['Cluster'])
    df['Color'] = df['Cluster'].map(colores_finales)

    timestamp = int(time.time())
    scaler_filename = os.path.join(app.config['MODEL_FOLDER'], f'scaler_{timestamp}.pkl')
    model_filename = os.path.join(app.config['MODEL_FOLDER'], f'kmeans_model_{timestamp}.pkl')
    joblib.dump(scaler, scaler_filename)
    joblib.dump(kmeans, model_filename)

    return df, kmeans, scaler, model_filename

def probar_modelo(filepath, num_clusters=9, num_iteraciones=50, k_max=10):
    df = leer_datos(filepath)
    df_numeric = df.select_dtypes(include=[np.number])
    df_numeric.fillna(df_numeric.mean(), inplace=True)

    scaler = StandardScaler()
    df_escalado = scaler.fit_transform(df_numeric)

    kmeans = KMeans(n_clusters=num_clusters, max_iter=num_iteraciones, random_state=42)
    kmeans_labels = kmeans.fit_predict(df_escalado)

    # Assign colors based on the cluster label
    colores_finales = asignar_color_majoritario(kmeans_labels)
    df['Cluster'] = kmeans_labels
    df['Color'] = df['Cluster'].map(colores_finales)

    elbow_image = plot_elbow_method(df_escalado, k_max)
    pca_image = visualizar_clusters(df)

    clustered_data = df.to_dict(orient='records')

    return df, kmeans, scaler, elbow_image, pca_image, clustered_data

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

        try:
            df, kmeans, scaler, elbow_image, pca_image, clustered_data = probar_modelo(filepath, num_clusters=k_max)
            response_data = {
                'elbow': elbow_image,
                'pca': pca_image,
                'clustered_data': clustered_data,
                'filename': filename
            }
            return jsonify(response_data)
        except Exception as e:
            return jsonify({'error': f'Error processing file: {str(e)}'}), 500
    else:
        return jsonify({'error': 'Unsupported file format'}), 400

@app.route('/train-model', methods=['POST'])
def train_model():
    filename = request.form.get('filename')
    k_max = int(request.form.get('k_max', 5))

    if not filename:
        return jsonify({'error': 'Filename not provided'}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(filepath):
        return jsonify({'error': 'File not found'}), 404

    try:
        df, kmeans, scaler, model_filename = entrenar_modelo(filepath, num_clusters=k_max)
        return jsonify({'message': 'Model trained and saved', 'model_filename': os.path.basename(model_filename)})
    except Exception as e:
        return jsonify({'error': f'Error training model: {str(e)}'}), 500

@app.route('/send_model', methods=['GET'])
def send_model():
    model_filename = request.args.get('model_filename')
    full_path = os.path.join(app.config['MODEL_FOLDER'], model_filename)

    if not model_filename or not os.path.exists(full_path):
        return jsonify({'error': 'Model file not found'}), 404

    try:
        return send_file(full_path, as_attachment=True)
    except Exception as e:
        return jsonify({'error': f'Error sending file: {str(e)}'}), 500

@app.route('/probar-modelo', methods=['POST'])
def probar_modelo_endpoint():
    data = request.get_json()
    model_filename = data.get('modelFilename')
    respuestas = data.get('respuestas')

    if not model_filename or not respuestas:
        return jsonify({'error': 'Missing modelFilename or respuestas'}), 400

    try:
        respuestas_dict = respuestas[0]
        respuestas_np = np.array([list(respuestas_dict.values())]).reshape(1, -1)
    except Exception as e:
        return jsonify({'error': f'Error processing responses: {str(e)}'}), 400

    full_path = os.path.join(app.config['MODEL_FOLDER'], model_filename)

    if not os.path.exists(full_path):
        return jsonify({'error': 'Model file not found'}), 404

    try:
        modelo = joblib.load(full_path)
        scaler = joblib.load(full_path.replace('kmeans_model', 'scaler'))
        pca = PCA(n_components=2)
        row = pd.DataFrame(respuestas_dict, index=[0])
        color = determinar_color_numerico(row.iloc[0], modelo, scaler, pca)
        return jsonify({'color': color})
    except Exception as e:
        return jsonify({'error': f'Error loading model or processing responses: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
