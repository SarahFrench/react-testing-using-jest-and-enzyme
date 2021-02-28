import { shallow } from "enzyme";
import React from "react";

import { storeFactory } from "../test/testUtils";
import App from "./App";

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("redux props", () => {
  test("receives `getSecretWord` action creator as a prop, and it's a function", () => {
    const wrapper = setup();
    const getSecretWord = wrapper.instance().props.getSecretWord;
    expect(getSecretWord).toBeInstanceOf(Function);
  });
  test("receives `guessWord` action creator as a prop, and it's a function", () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
  test("receives `secretWord` state as a prop", () => {
    const secretWord = "potato";
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toEqual(secretWord);
  });
  test("receives `guessedWords` state as a prop", () => {
    const guessedWords = [
      {
        guessedWord: "test",
        letterMatchCount: 0,
      },
    ];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toHaveLength(1);
    expect(guessedWordsProp[0]).toEqual(guessedWords[0]);
  });
  test("receives `success` as a prop", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toEqual(success);
  });
});
