from database.db import db


class Address(db.Model):
    __tablename__ = 'address'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    state = db.Column(db.String(2), nullable=False)
    city = db.Column(db.String(150), nullable=False)
    street = db.Column(db.String(150), nullable=False)
    neighborhood = db.Column(db.String(150), nullable=False)

    def __init__(self, state, city, street, neighborhood):
        self.state = state
        self.city = city
        self.street = street
        self.neighborhood = neighborhood
