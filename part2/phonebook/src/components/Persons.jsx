import React from 'react';

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.name}>{person.name}</p>
    ))}
  </div>
);

export default Persons;
