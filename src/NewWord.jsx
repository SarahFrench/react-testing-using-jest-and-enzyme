import React, { Component } from "react";
import { connect } from "react-redux";

import { resetGame } from "./actions";

export class UnconnectedNewWord extends Component {
  //TODO - Challenge 2 in Section 99 of course

  render() {
    if (this.props.success) {
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

const mapStateToProps = ({ success }) => {
  return { success };
};

export default connect(mapStateToProps, { resetGame })(UnconnectedNewWord);
