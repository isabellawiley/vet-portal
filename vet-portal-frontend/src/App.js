import './App.css';
import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import {Routes, Route, Outlet, Link, useNavigate} from "react-router-dom";
import Pets from './components/pet/Pets';
import Login from './components/owner/Login';
import useToken from './components/useToken';
import Header from './components/Header';

function App() {
  const [owner, setOwner] = useState();
  const navigate = useNavigate();
  const {token, removeToken, setToken} = useToken();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      fetch("http://localhost:8000/api/owners/1")
      .then((res) => res.json())
      .then((data) => {
        setOwner(data)
        localStorage.setItem("user", JSON.stringify(data))
      });
    }
    else {
      navigate.push('/login')
    }
    
  }, []);

  return (
    <div className="App">
      <Header removeToken={removeToken}/>
      <h1>Welcome to Pet Portal</h1>
      {!token && token!=="" &&token!== undefined?
      <Login setToken={setToken} /> : (
        <>
          <Routes>
            <Route path='/dashboard' element={<Dashboard owner={owner} token={token} setToken={setToken}/>} />
            <Route path='/my-pets' element={<Pets pets={owner.pets} />} />
            <Route path='/my-appointments' element />
            <Route path='/vets' element />
            <Route path='/login' element={<Login setOwner={setOwner}/>} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
