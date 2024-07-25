import React, { useState, useEffect } from 'react';
import ZodiacSign from './components/ZodiacSign';
import HoroscopeResult from './components/HoroscopeResult';
import UserInputForm from './components/UserInputForm';
import BackgroundMusic from './components/BackgroundMusic'; 
import TextToSpeech from './components/TextToSpeech'; 
import './App.css';
import './index.css';

const fetchHoroscopeData = async () => {
  const response = await fetch('/horoscope.json');
  return response.json();
};

const monthToNumber = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const App = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscopeData, setHoroscopeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const [playMusic, setPlayMusic] = useState(true);
  const [speechMessage, setSpeechMessage] = useState('');
  const [stopSpeech, setStopSpeech] = useState(false);

  useEffect(() => {
    const getHoroscopeData = async () => {
      const data = await fetchHoroscopeData();
      setHoroscopeData(data);
      setLoading(false);
    };

    getHoroscopeData();
  }, []);

  useEffect(() => {
    if (!selectedSign) {
      setSpeechMessage("Welcome to the horoscope app. Please choose a sign.");
    } else if (selectedSign) {
      setSpeechMessage(selectedSign.description);
      setStopSpeech(false);
    }
  }, [selectedSign]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.app-content')) {
        setIsRotating((prev) => !prev);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignClick = (sign) => {
    setSelectedSign(sign);
    setPlayMusic(false);
    setIsRotating(false);
    setStopSpeech(true);
  };

  const handleBackClick = () => {
    setSelectedSign(null);
    setPlayMusic(true);
    setIsRotating(true);
    setStopSpeech(true);
  };

  const handleDateSubmit = (day, month) => {
    const monthNumber = monthToNumber[month];

    if (monthNumber === undefined) {
      alert("Invalid month. Please enter a valid month name.");
      return;
    }

    const inputDate = new Date(2023, monthNumber, day);

    const sign = horoscopeData.find((sign) => {
      const [startMonthName, startDay] = sign.dateRange.split(' - ')[0].split(' ');
      const [endMonthName, endDay] = sign.dateRange.split(' - ')[1].split(' ');

      const startMonth = monthToNumber[startMonthName];
      const endMonth = monthToNumber[endMonthName];

      let startDate = new Date(2023, startMonth, parseInt(startDay, 10));
      let endDate = new Date(2023, endMonth, parseInt(endDay, 10));

      if (startMonth > endMonth) {
        // Handle year rollover for signs like Capricorn
        if (inputDate >= startDate || inputDate <= endDate) {
          return true;
        }
      } else {
        if (inputDate >= startDate && inputDate <= endDate) {
          return true;
        }
      }

      return false;
    });

    if (sign) {
      setSelectedSign(sign);
      setSpeechMessage(sign.description);
      setStopSpeech(false);
    } else {
      alert('No zodiac sign found for the given date.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const zodiacSigns = horoscopeData;

  return (
    <div className="app-container">
      <BackgroundMusic play={playMusic} />
      <TextToSpeech message={speechMessage} stop={stopSpeech} />
      <div className={`background-image ${isRotating ? 'background-image-rotating' : 'background-image-fixed'} ${selectedSign ? 'background-image-hidden' : ''}`}></div>
      <div className={`background-image-second-fixed ${selectedSign ? 'background-image-hidden' : ''}`}></div>
      <div className="app-content" style={{ backgroundColor: selectedSign ? selectedSign.color : 'transparent' }}>
        {/* Navigation Panel */}
        <nav className="zodiac-navigation">
          {zodiacSigns.map((sign) => (
            <button 
              key={sign.name} 
              className="zodiac-nav-item" 
              onClick={() => handleSignClick(sign)}
            >
              {sign.name}
            </button>
          ))}
        </nav>

        {selectedSign ? (
          <HoroscopeResult sign={selectedSign} onBack={handleBackClick} />
        ) : (
          <>
            <h1>Horoscope App</h1>
            <div className="zodiac-container">
              {zodiacSigns.map((sign, index) => {
                const angle = (index / zodiacSigns.length) * 2 * Math.PI;
                const x = Math.cos(angle) * 200;
                const y = Math.sin(angle) * 200;

                return (
                  <ZodiacSign 
                    key={sign.name} 
                    sign={sign} 
                    onClick={() => handleSignClick(sign)}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  />
                );
              })}
            </div>
            <UserInputForm onDateSubmit={handleDateSubmit} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
