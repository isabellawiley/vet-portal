import "../../styling/appointments.css";
import AppointmentCard from "./AppointmentCard";

function Appointments({setAppointments, appointments, pets, vets}){
    let today = new Date();
    let upcoming = [];
    let past = [];

    appointments.forEach(apt => {
        let date = new Date(apt.date);
        if(date > today){
            upcoming.push(apt)
        }
        else{
            past.push(apt)
        }
    });
    
    return(
        <div className="container">
            <h1 className="title">Appointments</h1>
            <h2>Upcoming</h2>
            <div className="apt-container">
                {upcoming.map((apt) => {
                    let pet = pets.find(pet => pet.id == apt.pet_id)
                    let vet = vets.find(vet => vet.id == apt.vet_id)
                    return(<li key={apt.id}><AppointmentCard id={apt.id} date={apt.date} pet={pet} vet={vet} vets={vets} pets={pets} appointments={appointments} setAppointments={setAppointments}/></li>)
                })}
            </div>
            <h2>Past</h2>
            <div className="apt-container">
                {past.map((apt) => {
                    let pet = pets.find(pet => pet.id == apt.pet_id)
                    let vet = vets.find(vet => vet.id == apt.vet_id)
                    return(<li key={apt.id}><AppointmentCard id={apt.id} date={apt.date} pet={pet} vet={vet} vets={vets} pets={pets} appointments={appointments} setAppointments={setAppointments} /></li>)
                })}
            </div>
        </div>
    )
}

export default Appointments;