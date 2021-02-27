import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import anecdoteService from './services/anecdotes';
import { initializeAnecdotes } from './actions/actions';

import Title from './components/Title';
import Notification from './components/Notification';
import Filter from './components/Filter';
import Anecdotes from './components/Anecdotes';
import NewAnecdote from './components/NewAnecdote';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  }, []);

  return (
    <div>
      <Title text='Anecdotes' />
      <Notification />
      <Filter />
      <Anecdotes />
      <NewAnecdote />
    </div>
  );
};

export default App;
