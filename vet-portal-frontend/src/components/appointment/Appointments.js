import "../../styling/appointments.css";
import AppointmentCard from "./AppointmentCard";
import NewAppointmentModal from "./NewAppointmentModal";

function Appointments({setAppointments, appointments, pets, vets, setVets}){
    let today = new Date();
    let upcoming = [];
    let past = [];

    appointments.forEach(apt => {
        let date = new Date(apt.date_time_start);
        if(date > today){
            upcoming.push(apt)
        }
        else{
            past.push(apt)
        }
    });
    // console.log(upcoming)
    return(
        <div>
            {appointments && pets && vets ? 
                <div>
                        <h1 className="title">Appointments</h1>
                        <NewAppointmentModal appointments={appointments} pets={pets} vets={vets} setAppointments={setAppointments} setVets={setVets}/>
                        <div className="container">
                        <h2 className="subtitle">Upcoming</h2>
                        <div className="apt-container">
                            {upcoming.map((apt) => {
                                let pet = pets.find(pet => pet.id === apt.pet_id)
                                let vet = vets.find(vet => vet.id === apt.vet_id)
                                return(<li key={apt.id}><AppointmentCard apt={apt} id={apt.id} date_time_start={apt.date_time_start} date_time_end={apt.date_time_end} time={apt.time} pet={pet} vet={vet} vets={vets} pets={pets} appointments={appointments} setAppointments={setAppointments} reason={apt.reason} upcoming={true} setVets={setVets}/></li>)
                            })}
                        </div>
                        <h2 className="subtitle">Past</h2>
                        <div className="apt-container">
                            {past.map((apt) => {
                                let pet = pets.find(pet => pet.id === apt.pet_id)
                                let vet = vets.find(vet => vet.id === apt.vet_id)
                                return(<li key={apt.id}><AppointmentCard apt={apt} id={apt.id} date_time_start={apt.date_time_start} date_time_end={apt.date_time_end} time={apt.time} pet={pet} vet={vet} vets={vets} pets={pets} appointments={appointments} setAppointments={setAppointments} reason={apt.reason} upcoming={false} setVets={setVets} /></li>)
                            })}
                        </div>
                    </div>
                </div>
            : <div></div>}
        </div>
    )
}

export default Appointments;