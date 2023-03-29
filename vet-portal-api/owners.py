from flask import make_response, abort, jsonify
from config import db
from models import Owner, owner_schema, owners_schema

def read_all():
    owners = Owner.query.all()
    return owners_schema.dump(owners)

def create(owner):
    fname = owner['fname']
    lname = owner['lname']
    email = owner['email']
    password = owner['password']

    if email is None or password is None or fname is None or lname is None:
        abort(400)
    if Owner.query.filter_by(email = email).first() is not None:
        abort(400)

    new_owner = Owner(email=email, fname=fname, lname=lname)
    new_owner.hash_password(password)
    db.session.add(new_owner)
    db.session.commit()
    return jsonify({'email': new_owner.email, 'fname': new_owner.fname, 'lname': new_owner.lname}), 201

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
        existing_owner.password = update_owner.password
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

def login(email, password):
    owner = Owner.query.get("email", email)
    owner_obj = owner_schema.dump(owner)
    if password == owner_obj["password"]:
        return owner_obj
    