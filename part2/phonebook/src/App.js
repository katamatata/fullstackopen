import React, { useState } from 'react';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');

  const addName = (event) => {
    event.preventDefault();
    // console.log('button clicked', event.target);

    const nameObject = {
      name: newName,
    };
    setPersons(persons.concat(nameObject));
    setNewName('');
  };

  const handleNameInputChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new contact</h3>
      <PersonForm
        handleSubmit={addName}
        inputValue={newName}
        handleChange={handleNameInputChange}
      />

      <h3>Contacts</h3>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
