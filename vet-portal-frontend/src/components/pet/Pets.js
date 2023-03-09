import NewPetModal from "./NewPetModal";
import PetCard from "./PetCard";

function Pets({pets, owner_id}) {
    console.log(pets)
    return(
        <div className="page-container">
            <h1 className="center">My Pets</h1>
            <NewPetModal owner_id={owner_id}/>
            {pets ? 
            <div id='pets' className="content-container">{pets.map((pet) => {
                return(<li key={pet.id}><PetCard pet={pet}/></li>);
            })}</div>
            :
            <div></div>}
        </div>
    )
}

export default Pets;