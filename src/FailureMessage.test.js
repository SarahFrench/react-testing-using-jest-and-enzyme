import { shallow } from "enzyme";
import React from "react";

import { checkProps, findByTestAttr } from "../test/testUtils";
import { giveUp } from "./actions";
import FailureMessage from "./FailureMessage";

const defaultProps = {
  success: false,
  givenUp: true,
};

const setup = (props = {}) => {
  //Failure message is unconnected component, so setup sets props only, no store
  const setupProps = { ...defaultProps, ...props };
  return shallow(<FailureMessage {...setupProps} />);
};

test("does not throw warning with expected props", () => {
  checkProps(FailureMessage, defaultProps);
});

describe("render", () => {
  test("when user's still playing, renders no text", () => {
    const wrapper = setup({ givenUp: false });
    const component = findByTestAttr(wrapper, "component-failure-message");
    expect(component.text()).toBe("");
  });
  test("when user's gives up, renders text describing the secret word", () => {
    const secretWord = "potato";
    const wrapper = setup({ givenUp: true, secretWord });
    const component = findByTestAttr(wrapper, "component-failure-message");
    expect(component.text().length).toBeGreaterThan(0);
    expect(component.text()).toContain(secretWord);
  });
});
