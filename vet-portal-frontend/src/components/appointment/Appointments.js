import { useState } from "react";
import "../../styling/appointments.css";
import AppointmentCard from "./AppointmentCard";
import NewAppointmentModal from "./NewAppointmentModal";

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
            <NewAppointmentModal appointments={appointments} pets={pets} vets={vets} setAppointments={setAppointments}/>
            <h2 className="subtitle">Upcoming</h2>
            <div className="apt-container">
                {upcoming.map((apt) => {
                    let pet = pets.find(pet => pet.id == apt.pet_id)
                    let vet = vets.find(vet => vet.id == apt.vet_id)
                    return(<li key={apt.id}><AppointmentCard id={apt.id} date={apt.date} pet={pet} vet={vet} vets={vets} pets={pets} appointments={appointments} setAppointments={setAppointments} reason={apt.reason}/></li>)
                })}
            </div>
            <h2 className="subtitle">Past</h2>
            <div className="apt-container">
                {past.map((apt) => {
                    let pet = pets.find(pet => pet.id == apt.pet_id)
                    let vet = vets.find(vet => vet.id == apt.vet_id)
                    return(<li key={apt.id}><AppointmentCard id={apt.id} date={apt.date} pet={pet} vet={vet} vets={vets} pets={pets} appointments={appointments} setAppointments={setAppointments} reason={apt.reason} /></li>)
                })}
            </div>
        </div>
    )
}

export default Appointments;