from database import db
from sqlalchemy import text

class Adoption_History(db.Model):
    __tablename__ = 'Adoption_History'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    person_id = db.Column('person_id', db.Integer, db.foreign_key('person.id'))
    pet_id = db.Column('pet_id', db.Integer, db.foreign_key('pet.id'))
