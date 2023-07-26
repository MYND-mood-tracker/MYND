// LandingPage.jsx
import React, { useState } from 'react';
import '../styles.css';

const LandingPage = () => {
  const [number, setNumber] = useState(''); 

  const handleNumberChange = (increment) => {
    
    setNumber((prevNumber) => {
      if (prevNumber === '' && increment === -1) return 5; 
      if (prevNumber === '' && increment === 1) return 1; 
      const newNumber = Number(prevNumber) - increment;
      return Math.min(Math.max(newNumber, 1), 5); 
    });
  };

  return (
    <div className="container">
      <div className="message-wrapper">
        <div className="message">Hey, how are you feeling today?</div>
      </div>
      <div className="number-box-wrapper">
        <div className={`number-box ${number === '3' ? 'text-not-bad' : ''}`}>
          {number}
          <div className="arrow-buttons">
            <span className="arrow-button" onClick={() => handleNumberChange(-1)}>
              &#x25B2; {/* Up arrow */}
            </span>
            <span className="arrow-button" onClick={() => handleNumberChange(1)}>
              &#x25BC; {/* Down arrow */}
            </span>
          </div>
        </div>
      </div>
      <button className="submit-button">Submit</button>
    </div>
  );
}

export default LandingPage;
