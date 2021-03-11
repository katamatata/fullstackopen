import React from 'react';
import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  console.log(anecdotes);
  const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
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
