import PropTypes from "prop-types";
import React from "react";

const FailureMessage = ({ givenUp, secretWord }) => {
  if (givenUp) {
    return (
      <div data-test="component-failure-message" className="alert alert-danger">
        The secret word was {secretWord}
      </div>
    );
  } else {
    return <div data-test="component-failure-message"></div>;
  }
};

FailureMessage.propTypes = {
  givenUp: PropTypes.bool.isRequired,
};

export default FailureMessage;
