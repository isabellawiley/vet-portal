import { useState } from "react";
import { Outlet } from "react-router-dom";

function Login({setToken, setOwner, navigate}){
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    function handleLogin(event){
        event.preventDefault();

        fetch("http://localhost:8000/token", {
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
            setToken(data.access_token)
            setOwner(data.owner)
            localStorage.setItem('user', JSON.stringify(data.owner))
            console.log(data.owner)
        })
        
        setLoginForm(({
            email: '',
            password: ''
        }))

        navigate('/dashboard')
    }

    function handleChange(event) {
        const {value, name} = event.target
        setLoginForm(prevNote => ({
            ...prevNote, [name]: value
        }))
    }

    return(
        <div>
            <h2>Login</h2>
            <h2>Don't have an account? Sign up!</h2>
            <form onSubmit={handleLogin}>
                <label>Email:
                    <input onChange={handleChange} type="email" name="email" text={loginForm.email} value={loginForm.email}/>
                </label>
                <label>Password:
                    <input onChange={handleChange} type="password" name="password" text={loginForm.password} value={loginForm.password}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <Outlet />
        </div>
    )
}

export default Login;