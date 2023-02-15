import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [owners, setOwners] = useState({
    fname: "",
    lname: "",
    email: "",
    pets: []
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/owners")
    .then((res) => res.json())
    .then((data) => {
      // setOwner({
      //   fname: data.fname,
      //   lname: data.lname,
      //   email: data.email,
      //   pets: data.pets,
      // });
      console.log(data)
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Pet Portal</h1>
      </header>
    </div>
  );
}

export default App;
