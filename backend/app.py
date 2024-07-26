import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt
from flask import Flask, render_template, request, jsonify
import joblib
from io import BytesIO
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Definir el archivo CSV como una constante global
FILE_PATH = './pre7.csv'# Directory where uploaded files will be saved
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def leer_datos(filepath=FILE_PATH):
    if filepath.endswith('.xlsx'):
        return pd.read_excel(filepath)
    elif filepath.endswith('.csv'):
        return pd.read_csv(filepath)
    else:
        raise ValueError("Formato de archivo no soportado. Por favor usa un archivo .csv o .xlsx")

def entrenar_modelo(num_iteraciones=50):
    df = leer_datos()
    df_numeric = df.select_dtypes(include=[np.number])
    df_numeric.fillna(df_numeric.mean(), inplace=True)
    
    scaler = StandardScaler()
    df_escalado = scaler.fit_transform(df_numeric)
    
    # Ajusta el número de iteraciones aquí
    kmeans = KMeans(n_clusters=9, max_iter=num_iteraciones, random_state=42)
    kmeans.fit(df_escalado)
    
    # Guardar los objetos con joblib
    joblib.dump(scaler, 'scaler.pkl')
    joblib.dump(kmeans, 'kmeans_model.pkl')

    print(f"Centros de los clusters: {kmeans.cluster_centers_}")
    print(f"Etiquetas de los clusters: {kmeans.labels_}")
    
    return df, kmeans, scaler

def asignar_cluster(df, modelo, scaler):
    df_numeric = df.select_dtypes(include=[np.number])
    df_escalado = scaler.transform(df_numeric.fillna(df_numeric.mean()))
    df['Cluster'] = modelo.predict(df_escalado)
    return df

def visualizar_clusters(df):
    pca = PCA(n_components=2)
    df_reducido = pca.fit_transform(df.select_dtypes(include=[np.number]))
    
    plt.figure(figsize=(10, 7))
    scatter = plt.scatter(df_reducido[:, 0], df_reducido[:, 1], c=df['Cluster'], cmap='viridis', marker='o')
    plt.colorbar(scatter, label='Cluster')
    plt.xlabel('Componente Principal 1')
    plt.ylabel('Componente Principal 2')
    plt.title('Distribución de Clusters')
    plt.savefig('clusters.png')
    plt.show()

@app.route('/')
def index():
    try:
        df, modelo, scaler = entrenar_modelo()
        df = asignar_cluster(df, modelo, scaler)
        visualizar_clusters(df)  # Opcional si quieres visualizarlo también en Flask
        df_html = df.to_html(classes='table table-striped')
        return render_template('index.html', tables=[df_html])
    except Exception as e:
        return f"Error al procesar: {str(e)}", 500

@app.route('/train', methods=['POST'])
def train_model():
    try:
        # Assuming 'entrenar_modelo' takes parameters from a request
        num_iteraciones = request.json.get('iterations', 50)
        df, modelo, scaler = entrenar_modelo(num_iteraciones)
        joblib.dump(modelo, 'kmeans_model.pkl')
        joblib.dump(scaler, 'scaler.pkl')
        return jsonify({'message': 'Model trained and saved successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and file.filename.endswith('.csv'):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return jsonify({'message': f'File {filename} uploaded successfully', 'path': filepath}), 200
    else:
        return jsonify({'error': 'Unsupported file format'}), 400

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

def plot_pca(data):
    pca = PCA(n_components=2)
    principalComponents = pca.fit_transform(data)
    plt.figure(figsize=(10, 5))
    plt.scatter(principalComponents[:, 0], principalComponents[:, 1], s=50)
    plt.title('PCA Plot')
    plt.xlabel('Principal Component 1')
    plt.ylabel('Principal Component 2')
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    return base64.b64encode(buf.getvalue()).decode('utf-8')

@app.route('/test-k', methods=['POST'])
def test_k():
    if 'file' not in request.files or 'k_max' not in request.form:
        return jsonify({'error': 'Missing file or k_max parameter'}), 400
    file = request.files['file']
    k_max = int(request.form['k_max'])  # retrieve k_max from form data
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and file.filename.endswith('.csv'):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        df = pd.read_csv(filepath)

        # Assuming all columns except the last are features
        X = df.iloc[:, :-1].values
        X_scaled = StandardScaler().fit_transform(X)

        elbow_image = plot_elbow_method(X_scaled, k_max)
        pca_image = plot_pca(X_scaled)

        return jsonify({'elbow': elbow_image, 'pca': pca_image})
    else:
        return jsonify({'error': 'Unsupported file format'}), 400


if __name__ == '__main__':
    app.run(debug=True)
