from flask import Blueprint
from src.Address.controller import AddressController

address_routes = Blueprint('app', __name__)
prefix = '/address'


@address_routes.route(f'{prefix}/add', methods=['POST'])
def add_route():
    return AddressController.add()
