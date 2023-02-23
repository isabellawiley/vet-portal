import { Outlet } from "react-router-dom";
import OwnerCard from "./OwnerCard";
import Scroll from "../Scroll";

function Dashboard({owner, pets, appointments}) {

    return(
        <div>
            <OwnerCard owner={owner} />
            <Scroll data={pets} />
            <Outlet />
        </div>
    )
}

export default Dashboard;