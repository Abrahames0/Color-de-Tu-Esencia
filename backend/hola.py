import pandas as pd
from sklearn.cluster import KMeans
from sklearn import metrics

# Cargar los datos desde un archivo CSV
file_path = './clustered_data.csv'
data = pd.read_csv(file_path)

# Imprimir las primeras filas de los datos para validar
print("Primeras filas de los datos:")
print(data.head())

# Separar las características y la variable objetivo
y = data['Cluster']
X = data.drop(columns=['Cluster'])

# Imprimir algunas filas de X e y para verificar
print("\nCaracterísticas (X):")
print(X.head())
print("\nVariable objetivo (y):")
print(y.head())

# Configurar el número de clústeres para K-means
n_clusters = 5
kmeans = KMeans(n_clusters=n_clusters, random_state=42)
kmeans.fit(X)

# Predecir los clústeres
predicciones = kmeans.predict(X)

# Imprimir las primeras filas de las predicciones para validar
print("\nPredicciones:")
print(predicciones[:10])

# Calcular el puntaje ajustado de Rand
score = metrics.adjusted_rand_score(y, predicciones)

# Imprimir el puntaje
print("\nPuntaje ajustado de Rand:")
print(score)
