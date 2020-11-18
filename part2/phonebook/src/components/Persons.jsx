import React from 'react';

const Persons = ({ persons, search }) => {
  const contactsToRender =
    search === ''
      ? persons
      : persons.filter((person) => person.name.includes(search));

  return (
    <div>
      {contactsToRender.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
