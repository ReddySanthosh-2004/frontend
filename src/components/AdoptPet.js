import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AdoptPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    adoptPet();
  }, []);

  const adoptPet = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/pets/${id}`);
      navigate('/pets/dog');
    } catch (error) {
      console.error('Error adopting pet:', error);
    }
  };

  return (
    <div>
      <h2>Processing adoption...</h2>
    </div>
  );
};

export default AdoptPet;
