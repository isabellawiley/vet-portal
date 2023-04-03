

function PetScrollCard({pet}){
    const {name, image} = pet;

    return(
        <div className="pet-scroll">
            <div className="photo">
                <img src={(image==="" || image===null) ? "https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" : image} alt='pet'/>
            </div>
            <div className="pet-name">
                <h2>{name}</h2>
            </div>
        </div>
    )
}

export default PetScrollCard;