import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from '../actions/actionTypes';

const initialState = {
  message: '',
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return action.data;
    case HIDE_NOTIFICATION:
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
