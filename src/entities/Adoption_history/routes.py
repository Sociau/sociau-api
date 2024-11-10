from flask import Blueprint
from src.entities.Adoption_history.controller import AdoptionHistoryController

adoption_routes = Blueprint('adoption', __name__)


@adoption_routes.route('/adoption', methods=['GET'])
def get_user_route():
    return AdoptionHistoryController.get_adoption_history()
