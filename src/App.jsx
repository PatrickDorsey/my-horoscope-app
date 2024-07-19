import React, { useState, useEffect } from 'react';
import ZodiacSign from './components/ZodiacSign';
import HoroscopeResult from './components/HoroscopeResult';
import './index.css'; // Ensure the CSS file is imported

const App = () => {
  const [horoscopes, setHoroscopes] = useState([]);
  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscope, setHoroscope] = useState(null);

  useEffect(() => {
    fetch('/horoscope.json')
      .then(response => response.json())
      .then(data => setHoroscopes(data))
      .catch(error => console.error('Error fetching horoscope data:', error));
  }, []);

  const handleSignClick = (sign) => {
    setSelectedSign(sign);
    // Fetch or set the horoscope based on the selected sign
    // For example:
    setHoroscope({
      date: 'Today',
      horoscope: `This is the horoscope for ${sign}.`
    });
  };

  const handleBack = () => {
    setSelectedSign(null);
    setHoroscope(null);
  };

  return (
    <div>
      {!selectedSign ? (
        <div className="zodiac-container">
          {horoscopes.map((sign, index) => (
            <ZodiacSign
              key={index}
              sign={sign}
              onClick={() => handleSignClick(sign)}
            />
          ))}
        </div>
      ) : (
        <HoroscopeResult horoscope={horoscope} onBack={handleBack} />
      )}
    </div>
  );
};

export default App;
