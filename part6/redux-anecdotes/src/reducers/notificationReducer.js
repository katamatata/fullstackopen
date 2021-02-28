import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from '../actions/actionTypes';

const initialState = '';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return action.message;
    case HIDE_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
