import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './css/PetDetail.css'; // Import the CSS file

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pets/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error('Error fetching pet details', error);
      }
    };
    fetchPet();
  }, [id]);

  return (
    <div className="pet-page">
      <h1>Selected Pet Details</h1>
      {pet ? (
        <div className="pet-detail-container">
          <img src={`data:image/jpeg;base64,${pet.image}`} alt={pet.name} className="pet-image" />
          <div className="pet-details">
            <h2>{pet.name}</h2>
            <p><strong>Age:</strong> {pet.age} years</p>
            <p><strong>Type:</strong> {pet.type}</p>
            <p><strong>Description:</strong> {pet.description}</p>
            <p>Return to <Link to={`/pets/${pet.type}`} className="html-link">{pet.type}s List</Link></p>
          </div>
        </div>
      ) : (
        <p>Loading pet details...</p>
      )}
    </div>
  );
};

export default PetDetail;
