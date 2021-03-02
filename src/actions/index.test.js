import moxios from "moxios";

import { storeFactory } from "../../test/testUtils";
import { getSecretWord } from "./";

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
});
