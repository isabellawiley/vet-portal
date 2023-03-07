from flask import abort, make_response
from config import db
from models import Appointment, Pet, Vet, appointment_schema, appointments_schema

def read_all():
    appointments = Appointment.query.all()
    return appointments_schema.dump(appointments)

def read_one(appointment_id):
    appointment = Appointment.query.get(appointment_id)

    if appointment is not None:
        return appointment_schema.dump(appointment)
    else:
        abort(404, f"Appointment with ID {appointment_id} not found")

def update(appointment_id, appointment):
    existing_appointment = Appointment.query.get(appointment_id)
    print(appointment, appointment_id)

    if existing_appointment:
        update_appointment = appointment_schema.load(appointment, session=db.session)
        existing_appointment.date = update_appointment.date
        existing_appointment.pet_id = update_appointment.pet_id
        existing_appointment.vet_id = update_appointment.vet_id
        existing_appointment.reason = update_appointment.reason
        db.session.merge(existing_appointment)
        db.session.commit()
        print(appointment_schema.dump(existing_appointment))
        return appointment_schema.dump(existing_appointment), 201
    else:
        abort(404, f"Appointment with ID {appointment_id} not found")

def delete(appointment_id):
    existing_appointment = Appointment.query.get(appointment_id)

    if existing_appointment:
        db.session.delete(existing_appointment)
        db.session.commit()
        return make_response(f"{appointment_id} successfully deleted", 204)
    else:
        abort(404, f"Appointment with ID {appointment_id} not found")

def create(appointment):
    vet_id = appointment.get("vet_id")
    vet = Vet.query.get(vet_id)
    pet_id = appointment.get("pet_id")
    pet = Pet.query.get(pet_id)

    if vet and pet:
        new_appointment = appointment_schema.load(appointment, session=db.session)
        vet.appointments.append(new_appointment)
        pet.appointments.append(new_appointment)
        db.session.commit()
        return appointment_schema.dump(new_appointment), 201
    else:
        abort(404, f"Vet with ID {vet_id} and/or pet with ID {pet_id} not found")