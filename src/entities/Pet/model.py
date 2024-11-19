from database.db import db


class Pet(db.Model):
    __tablename__ = 'pet'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    species = db.Column(db.String(20), nullable=False)
    breed = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    adopted = db.Column(db.Boolean, nullable=False)
    size = db.Column(db.String(1), nullable=False)
    gender = db.Column(db.String(1), nullable=False)
    main_photo = db.Column(db.String(500))
    city = db.Column(db.String(100))
    state = db.Column(db.String(2))
    veterinary_care = db.Column(db.JSON)
    temperament = db.Column(db.JSON)
    about = db.Column(db.String(500))

    def to_dict(self):
        return {
            'id': self.id,
            'species': self.species,
            'breed': self.breed,
            'name': self.name,
            'adopted': self.adopted,
            'size': self.size,
            'gender': self.gender,
            'main_photo': self.main_photo,
            'city': self.city,
            'state': self.state,
            'veterinary_care': self.veterinary_care,
            'temperament': self.temperament,
            'about': self.about
        }
