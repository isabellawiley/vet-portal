
function OwnerCard({owner}) {
    const {fname, lname, email} = owner;

    return(
        <div>
            <h2>{fname} {lname}</h2>
            <h3>{email}</h3>
        </div>
    )
}

export default OwnerCard;