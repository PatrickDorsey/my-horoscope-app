import React, { useState } from 'react';
import ZodiacSign from './components/ZodiacSign';
import HoroscopeResult from './components/HoroscopeResult';

const signs = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const App = () => {
  const [horoscope, setHoroscope] = useState(null);
  const [selectedSign, setSelectedSign] = useState('');

  const apiKey = 'dbb51d66d0msh5d407d2424cc55bp13e12djsn1af279d7aa73';
  const apiHost = 'daily-horoscope3.p.rapidapi.com';

  const fetchHoroscope = async (sign) => {
    try {
      const formData = new FormData();
      formData.append('sign', sign.toUpperCase());
      formData.append('date', new Date().toISOString().split('T')[0]); // Use today's date
      formData.append('api_key', apiKey);
      formData.append('timezone', '5.5');

      const response = await fetch(`https://${apiHost}/api/1.0/get_daily_horoscope.php`, {
        method: 'POST',
        headers: {
          'x-rapidapi-host': apiHost,
          'x-rapidapi-key': apiKey,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Check for authorization error
      if (data.success === 0) {
        throw new Error(data.message);
      }

      // Set horoscope data in state
      setHoroscope(data.data);
    } catch (error) {
      console.error('Error fetching horoscope:', error.message);
      // Optionally handle error state or display error message to the user
      setHoroscope({ error: error.message });
    }
  };

  const handleSignClick = (sign) => {
    setSelectedSign(sign);
    fetchHoroscope(sign);
  };

  const handleBack = () => {
    setSelectedSign('');
    setHoroscope(null);
  };

  return (
    <div className="App">
      <h1>Horoscope App</h1>
      {!selectedSign && (
        <>
          <div className="signs">
            {signs.map(sign => (
              <ZodiacSign key={sign} sign={sign} onClick={() => handleSignClick(sign)} />
            ))}
          </div>
        </>
      )}
      {selectedSign && horoscope && <HoroscopeResult horoscope={horoscope} onBack={handleBack} />}
    </div>
  );
};

export default App;
