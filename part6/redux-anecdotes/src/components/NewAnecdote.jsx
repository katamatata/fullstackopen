import React from 'react';
import { useDispatch } from 'react-redux';

import {
  createAnecdote,
  showNotification,
  hideNotification,
} from '../actions/actions';

import Subtitle from './Subtitle';

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
    dispatch(showNotification(`You added anecdote '${content}'`));
    setTimeout(() => {
      dispatch(hideNotification);
    }, 3000);
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
