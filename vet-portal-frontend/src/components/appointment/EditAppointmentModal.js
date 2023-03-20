import { useState } from "react";
import DeleteAppointment from "./DeleteAppointment";
import apptData from "../../assets/appointmentData.json";

function EditAppointmentModal({id, vets, pets, appointments, setAppointments, pet_id, vet_id, date_time_start, time_start, time, reason}) {
    const [showModal, setShowModal] = useState(false);
    const [apptTimeLength, setApptTimeLength] = useState(time);
    const [appointmentForm, setAppointmentForm] = useState({
        pet_id: pet_id,
        vet_id: vet_id,
        reason: reason,
        time: time,
        date_time_start: date_time_start,
        time_start: time_start,
    })

    function getDateTimeEnd(start){
        let timeArr = start.split(':');
        let mins = timeArr[0]*60 + +timeArr[1];
        let total = mins + apptTimeLength;
        function convert(x){
            return(x<10? '0':'') + x;
        }
        let hour = (total/60 | 0) % 24;
        let min = total % 60;
        let time = convert(hour) + ':' + convert(min);
        return time;
    }

    function handleSubmit(event){
        event.preventDefault();

        fetch(`http://localhost:8000/api/appointments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                date_time_start: appointmentForm.date_time_start + 'T' + appointmentForm.time_start,
                date_time_end: appointmentForm.date_time_start + 'T' + getDateTimeEnd(appointmentForm.time_start),
                time: appointmentForm.time,
                reason: appointmentForm.reason,
                pet_id: appointmentForm.pet_id,
                vet_id: appointmentForm.vet_id,
            }),
        })
        .then(r => r.json())
        .then((appt) => {
            let apptObj = appointments.find(ap => ap.id == id);
            let apptIndex = appointments.indexOf(apptObj);
            appointments[apptIndex] = appt;

            setAppointments([...appointments]);
        })

        setShowModal(false);
    }

    function handleChange(event) {
        const {value, name} = event.target;
        if(name == 'vet_id' || name == 'pet_id'){
            setAppointmentForm(prev => ({
                ...prev, [name]: parseInt(value)
            }));
        }
        else if(name == 'reason'){
            const time = apptData.find(appt => appt.name == value);
            setApptTimeLength(time.time);
            setAppointmentForm(prev => ({
                ...prev, [name]: value
            }));
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
                <div className="modal-content-container">
                    <div className="modal-content">
                    <span className="close" onClick={() => (setShowModal(false))}>&times;</span>
                    <h3 className="modal-title">Edit Appointment</h3>
                    <form>
                        <div className="row-container">
                        <div className="row left">
                            <div className="col">
                                <label>Pet:</label>
                            </div>
                            <div className="col">
                                <select onChange={handleChange} value={appointmentForm.pet_id} name="pet_id">
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
                                <input onChange={handleChange} type="date" name="date_time_start" value={appointmentForm.date_time_start}/>
                            </div>
                        </div>
                        <div className="row right">
                            <div className="col">
                                <label>Time:</label>
                            </div>
                            <div className="col">
                                <input onChange={handleChange} type="time" name="time_start" value={appointmentForm.time_start}/>
                            </div>
                        </div>
                        </div>
                    </form>
                    <div className="button-container">
                        <button className="card-button" onClick={handleSubmit}>Save</button>
                        <DeleteAppointment id={id} setShowModal={setShowModal} setAppointments={setAppointments} appointments={appointments}/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAppointmentModal;