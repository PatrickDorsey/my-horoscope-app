import React from 'react';

const ZodiacSign = ({ sign, onClick }) => {
  return (
    <div className="zodiac-sign" onClick={onClick}>
      <img src={`/images/${sign}.jpg`} alt={sign} /> {/* Updated image path */}
      <p>{sign.toUpperCase()}</p>
    </div>
  );
};

export default ZodiacSign;
