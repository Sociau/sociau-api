from flask import Flask, jsonify, request
from src.entities.Address.model import Address
from database.db import db


class AddressController:
    @staticmethod
    def add():
        try:
            data = request.get_json()
            state = data.get('state')
            city = data.get('city')
            street = data.get('street')
            neighborhood = data.get('neighborhood')
            address = Address(state, city, street, neighborhood)

            db.session.add(address)
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
