//take current state and action, return new state depending on action
//state could be null if no initial state returned by a reducer yet on app start??
import { actionTypes } from "../actions";

export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.CORRECT_GUESS:
      return true;
    case actionTypes.RESET_GAME:
      return false;
    default:
      return state;
  }
};
