import {
  ADD_VOTE,
  NEW_ANECDOTE,
  INIT_ANECDOTES,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SET_FILTER,
} from '../actions/actionTypes';

// import { getId } from '../utils';

export const initializeAnecdotes = (anecdote) => {
  return {
    type: INIT_ANECDOTES,
    data: anecdote,
  };
};

export const addVote = (id) => {
  return {
    type: ADD_VOTE,
    data: { id },
  };
};

export const createAnecdote = (data) => {
  return {
    type: NEW_ANECDOTE,
    data,
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

export const filterChange = (filter) => {
  return {
    type: SET_FILTER,
    filter,
  };
};
