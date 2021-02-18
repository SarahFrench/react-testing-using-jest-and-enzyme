import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input from "./Input";

//Could not find "store" in the context of "Connect(Input)". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(Input) in connect options.

const setup = (initialState = {}) => {
  const wrapper = shallow(<Input store={storeFactory()} />);
  console.log(wrapper.debug());
};
setup();
describe("render", () => {
  describe("word has not been guessed", () => {
    test("renders component without error", () => {});
    test("renders input box", () => {});
    test("renders submit button", () => {});
  });
  describe("word has been guessed", () => {
    test("renders component without error", () => {});
    test("does not render input box", () => {});
    test("does not render submit button", () => {});
  });
});

describe("update state", () => {
  test("", () => {});
});
