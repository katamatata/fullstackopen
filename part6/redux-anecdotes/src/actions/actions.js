import { ADD_VOTE } from '../actions/actionTypes';

export const addVote = (id) => {
  return {
    type: ADD_VOTE,
    data: { id },
  };
};
