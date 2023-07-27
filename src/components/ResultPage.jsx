import React from 'react';
import { useParams } from 'react-router-dom';
import './styles/styles.css';
import './styles/result.css';
import positiveMessages from '../utils/positiveMessages.js';

const ResultPage = () => {
  const { selectedNumber } = useParams();

  const getCircleColor = () => {
    // Define the base colors for each number
    const colors = {
      '1': 'red',
      '2': 'orange',
      '3': 'yellow',
      '4': 'green',
      '5': 'blue',
    };

    // Get the base color for the selected number
    const baseColor = colors[selectedNumber];

    // Convert the base color to its RGB representation
    const hexToRgb = (hex) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };

    const rgbColor = hexToRgb(baseColor);

    // Adjust the RGB values to create a lighter color
    const lightenColor = (color, amount) => {
      const lightenValue = (value) => Math.min(value + amount, 255);
      return {
        r: lightenValue(color.r),
        g: lightenValue(color.g),
        b: lightenValue(color.b),
      };
    };

    const lighterColor = lightenColor(rgbColor, 40); // You can adjust the amount as needed

    // Convert the lighter color back to hex
    const rgbToHex = (color) => {
      return (
        '#' +
        ((1 << 24) | (color.r << 16) | (color.g << 8) | color.b)
          .toString(16)
          .slice(1)
      );
    };

    const lighterHexColor = rgbToHex(lighterColor);
    return lighterHexColor;
  };

  const getRandomPositiveMessage = (selectedNumber) => {
    const messages = positiveMessages[selectedNumber];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const circleColor = getCircleColor();

  return (
    <div className="result-container">
      <div className="result-message">So your day today was a...</div>
      <div className="circle" style={{ backgroundColor: circleColor }}>
        <div className="number">{selectedNumber}</div>
      </div>
      <div className="positive-message">{getRandomPositiveMessage(selectedNumber)}</div>
    </div>
  );
};

export default ResultPage;