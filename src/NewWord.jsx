import React, { Component } from "react";

class UnconnectedNewWord extends Component {
  //TODO - Challenge 2 in Section 99 of course
  render() {
    if (this.props.success) {
      return (
        <button data-test="component-new-word" class="btn btn-primary mb-2">
          New Word
        </button>
      );
    }
    return <div data-test="component-new-word"></div>;
  }
}

export default UnconnectedNewWord;
