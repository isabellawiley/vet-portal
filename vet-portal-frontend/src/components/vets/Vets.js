import VetCard from "./VetCard";


function Vets({vets}){

    window.addEventListener('scroll', () => {
        let vets = document.querySelectorAll('.vet-card');

        for(let i = 1; i < vets.length; i++){
            let slideAt = (window.scrollY + window.innerHeight) - vets[i].clientHeight/2;
            let isHalfShown = slideAt > vets[i].getBoundingClientRect().top;
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