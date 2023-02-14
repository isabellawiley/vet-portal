from config import app, db
from models import Owner, Pet
from sqlalchemy.exc import OperationalError

OWNERS_PETS = [
    {
        "fname": "Isabella",
        "lname": "Wiley",
        "email": "iw@gmail.com",
        "pets": [
            {
                "name": "Thor",
                "animal_type": "cat",
                "breed": "flamepoint siamese"
            },
            {
                "name": "Tom",
                "animal_type": "cat",
                "breed": "black"
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
                "animal_type": "cat",
                "breed": "siamese"
            },
            {
                "name": "Rosie",
                "animal_type": "cat",
                "breed": "siamese"
            },
            {
                "name": "Otis",
                "animal_type": "cat",
                "breed": "black"
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
                "animal_type": "dog",
                "breed": "good"
            },
            {
                "name": "Sam",
                "animal_type": "dog",
                "breed": "golden retriever"
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
            new_owner.pets.append(
                Pet(
                    name=pet["name"],
                    animal_type=pet["animal_type"],
                    breed=pet["breed"]
                )
            )
        db.session.add(new_owner)
    db.session.commit()
    print("Created new database")

def update_database(db, existing_owners, existing_pets):
    db.drop_all()
    db.create_all()
    for owner in existing_owners:
        db.session.merge(owner)
    for pet in existing_pets:
        db.session.merge(pet)
    db.session.commit()
    print("Updated existing database")


with app.app_context():
    existing_owners = get_data_from_table(Owner)
    existing_pets = get_data_from_table(Pet)

    # create_database(db)

    if not existing_owners:
        create_database(db)
    else:
        update_database(db, existing_owners, existing_pets)
    