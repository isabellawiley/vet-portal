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
                "image": "https://welovecatsandkittens.com/wp-content/uploads/2022/05/Flame-point-siamese.jpg",
                "age": 3,
                "appointments": [
                    {
                        "date_time_start": "2022-01-07 08:00:00",
                        "date_time_end": "2022-01-07 09:00:00",
                        "time": 60,
                        "vet": {
                            "name": "Dr. Rodriguez",
                            "image": "https://www.seekpng.com/png/detail/266-2666925_free-stock-medical-doctor-clipart-doctor-cartoon-girl.png",
                            "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        },
                        "reason": "Annual Physical Exam"
                    },
                ]
            },
            {
                "name": "Tom",
                "species": "cat",
                "breed": "black",
                "image": "https://images.unsplash.com/photo-1592729099357-25681e7f9395?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
                "age": 3,
                "appointments": [
                    {
                        "date_time_start": "2022-02-08 12:00:00",
                        "date_time_end": "2022-02-08 14:00:00",
                        "time": 120,
                        "vet": {
                            "name": "Dr. Bob",
                            "image": "https://static.vecteezy.com/system/resources/previews/005/520/145/original/cartoon-drawing-of-a-doctor-vector.jpg",
                            "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        },
                        "reason": "Dental Cleaning"
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
                "image": "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
                "age": 14,
                "appointments": []
            },
            {
                "name": "Rosie",
                "species": "cat",
                "breed": "siamese",
                "image": "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                "age": 14,
                "appointments": [
                    {
                        "date_time_start": "2022-01-07 08:00:00",
                        "date_time_end": "2022-01-07 08:30:00",
                        "time": 30,
                        "vet": {
                            "name": "Dr. Susan",
                            "image": "https://img.freepik.com/premium-vector/female-doctor-cartoon-character-white-background_1639-28810.jpg?w=2000",
                            "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        },
                        "reason": "Nail Trim"
                    }
                ]
            },
            {
                "name": "Otis",
                "species": "cat",
                "breed": "black",
                "image": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1743&q=80",
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
                "image": "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
                "age": 5,
                "appointments": []
            },
            {
                "name": "Sam",
                "species": "dog",
                "breed": "golden retriever",
                "image": "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
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
        new_owner = Owner(fname=data.get("fname"), lname=data.get("lname"), email=data.get("email"))
        new_owner.hash_password(data.get("password"))
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
                        date_time_start=datetime.strptime(appointment["date_time_start"], "%Y-%m-%d %H:%M:%S"),
                        date_time_end=datetime.strptime(appointment["date_time_end"], "%Y-%m-%d %H:%M:%S"),
                        time = appointment["time"],
                        reason = appointment["reason"],
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
    