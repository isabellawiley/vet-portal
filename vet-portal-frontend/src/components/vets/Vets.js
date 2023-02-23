import { useEffect, useState } from "react"
import VetCard from "./VetCard";


function Vets(){
    const [vets, setVets] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/vets')
        .then(res => res.json())
        .then(data => setVets(data))
    },[])

    return(
        <div className="vets-container">
            <h1>Vets</h1>
            {vets.map((vet) => {
                return(<VetCard key={vet.id} vet={vet} />)
            })}
        </div>
    )
}

export default Vets;