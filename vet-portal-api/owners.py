from flask import make_response, abort
from config import db
from models import Owner, owner_schema, owners_schema, pets_schema, appointments_schema

def read_all():
    owners = Owner.query.all()
    return owners_schema.dump(owners)

def create(owner):
    new_owner = owner_schema.load(owner, session=db.session)
    db.session.add(new_owner)
    db.session.commit()

    return owner_schema.dump(new_owner), 201

def read_one(owner_id):
    owner = Owner.query.get(owner_id)

    if owner is not None:
        return owner_schema.dump(owner)
    else:
        abort(404, f"Owner with ID {owner_id} not found")

def update(owner_id, owner):
    existing_owner = Owner.query.get(owner_id)

    if existing_owner:
        update_owner = owner_schema.load(owner, session=db.session)
        existing_owner.fname = update_owner.fname
        existing_owner.lname = update_owner.lname
        existing_owner.email = update_owner.email
        db.session.merge(existing_owner)
        db.session.commit()
        return owner_schema.dump(existing_owner), 201
    else:
        abort(404, f"Owner with ID {owner_id} not found")

def delete(owner_id):
    existing_owner = Owner.query.get(owner_id)

    if existing_owner:
        db.session.delete(existing_owner)
        db.session.commit()
        return make_response(f"{owner_id} successfully deleted", 200)

    else:
        abort(404, f"Owner with ID {owner_id} not found")

def read_pets(owner_id):
    owner = Owner.query.get(owner_id)
    owner_obj = owner_schema.dump(owner)
    return owner_obj["pets"]

def read_appointments(owner_id):
    owner = Owner.query.get(owner_id)
    owner_obj = owner_schema.dump(owner)
    pets = owner_obj["pets"]
    appointments = []
    for pet in pets:
        for appt in pet["appointments"]:
            appointments.append(appt)

    return appointments