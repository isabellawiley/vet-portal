import { useState } from "react";

function NewAppointmentModal({showNewModal, setShowNewModal, appointments, pets, vets, setAppointments}){
    const [appointmentForm, setAppointmentForm] = useState({
        pet_id: 0,
        vet_id: 0,
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
            pet_id: 0,
            vet_id: 0,
            date: '',
            time: ''
        }))

        setShowNewModal(false);
    }

    function handleChange(event) {
        const {value, name} = event.target;
        if(name == 'vet_id' || name == 'pet_id'){
            setAppointmentForm(prev => ({
                ...prev, [name]: parseInt(value)
            }));
            console.log(appointmentForm)
        }
        else{
            setAppointmentForm(prev => ({
                ...prev, [name]: value
            }));
        }
    }

    return(
        <div className={showNewModal ? "modal show" : "modal"}>
            <div className="modal-content">
                <span className="close" onClick={() => setShowNewModal(false)}>&times;</span>
                <h3>New Appointment</h3>
                <form onSubmit={handleSubmit}>
                    <label>Pet:</label>
                    <select onChange={handleChange} value={appointmentForm.pet_id} name="pet_id">
                        <option value={0} disabled>Choose a pet</option>
                        {pets.map((pet) => {
                            return(<option key={pet.id} value={pet.id}>{pet.name}</option>)
                        })}
                    </select>
                    <label>Vet:</label>
                    <select onChange={handleChange} value={appointmentForm.vet_id} name="vet_id">
                        <option value={0} disabled>Choose a vet</option>
                        {vets.map((vet) => {
                            return(<option key={vet.id} value={vet.id}>{vet.name}</option>)
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