import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const LandingPage = () => {
  const [number, setNumber] = useState('');

  const handleNumberChange = (increment) => {
    setNumber((prevNumber) => {
      if (prevNumber === '' && increment === -1) return '5';
      if (prevNumber === '' && increment === 1) return '1';
      const newNumber = Number(prevNumber) - increment;
      return Math.min(Math.max(newNumber, 1), 5).toString();
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
      <Link to={`/result/${number}`} className="submit-button">
        Submit
      </Link>
    </div>
  );
};

export default LandingPage;