import {
  ADD_VOTE,
  NEW_ANECDOTE,
  INIT_ANECDOTES,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SET_FILTER,
} from '../actions/actionTypes';
import anecdoteService from '../services/anecdotes';

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: INIT_ANECDOTES,
      data: anecdotes,
    });
  };
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.update(anecdoteToUpdate);
    dispatch({
      type: ADD_VOTE,
      data: updatedAnecdote,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: NEW_ANECDOTE,
      data: newAnecdote,
    });
  };
};

export const showNotification = (message) => {
  return {
    type: SHOW_NOTIFICATION,
    message,
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
