import React from "react";

const ErrorMessage = () => {
  return (
    <div data-test="component-error-message" className="alert alert-danger">
      There was an error retrieving the secret word. Please try again later.
    </div>
  );
};

export default ErrorMessage;
