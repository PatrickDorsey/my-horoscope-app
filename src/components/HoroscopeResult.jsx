import React from 'react';

const HoroscopeResult = ({ horoscope, onBack }) => {
  return (
    <div className="horoscope-result">
      <button onClick={onBack}>Back</button>
      {horoscope.error ? (
        <p>Error: {horoscope.error}</p>
      ) : (
        <>
          <h2>{horoscope.date}</h2> {/* Assuming 'date' is a key in the horoscope data */}
          <p>{horoscope.horoscope}</p> {/* Assuming 'horoscope' is a key containing the actual horoscope text */}
        </>
      )}
    </div>
  );
};

export default HoroscopeResult;
