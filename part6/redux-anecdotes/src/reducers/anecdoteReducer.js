import { ADD_VOTE, NEW_ANECDOTE, INIT_ANECDOTES } from '../actions/actionTypes';

const initialState = [];

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_ANECDOTES:
      return action.data;
    case ADD_VOTE: {
      const id = action.data.id;
      const votedAnecdote = action.data;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    }
    case NEW_ANECDOTE:
      return [...state, action.data];
    default:
      return state;
  }
};

export default anecdoteReducer;
