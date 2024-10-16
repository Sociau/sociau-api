import os
import time
from firebase_admin import credentials, storage, initialize_app
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

load_dotenv()


def init_firebase():
    firebase_config = {
        "type": os.getenv("FIREBASE_TYPE"),
        "project_id": os.getenv("FIREBASE_PROJECT_ID"),
        "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
        "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace('\\n', '\n'),
        "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
        "client_id": os.getenv("FIREBASE_CLIENT_ID"),
        "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
        "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
        "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_CERT"),
        "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_CERT_URL")
    }
    cred = credentials.Certificate(firebase_config)

    initialize_app(cred, {
        'storageBucket': 'sociau-27036.appspot.com'
    })


def upload_image_to_firebase(file, folder_name):
    try:
        timestamp = str(int(time.time()))
        filename = secure_filename(f"{timestamp}_{file.filename}")

        bucket = storage.bucket()
        blob = bucket.blob(f"{folder_name}/{filename}")

        blob.upload_from_file(file)
        blob.make_public()

        return blob.public_url

    except Exception as e:
        print(f"Error during file upload: {str(e)}")
        return None
