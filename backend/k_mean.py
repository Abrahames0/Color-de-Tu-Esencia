import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score, silhouette_samples
import os

# Definir el número de clusters globalmente
NUM_CLUSTERS = 3  # Cambia el número de clusters según tus necesidades

# Ruta al archivo CSV
CSV_FILE_PATH = 'C:/Users/mar73/OneDrive/Escritorio/TAWERS/backend/pre5.csv'  # Reemplaza con la ruta a tu archivo CSV

def validate_columns(df):
    numeric_cols = df.select_dtypes(include=['number']).columns
    if len(numeric_cols) == 0:
        raise ValueError("No numeric columns found in the CSV file.")
    return df[numeric_cols]

def main():
    try:
        # Verifica si el archivo CSV existe
        if not os.path.isfile(CSV_FILE_PATH):
            raise FileNotFoundError("CSV file not found")
        
        # Lee el archivo CSV
        df = pd.read_csv(CSV_FILE_PATH)
        
        # Verifica que el dataframe no esté vacío
        if df.empty:
            raise ValueError("Empty CSV file")
        
        # Validar y normalizar los datos
        df = validate_columns(df)
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(df)
        
        # Maneja el caso con un solo punto de datos
        if len(df) == 1:
            print({
                'data': df.to_dict(orient='records'),
                'metrics': {
                    'inertia': None,
                    'silhouette_score': None,
                    'cluster_silhouette_scores': {}
                }
            })
            return
        
        # Ajusta el número de clusters según el tamaño del dataset
        n_clusters = min(NUM_CLUSTERS, len(df))
        
        # Realiza clustering con K-Means
        kmeans = KMeans(n_clusters=n_clusters)
        kmeans.fit(scaled_data)
        labels = kmeans.labels_
        
        # Calcula métricas de evaluación
        inertia = kmeans.inertia_
        silhouette_avg = silhouette_score(scaled_data, labels)
        sample_silhouette_values = silhouette_samples(scaled_data, labels)
        
        # Calcula el silhouette score promedio por cluster
        cluster_silhouette_scores = {}
        for i in range(n_clusters):
            cluster_silhouette_scores[i] = sample_silhouette_values[labels == i].mean()

        # Añade las etiquetas de cluster al DataFrame original
        df['Cluster'] = labels
        
        # Devuelve los resultados y métricas
        result = {
            'data': df.to_dict(orient='records'),
            'metrics': {
                'inertia': inertia,
                'silhouette_score': silhouette_avg,
                'cluster_silhouette_scores': cluster_silhouette_scores
            }
        }
        
        print(result)
    
    except Exception as e:
        print({"error": str(e)})

if __name__ == '__main__':
    main()
