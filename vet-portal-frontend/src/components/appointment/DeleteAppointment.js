
function DeleteAppointment({id, setShowModal, appointments, setAppointments}) {

    function handleDelete(){
        if(window.confirm("Delete appointment?")){
            fetch(`http://localhost:8000/api/appointments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
            // .then(res => res.json())
            .then(data => {
                // console.log(data);
                const updatedAppts = appointments.filter(appt => {
                    return appt.id !== id;
                })
                console.log(updatedAppts)
                setAppointments(updatedAppts);
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