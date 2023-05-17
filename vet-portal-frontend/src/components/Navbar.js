import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../public/vet.png";
import "../styling/navbar.css";

function Navbar({removeToken, setOwner, owner, setPets, setAppointments}){
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    function logout(){
        fetch("https://pet-portal-api.herokuapp.com/logout", {
            method: "POST",
        })
        .then(r => r.json())
        .then(data => {
            removeToken();
            setOwner(null);
            setAppointments([]);
            setPets([]);
            localStorage.removeItem('user');
            navigate('/login')
            setIsActive(!isActive)
        })
    }

    return(
        <header>
            <Link to='/'>
                <img src={process.env.PUBLIC_URL + "/vet.png"} alt="logo" className="logo"/>
            </Link>
            <nav>
                <div className={isActive ? 'change' : 'hamburger'} onClick={() => setIsActive(!isActive)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <ul className={isActive ? "menu expanded" : "menu"}>
                    <li>
                        <Link to='/' onClick={() => setIsActive(!isActive)}>Home</Link>
                    </li>
                    <li>
                        <Link to='/vets' onClick={() => setIsActive(!isActive)}>Vets</Link>
                    </li>
                    <li>
                        <Link to='/dashboard' onClick={() => setIsActive(!isActive)}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/my-pets' onClick={() => setIsActive(!isActive)}>My Pets</Link>
                    </li>
                    <li>
                        <Link to='/my-appointments' onClick={() => setIsActive(!isActive)}>My Appointments</Link>
                    </li>
                    <li className="nav-right">
                        {owner ? 
                        <button className="nav-button" onClick={logout}>Logout</button>
                        : 
                        <button className="nav-button" onClick={() => navigate('/login')}>Login</button>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;


// <a href="https://www.flaticon.com/free-icons/pets" title="pets icons">Pets icons created by Smashicons - Flaticon</a>