import datetime
from flask import Flask, request, jsonify
import jwt
from functools import wraps
import os
from dotenv import load_dotenv

app = Flask(__name__)

app.config['SECRET_KEY'] = str(os.getenv('SECRET_KEY'))

def create_token(user_id, email, nickname):
    secret_key = app.config['SECRET_KEY']
    
    if not isinstance(secret_key, str):
        raise ValueError("SECRET_KEY must be a string")
    
    expiration_time = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=30)
    expiration_timestamp = int(expiration_time.timestamp())
    
    payload = {
        'user': user_id,
        'email': email,
        'nickname': nickname,
        'exp': expiration_timestamp
    }
    
    if not isinstance(payload, dict):
        raise ValueError("Payload must be a dictionary")
    
    try:
        token = jwt.encode(payload, secret_key, algorithm='HS256')
    except Exception as e:
        print(f"Error encoding token: {e}")
        raise
    
    return token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        else:
            token = request.args.get('token')

        if not token:
            return jsonify({'message': 'Token is missing'}), 403

        try:
            secret_key = app.config['SECRET_KEY']
            if not isinstance(secret_key, str):
                raise TypeError('SECRET_KEY must be a string')
            data = jwt.decode(token, secret_key, algorithms=['HS256'])
            current_user = data
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid'}), 401
        except TypeError as e:
            return jsonify({'message': str(e)}), 500

        return f(current_user, *args, **kwargs)
    
    return decorated
