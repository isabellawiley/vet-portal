import { useState } from "react";
import DeleteAppointment from "./DeleteAppointment";

function EditAppointmentModal({id, vets, pets, appointments, setAppointments, pet_id, vet_id, date, time}) {
    const [showModal, setShowModal] = useState(false);
    const [appointmentForm, setAppointmentForm] = useState({
        pet_id: pet_id,
        vet_id: vet_id,
        date: date,
        time: time
    })
    console.log('before:',appointmentForm)
    let allAppt = appointments;

    function handleSubmit(event){
        event.preventDefault();
        console.log(appointmentForm.date + "T" + appointmentForm.time)

        fetch(`http://localhost:8000/api/appointments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                date: appointmentForm.date + "T" + appointmentForm.time,
                pet_id: appointmentForm.pet_id,
                vet_id: appointmentForm.vet_id,
            }),
        })
        .then(r => r.json())
        .then((appt) => {
            let apptIndex = allAppt.find(appo => appo.id == id);
            allAppt[apptIndex] = appt;
            setAppointments(allAppt);
        })

        setAppointmentForm(({
            pet_id: '',
            vet_id: '',
            date: '',
            time: ''
        }))

        setShowModal(false);
    }

    function handleChange(event) {
        const {value, name} = event.target;
        if(name == 'vet_id' || name == 'pet_id'){
            setAppointmentForm(prev => ({
                ...prev, [name]: parseInt(value)
            }));
            console.log('hi')
        }
        else{
            setAppointmentForm(prev => ({
                ...prev, [name]: value
            }));
        }
    }

    return(
        <div>
            <button className="card-button" onClick={() => setShowModal(true)}>Edit</button>
            <div className={showModal ? "modal show" : "modal"}>
                <div className="modal-content">
                    <span className="close" onClick={() => (setShowModal(false))}>&times;</span>
                    <h3>Edit Appointment</h3>
                    <form>
                        <label>Pet:</label>
                        <select onChange={handleChange} value={appointmentForm.pet_id} name="pet_id">
                            {pets.map((pet) => {
                                return(<option key={pet.id} value={pet.id}>{pet.name}</option>)
                            })}
                        </select>
                        <label>Vet:</label>
                        <select onChange={handleChange} value={appointmentForm.vet_id} name="vet_id">
                            {vets.map((vet) => {
                                return(<option key={vet.id} value={vet.id}>{vet.name}</option>)
                            })}
                        </select>
                        <label>Date:</label>
                        <input onChange={handleChange} type="date" name="date" value={appointmentForm.date}/>
                        <label>Time:</label>
                        <input onChange={handleChange} type="string" name="time" value={appointmentForm.time}/>
                    </form>
                    <div className="button-container">
                        <button className="edit card-button" onClick={handleSubmit}>Save</button>
                        <DeleteAppointment id={id} setShowModal={setShowModal}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAppointmentModal;