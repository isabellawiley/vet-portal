import NewPetModal from "./NewPetModal";
import PetCard from "./PetCard";

function Pets({pets, owner, setPets}) {
    let {id} = owner;
    
    return(
        <div className="page-container">
            <h1 className="center">My Pets</h1>
            <NewPetModal owner_id={id} pets={pets} setPets={setPets}/>
            {pets ? 
            <div id='pets'>{pets.map((pet) => {
                return(<li key={pet.id}><PetCard pet={pet} pets={pets} setPets={setPets}/></li>);
            })}</div>
            :
            <div></div>}
        </div>
    )
}

export default Pets;