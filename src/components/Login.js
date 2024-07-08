import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import './css/LoginPage.css'; // Make sure to create and import the CSS file

const images = [
    "../../Slide_1.jpg",
    "../../Slide_2.jpg",
    "../../Slide_3.jpg",
    "../../Slide_4.jpg",
    "../../Slide_5.jpg"
  ];

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      console.error("In login", response.data);
      setUser(user); // Set the user information in context
      navigate('/pets/Dog');
    } catch (error) {
      console.error('Error logging in', error);
      if (error.response) {
        setError(error.response.data);
      } else if (error.request) {
        setError('Server did not respond. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const displayedImages = [
    images[currentIndex],
    images[(currentIndex + 1) % images.length],
    images[(currentIndex + 2) % images.length]
  ];
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to view Pet details</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-inputs">
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
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register" className="html-link">Register</Link></p>
      </div>
      <div className="image-gallery">
        <button onClick={handlePrevious} className="nav-button">Previous</button>
        {displayedImages.map((src, index) => (
          <img key={index} src={src} alt={`Pet ${index + 1}`} />
        ))}
        <button onClick={handleNext} className="nav-button">Next</button>
      </div>
    </div>
  );
};

export default Login;
