import { Outlet } from "react-router-dom";
import OwnerCard from "./OwnerCard";
import Scroll from "../Scroll";

function Dashboard({owner, pets, appointments}) {

    return(
        <div>
            <h1>Dashboard</h1>
            <OwnerCard owner={owner} />
            <Scroll data={pets} />
            <Outlet />
        </div>
    )
}

export default Dashboard;