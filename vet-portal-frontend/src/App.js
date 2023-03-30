import { useEffect, useState } from 'react';
import Dashboard from './components/owner/Dashboard';
import {Routes, Route, useNavigate} from "react-router-dom";
import Pets from './components/pet/Pets';
import Login from './components/owner/Login';
import useToken from './components/owner/useToken';
import Navbar from './components/Navbar';
import Appointments from './components/appointment/Appointments';
import Vets from './components/vets/Vets';
import Home from './components/Home';
import Signup from './components/owner/Signup';
import ProtectedRoute from './ProtectedRoute';
import LoadingPage from './components/LoadingPage';
import Footer from './Footer';

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
    if(user && token){
      fetch(`https://pet-portal.herokuapp.com/api/owners/${user.id}`)
      .then(res => res.json())
      .then(owner => {
        setOwner(owner);
        setPets(owner.pets);
        setToken(token)
      })
      fetch(`https://pet-portal.herokuapp.com/api/owners/${user.id}/appointments`)
        .then(res => res.json())
        .then(data => setAppointments(data))
      }
      else {
        navigate('/')
      }
      fetch('https://pet-portal.herokuapp.com/api/vets')
        .then(res => res.json())
        .then(data => setVets(data))
    
  }, []);

  return (
    <div className="App">
      <Navbar removeToken={removeToken} setOwner={setOwner} owner={owner} setPets={setPets} setAppointments={setAppointments}/>
        <div className='page'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login setToken={setToken} setOwner={setOwner} navigate={navigate} setPets={setPets} setAppointments={setAppointments}/>} />
            <Route path='/signup' element={<Signup setToken={setToken} setOwner={setOwner} navigate={navigate} />} />
            <Route path='/dashboard' element={
              <ProtectedRoute user={owner} token={token}>
                {owner && pets && appointments && vets ? 
                  <Dashboard owner={owner} setOwner={setOwner} pets={pets} appointments={appointments} vets={vets}/>
                :
                  <LoadingPage />
                }
              </ProtectedRoute>}/>
            <Route path='/my-pets' element={
              <ProtectedRoute user={owner} token={token}>
                {owner && pets ?
                  <Pets pets={pets} owner={owner} setPets={setPets}/>
                :
                  <LoadingPage />
                }
              </ProtectedRoute>
            } />
            <Route path='/my-appointments' element={
              <ProtectedRoute user={owner} token={token}>
                {appointments && pets && vets ?
                  <Appointments setAppointments={setAppointments} appointments={appointments} pets={pets} vets={vets} setVets={setVets}/>  
                :
                  <LoadingPage />   
                }
              </ProtectedRoute>
            } />
            <Route path='/vets' element={<Vets vets={vets}/>}/>
          </Routes>
          <Footer />
        </div>
    </div>
  );
}

export default App;
