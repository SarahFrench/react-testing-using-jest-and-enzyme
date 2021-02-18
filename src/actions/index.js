export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
};

//Uses function syntax in Udemy video
export const correctGuess = () => {
  return { type: actionTypes.CORRECT_GUESS };
};
