import { useEffect, useState } from "react";

function FormTimeValidator({vet_id, date_time_start, vets, time, handleChange, time_start}){
    const allTimesArr = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']
    const [allTimes, setAllTimes] = useState([...allTimesArr]);

    function sortTimes(selAppts, slots){
        let copyAllTimes = [...allTimesArr]
        let apptInds = []
        selAppts.forEach((apt) => {
            let startInd = copyAllTimes.indexOf(apt.start[1]);
            let endInd = copyAllTimes.indexOf(apt.end[1]);
            apptInds.push({startInd: startInd, endInd: endInd});
        })
        for(let i = 1; i < apptInds.length;){
            if(apptInds[i].startInd === apptInds[i-1].endInd || apptInds[i].startInd - slots < apptInds[i-1].endInd){
                apptInds[i-1].endInd = apptInds[i].endInd;
                apptInds.splice(i,1);
            }
            else{
                apptInds[i].startInd = apptInds[i].startInd - slots + 1;
                i++
            }
        }
        if(apptInds[0].startInd < slots){
            apptInds[0].startInd = 0;
        }else{
            apptInds[0].startInd = apptInds[0].startInd - (slots-1);
        }
        if(apptInds[apptInds.length - 1].endInd + slots - 1 > copyAllTimes.length){
            apptInds[apptInds.length - 1].endInd = copyAllTimes.length + 1;
        }else{
            apptInds.push({startInd: copyAllTimes.length - slots + 1, endInd: copyAllTimes.length + 1})
        }
        for(let i = apptInds.length - 1; i >= 0; i--){
            if(apptInds[i].startInd === 0 && apptInds[i].endInd === copyAllTimes[copyAllTimes.length - 1]){
                copyAllTimes = []
            }
            else {
                copyAllTimes.splice(apptInds[i].startInd, apptInds[i].endInd - apptInds[i].startInd)
            }
        }
        setAllTimes([...copyAllTimes]);
    }

    useEffect(() => {
        setAllTimes([...allTimesArr]);
        if(vet_id && date_time_start){
            let vet = vets.find(vet => vet.id === vet_id)
            let allVetApt = vet.appointments;
            let sortedVetApt = allVetApt.sort((a,b) => {
                return new Date(a.date_time_start) - new Date(b.date_time_start)
            });
            let appts = sortedVetApt.map(apt => {
                let start = apt.date_time_start.split("T");
                let end = apt.date_time_end.split("T");
                let aptObj = {
                    start: [start[0], start[1].substring(0,5) + start[1].substring(8, start[1].length)],
                    end: [end[0], end[1].substring(0,5) + end[1].substring(8, start[1].length)]
                }
                return aptObj;
            })
            let selectedDateAppts = appts.filter((apt) => {
                return apt.start[0] === date_time_start
            })

            let slots = time/30;

            if(selectedDateAppts.length > 0){
                sortTimes(selectedDateAppts, slots);
            }
        }
    }, [vet_id, date_time_start, vets, time])

    return(
        <select onChange={handleChange} name='time_start' value={time_start} disabled={date_time_start === '' ? true : false} required>
        <option value='' disabled>Select a time</option>
            {allTimes.map((time) => {
                let date = new Date(date_time_start + ' ' + time);
                let selTime = date.toLocaleTimeString([], {timeStyle: 'short'});
                return(<option key={time} value={time}>{selTime}</option>)
            })}
        </select>
    )
}

export default FormTimeValidator;