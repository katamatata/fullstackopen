import React, { useState, useEffect } from 'react';

import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification';
import contactService from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => {
        setPersons(initialContacts);
      })
      .catch((error) => {
        setIsError(true);
        setMessage('Connection with server is lost. Try again later.');
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const isExist = persons.map((person) => person.name).includes(newName);
    const formIsNotComplete = newName === '' && newNumber === '';

    if (formIsNotComplete) {
      setIsError(true);
      setMessage('Please complete form');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else if (isExist) {
      if (
        window.confirm(
          `${newName} is already added to contacts, replace the old number with a new one?`
        )
      ) {
        const contact = persons.find((person) => person.name === newName);
        const updatedContact = { ...contact, number: newNumber };
        contactService
          .update(contact.id, updatedContact)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== contact.id ? person : returnedPerson
              )
            );
            setNewName('');
            setNewNumber('');
            setIsError(false);
            setMessage(`Contact ${newName} was updated.`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setIsError(true);
            setMessage(
              `Information of ${contact.name} has already been deleted from server.`
            );
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      contactService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setIsError(false);
        setMessage(`${newName} added to contacts.`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
    }
  };

  const deletePerson = (id) => {
    const contact = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setIsError(false);
          setMessage(`${contact.name} deleted from contacts.`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setIsError(true);
          setMessage(`${contact.name} has already been deleted from server.`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
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
      <Notification isError={isError} message={message} />
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
