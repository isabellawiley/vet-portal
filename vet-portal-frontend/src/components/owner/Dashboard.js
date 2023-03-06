import { Outlet } from "react-router-dom";
import OwnerCard from "./OwnerCard";
import Scroll from "./Scroll";

function Dashboard({owner, pets, appointments, vets}) {
    let today = new Date();
    let upcoming = [];

    appointments.forEach(apt => {
        let date = new Date(apt.date);
        if(date > today){
            upcoming.push(apt)
        }
    });

    return(
        <div className="page-container">
            <h1 className="title-center">Dashboard</h1>
            <div className="dashboard-content">
                <div className="dashboard-left">
                    <h2 className="content-title">Owner Info</h2>
                    <OwnerCard owner={owner} />
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