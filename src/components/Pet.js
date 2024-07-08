import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Pet.css'; // Import the CSS file
import { useParams, Link } from 'react-router-dom';

const Pet = () => {
  const { type } = useParams(); // Get the type parameter from URL
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, [type]);

  const fetchPets = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pets?category=${type}`);
      setPets(response.data);
    } catch (error) {
      console.error(`Error fetching ${type}s:`, error);
    }
  };

  const handleAdopt = async (petId) => {
    if (window.confirm(`Are you sure you want to adopt this ${type}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/pets/${petId}`);
        fetchPets(); // Refresh the pet list after adoption
      } catch (error) {
        console.error(`Error adopting ${type}:`, error);
      }
    }
  };

  return (
    <div className="pet-container">
        {pets.length === 0 ?  "" : (<h2>{type === "Other" ? `${type} Pet` : `${type}` }s Available for Adoption</h2>)}
      {pets.length === 0 ? (
        <p className="no-pets-message">No {type === "Other" ? `${type} Pet` : `${type}` }s available for adoption at the moment. Please check back later!</p>
      ) : (
        <div className="pet-list">
          {pets.map((pet) => (
            <div className="pet-card" key={pet._id}>
              <img src={`data:image/jpeg;base64,${pet.image}`} alt={pet.name} className="pet-image" />
              <div className="pet-details">
                <h3>{pet.name}</h3>
                <p><strong>Age:</strong> {pet.age} years</p>
                <p><strong>Type:</strong> {pet.type}</p>
                <p><strong>Description:</strong> {pet.description}</p>
                <p><Link to={`/pet/${pet._id}`} className="html-link"> View </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to={`/EditPet/${pet._id}`} className="html-link"> Edit </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleAdopt(pet._id)} className="adopt-button">Adopt</button></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pet;
