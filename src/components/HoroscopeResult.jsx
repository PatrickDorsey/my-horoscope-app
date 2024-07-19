// src/components/HoroscopeResult.jsx
import React from 'react';
import './index.css';

const HoroscopeResult = ({ sign, onBack }) => {
  return (
    <div className="horoscope-result">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>{sign.name}</h2>
      <img src={sign.image} alt={sign.name} className="horoscope-image" />
      <p><strong>Date Range:</strong> {sign.dateRange}</p>
      <p><strong>Description:</strong> {sign.description}</p>
    </div>
  );
};

export default HoroscopeResult;
