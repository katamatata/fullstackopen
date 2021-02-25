import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addVote } from '../actions/actions';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const sortedByVotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <div>
      {sortedByVotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id)}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
