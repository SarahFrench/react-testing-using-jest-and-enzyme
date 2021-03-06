import { actionTypes } from "../actions";
import successReducer from "./successReducer";

test("returns default inital state of `false` when no action passed", () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

test("returns `true` after receiving an action of type CORRECT_GUESS", () => {
  const newState = successReducer(undefined, {
    type: actionTypes.CORRECT_GUESS,
  });
  expect(newState).toBe(true);
});

test("returns `false` after receiving an action of type RESET_GAME", () => {
  const newState = successReducer(undefined, {
    type: actionTypes.RESET_GAME,
  });
  expect(newState).toBe(false);
});
