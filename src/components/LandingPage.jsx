// LandingPage.jsx
import React, { useState } from 'react';
import '../styles.css';

const LandingPage = () => {
  const [number, setNumber] = useState(''); // Default number is an empty string

  const handleNumberChange = (increment) => {
    // Function to handle number changes when clicking the arrow buttons
    setNumber((prevNumber) => {
      if (prevNumber === '' && increment === -1) return 5; // If the current value is empty and decrementing, set to 5
      if (prevNumber === '' && increment === 1) return 1; // If the current value is empty and incrementing, set to 1
      const newNumber = Number(prevNumber) + increment;
      return Math.min(Math.max(newNumber, 1), 5); // Ensure the number stays within 1 to 5 range
    });
  };

  return (
    <div className="container">
      <div className="message">Hey, how are you feeling today?</div>
      <div className={`number-box ${number === '3' ? 'text-not-bad' : ''}`}>{number}</div>
      <div>
        <span className="arrow-button" onClick={() => handleNumberChange(-1)}>
          &#x25BC; {/* Down arrow */}
        </span>
        <span className="arrow-button" onClick={() => handleNumberChange(1)}>
          &#x25B2; {/* Up arrow */}
        </span>
      </div>
      <button className="submit-button">Submit</button>
    </div>
  );
};

export default LandingPage;
