import { Link, useNavigate } from "react-router-dom";


function Navbar({removeToken, setOwner}){
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
                <li>
                    <button onClick={logout}>Logout</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;