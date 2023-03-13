import EditAppointmentModal from "./EditAppointmentModal";

function AppointmentCard({id, date, pet, pets, vet, vets, appointments, setAppointments, reason, upcoming}){
    let aptDate = new Date(date);
    let strDate = (aptDate.toLocaleString()).split(',');
    let dateTimeArr = date.split("T");
    
    return(
        <div className="apt-card">
            <h3>{pet.name}</h3>
            <p>{reason}</p>
            <p>{strDate[0]} {strDate[1]}</p>
            <p>{vet.name}</p> 
            {upcoming ? 
            <EditAppointmentModal id={id} vets={vets} pets={pets} appointments={appointments} setAppointments={setAppointments} pet_id={pet.id} vet_id={vet.id} date={dateTimeArr[0]} time={dateTimeArr[1]} reason={reason}/>
            :
            <div></div>
            }
        </div>
    )
}

export default AppointmentCard;