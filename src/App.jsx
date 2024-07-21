import React, { useState, useEffect } from 'react';
import ZodiacSign from './components/ZodiacSign';
import HoroscopeResult from './components/HoroscopeResult';
import TextToSpeech from './components/TextToSpeech';
import './App.css';

const App = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [playWelcome, setPlayWelcome] = useState(true);
  const [zodiacSigns, setZodiacSigns] = useState([]);

  useEffect(() => {
    // Fetch the JSON file from the public directory
    fetch('/horoscope.json')
      .then(response => response.json())
      .then(data => setZodiacSigns(data))
      .catch(error => console.error('Error fetching zodiac signs:', error));
  }, []);

  const handleSignClick = (sign) => {
    setSelectedSign(sign);
    setPlayWelcome(false); // Stop the welcome message when a sign is selected
  };

  const handleBack = () => {
    setSelectedSign(null);
    setPlayWelcome(true); // Play the welcome message again when back is pressed
  };

  return (
    <div className="app-container">
      {playWelcome && <TextToSpeech message="Welcome to the Horoscope App. Please select your zodiac sign." />}
      {!selectedSign ? (
        <ZodiacSign signs={zodiacSigns} onSignClick={handleSignClick} />
      ) : (
        <HoroscopeResult sign={selectedSign} onBack={handleBack} />
      )}
    </div>
  );
};

export default App;
