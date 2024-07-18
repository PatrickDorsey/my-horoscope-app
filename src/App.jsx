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
  const [selectedSign, setSelectedSign] = useState('');
  const apiHost = useRef('vedicrishi-standard-horoscope-plan-v1.p.rapidapi.com');
  const apiKey = useRef('bec41e5622msh4cb29f91e88f271p171632jsn8c892f8dba5f');

  useEffect(() => {
    if (selectedSign) {
      fetchHoroscope(selectedSign);
    }
  }, [selectedSign]);

  const fetchHoroscope = (sign) => {
    fetch(`https://${apiHost.current}/numero_table/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': apiHost.current,
        'x-rapidapi-key': apiKey.current,
      },
      body: JSON.stringify({
        "day": "25",
        "month": "12",
        "year": "1988",
        "hour": "10",
        "min": "12",
        "lat": "25.123",
        "lon": "82.34",
        "tzone": "5.5",
        "name": sign
      })
    })
    .then(response => response.json())
    .then(data => setHoroscope(data))
    .catch(error => console.error('Error:', error));
  };

  const handleBack = () => {
    setHoroscope(null);
    setSelectedSign('');
  };

  return (
    <div className="App">
      <h1>Horoscope App</h1>
      {!selectedSign && (
        <div className="signs">
          {signs.map(sign => (
            <ZodiacSign key={sign} sign={sign} onClick={setSelectedSign} />
          ))}
        </div>
      )}
      {horoscope && <HoroscopeResult horoscope={horoscope} onBack={handleBack} />}
    </div>
  );
};

export default App;

