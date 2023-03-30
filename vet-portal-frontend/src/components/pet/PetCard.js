import '../../styling/pets.css'
import EditPetModal from './EditPetModal';

function PetCard({pet, pets, setPets}) {
    const {name, species, breed, age, image} = pet;

    return(
        <div className="pet-card">
            <div className='meta'>
                {image ? 
                <div className='pet-photo' style={{backgroundImage: `url(${image})`}} ></div>
                :
                <div className='pet-photo' style={{backgroundImage: 'url(https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)'}}></div>
                }
            </div>
            <div className='pet-details'>
                <h1>{name}</h1>
                <p><strong>Species: </strong>{species}</p>
                <p><strong>Breed: </strong>{breed}</p>
                <p><strong>Age: </strong>{age}</p>
                <EditPetModal pet={pet} pets={pets} setPets={setPets}/>
            </div>
        </div>
    )
}

export default PetCard;