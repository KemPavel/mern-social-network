import uuid from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from './types';

const DEFAULT_TIMEOUT = 2000;

export const setAlert = (message, alertType, timeout = DEFAULT_TIMEOUT) => (dispatch) => {
  const id = uuid.v4();

  dispatch({
    type: SET_ALERT,
    payload: {message, alertType, id}
  });

  setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
};
