from flask import Blueprint
from src.middlewares.jwt import token_required
from src.entities.Person.controller import PersonController

person_routes = Blueprint('person', __name__)


@person_routes.route(f'/create_account', methods=['POST'])
def add_person_route():
    return PersonController.add()


@person_routes.route(f'/login', methods=['POST'])
def login_person_route():
    return PersonController.login()


@person_routes.route('/user/<int:user_id>', methods=['GET'])
<<<<<<< HEAD
@token_required
def get_user_route(current_user, user_id):
    return PersonController.get_user(current_user, user_id)
=======
def get_user_route(user_id):
    return PersonController.get_user(user_id)

@person_routes.route('/edit_user/<int:user_id>', methods=['POST'])
def edit_user(user_id):
    return PersonController.edit_user(user_id)
>>>>>>> 0ee01a86438606245f7ecff0b644455bb1a5dfc1
