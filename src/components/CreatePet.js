import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreatePet = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    type: '',
    description: '',
    image: null
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    console.error(e.target.value);
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', formData.age);
    data.append('type', formData.type);
    data.append('description', formData.description);
    data.append('image', formData.image);
console.error(data);
console.error(data.name);
    try {
      const response = await axios.post('http://localhost:5000/api/pets/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("data ",data);
      alert('Pet Created Sucessfully! Redirecting to Pet Details Page');
      navigate('/pet/'+response.data._id)
    } catch (error) {
      console.error('Error creating Pet', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        setError(error.response.data);
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
      <div className="create-pet-page" >
          <div className="login-container" style={{ marginTop: -200 }}>
              <h2>Enter Pet Details</h2>
              <form onSubmit={handleSubmit}>
                  <div className="login-inputs">
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
                      <select name="type" onChange={handleChange} style={{height:30}}>
                        <option value="">Select Pet type</option>
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                          <option value="Bird">Bird</option>
                          <option value="Other">Other</option>
                      </select>
                      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required ></textarea>
                      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <button type="submit" className="login-button">Create Pet</button>
              </form>
              {/* <p>Back to <Link to="/login" className="html-link">Login</Link> page</p> */}
          </div>
      </div>
  );
};

export default CreatePet;
