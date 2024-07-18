import React from 'react';

const HoroscopeResult = ({ horoscope, onBack }) => (
  <div className="horoscopeResult">
    <button onClick={onBack}>Back to Sign Selection</button>
    <h2>{horoscope.name}'s Horoscope</h2>
    <pre>{JSON.stringify(horoscope, null, 2)}</pre>
  </div>
);

export default HoroscopeResult;
