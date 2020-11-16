import React from 'react';

const PersonForm = ({ handleSubmit, inputValue, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={inputValue} onChange={handleChange} />
    </div>
    <div>
      <button type='submit'>Add</button>
    </div>
  </form>
);

export default PersonForm;
