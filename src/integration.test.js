/*
File used to test interaction between action creators and reducers
*/

import { storeFactory } from "../test/testUtils";
import { guessWord } from "./actions";

describe("guessWord action dispatcher", () => {
  const secretWord = "party";
  const unsuccessfulGuess = "train";
  describe("no guessed words", () => {
    let store;
    const initialState = { secretWord };
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test("updates state correctly for unsuccessful guess", () => {
      //dispatch action
      store.dispatch(guessWord(unsuccessfulGuess));
      //check if new state is the same as the expected state
      const expectedState = {
        ...initialState,
        success: false,
        givenUp: false,
        guessedWords: [
          {
            guessedWord: unsuccessfulGuess,
            letterMatchCount: 3,
          },
        ],
      };
      const newState = store.getState();

      expect(newState).toEqual(expectedState);
      //2020-02-20: currently this test fails and has an error due to not implementing stuff. Also there's no reducer for the secretWord key in the state here
    });

    test("updates state correctly for successful guess", () => {
      const successfulGuess = secretWord;
      store.dispatch(guessWord(successfulGuess));

      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: true,
        givenUp: false,
        guessedWords: [
          {
            guessedWord: successfulGuess,
            letterMatchCount: successfulGuess.length,
          },
        ],
      };

      expect(newState).toEqual(expectedState);
    });
  });
  describe("no guessed words", () => {
    const guessedWords = [{ guessedWord: "agile", letterMatchCount: 1 }];
    const initialState = {
      secretWord,
      guessedWords,
    };
    let store;
    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test("updates state correctly for unsuccessful guess", () => {
      store.dispatch(guessWord(unsuccessfulGuess));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: false,
        givenUp: false,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: unsuccessfulGuess,
            letterMatchCount: 3,
          },
        ],
      };
      expect(newState).toEqual(expectedState);
    });
    test("updates state correctly for successful guess", () => {
      const successfulGuess = secretWord;
      store.dispatch(guessWord(successfulGuess));
      const newState = store.getState();
      const expectedState = {
        secretWord,
        success: true,
        givenUp: false,
        guessedWords: [
          ...guessedWords,
          {
            guessedWord: successfulGuess,
            letterMatchCount: successfulGuess.length,
          },
        ],
      };
      expect(newState).toEqual(expectedState);
    });
  });
});
