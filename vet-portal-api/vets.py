from flask import abort, make_response
from config import db
from models import Vet, vet_schema, vets_schema

def read_all():
    vets = Vet.query.all()
    return vets_schema.dump(vets)

def read_one(vet_id):
    vet = Vet.query.get(vet_id)

    if vet is not None:
        return vet_schema.dump(vet)
    else:
        abort(404, f"Vet with ID {vet_id} not found")

def update(vet_id, vet):
    existing_vet = Vet.query.get(vet_id)

    if existing_vet:
        update_vet = vet_schema.load(vet, session=db.session)
        existing_vet.name = update_vet.name
        db.session.merge(existing_vet)
        db.session.commit()
        return vet_schema.dump(existing_vet)
    else:
        abort(404, f"Vet with ID {vet_id} not found")

def delete(vet_id):
    existing_vet = Vet.query.get(vet_id)

    if existing_vet:
        db.session.delete(existing_vet)
        db.session.commit()
        return make_response(f"{vet_id} successfully deleted", 204)
    else:
        abort(404, f"Vet with ID {vet_id} not found")

def create(vet):
    new_vet = vet_schema.load(vet, session=db.session)
    db.session.add(new_vet)
    db.session.commit()

    return vet_schema.dump(new_vet), 201