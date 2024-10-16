from flask import jsonify, request

from database.db import db
from src.entities.Person.model import Person
from src.entities.Pet.model import Pet
from src.entities.Adoption_history.controller import AdoptionHistoryController


class PetController:
    @staticmethod
    def add():
        try:
            data = request.get_json()

            name = data.get('name')
            species = data.get('species')
            breed = data.get('breed')
            adopted = data.get('adopted')
            vaccinated = data.get('vaccinated')
            castrated = data.get('castrated')
            size = data.get('size')
            gender = data.get('gender')
            availability = data.get('availability')
            special_needs = data.get('special_needs')
            which_special_needs = data.get('which_special_needs')

            person_id = data.get('person_id')

            person = Person.query.get(person_id)
            address_id = person.address_id

            pet = Pet(
                name=name,
                species=species,
                breed=breed,
                adopted=adopted,
                vaccinated=vaccinated,
                castrated=castrated,
                size=size,
                gender=gender,
                address_id=address_id,
                availability=availability,
                special_needs=special_needs,
                which_special_needs=which_special_needs
            )

            db.session.add(pet)
            db.session.commit()

            AdoptionHistoryController.add_adoption_history(person_id, pet)

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
