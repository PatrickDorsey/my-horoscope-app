import React from 'react';
import './ZodiacSign.css'; // If there's a CSS file for this component

const ZodiacSign = ({ signs, onSignClick }) => {
  return (
    <div className="zodiac-container">
      {signs.map((sign) => (
        <div key={sign.name} className="zodiac-sign" onClick={() => onSignClick(sign)}>
          <img src={sign.image} alt={sign.name} className="zodiac-image" />
          <div className="zodiac-name">{sign.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ZodiacSign;
