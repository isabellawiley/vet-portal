import { useEffect, useState } from 'react';
import Dashboard from './components/owner/Dashboard';
import {Routes, Route, Outlet, Link, useNavigate} from "react-router-dom";
import Pets from './components/pet/Pets';
import Login from './components/owner/Login';
import useToken from './components/owner/useToken';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Appointments from './components/appointment/Appointments';
import Vets from './components/vets/Vets';
import Home from './components/Home';
import Signup from './components/owner/Signup';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [owner, setOwner] = useState(null);
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [vets, setVets] = useState([]);
  const navigate = useNavigate();
  const {token, removeToken, setToken} = useToken();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = (localStorage.getItem("token"));
    // console.log("user: ", user)
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
        navigate('/')
      }
      fetch('http://localhost:8000/api/vets')
        .then(res => res.json())
        .then(data => setVets(data))
    
  }, []);

  console.log("owner: ", owner)
  // console.log("token: ", token)
  // console.log("pets: ", pets)

  return (
    <div className="App">
      <Navbar removeToken={removeToken} setOwner={setOwner} owner={owner} setPets={setPets} setAppointments={setAppointments}/>
      {/* {owner ? <h1>Welcome {owner.fname}!</h1> : <h1>Welcome to Pet Portal</h1>} */}
      {/* {!token && token!=="" &&token!== undefined && !owner ? (
        <div className='page'>
          <Routes>
          </Routes>
        </div>
      ): ( */}
        <div className='page'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login setToken={setToken} setOwner={setOwner} navigate={navigate} setPets={setPets} setAppointments={setAppointments}/>} />
            <Route path='/signup' element={<Signup setToken={setToken} setOwner={setOwner} navigate={navigate} />} />
            <Route path='/dashboard' element={
              <ProtectedRoute user={owner} token={token}>
                <Dashboard owner={owner} pets={pets} appointments={appointments} vets={vets}/>
              </ProtectedRoute>}/>
            <Route path='/my-pets' element={
              <ProtectedRoute user={owner} token={token}>
                <Pets pets={pets} owner={owner} />
              </ProtectedRoute>
            } />
            <Route path='/my-appointments' element={
              <ProtectedRoute user={owner} token={token}>
                <Appointments setAppointments={setAppointments} appointments={appointments} pets={pets} vets={vets}/>            
              </ProtectedRoute>
            } />
            <Route path='/vets' element={<Vets vets={vets}/>}/>
          </Routes>
        </div>
      {/* )} */}
          
      
    </div>
  );
}

export default App;
