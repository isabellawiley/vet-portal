from config import db, ma
from marshmallow_sqlalchemy import fields
from sqlalchemy.orm import backref

class Appointment(db.Model):
    __tablename__ = "appointment"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    pet_id = db.Column(db.Integer, db.ForeignKey("pet.id"))
    vet_id = db.Column(db.Integer, db.ForeignKey("vet.id"))
    reason = db.Column(db.String)

class AppointmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model=Appointment
        load_instance=True
        sqla_session=db.session
        include_fk = True

class Pet(db.Model):
    __tablename__ = "pet"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("owner.id"))
    name = db.Column(db.String)
    species = db.Column(db.String)
    breed = db.Column(db.String)
    image = db.Column(db.String)
    age = db.Column(db.Integer)
    appointments = db.relationship(
        Appointment,
        backref=backref("pet", lazy="joined"),
        cascade="all, delete, delete-orphan",
        single_parent=True,
        order_by="desc(Appointment.date)"
    )

class PetSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Pet
        load_instance = True
        sqla_session = db.session
        include_fk = True

    appointments = fields.Nested(AppointmentSchema, many=True)

class Owner(db.Model):
    __tablename__ = "owner"
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(32))
    lname = db.Column(db.String(32))
    email = db.Column(db.String(32), nullable=False)
    password = db.Column(db.String(32), nullable=False)
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

class Vet(db.Model):
    __tablename__ = "vet"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), unique=True)
    image = db.Column(db.String)
    bio = db.Column(db.String)
    appointments = db.relationship(
        Appointment,
        backref="vet",
        cascade="all, delete, delete-orphan",
        single_parent=True,
        order_by="desc(Appointment.date)"
    )

class VetSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model=Vet
        load_instance=True
        sqla_session = db.session

    appointments = fields.Nested(AppointmentSchema, many=True)

pet_schema = PetSchema()
pets_schema = PetSchema(many=True)
owner_schema = OwnerSchema()
owners_schema = OwnerSchema(many=True)
vet_schema = VetSchema()
vets_schema = VetSchema(many=True)
appointment_schema = AppointmentSchema()
appointments_schema = AppointmentSchema(many=True)