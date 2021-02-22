import { ADD_GOOD, ADD_NEUTRAL, ADD_BAD, RESET_STATS } from '../actionTypes';

const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GOOD:
      return { ...state, good: state.good + 1 };
    case ADD_NEUTRAL:
      return { ...state, ok: state.ok + 1 };
    case ADD_BAD:
      return { ...state, bad: state.bad + 1 };
    case RESET_STATS:
      return initialState;
    default:
      return state;
  }
};

export default counterReducer;
