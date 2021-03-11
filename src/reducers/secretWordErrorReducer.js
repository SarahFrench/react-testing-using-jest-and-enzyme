import { actionTypes } from "../actions";

export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.SECRET_WORD_ERROR:
      return true;
    default:
      return state;
  }
};
