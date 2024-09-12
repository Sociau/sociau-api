from database import db
from sqlalchemy import text

class Person(db.Model):
    __tablename__ = "Person"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column('name', db.String, not_null=True)
    whatsapp = db.Column('whatsapp', db.String, not_null=True)
    email = db.Column('email', db.String, not_null=True)
    password = db.Column('password', db.String, not_null=True)
    nickname = db.Column('nickname', db.String, not_null=True)
    address_id = db.Column('address_id', db.Integer, db.ForeignKey('address_id'))