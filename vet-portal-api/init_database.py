from config import app, db
from models import Owner, Pet, Vet, Appointment
from sqlalchemy.exc import OperationalError
from datetime import datetime

OWNERS_PETS = [
    {
        "fname": "Isabella",
        "lname": "Wiley",
        "email": "iw@gmail.com",
        "password": "pass123",
        "pets": [
            {
                "name": "Thor",
                "species": "cat",
                "breed": "flamepoint siamese",
                "image": "",
                "age": 3,
                "appointments": [
                    {
                        "date": "2022-01-07 08:00:00",
                        "vet": {
                            "name": "Dr. Rodriguez",
                            "image": "",
                            "bio": "i am a vet"
                        }
                    },
                ]
            },
            {
                "name": "Tom",
                "species": "cat",
                "breed": "black",
                "image": "",
                "age": 3,
                "appointments": [
                    {
                        "date": "2022-02-08 12:00:00",
                        "vet": {
                            "name": "Dr. Bob",
                            "image": "",
                            "bio": "i am a vet too"
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
        "password": "pass123",
        "pets": [
            {
                "name": "Guiness",
                "species": "cat",
                "breed": "siamese",
                "image": "",
                "age": 14,
                "appointments": []
            },
            {
                "name": "Rosie",
                "species": "cat",
                "breed": "siamese",
                "image": "",
                "age": 14,
                "appointments": [
                    {
                        "date": "2022-01-07 08:00:00",
                        "vet": {
                            "name": "Dr. Susan",
                            "image": "",
                            "bio": "i am a vet as well"
                        }
                    }
                ]
            },
            {
                "name": "Otis",
                "species": "cat",
                "breed": "black",
                "image": "",
                "age": 1,
                "appointments": []
            }
        ]
    },
    {
        "fname": "Kristin",
        "lname": "McAtee",
        "email": "km@gmail.com",
        "password": "pass123",
        "pets": [
            {
                "name": "Mikey",
                "species": "dog",
                "breed": "good",
                "image": "",
                "age": 5,
                "appointments": []
            },
            {
                "name": "Sam",
                "species": "dog",
                "breed": "golden retriever",
                "image": "",
                "age": 13,
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
        new_owner = Owner(fname=data.get("fname"), lname=data.get("lname"), email=data.get("email"), password=data.get("password"))
        for pet in data.get("pets", []):
            new_pet = Pet(
                    name=pet["name"],
                    species=pet["species"],
                    breed=pet["breed"],
                    image = pet["image"],
                    age = pet["age"]
                )
            for appointment in pet["appointments"]:
                new_pet.appointments.append(
                    Appointment(
                        date=datetime.strptime(appointment["date"], "%Y-%m-%d %H:%M:%S"),
                        vet = Vet(
                            name=appointment["vet"]["name"],
                            image = appointment["vet"]["image"],
                            bio = appointment["vet"]["bio"]
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
    