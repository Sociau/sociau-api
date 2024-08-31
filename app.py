from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
import os

load_dotenv(".env")

app = Flask(__name__)

port = os.environ.get('PORT', 3000)
version = os.environ.get('VERSION')
CORS(app)

print(f'Porta: {port}')
print(f'Versão: {version}')

@app.route('/')
def index():
    return f'<h1>Welcome to Sociau API {version}</h1>'

if __name__ == '__main__':
    app.run(port=int(port))