import { useEffect, useState } from "react"
import VetCard from "./VetCard";


function Vets({vets}){

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