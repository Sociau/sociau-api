import os
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


def upload_image_to_firebase(file, upload_folder='uploads/'):
    try:

        if not file:
            return {"error": "No file provided"}, 400

        filename = secure_filename(file.filename)
        if not filename:
            return {"error": "No selected file"}, 400

        filepath = os.path.join(upload_folder, filename)

        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        file.save(filepath)

        bucket = storage.bucket()
        blob = bucket.blob(f'images/{filename}')
        blob.upload_from_filename(filepath)
        blob.make_public()

        file_url = blob.public_url

        os.remove(filepath)

        return file_url

    except Exception as e:

        print(f"Error during file upload: {str(e)}")
