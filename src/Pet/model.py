from database import db
from sqlalchemy import text

class Pet(db.Model):
    __Tablename__ = 'Pet'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    species = db.Column('species', db.String, not_null=True)
    race = db.Column('race', db.String, not_null=True)
    name = db.Column('name', db.String, not_null=True)
    adopted = db.Column('adopted', db.Boolean, not_null=True)
    vaccinated = db.Column('vaccinated', db.String, not_null=True) # pode estar errado
    castrated = db.Column('castrated', db.Boolean, not_null=True)
    size_in_cm = db.Column('size_in_cm', db.Float, not_null=True)
    sex = db.Column('sex', db.String, not_null=True)
    address_id = db.Column('address_id', db.Integer, db.Foreign_key('address_id'))
    availability = db.Column('availability', db.Boolean, not_null=True)
    special_needs = db.Column('special_needs', db.Boolean, not_null=True)
    which_special_needs = db.Column('which_special_needs', db.String)
    adoption_history_id = db.Column('adoption_history_id', db.Integer, db.ForeignKey('adoption_history_id'))