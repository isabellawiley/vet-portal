
function AppointmentCard({date, pet, vet}){
    let aptDate = new Date(date);
    let strDate = (aptDate.toLocaleString()).replace(',', '');
    // const dateArr = date.split(/\D/g);
    // let time = "";
    // let fullDate = dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];

    // if(parseInt(dateArr[3]) > 12){
    //     let hour = parseInt(dateArr[3]) - 12;
    //     time += hour.toString() + ":" + dateArr[4] + "pm";
    // }
    // else{
    //     time += dateArr[3] + ":" + dateArr[4] + "am";
    // }
    
    return(
        <div className="apt-card">
            <h3>{pet.name}</h3>
            <p>{strDate}</p>
            <p>{vet.name}</p> 
        </div>
    )
}

export default AppointmentCard;