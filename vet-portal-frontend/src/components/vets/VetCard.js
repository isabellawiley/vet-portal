import "../../styling/vets.css";

function VetCard({vet}) {
    const {name, bio, image} = vet

    return(
        <div className="vet-card">
            <img src={image} alt="vet photo" className="vet-image"/>
            <div className="vet-info">
                <h2>{name}</h2>
                <p>{bio}</p>
            </div>
        </div>
    )
}

export default VetCard;