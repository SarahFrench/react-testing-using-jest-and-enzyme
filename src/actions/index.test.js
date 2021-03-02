import moxios from "moxios";

import { storeFactory } from "../../test/testUtils";
import { getSecretWord, resetGame } from "./";

describe("getSecretWord", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("adds response word to state", async () => {
    const secretWord = "party";
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    //IMPORTANT
    //wait for the Promise from dispatch before assertions
    await store.dispatch(getSecretWord());
    const newState = store.getState();
    expect(newState.secretWord).toBe(secretWord);
  });
});

describe("resetGame", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("changes the secret word in state", async () => {
    const secretWordBefore = "party";
    const secretWordAfter = "time";
    const store = storeFactory({ secretWord: secretWordBefore });

    //set up moxios to return different secret word
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWordAfter,
      });
    });

    //dispatch reset game
    await store.dispatch(resetGame());

    const newState = store.getState();
    expect(newState.secretWord).toBe(secretWordAfter);
  });
  test("empties the list of guessed words", async () => {
    const guessedWords = [
      { guessedWord: "train", letterMatchCount: 3 },
      { guessedWord: "agile", letterMatchCount: 1 },
      { guessedWord: "party", letterMatchCount: 5 },
    ];
    const newSecretWord = "potato";
    const store = storeFactory({ guessedWords });

    //set up moxios to return different secret word
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newSecretWord,
      });
    });

    const oldState = store.getState();
    expect(oldState.guessedWords).toHaveLength(guessedWords.length);

    //dispatch reset game
    await store.dispatch(resetGame());

    const newState = store.getState();
    expect(newState.guessedWords).toHaveLength(0);
  });
});
