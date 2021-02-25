import React from 'react';

import Title from './components/Title';
import Notification from './components/Notification';
import Anecdotes from './components/Anecdotes';
import NewAnecdote from './components/NewAnecdote';

const App = () => {
  return (
    <div>
      <Title text='Anecdotes' />
      <Notification />
      <Anecdotes />
      <NewAnecdote />
    </div>
  );
};

export default App;
