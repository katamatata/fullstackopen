import {
  ADD_VOTE,
  NEW_ANECDOTE,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
} from '../actions/actionTypes';

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

export const showNotification = (message) => {
  return {
    type: SHOW_NOTIFICATION,
    data: { message },
  };
};

export const hideNotification = {
  type: HIDE_NOTIFICATION,
};
