import { useState } from "react";
import EditAppointmentModal from "./EditAppointmentModal";

function AppointmentCard({id, date, pet, pets, vet, vets, appointments, setAppointments}){
    const [showModal, setShowModal] = useState(false);
    let aptDate = new Date(date);
    let strDate = (aptDate.toLocaleString()).replace(',', '');
    
    return(
        <div className="apt-card">
            <h3>{pet.name}</h3>
            <p>{strDate}</p>
            <p>{vet.name}</p> 
            <button className="edit-button" onClick={() => setShowModal(true)}>Edit</button>
            <EditAppointmentModal id={id} vets={vets} pets={pets} showModal={showModal} setShowModal={setShowModal} appointments={appointments} setAppointments={setAppointments} pet_id={pet.id} vet_id={vet.id}/>
        </div>
    )
}

export default AppointmentCard;