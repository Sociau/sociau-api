from database.db import db


class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    state = db.Column(db.String(2), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    neighborhood = db.Column(db.String(100), nullable=False)
    street = db.Column(db.String(100), nullable=False)
    text = db.Column(db.String(500), nullable=False)
    main_photo = db.Column(db.String(500))
    lost_animal = db.Column(db.Boolean, nullable=False)
    veterinary_event = db.Column(db.Boolean, nullable=False)
    parterns_campaign = db.Column(db.Boolean, nullable=False)
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'))
    person = db.relationship('Person', backref='post')

    def to_dict(self):
        return {
            'id': self.id,
            "state": self.state,
            "city": self.city,
            "neighborhood": self.neighborhood,
            "street": self.street,
            "text": self.text,
            'main_photo': self.main_photo,
            "lost_animal": self.lost_animal,
            "veterinary_event": self.veterinary_event,
            "parterns_campaign": self.parterns_campaign,
            "person_id": self.person_id,
        }
