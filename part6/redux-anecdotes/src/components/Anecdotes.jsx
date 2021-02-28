import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addVote, showNotificationWithTimeout } from '../actions/actions';

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
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (Boolean(filter)) {
      const filteredAnecdotes = anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );

      return filteredAnecdotes;
    }

    return anecdotes;
  });

  const sortedByVotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(
      showNotificationWithTimeout(`You voted for '${anecdote.content}'`, 5)
    );
  };

  return (
    <div>
      {sortedByVotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
