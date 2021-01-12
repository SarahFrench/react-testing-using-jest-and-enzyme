import React from "react";

/**
 * Functional component that congratulates user after guessing the word
 * @function setup
 * @param {object} props
 * @returns {JSX.Element}
 */
const Congrats = ({ success }) => {
  if (success) {
    return (
      <div data-test="component-congrats">
        <span data-test="congrats-message">Congrats!</span>
      </div>
    );
  } else {
    return <div data-test="component-congrats"></div>;
  }
};

export default Congrats;
