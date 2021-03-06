import { shallow } from "enzyme";
import React from "react";

import { checkProps, findByTestAttr } from "../test/testUtils";
import NewWord from "./NewWord";

const defaultProps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }; //any supplied props will overwrite default ones
  return shallow(<NewWord {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-new-word");
  expect(component.length).toBe(1);
});

test("renders no text when succes is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-new-word");
  expect(component.text()).toBe("");
});

describe("when success is true", () => {
  test("renders text", () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, "component-new-word");
    expect(component.text().length).toBeGreaterThan(0);
  });
});
