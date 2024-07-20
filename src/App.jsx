// src/App.jsx
import React, { useState } from 'react';
import ZodiacSign from './components/ZodiacSign';
import HoroscopeResult from './components/HoroscopeResult';
import UserInputForm from './components/UserInputForm';
import './App.css';

// Load the horoscope data from the public folder
const fetchHoroscopeData = async () => {
  const response = await fetch('/horoscope.json');
  return response.json();
};

const App = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscopeData, setHoroscopeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch horoscope data on component mount
  React.useEffect(() => {
    const getHoroscopeData = async () => {
      const data = await fetchHoroscopeData();
      setHoroscopeData(data);
      setLoading(false);
    };

    getHoroscopeData();
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

  return (
    <div className="app">
      <div className="app-content">
        {selectedSign ? (
          <HoroscopeResult sign={selectedSign} onBack={handleBackClick} />
        ) : (
          <>
            <h1>Horoscope App</h1>
            <div className="zodiac-container">
              {horoscopeData.map((sign) => (
                <ZodiacSign key={sign.name} sign={sign} onClick={() => handleSignClick(sign)} />
              ))}
            </div>
            <UserInputForm onDateSubmit={handleDateSubmit} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
