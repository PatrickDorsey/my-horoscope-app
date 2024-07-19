// src/components/ZodiacSign.jsx
import React from 'react';


const ZodiacSign = ({ sign, onClick }) => {
  return (
    <div className="zodiac-sign" onClick={() => onClick(sign)}>
      <img src={sign.image} alt={sign.name} className="zodiac-image" />
      <p>{sign.name}</p>
    </div>
  );
};

export default ZodiacSign;
