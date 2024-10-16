from flask import Blueprint

from src.middlewares.jwt import token_required
from src.entities.Pet.controller import PetController


pets_routes = Blueprint('pets', __name__)


@pets_routes.route('/pets', methods=['POST'])
@token_required
def add_pet_route(current_user):
    return PetController.add()
