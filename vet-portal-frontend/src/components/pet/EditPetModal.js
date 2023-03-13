import { useState } from "react";
import DeletePet from "./DeletePet";


function EditPetModal({pet}){
    const {name, image, species, breed, age} = pet;
    const [showModal, setShowModal] = useState(false);
    const [petForm ,setPetForm] = useState({
        name: name,
        image: image,
        species: species,
        breed: breed,
        age: age
    })

    function handleSubmit(event){
        event.preventDefault();
        // console.log(petForm)

        fetch(`http://localhost:8000/api/pets/${pet.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                name: petForm.name,
                image: petForm.image,
                species: petForm.species,
                breed: petForm.breed,
                age: petForm.age
            })
        })
        .then(res => res.json())
        .then(pet => {
            // console.log(pet)
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
            <button className="edit card-button" onClick={() => setShowModal(true)}>Edit</button>
            <div className={showModal ? 'modal show' : 'modal'}>
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <h3 className="modal-title">Edit Pet</h3>
                    {/* <form>
                        <label>Name: </label>
                        <input onChange={handleChange} type='string' name='name' value={petForm.name}/>
                        <label>Image:</label>
                        <input onChange={handleChange} type="string" name="image"/>
                        <label>Species: </label>
                            <div className="full-col">
                                <select onChange={handleChange} value={petForm.species} name='species'>
                                    <option value='' disabled>Choose Pet Species</option>
                                    <option value='dog'>Dog</option>
                                    <option value='cat'>Cat</option>
                                    <option value='bird'>Bird</option>
                                    <option value='reptile'>Reptile</option>
                                    <option value='rabit'>Rabit</option>
                                    <option value='other'>Other</option>
                                </select>
                            </div>
                        <label>Breed: </label>
                        <input onChange={handleChange} type='string' name="breed" value={petForm.breed}/>
                        <label>Age: </label>
                        <input onChange={handleChange} type='integer' name="age" value={petForm.age}/> */}
                        {/* if input value is null set '' */}
                    {/* </form> */}



                    
                    <form>
                        <div className="row-container">
                            <div className="row left">
                                <div className="col">
                                    <label>Pet Name:</label>
                                </div>
                                <div className="col">
                                    <input onChange={handleChange} type="string" name="name" value={petForm.name}/>
                                </div>
                            </div>
                            <div className="row right">
                                <div className="col">
                                    <label>Image:</label>
                                </div>
                                <div className="col">
                                    <input onChange={handleChange} type="string" name="image" value={petForm.image}/>
                                </div>
                            </div>
                        </div>
                        <div className="full-row">
                            <div className="col">
                                <label>Species:</label>
                            </div>
                            <div className="full-col">
                                <select onChange={handleChange} value={petForm.species} name='species'>
                                    <option value='' disabled>Choose Pet Species</option>
                                    <option value='dog'>Dog</option>
                                    <option value='cat'>Cat</option>
                                    <option value='bird'>Bird</option>
                                    <option value='reptile'>Reptile</option>
                                    <option value='rabit'>Rabit</option>
                                    <option value='other'>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="row-container">
                            <div className="row left">
                                <div className="col">
                                    <label>Breed:</label>
                                </div>
                                <div className="col">
                                    <input onChange={handleChange} type="string" name="breed" value={petForm.breed}/>
                                </div>
                            </div>
                            <div className="row right">
                                <div className="col">
                        <           label>Age:</label>
                                </div>
                                <div className="col">
                        <           input onChange={handleChange} type="integer" name="age" value={petForm.age}/>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="button-container">
                        <button className="card-button" onClick={handleSubmit}>Save</button>
                        <DeletePet id={pet.id} setShowModal={setShowModal} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPetModal;