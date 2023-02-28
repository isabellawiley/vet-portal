import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../public/vet.png";
import "../styling/navbar.css";

function Navbar({removeToken, setOwner}){
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    function logout(){
        fetch("http://localhost:8000/logout", {
            method: "POST",
        })
        .then(r => r.json())
        .then(data => {
            removeToken();
            setOwner(null)
            navigate('/login')
        })
    }

    return(
        <header>
            <img src={process.env.PUBLIC_URL + "/vet.png"} alt="logo" className="logo"/>
            <nav>
                <div className={isActive ? 'change' : 'hamburger'} onClick={() => setIsActive(!isActive)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <ul className={isActive ? "menu expanded" : "menu"}>
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
                    <li>
                        <button className="nav-button" onClick={logout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;


// <a href="https://www.flaticon.com/free-icons/pets" title="pets icons">Pets icons created by Smashicons - Flaticon</a>