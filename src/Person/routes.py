from flask import Blueprint
from src.Person.controller import PersonController

person_routes = Blueprint('person', __name__)
prefix = '/person'


@person_routes.route(f'{prefix}/add', methods=['POST'])
def add_person_route():
    return PersonController.add()
