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
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserInputForm;


