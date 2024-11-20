from flask import jsonify, request

from database.db import db
from src.entities.Adoption_history.model import Adoption_history
from src.helpers.upload_to_firebase import send_image_to_firebase
from src.entities.Pet.model import Pet


class PetController:
    @staticmethod
    def add():
        try:
            data = request.form
            main_photo = ""
            if 'main_photo' in request.files:
                main_photo_file = request.files['main_photo']

                if main_photo_file.filename == '':
                    return jsonify({'status': 400, 'message': 'No file selected'}), 400

                main_photo = send_image_to_firebase(
                    main_photo_file, 'fotos_dos_pets')

            name = data.get('name')
            species = data.get('species')
            breed = data.get('breed')
            adopted = bool(data.get('adopted')) or False
            size = data.get('size')
            gender = data.get('gender')
            city = data.get('city')
            state = data.get('state')
            veterinary_care = data.get('veterinary_care')
            temperament = data.get('temperament')
            about = data.get('about')
            person_id = data.get('person_id')

            pet = Pet(
                name=name,
                species=species,
                breed=breed,
                adopted=adopted,
                size=size,
                gender=gender,
                main_photo=main_photo,
                city=city,
                state=state,
                veterinary_care=veterinary_care,
                temperament=temperament,
                about=about,
                person_id=person_id
            )

            db.session.add(pet)
            try:
                db.session.commit()
                print("Pet salvo com sucesso!")
            except Exception as e:
                print(f"Erro ao salvar pet: {str(e)}")
                raise e

            print(f"Adoption History: {person_id} -> {pet.id}")

            adoption_history = Adoption_history(
                person_id=person_id, pet_id=pet.id)

            db.session.add(adoption_history)
            try:
                db.session.commit()
                print("Adoção registrada com sucesso!")
            except Exception as e:
                print(f"Erro ao salvar adoção: {str(e)}")
                raise e

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
            print(str(e))
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

            size = request.args.get('size')
            if size:
                filters.append(Pet.size == size)

            gender = request.args.get('gender')
            if gender:
                if gender in ['M', 'F']:
                    filters.append(Pet.gender == gender)
                else:
                    return jsonify({'status': 400, 'message': 'Invalid gender value'}), 400

            state = request.args.get('state')
            if state:
                filters.append(Pet.state == state)

            city = request.args.get('city')
            if city:
                filters.append(Pet.city == city)

            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 10, type=int)
            sort_by = request.args.get('sort_by', 'id')
            order = request.args.get('order', 'asc')
            query = Pet.query.filter(*filters)

            if order == 'desc':
                query = query.order_by(getattr(Pet, sort_by).desc())
            else:
                query = query.order_by(getattr(Pet, sort_by).asc())

            pagination = query.paginate(
                page=page, per_page=per_page, error_out=False)
            pets = [
                {
                    'pet': pet.to_dict()
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
            print(str(e))
            return jsonify({'status': 500, 'message': 'Internal server error', 'error': str(e)}), 500

    @staticmethod
    def get_by_id(pet_id):
        try:
            pet = Pet.query.get(pet_id)
            if not pet:
                return jsonify({'status': 404, 'message': 'Pet not found'}), 404

            response = {
                'status': 200,
                'pet': pet.to_dict()
            }
            return jsonify(response), 200

        except Exception as e:
            return jsonify({'status': 500, 'message': 'Internal server error', 'error': str(e)}), 500
