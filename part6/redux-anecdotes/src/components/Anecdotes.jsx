import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addVote,
  showNotification,
  hideNotification,
} from '../actions/actions';

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
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const sortedByVotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (id, content) => {
    dispatch(addVote(id));
    dispatch(showNotification(`You voted for '${content}'`));
    setTimeout(() => {
      dispatch(hideNotification);
    }, 3000);
  };

  return (
    <div>
      {sortedByVotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote.id, anecdote.content)}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
