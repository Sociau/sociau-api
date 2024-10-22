from flask import Blueprint
from src.entities.Adoption_history.controller import AdoptionHistoryController

adoption_routes = Blueprint('adoption', __name__)


@adoption_routes.route('/adoption/<int:person_id>', methods=['GET'])
def get_user_route(person_id):
    return AdoptionHistoryController.get_adoption_history(person_id)
