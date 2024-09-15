from database.db import db
from src.Address.model import Address


class Pet(db.Model):
    __tablename__ = 'pet'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    species = db.Column(db.String(20), nullable=False)
    breed = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    adopted = db.Column(db.Boolean, nullable=False)
    vaccinated = db.Column(db.Boolean, nullable=False)
    castrated = db.Column(db.Boolean, nullable=False)
    size = db.Column(db.Float, nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey('address.id'))
    availability = db.Column(db.Boolean, nullable=False)
    special_needs = db.Column(db.Boolean, nullable=False)
    which_special_needs = db.Column(db.String(255))
    address = db.relationship('Address', backref='pets')
