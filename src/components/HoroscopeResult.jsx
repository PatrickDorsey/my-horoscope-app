import React, { useEffect } from 'react';
import './HoroscopeResult.css'; // Ensure the CSS file is imported

const HoroscopeResult = ({ sign, onBack }) => {
  const { name, image, dateRange, description, color, backgroundImage } = sign;

  useEffect(() => {
    if (description) {
      const speakText = (text) => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          speechSynthesis.speak(utterance);
        }
      };

      speakText(description);

      // Stop any previous speech if "Back" button is clicked
      return () => {
        speechSynthesis.cancel(); // Clean up if component unmounts or back button is clicked
      };
    }
  }, [description]);

  return (
    <div
      className="horoscope-result"
      style={{
        backgroundColor: color, // Background color of the result display
      }}
    >
      {backgroundImage && (
        <div
          className="result-background-image"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      )}
      <button className="back-button" onClick={onBack}>Back</button>
      <img src={image} alt={name} className="horoscope-image" />
      <p><strong>Date Range:</strong> {dateRange}</p>
      <p><strong>Description:</strong> {description}</p>
    </div>
  );
};

export default HoroscopeResult;
