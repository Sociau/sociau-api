from flask import jsonify, request

from database.db import db
from src.helpers.upload_to_firebase import send_image_to_firebase
from src.entities.Address.model import Address
from src.entities.Person.model import Person
from src.entities.Pet.model import Pet
from src.entities.Adoption_history.controller import AdoptionHistoryController


class PetController:
    @staticmethod
    def add():
        try:
            main_photo = ""
            if 'main_photo' in request.files:
                main_photo_file = request.files['main_photo']

                if main_photo_file.filename == '':
                    return jsonify({'status': 400, 'message': 'No file selected'}), 400

                main_photo = send_image_to_firebase(
                    main_photo_file, 'fotos_dos_pets')
            data = request.form

            name = data.get('name')
            species = data.get('species')
            breed = data.get('breed')
            adopted = bool(data.get('adopted')) or 0
            vaccinated = bool(data.get('vaccinated')) or 0
            castrated = bool(data.get('castrated')) or 0
            size = data.get('size')
            gender = data.get('gender')
            availability = bool(data.get('availability')) or 0
            special_needs = bool(data.get('special_needs')) or 0
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
                which_special_needs=which_special_needs,
                main_photo=main_photo
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

            name = request.args.get('name')
            if name:
                filters.append(Pet.name.like(f"%{name}%"))

            species = request.args.get('species')
            if species:
                filters.append(Pet.species == species)

            gender = request.args.get('gender')
            if gender:
                if gender in ['M', 'F']:
                    filters.append(Pet.gender == gender)
                else:
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
            pets = [
                {
                    **pet.to_dict(),
                    'address': {
                        'id': pet.address.id,
                        'street': pet.address.street,
                        'city': pet.address.city,
                        'state': pet.address.state
                    } if pet.address else None
                } for pet in pagination.items
            ]

            response = {
                'status': 200,
                'total': pagination.total,
                'pages': pagination.pages,
                'current_page': pagination.page,
                'per_page': pagination.per_page,
                'pets': pets
            }
            return jsonify(response), 200

        except Exception as e:
            return jsonify({'status': 500, 'message': 'Internal server error', 'error': str(e)}), 500

    @staticmethod
    def get_by_id(pet_id):
        try:
            pet = Pet.query.get(pet_id)
            if not pet:
                return jsonify({'status': 404, 'message': 'Pet not found'}), 404

            response = {
                'status': 200,
                'pet': {
                    **pet.to_dict(),
                    'address': {
                        'id': pet.address.id,
                        'street': pet.address.street,
                        'city': pet.address.city,
                        'state': pet.address.state
                    } if pet.address else None
                }
            }
            return jsonify(response), 200

        except Exception as e:
            return jsonify({'status': 500, 'message': 'Internal server error', 'error': str(e)}), 500
