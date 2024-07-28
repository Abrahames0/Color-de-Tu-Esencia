import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError

BUCKET_NAME = 'flaskcolor'
OBJECT_NAME = './models/kmeans_model.pkl'  # Cambia 'filename.ext' por el nombre del archivo que subirás

def generate_presigned_url(bucket_name, object_name, expiration=3600):
    """Generate a presigned URL to share an S3 object"""
    s3_client = boto3.client('s3')

    try:
        response = s3_client.generate_presigned_url('put_object',
                                                    Params={'Bucket': bucket_name, 'Key': object_name},
                                                    ExpiresIn=expiration)
    except NoCredentialsError:
        print("Credentials not available")
        return None

    return response

# Genera la URL pre-firmada
url = generate_presigned_url(BUCKET_NAME, OBJECT_NAME)

if url:
    print(f"Presigned URL: {url}")
