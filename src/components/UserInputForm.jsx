import React, { useState } from 'react';

const UserInputForm = ({ onSubmit }) => {
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(birthdate);
  };

  return (
    <form onSubmit={handleSubmit} className="user-input-form">
      <h2>Enter Your Birthdate</h2>
      <div>
        <label htmlFor="birthdate">Birthdate:</label>
        <input
          type="date"
          id="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserInputForm;
