
function Appointments({appointments}){

    return(
        <div>
            <h1>Appointments</h1>
            {appointments.map((apt) => {
                return(<li key={apt.id}>{apt.date}</li>)
            })}
        </div>
    )
}

export default Appointments;