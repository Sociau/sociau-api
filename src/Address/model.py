from database import db
from sqlalchemy import text

class Address(db.Model):
    __tablename__ = 'Address'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    state = db.Column('state',db.String, not_null=True)
    city = db.Column('city', db.String, not_null=True)
    street_name = db.Column('street_name', db.String, not_null=True)
    district = db.Column('district', db.String, not_null=True)
    house_number = db.Column('house_number', db.Integer)

