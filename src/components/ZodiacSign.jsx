import React from 'react';

const ZodiacSign = ({ sign, onClick }) => (
  <button onClick={() => onClick(sign)}>
    <img src={`/images/${sign}.jpg`} alt={sign} />
    <p>{sign}</p>
  </button>
);

export default ZodiacSign;
