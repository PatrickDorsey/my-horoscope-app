import React, { useState, useEffect } from 'react';
import ZodiacSign from './components/ZodiacSign';
import HoroscopeResult from './components/HoroscopeResult';
import UserInputForm from './components/UserInputForm';
import BackgroundMusic from './components/BackgroundMusic'; // Import BackgroundMusic
import TextToSpeech from './components/TextToSpeech'; // Import TextToSpeech
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
  const [playMusic, setPlayMusic] = useState(true); // Manage music playback
  const [speakText, setSpeakText] = useState(""); // Text for speech synthesis
  const [stopSpeech, setStopSpeech] = useState(false); // Control for stopping speech

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
      setSpeakText("Welcome to our horoscope app. Please choose a sign.");
    } else {
      setSpeakText(""); // Clear the text when a sign is selected
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
    setStopSpeech(true); // Stop any ongoing speech
    setSelectedSign(sign);
    setPlayMusic(false); // Stop music when a sign is selected
    setIsRotating(false); // Stop the rotating background image
    setSpeakText(""); // Clear text to prevent repetition
  };

  const handleBackClick = () => {
    setStopSpeech(true); // Stop any ongoing speech
    setSelectedSign(null);
    setPlayMusic(true); // Restart music when back is pressed
    setIsRotating(true); // Restart the rotating background image
    setSpeakText(""); // Clear text to prevent repetition
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

      const startDate = new Date(2023, startMonth, parseInt(startDay, 10));
      const endDate = new Date(2023, endMonth, parseInt(endDay, 10));

      return inputDate >= startDate && inputDate <= endDate;
    });

    if (sign) {
      setStopSpeech(true); // Stop any ongoing speech
      setSelectedSign(sign);
      setSpeakText(sign.description);
    } else {
      alert('No zodiac sign found for the given date.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const zodiacSigns = horoscopeData;
  const numberOfSigns = zodiacSigns.length;
  const radius = 200;
  const backgroundColor = selectedSign ? selectedSign.color : 'transparent'; // Set background color for result page

  return (
    <div className="app-container">
      <BackgroundMusic play={playMusic} /> {/* Add BackgroundMusic component */}
      <TextToSpeech message={speakText} stop={stopSpeech} /> {/* Add TextToSpeech component */}
      <div className={`background-image ${isRotating ? 'background-image-rotating' : 'background-image-fixed'} ${selectedSign ? 'background-image-hidden' : ''}`}></div>
      <div className={`background-image-second-fixed ${selectedSign ? 'background-image-hidden' : ''}`}></div>
      <div className="app-content" style={{ backgroundColor }}>
        {selectedSign ? (
          <HoroscopeResult sign={selectedSign} onBack={handleBackClick} />
        ) : (
          <>
            <h1>Horoscope App</h1>
            <div className="zodiac-container">
              {zodiacSigns.map((sign, index) => {
                const angle = (index / numberOfSigns) * 2 * Math.PI;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={sign.name}
                    className="zodiac-sign"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    onClick={() => handleSignClick(sign)}
                  >
                    <img src={sign.image} alt={sign.name} className="zodiac-image" />
                    {/* Removed the zodiac name */}
                  </div>
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
