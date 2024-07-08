import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import PetDetail from './components/PetDetail';
import CreatePet from './components/CreatePet';
import Pet from './components/Pet'; // Import the generic Pet component

import EditPet from './components/EditPet';
import AdoptPet from './components/AdoptPet';
import { UserContext } from './contexts/UserContext';
import './App.css';

const App = () => {
  const { user } = useContext(UserContext);
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Router>
      <div className="wrapper">
        <h1 className="App-header">Welcome to the Pet Adoption Platform
          {isAuthenticated && user && <div style={{textAlign:'right',fontSize:20, marginLeft:'auto', marginRight:0, paddingRight:10}}>Welcome {user.name}<Link to="/logout" className='logout-link'>Logout</Link></div>}</h1>
          {isAuthenticated && user && (
          <nav className="nav-bar">
            <ul>
              <li><Link to="/pets/Dog">Dogs</Link></li>
              <li><Link to="/pets/Cat">Cats</Link></li>
              <li><Link to="/pets/Bird">Birds</Link></li>
              <li><Link to="/pets/Other">Other Pets</Link></li>
              <li><Link to="/CreatePet">Add a Pet</Link></li>
            </ul>
          </nav>
        )}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pets/:type" element={<Pet />} />
          <Route path="/pets" element={<Pet />} />
          <Route path="/pet/:id" element={<PetDetail />} />
          <Route path="/CreatePet" element={<CreatePet />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/EditPet/:id" element={<EditPet />} />
          <Route path="/AdoptPet/:id" element={<AdoptPet />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
