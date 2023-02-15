from config import app, db
from models import Owner, Pet, Vet, Appointment
from sqlalchemy.exc import OperationalError
from datetime import datetime

OWNERS_PETS = [
    {
        "fname": "Isabella",
        "lname": "Wiley",
        "email": "iw@gmail.com",
        "pets": [
            {
                "name": "Thor",
                "species": "cat",
                "breed": "flamepoint siamese",
                "appointments": [
                    {
                        "date": "2022-01-07 08:00:00",
                        "vet": {
                            "name": "Dr. Rodriguez"
                        }
                    },
                ]
            },
            {
                "name": "Tom",
                "species": "cat",
                "breed": "black",
                "appointments": [
                    {
                        "date": "2022-02-08 12:00:00",
                        "vet": {
                            "name": "Dr. Bob"
                        }
                    }
                ]
            }
        ]
    },
    {
        "fname": "Aidan",
        "lname": "Mcbride",
        "email": "am@gmail.com",
        "pets": [
            {
                "name": "Guiness",
                "species": "cat",
                "breed": "siamese",
                "appointments": []
            },
            {
                "name": "Rosie",
                "species": "cat",
                "breed": "siamese",
                "appointments": [
                    {
                        "date": "2022-01-07 08:00:00",
                        "vet": {
                            "name": "Dr. Susan"
                        }
                    }
                ]
            },
            {
                "name": "Otis",
                "species": "cat",
                "breed": "black",
                "appointments": []
            }
        ]
    },
    {
        "fname": "Kristin",
        "lname": "McAtee",
        "email": "km@gmail.com",
        "pets": [
            {
                "name": "Mikey",
                "species": "dog",
                "breed": "good",
                "appointments": []
            },
            {
                "name": "Sam",
                "species": "dog",
                "breed": "golden retriever",
                "appointments": []
            }
        ]
    },
]

def get_data_from_table(model):
    try:
        data = db.session.query(model).all()
        db.session.close()
        return data
    except OperationalError:
        return []

def create_database(db):
    db.create_all()
    for data in OWNERS_PETS:
        new_owner = Owner(fname=data.get("fname"), lname=data.get("lname"), email=data.get("email"))
        for pet in data.get("pets", []):
            new_pet = Pet(
                    name=pet["name"],
                    species=pet["species"],
                    breed=pet["breed"]
                )
            for appointment in pet["appointments"]:
                new_pet.appointments.append(
                    Appointment(
                        date=datetime.strptime(appointment["date"], "%Y-%m-%d %H:%M:%S"),
                        vet = Vet(
                            name=appointment["vet"]["name"]
                        )
                    )
                )
            new_owner.pets.append(new_pet)
        db.session.add(new_owner)
    db.session.commit()
    print("Created new database")

def update_database(db, existing_owners, existing_pets, existing_vets, existing_appointments):
    db.drop_all()
    db.create_all()
    for owner in existing_owners:
        db.session.merge(owner)
    for pet in existing_pets:
        db.session.merge(pet)
    for vet in existing_vets:
        db.session.merge(vet)
    for appointment in existing_appointments:
        db.session.merge(appointment)
    db.session.commit()
    print("Updated existing database")


with app.app_context():
    existing_owners = get_data_from_table(Owner)
    existing_pets = get_data_from_table(Pet)
    existing_vets = get_data_from_table(Vet)
    existing_appointments = get_data_from_table(Appointment)

    # create_database(db)

    if not existing_owners:
        create_database(db)
    else:
        update_database(db, existing_owners, existing_pets, existing_vets, existing_appointments)
    