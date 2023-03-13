import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Signup({setToken, setOwner, navigate}) {
    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        fname: '',
        lname: ''
    })

    function handleSignup(event){
        event.preventDefault();

        fetch("http://localhost:8000/api/owners", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: signupForm.email,
                password: signupForm.password,
                fname: signupForm.fname,
                lname: signupForm.lname
            })
        })
        .then(r => r.json())
        .then(owner => {
            fetch("http://localhost:8000/token", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer access_token',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: signupForm.email,
                    password: signupForm.password
                })
            })
            .then(r => r.json())
            .then(data => {
                setToken(data.access_token);
                setOwner(data.owner);
                localStorage.setItem('user', JSON.stringify(data.owner));
                navigate('/dashboard');
            })
        })
    }

    function handleChange(event){
        const {value, name} = event.target;
        setSignupForm(prev => ({
            ...prev, [name]: value
        }))
    }

    return(
        <div className="login-form">
            <h2 className="center">Sign Up</h2>
            <h3 className="center">Already have an account? <Link to='/login'>Login!</Link></h3>
            <form>
                <div className="full-row">
                    <label>First Name:</label>
                    <input onChange={handleChange} type='string' name='fname' value={signupForm.fname} />
                </div>
                <div className="full-row">
                    <label>Last Name:</label>
                    <input onChange={handleChange} type='string' name='lname' value={signupForm.lname} />
                </div>
                <div className="full-row">
                    <label>Email:</label>
                    <input onChange={handleChange} type='email' name='email' value={signupForm.email} />
                </div>
                <div className="full-row">
                    <label>Password:</label>
                    <input onChange={handleChange} type='password' name='password' value={signupForm.password} />
                </div>
            </form>
            <div className="button-container">
                <button onClick={handleSignup} className="card-button">Sign Up</button>
            </div>
            <Outlet />
        </div>
    )
}

export default Signup;