from flask import jsonify

from database.db import db
from src.entities.Adoption_history.model import Adoption_history


class AdoptionHistoryController:
    def add_adoption_history(person_id, pet_id):
        try:
            adoption_history = Adoption_history(
                person_id=person_id, pet_id=pet_id)
            db.session.add(adoption_history)
            db.session.commit()

            response = {
                'status': 200,
                'message': 'success'
            }

            return jsonify(response)
        except Exception as e:
            response = {
                'status': 500,
                'message': str(e)
            }
            return jsonify(response)