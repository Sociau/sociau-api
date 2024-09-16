from flask import jsonify, request
from src.Person.model import Person
from src.Address.model import Address
from database.db import db

class PersonController:
    @staticmethod
    def add():
        try:
            data = request.get_json()
            
            name = data.get('name')
            main_whatsapp = data.get('main_whatsapp')
            second_whatsapp = data.get('second_whatsapp')
            about_you = data.get('about_you')
            email = data.get('email')
            password = data.get('password')
            nickname = data.get('nickname')

            address_data = data.get('address')
            if address_data:
                state = address_data.get('state')
                city = address_data.get('city')
                street = address_data.get('street')
                neighborhood = address_data.get('neighborhood')
                number = address_data.get('number')
                
                address = Address(state, city, street, neighborhood, number)
                db.session.add(address)
                db.session.commit()

                address_id = address.id
            else:
                address_id = None

            person = Person(
                name=name,
                main_whatsapp=main_whatsapp,
                second_whatsapp=second_whatsapp,
                about_you=about_you,
                email=email,
                password=password,
                nickname=nickname,
                address_id=address_id
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
