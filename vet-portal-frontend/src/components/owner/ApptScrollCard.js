
function ApptScrollCard({appt, pets, vets}){
    let date = new Date(appt.date);
    let strDate = (date.toLocaleString()).split(',');
    // let dateTimeArr = date.split("T");
    let pet = pets.find(pet => pet.id == appt.pet_id);
    let vet = vets.find(vet => vet.id == appt.vet_id);
    // console.log(strDate)

    return(
        <div>
            <h3>{pet.name}</h3>
            <p>{strDate[0]} {strDate[1]}</p>
            <p>{vet.name}</p>
        </div>
    )
}

export default ApptScrollCard;