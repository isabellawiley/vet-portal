import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Login({setToken, setOwner, navigate, setPets, setAppointments}){
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    function handleLogin(event){
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/token`, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer access_token',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loginForm.email,
                password: loginForm.password
            })
        })
        .then(r => r.json())
        .then(data => {
            if(data.msg){
                document.getElementById('error-message').innerHTML = data.msg
                document.querySelector('.danger').style.display = ('block');
            }
            else{
                setToken(data.access_token);
                setOwner(data.owner);
                setPets(data.owner.pets);
                localStorage.setItem('user', JSON.stringify(data.owner));
                // console.log(data.owner)
                fetch(`${process.env.REACT_APP_API_URL}/api/owners/${data.owner.id}/appointments`)
                .then(res => res.json())
                .then(data => {
                    setAppointments(data);
                    navigate('/dashboard');
                })
            }
        })
        
        setLoginForm(({
            email: '',
            password: ''
        }))

    }

    function handleChange(event) {
        const {value, name} = event.target
        setLoginForm(prevNote => ({
            ...prevNote, [name]: value
        }))
    }

    return(
        <div className="login-form">
            <h2 className="center">Login</h2>
            <h3 className="center">Don't have an account? <Link to='/signup'>Sign up!</Link></h3>
            <div className='danger'>
                <p id='error-message'></p>
            </div>
            <form>
                <div className="full-row">
                <label>Email:
                    <input onChange={handleChange} type="email" name="email" text={loginForm.email} value={loginForm.email}/>
                </label>
                </div>
                <div className="full-row">
                <label>Password:
                    <input onChange={handleChange} type="password" name="password" text={loginForm.password} value={loginForm.password}/>
                </label>
                </div>
            </form>
            <div className="button-container">
                <button onClick={handleLogin} className="card-button">Login</button>
            </div>
            <Outlet />
        </div>
    )
}

export default Login;