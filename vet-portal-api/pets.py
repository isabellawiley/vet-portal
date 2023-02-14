from flask import abort, make_response
from config import db
from models import Pet, Owner, pet_schema, pets_schema

def read_all():
    pets = Pet.query.all()
    return pets_schema.dump(pets)

def read_one(pet_id):
    pet = Pet.query.get(pet_id)

    if pet is not None:
        return pet_schema.dump(pet)
    else:
        abort(404, f"Pet with ID {pet_id} not found")

def update(pet_id, pet):
    existing_pet = Pet.query.get(pet_id)

    if existing_pet:
        update_pet = pet_schema.load(pet, session=db.session)
        existing_pet.name = update_pet.name
        existing_pet.animal_type = update_pet.animal_type
        existing_pet.breed = update_pet.breed
        db.session.merge(existing_pet)
        db.session.commit()
        return pet_schema.dump(existing_pet), 201
    else:
        abort(404, f"Pet with ID {pet_id} not found")

def delete(pet_id):
    existing_pet = Pet.query.get(pet_id)

    if existing_pet:
        db.session.delete(existing_pet)
        db.session.commit()
        return make_response(f"{pet_id} successfully deleted", 204)
    else:
        abort(404, f"Pet with ID {pet_id} not found")

def create(pet):
    owner_id = pet.get("owner_id")
    owner = Owner.query.get(owner_id)

    if owner:
        new_pet = pet_schema.load(pet, session=db.session)
        owner.pets.append(new_pet)
        db.session.commit()
        return pet_schema.dump(new_pet), 201
    else:
        abort(404, f"Owner with ID {owner_id} not found")