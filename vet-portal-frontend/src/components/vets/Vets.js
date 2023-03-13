import { useEffect } from "react";
import VetCard from "./VetCard";


function Vets({vets, setVets}){

    useEffect(() => {
        fetch('http://localhost:8000/api/vets')
        .then(res => res.json())
        .then(data => setVets(data))
    })

    window.addEventListener('scroll', () => {
        let vets = document.querySelectorAll('.vet-card');
        // console.log(vets[2])

        for(let i = 1; i < vets.length; i++){
            let slideAt = (window.scrollY + window.innerHeight) - vets[i].clientHeight/2;
            // console.log(slideAt)
            let isHalfShown = slideAt > vets[i].getBoundingClientRect().top;
            // console.log(isHalfShown)
            if(isHalfShown){
                vets[i].classList.add('slide');
            }
            else{
                vets[i].classList.remove('slide');
            }
        }
    }, false);

    return(
        <div className="vets-container">
            <h1>Our Vets</h1>
            {vets.map((vet) => {
                return(
                    <div key={vet.id} className="vet-card-container"><VetCard vet={vet} /></div>
                )
            })}
        </div>
    )
}

export default Vets;