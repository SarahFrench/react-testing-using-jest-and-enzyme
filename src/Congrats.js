import PropTypes from "prop-types";
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
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          Congratulations! You guessed the word!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats"></div>;
  }
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
