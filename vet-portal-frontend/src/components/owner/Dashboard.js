import { Outlet } from "react-router-dom";
import OwnerCard from "./OwnerCard";
import Scroll from "./Scroll";

function Dashboard({owner, setOwner, pets, appointments, vets}) {
    let today = new Date();
    let upcoming = [];

    appointments.forEach(apt => {
        let date = new Date(apt.date_time_start);
        if(date > today){
            upcoming.push(apt)
        }
    });

    return(
        <div className="page-container">
            <h1 className="center">Dashboard</h1>
            <div className="dashboard-content">
                <div className="dashboard-left">
                    <h2 className="content-title center">Owner Info</h2>
                    <OwnerCard owner={owner} setOwner={setOwner} />
                </div>
                <div className="dashboard-right">
                    <Scroll pets={pets} appts={upcoming} vets={vets}/>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Dashboard;