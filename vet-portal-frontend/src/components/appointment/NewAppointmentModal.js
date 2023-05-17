import { useState } from "react";
import apptData from "../../assets/appointmentData.json";
import FormTimeValidator from "./FormTimeValidator";

function NewAppointmentModal({appointments, pets, vets, setAppointments, setVets}){
    // const allTimesArr = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']
    // const [allTimes, setAllTimes] = useState([...allTimesArr]);
    const [showNewModal, setShowNewModal] = useState(false);
    // const [timeOpts, setTimeOpts] = useState()
    const [apptTimeLength, setApptTimeLength] = useState(0);
    const [appointmentForm, setAppointmentForm] = useState({
        pet_id: 0,
        vet_id: 0,
        reason: '',
        date_time_start: '',
        time_start: '',
        time: 0
    })
    
    function getTodayDate(){
        const today = new Date();
        let year = today.getFullYear();
        let date = today.getDate();
        let month = today.getMonth() + 1;

        if(date < 10){date = '0' + date}
        if(month < 10){month = '0' + month}

        return(year + '-' + month + '-' + date);
    }


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

        fetch(`https://pet-portal-api.herokuapp.com/api/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                date_time_start: appointmentForm.date_time_start + 'T' + appointmentForm.time_start,
                date_time_end: appointmentForm.date_time_start + 'T' + getDateTimeEnd(appointmentForm.time_start),
                reason: appointmentForm.reason,
                pet_id: appointmentForm.pet_id,
                vet_id: appointmentForm.vet_id,
                time: appointmentForm.time
            })
        })
        .then(res => res.json())
        .then((appt => {
            setAppointments([...appointments, appt]);

            let vet = vets.find(vet => vet.id === appt.vet_id);
            let vetInd = vets.indexOf(vet);
            let allVets = [...vets];
            allVets[vetInd].appointments.push(appt);
            setVets([...allVets]);
        }))

        setAppointmentForm(({
            pet_id: 0,
            vet_id: 0,
            reason: '',
            date_time_start: '',
            time_start: '',
            time: 0
        }))

        setShowNewModal(false);
    }

    function handleChange(event) {
        const {value, name} = event.target;
        console.log(name, value)
        if(name === 'vet_id' || name === 'pet_id'){
            setAppointmentForm(prev => ({
                ...prev, [name]: parseInt(value)
            }));
        }
        else if(name === 'reason'){
            const time = apptData.find(appt => appt.name === value);
            setApptTimeLength(time.time);
            setAppointmentForm(prev => ({
                ...prev, [name]: value, 'time': time.time
            }));
        }
        else{
            setAppointmentForm(prev => ({
                ...prev, [name]: value
            }));
        }

        if(name === 'vet_id' || name === 'reason' || name === 'date_time_start'){
            setAppointmentForm(prev => ({
                ...prev, 'time_start': ''
            }))
        }
        console.log(appointmentForm)
    }

    return(
        <div>
            <button className="card-button new" onClick={() => setShowNewModal(true)}>New Appointment</button>
            <div className={showNewModal ? "modal show" : "modal"}>
                <div className="modal-content-container">
                <div className="modal-content">
                    <span className="close" onClick={() => setShowNewModal(false)}>&times;</span>
                    <br/>
                    <h3 className="modal-title">New Appointment</h3>
                    <form>
                        <div className="row-container">
                        <div className="row left">
                            <div className="col">
                                <label>Pet:</label>
                            </div>
                            <div className="col">
                                <select onChange={handleChange} value={appointmentForm.pet_id} name="pet_id" required>
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
                                <select onChange={handleChange} value={appointmentForm.vet_id} name="vet_id" required>
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
                                <select onChange={handleChange} value={appointmentForm.reason} name='reason' required>
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
                                <input onChange={handleChange} type="date" name="date_time_start" value={appointmentForm.date_time_start} disabled={appointmentForm.vet_id ===0 ? true : false} min={getTodayDate()} required/>
                            </div>
                        </div>
                        <div className="row right">
                            <div className="col">
                                <label>Time:</label>
                            </div>
                            <div className="col">
                                {/* <input onChange={handleChange} type="time" name="time_start" value={appointmentForm.time_start} disabled={appointmentForm.date_time_start === '' ? true : false} list='avail' required/> */}
                                {/* <FormTimeValidator vets={vets} vet_id={appointmentForm.vet_id} date_time_start={appointmentForm.date_time_start} time={appointmentForm.time}/> */}
                                {/* <select onChange={handleChange} value={appointmentForm.time_start} disabled={appointmentForm.date_time_start === '' ? true : false} required> */}
                                    {/* <FormTimeValidator vets={vets} vet_id=
                                    {appointmentForm.vet_id} date_time_start={appointmentForm.date_time_start} time={appointmentForm.time}/> */}
                                    {/* {timeOpts}
                                </select> */}
                                <FormTimeValidator vets={vets} vet_id=
                                    {appointmentForm.vet_id} date_time_start={appointmentForm.date_time_start} time={appointmentForm.time} handleChange={handleChange} time_start={appointmentForm.time_start}/>
                            </div>
                        </div>
                        </div>
                    </form>
                    <div className="button-container">
                        <button className="card-button" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default NewAppointmentModal;