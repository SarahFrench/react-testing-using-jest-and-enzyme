import { shallow } from "enzyme";
import React from "react";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput } from "./Input";

//Could not find "store" in the context of "Connect(Input)". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(Input) in connect options.

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  //dive used to get from higher-order component with a wrapping Provider down to the Input component itself
  return wrapper;
};

describe("render", () => {
  describe("word has not been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {
        success: false,
      };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("renders input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(1);
    });
    test("renders submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });
  describe("word has been guessed", () => {
    let wrapper;
    beforeEach(() => {
      const initialState = {
        success: true,
      };
      wrapper = setup(initialState);
    });
    test("renders component without error", () => {
      const component = findByTestAttr(wrapper, "component-input");
      expect(component.length).toBe(1);
    });
    test("does not render input box", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });
    test("does not render submit button", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });
  });
});

describe("redux props", () => {
  test("has success piece of state as prop", () => {
    const success = true; //could also be false, either works
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success; //this only works on Class based components, errors on functional components
    expect(successProp).toBe(success);
  });
  test("`guessWord` action create is a function prop", () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe("guessWord action creator call", () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = "train";

  beforeEach(() => {
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
      success: false,
    };
    wrapper = shallow(<UnconnectedInput {...props} />);
    const submitButton = findByTestAttr(wrapper, "submit-button");

    //add value to input box
    wrapper.setState({ currentGuess: guessedWord });
    //click submit
    submitButton.simulate("click", { preventDefault: () => {} });
  });

  test("guessWord runs when user clicks the submit button", () => {
    expect(guessWordMock).toBeCalledTimes(1);
  });
  test("guessWord is called with the contents of the input box", () => {
    const mockArgument = guessWordMock.mock.calls[0][0];
    expect(mockArgument).toBe(guessedWord);
  });
  test("Input box is cleared after the user clicks submit", () => {
    expect(wrapper.state("currentGuess")).toBe("");
  });
});
