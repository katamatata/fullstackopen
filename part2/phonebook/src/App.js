import React, { useState } from 'react';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    const isExist = persons.map((person) => person.name).includes(newName);

    if (newName === '') {
      alert('Please enter name!');
    } else if (newNumber === '') {
      alert('Please enter phone number!');
    } else if (isExist) {
      alert(`${newName} is already added to contacts!`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Add a new contact</h3>
      <PersonForm
        handleSubmit={addPerson}
        nameInputValue={newName}
        handleNameChange={handleNameInputChange}
        numberInputValue={newNumber}
        handleNumberChange={handleNumberInputChange}
      />

      <h3>Contacts</h3>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
