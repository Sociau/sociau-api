from flask import jsonify, request

from database.db import db
from src.entities.Address.model import Address
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

    @staticmethod
    def get():
        try:
            filters = []

            species = request.args.get('species')
            if species:
                filters.append(Pet.species == species)

            gender = request.args.get('gender')
            if gender:
                try:
                    gender = int(gender)
                    filters.append(Pet.gender == gender)
                except ValueError:
                    return jsonify({'status': 400, 'message': 'Invalid gender value'}), 400

            state = request.args.get('state')
            if state:
                filters.append(Address.state == state)

            city = request.args.get('city')
            if city:
                filters.append(Address.city == city)

            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 10, type=int)
            sort_by = request.args.get('sort_by', 'id')
            order = request.args.get('order', 'asc')

            query = Pet.query.join(
                Address, Pet.address_id == Address.id).filter(*filters)

            if order == 'desc':
                query = query.order_by(getattr(Pet, sort_by).desc())
            else:
                query = query.order_by(getattr(Pet, sort_by).asc())

            pagination = query.paginate(
                page=page, per_page=per_page, error_out=False)

            pets = [pet.to_dict() for pet in pagination.items]

            response = {
                'status': 200,
                'total': pagination.total,
                'pages': pagination.pages,
                'current_page': pagination.page,
                'per_page': pagination.per_page,
                'pets': pets
            }
            return jsonify(response), 200

        except SQLAlchemyError as e:
            return jsonify({'status': 500, 'message': 'Database error', 'error': str(e)}), 500

        except Exception as e:
            return jsonify({'status': 500, 'message': 'Internal server error', 'error': str(e)}), 500

    @staticmethod
    def get_by_id(pet_id):
        try:
            pet = Pet.query.get(pet_id)

            response = {
                'status': 200,
                'pet': pet.to_dict()
            }

            return jsonify(response)
        except Exception as e:
            response = {
                'status': 500,
                'message': str(e)
            }
            return jsonify(response)
