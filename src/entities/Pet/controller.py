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
            photos = []

            if 'main_photo' in request.files:
                main_photo_file = request.files['main_photo']

                if main_photo_file.filename == '':
                    return jsonify({'status': 400, 'message': 'No file selected'}), 400

                main_photo = send_image_to_firebase(
                    main_photo_file, 'fotos_dos_pets')

            if 'photos' in request.files:
                photo_files = request.files.getlist('photos')
                for photo_file in photo_files:
                    if photo_file.filename == '':
                        continue

                    photo_url = send_image_to_firebase(
                        photo_file, 'fotos_dos_pets')
                    photos.append(photo_url)

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
                photos=photos,
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

    @staticmethod
    def update_pet(pet_id):
        try:
            pet = Pet.query.get(pet_id)
            if not pet:
                return jsonify({'status': 404, 'message': 'Pet not found'}), 404

            data = request.form
            if 'name' in data:
                pet.name = data['name']
            if 'species' in data:
                pet.species = data['species']
            if 'breed' in data:
                pet.breed = data['breed']
            if 'adopted' in data:
                adopted_value = data.get('adopted').lower()
                if adopted_value == 'true':
                    pet.adopted = True
                elif adopted_value == 'false':
                    pet.adopted = False
                else:
                    return jsonify({'status': 400, 'message': 'Invalid value for adopted'}), 400
            if 'size' in data:
                pet.size = data['size']
            if 'gender' in data:
                pet.gender = data['gender']
            if 'city' in data:
                pet.city = data['city']
            if 'state' in data:
                pet.state = data['state']
            if 'veterinary_care' in data:
                pet.veterinary_care = data['veterinary_care']
            if 'temperament' in data:
                pet.temperament = data['temperament']
            if 'about' in data:
                pet.about = data['about']
            if 'person_id' in data:
                pet.person_id = data['person_id']

            if 'main_photo' in request.files:
                main_photo_file = request.files['main_photo']
                if main_photo_file.filename:
                    pet.main_photo = send_image_to_firebase(
                        main_photo_file, 'fotos_dos_pets')

            if 'photos' in request.files:
                photo_files = request.files.getlist('photos')
                pet.photos = [send_image_to_firebase(
                    photo_file, 'fotos_dos_pets') for photo_file in photo_files if photo_file.filename]

            db.session.commit()
            return jsonify({'status': 200, 'message': 'Pet updated successfully'})
        except Exception as e:
            return jsonify({'status': 500, 'message': str(e)})
