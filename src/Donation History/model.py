from database import db
from sqlalchemy import text

class Donation_history(db.Model):
    __tablename__ = 'donation_history'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    person_id = db.Column('person_id', db.Integer, db.foreign_key('person_id'))
    amount = db.Column('amount', db.Float, not_null=True)