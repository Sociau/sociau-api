from database.db import db
from src.entities.Address.model import Address


class Person(db.Model):
    __tablename__ = "person"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    main_whatsapp = db.Column(db.String(13), nullable=False)
    second_whatsapp = db.Column(db.String(13))
    about_you = db.Column(db.String(500))
    email = db.Column(db.String(150), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    nickname = db.Column(db.String(20), nullable=False)
    address_id = db.Column(db.Integer, db.ForeignKey('address.id'))
    address = db.relationship('Address', backref='persons')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'main_whatsapp': self.main_whatsapp,
            'second_whatsapp': self.second_whatsapp,
            'about_you': self.about_you,
            'email': self.email,
            'nickname': self.nickname,
            'address_id': self.address_id
        }