import VetCard from "./VetCard";


function Vets({vets}){

    window.addEventListener('scroll', () => {
        let vets = document.querySelectorAll('.vet-card');
        // console.log(vets[2])

        vets.forEach(vet => {
            let slideAt = (window.scrollY + window.innerHeight) - vet.clientHeight/2;
            // console.log(slideAt)
            let isHalfShown = slideAt > vet.getBoundingClientRect().top;
            // console.log(isHalfShown)
            if(isHalfShown){
                vet.classList.add('slide');
            }
            else{
                vet.classList.remove('slide');
            }
        })
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