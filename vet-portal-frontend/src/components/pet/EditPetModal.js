import { useState } from "react";
import DeletePet from "./DeletePet";


function EditPetModal({pet, pets, setPets}){
    const {name, image, species, breed, age} = pet;
    const [showModal, setShowModal] = useState(false);
    const [petImage, setPetImage] = useState(pet.image);
    const [imageChange, setImageChange] = useState(false);
    const [petForm ,setPetForm] = useState({
        name: name,
        image: image,
        species: species,
        breed: breed,
        age: age
    })

    const uploadImage = async e => {
        if(imageChange){
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
        else{
            let imgUrl = petForm.image;
            handleSubmit(e, imgUrl);
        }

    }

    function handleSubmit(event, imgUrl){
        event.preventDefault();

        fetch(`https://pet-portal-api.herokuapp.com/api/pets/${pet.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                name: petForm.name,
                image: imgUrl,
                species: petForm.species,
                breed: petForm.breed,
                age: petForm.age
            })
        })
        .then(res => res.json())
        .then(pet => {
            setShowModal(false)
        })
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
        setImageChange(true);
    }

    return(
        <div>
            <button className="edit card-button" onClick={() => setShowModal(true)}>Edit</button>
            <div className={showModal ? 'modal show' : 'modal'}>
                <div className="modal-content-container">
                    <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                    <br/>
                    <h2 className="modal-title">Edit Pet</h2>
                <div className="modal-content">
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
                                    {/* <input onChange={handleChange} type="string" name="image" value={petForm.image}/> */}
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
                                    <input onChange={handleChange} type="string" name="breed" value={petForm.breed}/>
                                </div>
                            </div>
                        </div>
                        <div className="row-container">
                            <div className="row left">
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
                        <button className="card-button" onClick={uploadImage}>Save</button>
                        <DeletePet id={pet.id} setShowModal={setShowModal} pets={pets} setPets={setPets} />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default EditPetModal;