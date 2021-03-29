import React from 'react';

import { useField, useResource } from './hooks';

const App = () => {
  const { reset: resetContent, ...restContent } = useField('text');
  const { reset: resetName, ...restName } = useField('text');
  const { reset: resetNumber, ...restNumber } = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: restContent.value });
    resetContent();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: restName.value, number: restNumber.value });
    resetName();
    resetNumber();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...restContent} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...restName} /> <br />
        number <input {...restNumber} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
