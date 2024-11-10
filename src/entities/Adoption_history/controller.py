from flask import jsonify, request

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

    @staticmethod
    def get_adoption_history():
        try:
            filters = []

            person_id = request.args.get('person_id', type=int)
            if person_id:
                filters.append(Adoption_history.person_id == person_id)

            pet_id = request.args.get('pet_id', type=int)
            if pet_id:
                filters.append(Adoption_history.pet_id == pet_id)

            adoption_history = Adoption_history.query.filter(*filters).all()

            data = [
                {
                    'adoption_id': adoption.id,
                    'pet_id': adoption.pet_id,
                    'person_id': adoption.person_id
                } for adoption in adoption_history
            ]

            return jsonify({'status': 200, 'data': data}), 200

        except Exception as e:
            return jsonify({'status': 500, 'message': 'Internal server error', 'error': str(e)}), 500
