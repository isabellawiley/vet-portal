from config import db, ma
from marshmallow_sqlalchemy import fields

class Pet(db.Model):
    __tablename__ = "pet"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("owner.id"))
    name = db.Column(db.String)
    animal_type = db.Column(db.String)
    breed = db.Column(db.String)

class PetSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Pet
        load_instance = True
        sqla_session = db.session
        include_fk = True

class Owner(db.Model):
    __tablename__ = "owner"
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(32))
    lname = db.Column(db.String(32))
    email = db.Column(db.String(32))
    pets = db.relationship(
        Pet,
        backref="owner",
        cascade="all, delete, delete-orphan",
        single_parent=True,
        order_by="desc(Pet.id)"
    )

class OwnerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Owner
        load_instance = True
        sqla_session = db.session

    pets = fields.Nested(PetSchema, many=True)

pet_schema = PetSchema()
pets_schema = PetSchema(many=True)
owner_schema = OwnerSchema()
owners_schema = OwnerSchema(many=True)