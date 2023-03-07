import { useState } from "react";

function NewAppointmentModal({appointments, pets, vets, setAppointments}){
    const [showNewModal, setShowNewModal] = useState(false);
    const [appointmentForm, setAppointmentForm] = useState({
        pet_id: 0,
        vet_id: 0,
        reason: '',
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
                reason: appointmentForm.reason,
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
            reason: '',
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
        <div>
            <button className="card-button" onClick={() => setShowNewModal(true)}>New Appointment</button>
            <div className={showNewModal ? "modal show" : "modal"}>
                <div className="modal-content">
                    <span className="close" onClick={() => setShowNewModal(false)}>&times;</span>
                    <h3 className="modal-title">New Appointment</h3>
                    <form>
                        <div className="row-container">
                        <div className="row left">
                            <div className="col">
                                <label>Pet:</label>
                            </div>
                            <div className="col">
                                <select onChange={handleChange} value={appointmentForm.pet_id} name="pet_id">
                                    <option value={0} disabled>Choose a pet</option>
                                    {pets.map((pet) => {
                                        return(<option key={pet.id} value={pet.id}>{pet.name}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row right">
                            <div className="col">
                                <label>Vet:</label>
                            </div>
                            <div className="col">
                                <select onChange={handleChange} value={appointmentForm.vet_id} name="vet_id">
                                    <option value={0} disabled>Choose a vet</option>
                                    {vets.map((vet) => {
                                        return(<option key={vet.id} value={vet.id}>{vet.name}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                        </div>
                        <div className="full-row">
                            <div className="col">
                                <label>Reason:</label>
                            </div>
                            <div className="full-col">
                                <select onChange={handleChange} value={appointmentForm.reason} name='reason'>
                                    <option value='' disabled>Choose reason for appointment</option>
                                    <option value='Annual Physical Exam'>Annual Physical Exam</option>
                                    <option value='Dental Cleaning'>Dental Cleaning</option>
                                    <option value='Grooming'>Grooming</option>
                                    <option value='Nail Trim'>Nail Trim</option>
                                    <option value='Sick Pet'>Sick Pet</option>
                                    <option value='Vaccinations'>Vaccinations</option>
                                    <option value='Microchipping'>Microchipping</option>
                                    <option value='Spay/Neuter'>Spay/Neuter</option>
                                </select>
                            </div>
                        </div>
                        <div className="row-container">
                        <div className="row left">
                            <div className="col">
                                <label>Date:</label>
                            </div>
                            <div className="col">
                                <input onChange={handleChange} type="date" name="date" value={appointmentForm.date}/>
                            </div>
                        </div>
                        <div className="row right">
                            <div className="col">
                                <label>Time:</label>
                            </div>
                            <div className="col">
                                <input onChange={handleChange} type="time" name="time" value={appointmentForm.time}/>
                            </div>
                        </div>
                        </div>
                    </form>
                    <div className="button-container">
                        <button className="edit card-button" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAppointmentModal;