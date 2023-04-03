
function ApptScrollCard({appt, pets, vets}){
    let date = new Date(appt.date_time_start);
    let strDate = (date.toLocaleString()).split(',');
    let timeStr = strDate[1].substring(0, 5) + strDate[1].substring(8, strDate[1].length);
    let pet = pets.find(pet => pet.id === appt.pet_id);
    let vet = vets.find(vet => vet.id === appt.vet_id);

    return(
        <div>
            <h3>{pet.name}</h3>
            <p>{strDate[0]} {timeStr}</p>
            <p>{vet.name}</p>
        </div>
    )
}

export default ApptScrollCard;