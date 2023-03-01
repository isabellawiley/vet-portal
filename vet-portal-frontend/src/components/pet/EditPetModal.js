import { useState } from "react";
import DeletePet from "./DeletePet";


function EditPetModal({pet}){
    const {name, species, breed, age} = pet;
    const [showModal, setShowModal] = useState(false);
    const [petForm ,setPetForm] = useState({
        name: name,
        species: species,
        breed: breed,
        age: age
    })

    function handleSubmit(event){
        event.preventDefault();
        console.log(petForm)

        fetch(`http://localhost:8000/api/pets/${pet.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                name: petForm.name,
                species: petForm.species,
                breed: petForm.breed,
                age: petForm.age
            })
        })
        .then(res => res.json())
        .then(pet => {
            console.log(pet)
            setShowModal(false)
        })
    }

    function handleChange(event){
        const {value, name} = event.target;
        if(name == "age"){
            setPetForm(prev => ({
                ...prev, [name]: parseInt(value)
            }))
        }
        else{
            setPetForm(prev => ({
                ...prev, [name]: value
            }))
        }        
    }

    return(
        <div>
            <button className="card-button" onClick={() => setShowModal(true)}>Edit</button>
            <div className={showModal ? 'modal show' : 'modal'}>
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <h1>Edit Pet</h1>
                    <form>
                        <label>Name: </label>
                        <input onChange={handleChange} type='string' name='name' value={petForm.name}/>
                        <label>Species: </label>
                        <input onChange={handleChange} type='string' name='species' value={petForm.species}/>
                        <label>Breed: </label>
                        <input onChange={handleChange} type='string' name="breed" value={petForm.breed}/>
                        <label>Age: </label>
                        <input onChange={handleChange} type='integer' name="age" value={petForm.age}/>
                        {/* if input value is null set '' */}
                    </form>
                    <div className="button-container">
                        <button className="edit card-button" onClick={handleSubmit}>Save</button>
                        <DeletePet id={pet.id} setShowModal={setShowModal} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPetModal;