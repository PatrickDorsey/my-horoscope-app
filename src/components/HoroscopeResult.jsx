import React, { useEffect } from 'react';
import './HoroscopeResult.css';  

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
    }
  }, [description]);

  // Inline style for background image
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="horoscope-result" style={containerStyle}>
      <button className="back-button" onClick={onBack}>Back</button>
      <img src={image} alt={name} className="horoscope-image" />
      <p><strong>Date Range:</strong> {dateRange}</p>
      <p><strong>Description:</strong> {description}</p>
    </div>
  );
};

export default HoroscopeResult;
