// src/components/HoroscopeResult.jsx
import React from 'react';
import './HoroscopeResult.css'; // Assuming you still want this for additional styling

const HoroscopeResult = ({ sign, onBack }) => {
  // Extract the color from the sign data
  const { name, image, dateRange, description, color } = sign;

  return (
    <div className="horoscope-result" style={{ backgroundColor: color }}>
      <button className="back-button" onClick={onBack}>Back</button>

      <img src={image} alt={name} className="horoscope-image" />
      <p><strong>Date Range:</strong> {dateRange}</p>
      <p><strong>Description:</strong> {description}</p>
    </div>
  );
};

export default HoroscopeResult;
