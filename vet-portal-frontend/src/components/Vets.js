import { useEffect, useState } from "react"


function Vets(){
    const [vets, setVets] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/vets')
        .then(res => res.json())
        .then(data => setVets(data))
    },[])

    return(
        <div>
            <h1>Vets</h1>
            {vets.map((vet) => {
                return(<li key={vet.id}>{vet.name}</li>)
            })}
        </div>
    )
}

export default Vets;