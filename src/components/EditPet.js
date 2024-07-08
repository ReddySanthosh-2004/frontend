import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './css/EditPet.css'; // Import the CSS file

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState({
    name: '',
    age: '',
    type: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchPetDetails();
  }, []);

  const fetchPetDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pets/${id}`);
      console.error(response.data);
      setPet(response.data);
    } catch (error) {
      console.error('Error fetching pet details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet({
      ...pet,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.error(e.target.files[0]);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPet({
        ...pet,
        image: reader.result.split(',')[1] // Get base64 string
      });
      console.log(pet.image);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/pets/${id}`, pet);
      navigate(`/pet/${id}`);
    } catch (error) {
      console.error('Error updating pet details:', error);
    }
  };

  return (
    <div className="edit-pet-container">
      <h2>Edit Pet Details</h2>
      {pet.image && <img src={`data:image/jpeg;base64,${pet.image}`} alt={pet.name} className="preview-image" />}
      <form onSubmit={handleSubmit} className="edit-pet-form">
      <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" onChange={handleFileChange} />
          
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={pet.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={pet.age} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input type="text" id="type" name="type" value={pet.type} readOnly placeholder='Hello' />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={pet.description} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
      <p>Back to {pet.type}s List <Link to={`/pet/${pet.type}`} className="html-link"> {pet.type}s </Link></p>
    </div>
  );
};

export default EditPet;
