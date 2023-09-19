import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const LandingPage = () => {
  const [number, setNumber] = useState('5');  
  const navigate = useNavigate();

  const handleNumberChange = (increment) => {
    setNumber((prevNumber) => {
      const newNumber = Math.min(Math.max(parseInt(prevNumber) + increment, 1), 5);
      return newNumber.toString();
    });
  };

  const handleSubmit = () => {
    fetch('http://localhost:8080/api/selected-number', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save selected number');
        }
        console.log('Selected number saved successfully');
        navigate(`/result/${number}`);
      })
      .catch((error) => {
        console.error('Error saving selected number:', error);
      });
  };

  return (
    <div className="container">
      <div className="message-wrapper">
        <div className="message">Hey! How was your day?</div>
      </div>
      <div className={`number-box number-${number}`}>
        <div className="number-text">{number}</div>
        <div className="arrow-buttons">
          <span className="arrow-button" onClick={() => handleNumberChange(-1)}>
            &#x25B2;
          </span>
          <span className="arrow-button" onClick={() => handleNumberChange(1)}>
            &#x25BC;
          </span>
        </div>
      </div>
      <Link to={`/result/${number}`} className="submit-button" onClick={handleSubmit}>
        Submit
      </Link>
    </div>
  );
};

export default LandingPage;
