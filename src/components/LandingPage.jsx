//Dependencies
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/styles.css';

const LandingPage = () => {
  const [number, setNumber] = useState('');
  const navigate = useNavigate(); 

  const handleNumberChange = (increment) => {
    setNumber((prevNumber) => {
      if (prevNumber === '' && increment === -1) return '5';
      if (prevNumber === '' && increment === 1) return '1';
      const newNumber = Number(prevNumber) - increment;
      return Math.min(Math.max(newNumber, 1), 5).toString();
    });
  };

  const handleMood = true;
  const defaultNumber = 0;
  const maxNumber = 5;

  const handleSubmit = () => {
    fetch('/api/selected-number', {
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
