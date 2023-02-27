import { useState } from "react";

function NewPetModal({owner_id}){
    const [showModal, setShowModal] = useState(false);
    const [petForm, setPetForm] = useState({
        name: "",
        image: "",
        species: "",
        breed: ""
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
                species: petForm.species
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
            breed: ""
        })

        setShowModal(false)
    }

    function handleChange(event){
        const {value, name} = event.target;
        setPetForm(prev => ({
            ...prev, [name]: value
        }));
    }

    return(
        <div>
            <button onClick={() => setShowModal(true)}>Create New Pet</button>
            <div className={showModal ? "modal show" : "modal"}>
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <h3>New Pet</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Pet Name:</label>
                        <input onChange={handleChange} type="string" name="name"/>
                        <label>Image:</label>
                        <input onChange={handleChange} type="string" name="image"/>
                        <label>Species:</label>
                        <input onChange={handleChange} type="string" name="species"/>
                        <label>Breed:</label>
                        <input onChange={handleChange} type="string" name="breed"/>
                        <input type="submit" value="submit"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewPetModal;