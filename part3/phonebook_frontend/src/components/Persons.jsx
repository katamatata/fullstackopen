import React from 'react';

const Persons = ({ persons, search, deleteContact }) => {
  const contactsToRender =
    search === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      {contactsToRender.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteContact(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
