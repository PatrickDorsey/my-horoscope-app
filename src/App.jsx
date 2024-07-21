// src/App.jsx
import React, { useState, useEffect } from 'react';
import ZodiacSign from './components/ZodiacSign';
import HoroscopeResult from './components/HoroscopeResult';
import UserInputForm from './components/UserInputForm';
import './App.css';
import './index.css';

const fetchHoroscopeData = async () => {
  const response = await fetch('/horoscope.json');
  return response.json();
};

const App = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscopeData, setHoroscopeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const getHoroscopeData = async () => {
      const data = await fetchHoroscopeData();
      setHoroscopeData(data);
      setLoading(false);
    };

    getHoroscopeData();
  }, []);

  const handleClickOutside = (event) => {
    if (!event.target.closest('.app-content')) {
      setIsRotating((prev) => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignClick = (sign) => {
    setSelectedSign(sign);
  };

  const handleBackClick = () => {
    setSelectedSign(null);
  };

  const handleDateSubmit = (day, month) => {
    const sign = horoscopeData.find((sign) => {
      const [startMonth, startDay] = sign.dateRange.split(' - ')[0].split(' ');
      const [endMonth, endDay] = sign.dateRange.split(' - ')[1].split(' ');

      const startDate = new Date(`2023 ${startMonth} ${startDay}`);
      const endDate = new Date(`2023 ${endMonth} ${endDay}`);
      const inputDate = new Date(`2023 ${month} ${day}`);

      return inputDate >= startDate && inputDate <= endDate;
    });

    if (sign) {
      setSelectedSign(sign);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const zodiacSigns = horoscopeData;
  const numberOfSigns = zodiacSigns.length;
  const radius = 200; // Increased radius for a larger circle

  return (
    <div className="app-container">
      <div className={`background-image ${isRotating ? 'background-image-rotating' : 'background-image-fixed'}`}></div>
      <div className="background-image-second-fixed"></div>
      <div className="app-content">
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
                    <div className="zodiac-name">{sign.name}</div>
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

