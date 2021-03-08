import { shallow } from "enzyme";
import React from "react";

import { storeFactory, findByTestAttr } from "../test/testUtils";
import NewWord, { UnconnectedNewWord } from "./NewWord";

const defaultProps = { success: false, givenUp: false };
const defaultState = { success: false, givenUp: false };

describe("render", () => {
  const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props }; //any supplied props will overwrite default ones
    return shallow(<UnconnectedNewWord {...setupProps} />);
  };
  test("renders without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, "component-new-word");
    expect(component.length).toBe(1);
  });

  test("renders no text when success is false and user is still playing", () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, "component-new-word");
    expect(component.text()).toBe("");
  });

  test("renders text when success is false and user gives up", () => {
    const wrapper = setup({ success: false, givenUp: true });
    const component = findByTestAttr(wrapper, "component-new-word");
    expect(component.text().length).toBeGreaterThan(0);
  });

  test("renders text when success is true", () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, "component-new-word");
    expect(component.text().length).toBeGreaterThan(0);
  });
});

describe("redux props", () => {
  const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<NewWord store={store} />)
      .dive()
      .dive();
    return wrapper;
  };
  test("has success piece of state as prop", () => {
    const wrapper = setup();
    const successProp = wrapper.instance().props.success;
    expect(typeof successProp).toBe("boolean"); //prop isn't instance of Boolean class
  });
  test("has givenUp piece of state as prop", () => {
    const wrapper = setup();
    const givenUpProp = wrapper.instance().props.givenUp;
    expect(typeof givenUpProp).toBe("boolean"); //prop isn't instance of Boolean class
  });
  test("receives resetGame as a prop, and it's a function", () => {
    const wrapper = setup();
    const resetGameProp = wrapper.instance().props.resetGame;
    expect(resetGameProp).toBeInstanceOf(Function);
  });

  describe("resetGame action creator call", () => {
    let wrapper;
    let resetGameMock;

    beforeEach(() => {
      resetGameMock = jest.fn();
      const props = {
        resetGame: resetGameMock,
        success: true,
        givenUp: false,
      };
      wrapper = shallow(<UnconnectedNewWord {...props} />);
      const newWordButton = findByTestAttr(wrapper, "component-new-word");

      newWordButton.simulate("click");
    });

    test("guessWord runs when user clicks the `New Word` button", () => {
      expect(resetGameMock).toBeCalledTimes(1);
    });
  });
});
