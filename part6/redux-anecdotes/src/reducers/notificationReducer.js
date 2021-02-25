import { SHOW_NOTIFICATION } from '../actions/actionTypes';

const message = 'You voted';

const initialState = message;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return state;
    default:
      return state;
  }
};

export default notificationReducer;
