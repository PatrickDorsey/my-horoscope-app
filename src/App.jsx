// src/App.jsx
import React, { useState, useEffect } from 'react';
import ZodiacSign from './components/ZodiacSign';
import HoroscopeResult from './components/HoroscopeResult';
import './App.css';

const App = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [zodiacSigns, setZodiacSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/horoscope.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setZodiacSigns(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSignClick = (sign) => {
    setSelectedSign(sign);
  };

  const handleBack = () => {
    setSelectedSign(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app">
      {selectedSign ? (
        <HoroscopeResult sign={selectedSign} onBack={handleBack} />
      ) : (
        <div className="zodiac-container">
          {zodiacSigns.map((sign, index) => (
            <ZodiacSign
              key={index}
              sign={sign}
              onClick={handleSignClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
