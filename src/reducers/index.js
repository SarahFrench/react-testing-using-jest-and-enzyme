import { combineReducers } from "redux";

import success from "./successReducer";
import guessedWords from "./guessedWordsReducer";
import secretWord from "./secretWordReducer";
import secretWordError from "./secretWordErrorReducer";
import givenUp from "./giveUpReducer";

export default combineReducers({
  success,
  guessedWords,
  secretWord,
  secretWordError,
  givenUp,
});
