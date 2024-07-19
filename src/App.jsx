import React, { useEffect, useState } from 'react';
import ZodiacSign from './components/ZodiacSign';
import HoroscopeResult from './components/HoroscopeResult';
import './App.css'; // Assuming you have some basic styling

const App = () => {
  const [horoscopes, setHoroscopes] = useState([]);
  const [selectedSign, setSelectedSign] = useState(null);

  useEffect(() => {
    fetch('/horoscope.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setHoroscopes(data))
      .catch(error => console.error('Error fetching the horoscope data:', error));
  }, []);

  const handleSignClick = (sign) => {
    setSelectedSign(sign);
  };

  const handleBackClick = () => {
    setSelectedSign(null);
  };

  return (
    <div className="app">
      <h1>Horoscope Signs</h1>
      {selectedSign ? (
        <HoroscopeResult
          horoscope={horoscopes.find(h => h.name === selectedSign)}
          onBack={handleBackClick}
        />
      ) : (
        <div className="zodiac-signs">
          {horoscopes.map((sign, index) => (
            <ZodiacSign
              key={index}
              sign={sign.name}
              onClick={() => handleSignClick(sign.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
