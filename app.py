from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
import os
from database.db import db

from src.Address.routes import address_routes

load_dotenv(".env")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(address_routes)

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
