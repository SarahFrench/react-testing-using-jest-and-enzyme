import moxios from "moxios";

import { storeFactory } from "../../test/testUtils";
import { getSecretWord, resetGame, giveUp } from "./";

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
  test("sets error state if no secret word can be requested", async () => {
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500,
        response: "",
      });
    });

    //IMPORTANT
    //wait for the Promise from dispatch before assertions
    await store.dispatch(getSecretWord());
    const newState = store.getState();
    expect(newState.secretWordError).toBe(true);
    expect(newState.secretWord).toBeNull();
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
  test("sets success to false", async () => {
    const guessedWords = [
      { guessedWord: "train", letterMatchCount: 3 },
      { guessedWord: "agile", letterMatchCount: 1 },
      { guessedWord: "party", letterMatchCount: 5 },
    ];
    const success = true;
    const newSecretWord = "potato";
    const store = storeFactory({ success, guessedWords });

    //set up moxios to return different secret word
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newSecretWord,
      });
    });

    const oldState = store.getState();
    expect(oldState.success).toBe(true);

    //dispatch reset game
    await store.dispatch(resetGame());

    const newState = store.getState();
    expect(newState.success).toBe(false);
  });
});

describe("giveUp", () => {
  test("sets giveUp in state to true", async () => {
    const givenUpBefore = false;
    const givenUpAfter = true;
    const store = storeFactory({ givenUp: givenUpBefore });

    //dispatch reset game
    await store.dispatch(giveUp());

    const newState = store.getState();
    expect(newState.givenUp).toBe(givenUpAfter);
  });
});
