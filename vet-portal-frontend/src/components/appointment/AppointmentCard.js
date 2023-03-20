import EditAppointmentModal from "./EditAppointmentModal";

function AppointmentCard({id, date_time_start, time, pet, pets, vet, vets, appointments, setAppointments, reason, upcoming}){
    let aptDate = new Date(date_time_start);
    let strDate = (aptDate.toLocaleString()).split(',');
    let dateTimeArr = date_time_start.split("T");

    
    return(
        <div>
            {id && date_time_start && pet && pets && vet && vets && appointments && reason ? 
                <div className="apt-card">
                    <h3>{pet.name}</h3>
                    <p>{reason}</p>
                    <p>{strDate[0]} {strDate[1]}</p>
                    <p>{vet.name}</p> 
                    {upcoming ? 
                    <EditAppointmentModal id={id} vets={vets} pets={pets} appointments={appointments} setAppointments={setAppointments} pet_id={pet.id} vet_id={vet.id} date_time_start={dateTimeArr[0]} time_start={dateTimeArr[1]} time={time} reason={reason}/>
                    :
                    <div></div>
                    }
                </div>
            : <div></div>}
        </div>
    )
}

export default AppointmentCard;