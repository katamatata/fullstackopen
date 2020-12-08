import React from 'react';

const PersonForm = ({
  handleSubmit,
  nameInputValue,
  handleNameChange,
  numberInputValue,
  handleNumberChange,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor='name'>Name: </label>
      <input
        id='name'
        name='name'
        value={nameInputValue}
        onChange={handleNameChange}
      />
    </div>
    <div>
      <label htmlFor='phone'>Phone Number: </label>
      <input
        type='tel'
        id='phone'
        name='phone'
        value={numberInputValue}
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type='submit'>Add</button>
    </div>
  </form>
);

export default PersonForm;
