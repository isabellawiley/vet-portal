import './App.css';
import { useEffect, useState } from 'react';
import Dashboard from './components/owner/Dashboard';
import {Routes, Route, Outlet, Link, useNavigate} from "react-router-dom";
import Pets from './components/pet/Pets';
import Login from './components/owner/Login';
import useToken from './components/useToken';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Appointments from './components/appointment/Appointments';
import Vets from './components/Vets';

function App() {
  const [owner, setOwner] = useState({});
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const {token, removeToken, setToken} = useToken();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = (localStorage.getItem("token"));
    console.log("user: ", user)
    if(user && token){
      fetch(`http://localhost:8000/api/owners/${user.id}`)
      .then(res => res.json())
      .then(owner => {
        setOwner(owner);
        setPets(owner.pets);
        setToken(token)
      })
      fetch(`http://localhost:8000/api/owners/${user.id}/appointments`)
        .then(res => res.json())
        .then(data => setAppointments(data))
    }
    else {
      navigate('/login')
    }
    
  }, []);

  console.log("owner: ", owner)
  console.log("token: ", token)

  return (
    <div className="App">
      <Navbar removeToken={removeToken} setOwner={setOwner}/>
      {owner ? <h1>Welcome {owner.fname}!</h1> : <h1>Welcome to Pet Portal</h1>}
      {!token && token!=="" &&token!== undefined && !owner ? (
        <Routes>
          <Route path='/login' element={<Login setToken={setToken} setOwner={setOwner} navigate={navigate}/>} />
        </Routes>
      ): (
        <Routes>
            <Route path='/dashboard' element={<Dashboard owner={owner} pets={pets} appointments={appointments}/>} />
            <Route path='/my-pets' element={<Pets pets={pets} />} />
            <Route path='/my-appointments' element={<Appointments appointments={appointments} />} />
            <Route path='/vets' element={<Vets />} />
          </Routes>
      )}
          
      
    </div>
  );
}

export default App;