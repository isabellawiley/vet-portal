import ApptScrollCard from "./ApptScrollCard";
import PetScrollCard from "./PetScrollCard";


function Scroll({pets, appts, vets}){
    
    return(
        <div>
            {pets && appts && vets ? 
                <div className="scroll-container">
                    <a className="links" href="my-appointments"><h2 className="content-title">Upcoming Appointments</h2></a>
                    <ul className="appt-scroll-cards">
                        {appts.map((appt) => {
                            return(<li className="appt-scroll-card" key={appt.id}><ApptScrollCard appt={appt} pets={pets} vets={vets}/></li>)
                        })}
                    </ul>
                    <a className="links" href="my-pets"><h2 className="content-title">My Pets</h2></a>
                    <ul className="pet-scroll-cards">
                        {pets.map((pet) => {
                            return(<li className="pet-scroll-card" key={pet.id}><PetScrollCard pet={pet} /></li>)
                        })}
                    </ul>
                </div> 
            : 
                <div></div>
            }
        </div>
    )
}

export default Scroll;