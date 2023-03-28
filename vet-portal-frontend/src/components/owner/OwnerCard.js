import EditOwnerModal from "./EditOwnerModal";
import '../../styling/dashboard.css';

function OwnerCard({owner, setOwner}) {
    const {fname, lname, email} = owner;

    return(
        <div className="owner-card">
            <h2>{fname} {lname}</h2>
            <h3>{email}</h3>
            <EditOwnerModal owner={owner} setOwner={setOwner}/>
        </div>
    )
}

export default OwnerCard;