from database.db import db
from src.Person.model import Person


class Donation_history(db.Model):
    __tablename__ = 'donation_history'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    person = db.relationship('Person', backref='donation_histories')
    amount = db.Column(db.Float, nullable=False)
