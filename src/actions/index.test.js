import { actionTypes, correctGuess } from "./";

describe("correctGuess", () => {
  test("returns an action with type `CORRECT_GUESS`", () => {
    const action = correctGuess();
    expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
    //toEqual compares the contents of mutable data types - i.e. objects/arrays (which are objects in JS)
    //vs toBe, which compates immmutable data types and are like a === comparison
  });
});
