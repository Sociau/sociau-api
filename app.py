from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
import os
from database.db import db
from src.middlewares.jwt import token_required
from src.entities.Address.routes import address_routes
from src.entities.Person.routes import person_routes

from src.entities.Person.model import Person

load_dotenv(".env")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_URI_PROD')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(address_routes)
app.register_blueprint(person_routes)

port = os.environ.get('PORT', 3000)
version = os.environ.get('VERSION')
CORS(app)

print(f'Porta: {port}')
print(f'Versão: {version}')

@app.route('/')
def index():
    return f'<h1>Welcome to Sociau API {version}</h1>'

@app.route('/example')
@token_required
def protected(current_user):
    return f'<h1>{current_user.nickname} seja bem vindo a rota protegida</h1>'

if __name__ == '__main__':
    app.run(port=int(port))
