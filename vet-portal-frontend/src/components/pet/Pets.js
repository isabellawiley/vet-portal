import NewPetModal from "./NewPetModal";
import PetCard from "./PetCard";

function Pets({pets, owner_id}) {
    console.log(pets)
    return(
        <div>
            <h1>My Pets</h1>
            <NewPetModal owner_id={owner_id}/>
            {pets ? 
            <div>{pets.map((pet) => {
                return(<li key={pet.id}><PetCard pet={pet}/></li>);
            })}</div>
            :
            <div></div>}
            
        </div>
    )
}

export default Pets;