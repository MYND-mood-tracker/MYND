//Dependencies
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/styles.css';
import '../styles/result.css';
import positiveMessages from '../utils/positiveMessages.js';

const ResultPage = () => {
  const { selectedNumber } = useParams();
  console.log('selectedNumber:', selectedNumber);

  const getRandomPositiveMessage = (selectedNumber) => {
    const messages = positiveMessages[selectedNumber];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const positiveMessage = getRandomPositiveMessage(selectedNumber);

  return (
    <div className="result-container">
      <div className="result-message">So your day today was a...</div>
      <div className={`circle circle-${selectedNumber}`}>
        <div className="selected-number">{selectedNumber}</div>
      </div>
      <div className="positive-message">{positiveMessage}</div>
      <div className="mood-buttons">
        <Link to="/weekly-moods" className="weekly-button">
          Weekly Moods
        </Link>
        <button className="monthly-button">Monthly Moods</button>
      </div>
    </div>
  );
};

export default ResultPage;
