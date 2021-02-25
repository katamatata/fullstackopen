import { ADD_VOTE, NEW_ANECDOTE } from '../actions/actionTypes';

import { getId } from '../utils';

export const addVote = (id) => {
  return {
    type: ADD_VOTE,
    data: { id },
  };
};

export const createAnecdote = (content) => {
  return {
    type: NEW_ANECDOTE,
    data: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};
