import React, { Component } from "react";
import { connect } from "react-redux";

import { resetGame } from "./actions";

export class UnconnectedNewWord extends Component {
  //Challenge 2 in Section 99 of course
  render() {
    // User has won, or they've given up
    const showNewWord = this.props.success || this.props.givenUp;
    if (showNewWord) {
      return (
        <button
          data-test="component-new-word"
          class="btn btn-primary mb-2"
          onClick={this.props.resetGame}
        >
          New Word
        </button>
      );
    }
    return <div data-test="component-new-word"></div>;
  }
}

const mapStateToProps = ({ success, givenUp }) => {
  return { success, givenUp };
};

export default connect(mapStateToProps, { resetGame })(UnconnectedNewWord);
