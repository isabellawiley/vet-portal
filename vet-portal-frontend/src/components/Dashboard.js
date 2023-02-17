import { useEffect } from "react";
import OwnerCard from "./owner/OwnerCard";


function Dashboard({setOwner, token}) {

    useEffect(() => {
        fetch("http://localhost:8000/api/")
    })

    return(
        <div>
            <OwnerCard owner={owner} />
        </div>
    )
}

export default Dashboard;