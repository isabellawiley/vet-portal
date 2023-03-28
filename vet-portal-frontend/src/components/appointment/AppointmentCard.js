import EditAppointmentModal from "./EditAppointmentModal";

function AppointmentCard({apt, id, date_time_start, date_time_end, time, pet, pets, vet, vets, appointments, setAppointments, reason, upcoming, setVets}){
    let aptDate = new Date(date_time_start);
    let strDate = (aptDate.toLocaleString()).split(',');
    let timeStr = strDate[1].substring(0, 5) + strDate[1].substring(8, strDate[1].length);
    let dateTimeArr = date_time_start.split("T");
    let endDateTimeArr = date_time_end.split("T");

    
    return(
        <div>
            {id && date_time_start && pet && pets && vet && vets && appointments && reason ? 
                <div className="apt-card">
                    <h3>{pet.name}</h3>
                    <p>{reason}</p>
                    <p>{strDate[0]} {timeStr}</p>
                    <p>{vet.name}</p> 
                    {upcoming ? 
                    <EditAppointmentModal apt={apt} id={id} vets={vets} pets={pets} appointments={appointments} setAppointments={setAppointments} pet_id={pet.id} vet_id={vet.id} date_time_start={dateTimeArr[0]} time_end={endDateTimeArr[1]} time_start={dateTimeArr[1]} time={time} reason={reason} setVets={setVets}/>
                    :
                    <div></div>
                    }
                </div>
            : <div></div>}
        </div>
    )
}

export default AppointmentCard;