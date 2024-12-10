from flask import Blueprint

from src.middlewares.jwt import token_required
from src.entities.Pet.controller import PetController


pets_routes = Blueprint('pets', __name__)


@pets_routes.route('/pets', methods=['POST'])
@token_required
def add_pet_route(current_user):
    return PetController.add()


@pets_routes.route('/pets', methods=['GET'])
def get_pets_route():
    return PetController.get()


@pets_routes.route('/pets/<int:pet_id>', methods=['GET'])
def get_pet_route(pet_id):
    return PetController.get_by_id(pet_id)


@pets_routes.route('/pets/<int:pet_id>', methods=['PUT'])
@token_required
def update_pet_route(current_user, pet_id):
    return PetController.update_pet(pet_id)
