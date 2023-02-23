import PetCard from "./PetCard";

function Pets({pets}) {
    console.log(pets)
    return(
        <div>
            <h1>My Pets</h1>
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