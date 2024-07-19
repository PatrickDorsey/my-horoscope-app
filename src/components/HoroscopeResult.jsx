import React from 'react';

const HoroscopeResult = ({ horoscope, onBack }) => {
  return (
    <div className="horoscope-result">
      <button onClick={onBack}>Back</button>
      {horoscope.error ? (
        <p>Error: {horoscope.error}</p>
      ) : (
        <>
          <h2>{horoscope.dateRange}</h2>
          <p>{horoscope.description}</p>
        </>
      )}
    </div>
  );
};

export default HoroscopeResult;
