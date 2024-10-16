from flask import jsonify, request, Flask
from src.middlewares.jwt import create_token
from src.helpers.utils import CryptographyManager
from src.entities.Person.model import Person
from src.entities.Address.model import Address
from src.helpers.upload_to_firebase import send_image_to_firebase
from database.db import db

app = Flask(__name__)


class PersonController:
    @staticmethod
    def add():
        try:
            avatar = ""
            if 'avatar' in request.files:
                avatar_file = request.files['avatar']

                if avatar_file.filename == '':
                    return jsonify({'status': 400, 'message': 'No file selected'}), 400

                avatar = send_image_to_firebase(avatar_file, 'avatars')

            data = request.form

            name = data.get('name')
            main_whatsapp = data.get('main_whatsapp')
            second_whatsapp = data.get('second_whatsapp')
            about_you = data.get('about_you')
            email = data.get('email')
            password = data.get('password')
            nickname = data.get('nickname')

            state = data.get('state')
            city = data.get('city')
            street = data.get('street')
            neighborhood = data.get('neighborhood')
            number = data.get('number')

            try:
                address = Address(state=state, city=city, street=street,
                                  neighborhood=neighborhood, number=number)
                db.session.add(address)
                db.session.commit()
            except Exception as e:
                response = {
                    'status': 500,
                    'message': str(e)
                }
                return jsonify(response)

            address_id = address.id

            check_email = Person.query.filter_by(email=email).first()
            if check_email:
                response = {
                    'status': 400,
                    'message': 'Email already exists'
                }
                return jsonify(response)

            crypted_password = CryptographyManager().from_string_to_hash_code(password)

            person = Person(
                name=name,
                main_whatsapp=main_whatsapp,
                second_whatsapp=second_whatsapp,
                about_you=about_you,
                email=email,
                password=crypted_password,
                nickname=nickname,
                address_id=address_id,
                avatar=avatar
            )

            db.session.add(person)
            db.session.commit()

            response = {
                'status': 200,
                'message': 'Person added successfully'
            }
            return jsonify(response)

        except Exception as e:
            response = {
                'status': 500,
                'message': str(e)
            }
            return jsonify(response)

    @staticmethod
    def login():
        try:
            data = request.get_json()

            nickname = data.get('nickname')
            password = data.get('password')

            person = Person.query.filter_by(nickname=nickname).first()

            if person and CryptographyManager().from_hash_code_to_string(person.password) == password:
                token_gen = create_token(
                    person.id, person.email, person.nickname)

                token = token_gen.decode(
                    'utf-8') if isinstance(token_gen, bytes) else token_gen

                response = {
                    'status': 200,
                    'message': 'Login successful',
                    'person': person.to_dict(),
                    'token': token
                }
                return jsonify(response)
            else:
                response = {
                    'status': 404,
                    'message': 'Person not found'
                }
                return jsonify(response)

        except Exception as e:
            response = {
                'status': 500,
                'message': str(e)
            }
            return jsonify(response)

    @staticmethod
    def get_user(current_user, user_id):
        try:
            person = Person.query.get(user_id)

            if person:
                response = {
                    'status': 200,
                    'person': person.to_dict(),
                }
                return jsonify(response)

            else:
                response = {
                    'status': 404,
                    'message': 'User not found!'
                }
                return jsonify(response)
        except Exception as e:

            response = {
                'error': 500,
                'message': str(e)
            }

            return jsonify(response)
