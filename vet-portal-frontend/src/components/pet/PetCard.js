
function PetCard({pet}) {
    const {name, species, breed, age} = pet;

    return(
        <div>
            <h1>{name}</h1>
            <p>{species}</p>
            <p>{breed}</p>
            <p>{age}</p>
        </div>
    )
}

export default PetCard;