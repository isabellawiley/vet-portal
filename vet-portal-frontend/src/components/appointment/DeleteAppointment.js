
function DeleteAppointment({ apt, setShowModal, appointments, setAppointments, vets, setVets}) {

    function handleDelete(){
        if(window.confirm("Delete appointment?")){
            fetch(`http://localhost:8000/api/appointments/${apt.id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            // .then(res => res.json())
            .then(data => {
                const updatedAppts = appointments.filter(appt => {
                    return appt.id !== apt.id;
                })
                setAppointments(updatedAppts);

                let vet = vets.find(vet => vet.id === apt.vet_id);
                let allVets = [...vets];
                let aptInd = vet.appointments.indexOf(apt);
                vet.appointments.splice(aptInd, 1);
                let vetInd = allVets.indexOf(vet);
                allVets[vetInd] = vet;
                setVets([...allVets]);

                setShowModal(false);
            })
        }
    }

    return(
        <div>
            <button className="delete-button" onClick={handleDelete}>Delete Appointment</button>
        </div>
    )
}

export default DeleteAppointment;