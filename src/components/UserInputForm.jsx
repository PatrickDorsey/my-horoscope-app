import React, { useState } from 'react';
import './UserInputForm.css';

const UserInputForm = ({ onDateSubmit }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (day && month) {
      onDateSubmit(day, month);
    } else {
      alert("Please fill in both day and month.");
    }
  };

  return (
    <form className="user-input-form" onSubmit={handleSubmit}>
      <div className="day-container">
        <label htmlFor="day">Day:</label>
        <input
          id="day"
          className="day-input"
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
          min="1"
          max="31"
        />
      </div>
      <div className="month-container">
        <label htmlFor="month">Month:</label>
        <input
          id="month"
          className="month-input"
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
          list="months"
        />
        <datalist id="months">
          <option value="January" />
          <option value="February" />
          <option value="March" />
          <option value="April" />
          <option value="May" />
          <option value="June" />
          <option value="July" />
          <option value="August" />
          <option value="September" />
          <option value="October" />
          <option value="November" />
          <option value="December" />
        </datalist>
      </div>
      <div className="submit-container">
        <button type="submit" className="submit-button">Submit</button>
      </div>
    </form>
  );
};

export default UserInputForm;



