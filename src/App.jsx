import React, { useState, useRef, useEffect } from 'react';
import ZodiacSign from './components/ZodiacSign';
import HoroscopeResult from './components/HoroscopeResult';
import './App.css';

const signs = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const App = () => {
  const [horoscope, setHoroscope] = useState(null);
  const [birthDate, setBirthDate] = useState('');
  const [selectedSign, setSelectedSign] = useState('');
  const apiHost = useRef('daily-horoscope3.p.rapidapi.com');
  const apiKey = useRef('dbb51d66d0msh5d407d2424cc55bp13e12djsn1af279d7aa73');

  const fetchHoroscope = async (sign, date) => {
    try {
      const formData = new FormData();
      formData.append('sign', sign.toUpperCase());
      formData.append('date', date); // Assuming date is in YYYY-MM-DD format
      formData.append('api_key', apiKey.current);
      formData.append('timezone', '5.5');

      const response = await fetch(`https://${apiHost.current}/api/1.0/get_daily_horoscope.php`, {
        method: 'POST',
        headers: {
          'x-rapidapi-host': apiHost.current,
          'x-rapidapi-key': apiKey.current,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setHoroscope(data);
    } catch (error) {
      console.error('Error fetching horoscope:', error.message);
      // Optionally, handle error state or display error message to the user
    }
  };

  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };

  const handleBack = () => {
    setHoroscope(null);
    setSelectedSign('');
  };

  return (
    <div className="App">
      <h1>Horoscope App</h1>
      {!selectedSign && (
        <>
          <input
            type="date"
            value={birthDate}
            onChange={handleBirthDateChange}
          />
          <div className="signs">
            {signs.map(sign => (
              <ZodiacSign key={sign} sign={sign} onClick={(sign) => fetchHoroscope(sign, birthDate)} />
            ))}
          </div>
        </>
      )}
      {horoscope && <HoroscopeResult horoscope={horoscope} onBack={handleBack} />}
    </div>
  );
};

export default App;

