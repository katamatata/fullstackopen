import React, { useState, useEffect } from 'react';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import contactService from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

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

      contactService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const deletePerson = (id) => {
    if (window.confirm(`Delete contact?`)) {
      contactService.deleteContact(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchInputValue={search}
        handleSearchChange={handleSearchInputChange}
      />
      <h3>Add a new contact</h3>
      <PersonForm
        handleSubmit={addPerson}
        nameInputValue={newName}
        handleNameChange={handleNameInputChange}
        numberInputValue={newNumber}
        handleNumberChange={handleNumberInputChange}
      />

      <h3>Contacts</h3>
      <Persons persons={persons} search={search} deleteContact={deletePerson} />
    </div>
  );
};

export default App;
