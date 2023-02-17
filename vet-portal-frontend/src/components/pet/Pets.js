import PetCard from "./PetCard";

function Pets({pets}) {

    return(
        <div>
            <h1>My Pets</h1>
            {pets.map((pet) => {
                return(<PetCard pet={pet} />)
            })}
        </div>
    )
}

export default Pets;