import React from 'react';

const Anecdote = ({ anecdote }) => {
  if (!anecdote) return null;

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info see:{' '}
        <a href={anecdote.info} target='_blank'>
          {anecdote.info}
        </a>
      </div>
    </div>
  );
};

export default Anecdote;
