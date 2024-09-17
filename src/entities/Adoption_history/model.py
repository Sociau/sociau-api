from database.db import db
from src.entities.Person.model import Person
from src.entities.Pet.model import Pet


class Adoption_history(db.Model):
    __tablename__ = 'adoption_history'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    person = db.relationship('Person', backref='adoption_histories')
    pet_id = db.Column(db.Integer, db.ForeignKey('pet.id'))
    pet = db.relationship('Pet', backref='adoption_histories')
