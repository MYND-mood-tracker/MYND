import React, { useState } from 'react';
import '../styles.css';

const LandingPage = () => {
  const [number, setNumber] = useState('');
  const [text, setText] = useState('');

  const handleNumberChange = (increment) => {
    setNumber((prevNumber) => {
      if (prevNumber === '' && increment === -1) return '5';
      if (prevNumber === '' && increment === 1) return '1';
      const newNumber = Number(prevNumber) - increment;
      const clampedNumber = Math.min(Math.max(newNumber, 1), 5).toString();
      setText(textMessages[clampedNumber]); // Update text based on clampedNumber
      return clampedNumber;
    });
  }; 

  const textMessages = {
    '1': "Terrible",
    '2': "Bad",
    '3': "Not bad",
    '4': "Good",
    '5': "Fantastic",
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
      <div className="text-message">{text}</div>
      <button className="submit-button">Submit</button>
    </div>
  );
};

export default LandingPage;