import { Link } from "react-router-dom";


function Navbar(){

    return(
        <div>
            <ul>
                <li>
                    <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                    <Link to='/my-pets'>My Pets</Link>
                </li>
                <li>
                    <Link to='/my-appointments'>My Appointments</Link>
                </li>
                <li>
                    <Link to='/vets'>Vets</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;