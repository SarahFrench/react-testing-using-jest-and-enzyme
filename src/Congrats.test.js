import { shallow } from "enzyme";
import React from "react";

import { checkProps, findByTestAttr } from "../test/testUtils";
import Congrats from "./Congrats";

const defaultProps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }; //any supplied props will overwrite default ones
  return shallow(<Congrats {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("renders no text when `success` prop is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("renders text when `success` prop is true", () => {
  const wrapper = setup({ success: true });
  const component = findByTestAttr(wrapper, "congrats-message");
  expect(component.text().length).not.toBe("");
});

test("does not throw a warning with expected props", () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
});
