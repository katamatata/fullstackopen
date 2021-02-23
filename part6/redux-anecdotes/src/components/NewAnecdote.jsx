import React from 'react';
import { useDispatch } from 'react-redux';

import { createAnecdote } from '../actions/actions';

import Subtitle from './Subtitle';

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
  };

  return (
    <div>
      <Subtitle text='create new' />
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default NewAnecdote;
