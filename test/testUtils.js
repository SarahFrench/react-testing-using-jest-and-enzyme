import checkPropTypes from "check-prop-types";
import { applyMiddleware, createStore } from "redux";

import { middlewares } from "../src/configureStore";
import rootReducer from "../src/reducers";

/**
 * Create a testing store with imported reducers, middleware and initial state
 * globals: rootReducer
 * @param {object} initialState - initial State for store
 * @function storeFactory
 * @returns {Store} - Redux store
 */
export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};

/**
 * Return node(s) with the given data-test attribute
 * @param {ShallowWrapper} wrapper - shallow wrapper
 * @param {string} val - value of attribute
 * @returns {ShallowWrapper} - found node(s)
 */

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
