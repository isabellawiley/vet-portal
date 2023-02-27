import { useState } from "react";

function NewAppointmentModal({showModal, setShowModal, appointments, pets, vets, setAppointments}){
    const [appointmentForm, setAppointmentForm] = useState({
        pet_id: '',
        vet_id: '',
        date: '',
        time: ''
    })
    let allAppt = appointments;

    function handleSubmit(event){
        event.preventDefault();

        fetch(`http://localhost:8000/api/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                date: appointmentForm.date + 'T' + appointmentForm.time,
                pet_id: appointmentForm.pet_id,
                vet_id: appointmentForm.vet_id
            })
        })
        .then(res => res.json())
        .then((appt => {
            allAppt.push(appt);
            setAppointments(allAppt);
        }))

        setAppointmentForm(({
            pet_id: '',
            vet_id: '',
            date: '',
            time: ''
        }))
    }

    function handleChange(event) {
        console.log(event.target)
        const {value, name} = event.target;
        setAppointmentForm(prev => ({
            ...prev, [name]: value
        }))
        if(name == "vet_id" || "pet_id"){
            console.log('value:', value, 'name:', name)
            console.log(appointmentForm.name)
            console.log(appointmentForm)
        }
    }

    return(
        <div className={showModal ? "modal show" : "modal"}>
            <div className="modal-content">
                <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                <h3>New Appointment</h3>
                <form onSubmit={handleSubmit}>
                    <label>Pet:</label>
                    <select onChange={handleChange} value={appointmentForm.pet_id}>
                        {pets.map((pet) => {
                            return(<option key={pet.id} value={pet.id} name="pet_id">{pet.name}</option>)
                        })}
                    </select>
                    <label>Vet:</label>
                    <select onChange={handleChange} value={appointmentForm.vet_id}>
                        {vets.map((vet) => {
                            return(<option key={vet.id} value={vet.id} name="vet_id">{vet.name}</option>)
                        })}
                    </select>
                    <label>Date:</label>
                    <input onChange={handleChange} type="date" name="date" value={appointmentForm.date}/>
                    <label>Time:</label>
                    <input onChange={handleChange} type="string" name="time" value={appointmentForm.time}/>
                    <input type="submit" value="submit"/>
                </form>
            </div>
        </div>
    )
}

export default NewAppointmentModal;