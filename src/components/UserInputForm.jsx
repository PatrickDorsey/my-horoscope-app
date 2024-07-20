import React, { useState } from 'react';
import './UserInputForm.jsx';

const UserInputForm = ({ onSubmit }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const birthdate = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onSubmit(birthdate);
  };

  return (
    <form className="user-input-form" onSubmit={handleSubmit}>
      <label>
        Day:
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
          min="1"
          max="31"
        />
      </label>
      <label>
        Month:
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
          min="1"
          max="12"
        />
      </label>
      <button type="submit">Enter</button>
    </form>
  );
};

export default UserInputForm;
