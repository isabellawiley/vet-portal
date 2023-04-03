import { useState } from "react";

function NewPetModal({owner_id, pets, setPets}){
    const [showModal, setShowModal] = useState(false);
    const [petImage, setPetImage] = useState('https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
    const [petForm, setPetForm] = useState({
        name: "",
        image: "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        species: "",
        breed: "",
        age: 0
    })

    const uploadImage = async e => {
        const data = new FormData();
        data.append('file', petForm.image);
        data.append('upload_preset' , 'vet-portal');

        const res = await fetch("https://api.cloudinary.com/v1_1/ddr8azah3/image/upload", {
            method: "POST",
            body: data
        })

        const file = await res.json();
        let imgUrl = file.secure_url;
        handleSubmit(e, imgUrl);
    }

    function handleSubmit(event, imgUrl){
        event.preventDefault();

        fetch('https://pet-portal-api.herokuapp.com/api/pets', {
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
                age: petForm.age,
                image: imgUrl
            })
        })
        .then(res => res.json())
        .then(newPet => {
            setPets([newPet, ...pets]);
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
        if(name === "age"){
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

    function handleImageChange(event){
        const {files, name} = event.target;
        setPetForm(prev => ({
            ...prev, [name]: files[0]
        }))
        setPetImage(URL.createObjectURL(event.target.files[0]));
    }

    return(
        <div>
            <button className="new card-button" onClick={() => setShowModal(true)}>Create New Pet</button>
            <div className={showModal ? "modal show" : "modal"}>
                <div className="modal-content-container">
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
                                    <input onChange={handleImageChange} type="file" name="image"/>
                                    <img id='uploadedImage' src={petImage}/>
                                </div>
                            </div>
                        </div>
                        <div className="row-container">
                            <div className="row left">
                            <div className="col">
                                <label>Species:</label>
                            </div>
                            <div className="col">
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
                            <div className="row right">
                                <div className="col">
                                    <label>Breed:</label>
                                </div>
                                <div className="col">
                                    <input onChange={handleChange} type="string" name="breed"/>
                                </div>
                            </div>
                        </div>
                        <div className="row-container">
                            <div className="row left">
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
                        <button className="card-button" onClick={uploadImage}>Save</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPetModal;