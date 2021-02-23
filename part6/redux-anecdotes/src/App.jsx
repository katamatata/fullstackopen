import React from 'react';

import Title from './components/Title';
import Anecdotes from './components/Anecdotes';
import NewAnecdote from './components/NewAnecdote';

const App = () => {
  return (
    <div>
      <Title text='Anecdotes' />
      <Anecdotes />
      <NewAnecdote />
    </div>
  );
};

export default App;
