import "../../styling/vets.css";

function VetCard({vet}) {
    const {id, name, bio, image} = vet

    return(
        <div className={id %2 == 0 ? "vet-card reverse": "vet-card"}>
            <div className="vet-image">
                <img src={image} alt="vet photo"/>
            </div>
            <div className="vet-info">
                <h2>{name}</h2>
                <p>{bio}</p>
            </div>
        </div>
    )
}

export default VetCard;