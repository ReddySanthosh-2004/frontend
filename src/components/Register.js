import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './css/LoginPage.css';


const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      alert('User registered Sucessfully! Redirecting to login page');
      navigate('/login');
    } catch (error) {
      console.error('Error registering user', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        setError('Server did not respond. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-page" >
      <div className="login-container" style={{marginTop:-200}}>
        <h2>Enter details below to Create a user</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-inputs">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">Register</button>
        </form>
        <p>Back to <Link to="/login" className="html-link">Login</Link> page</p>
      </div>
    </div>
  );
};

export default Register;
