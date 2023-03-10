import { useState } from "react";

function NewPetModal({owner_id}){
    const [showModal, setShowModal] = useState(false);
    const [petForm, setPetForm] = useState({
        name: "",
        image: "",
        species: "",
        breed: "",
        age: 0
    })

    function handleSubmit(event){
        event.preventDefault();

        fetch('http://localhost:8000/api/pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                breed: petForm.breed,
                name: petForm.name,
                owner_id: owner_id,
                species: petForm.species,
                age: petForm.age
            })
        })
        .then(res => res.json())
        .then(newPet => {
            console.log(newPet);
        })

        setPetForm({
            name: "",
            image: "",
            species: "",
            breed: "",
            age: 0
        })

        setShowModal(false)
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
            <button className="new card-button" onClick={() => setShowModal(true)}>Create New Pet</button>
            <div className={showModal ? "modal show" : "modal"}>
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <h3 className="modal-title">New Pet</h3>
                    <form>
                        <div className="row-container">
                            <div className="row left">
                                <div className="col">
                                    <label>Pet Name:</label>
                                </div>
                                <div className="col">
                                    <input onChange={handleChange} type="string" name="name"/>
                                </div>
                            </div>
                            <div className="row right">
                                <div className="col">
                                    <label>Image:</label>
                                </div>
                                <div className="col">
                                    <input onChange={handleChange} type="string" name="image"/>
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
                                    <input onChange={handleChange} type="string" name="breed"/>
                                </div>
                            </div>
                            <div className="row right">
                                <div className="col">
                        <           label>Age:</label>
                                </div>
                                <div className="col">
                        <           input onChange={handleChange} type="integer" name="age"/>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="button-container">
                        <button className="card-button" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPetModal;