import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {

    // Clear the user's token from localStorage
    localStorage.removeItem('token');

    // Clear user context or perform any other logout tasks
    setUser(null);

    // Reload the page to reset the application state
    window.location.reload();

    // Optionally, navigate to the login page or another route
    navigate('/login');
  };

  return (
    <div>
      <h2>Logging out...</h2>
      {/* You can add more UI elements or messages here if needed */}
      {handleLogout()}
    </div>
  );
};

export default Logout;
