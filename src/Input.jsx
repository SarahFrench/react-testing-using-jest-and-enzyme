import React from "react";
import { connect } from "react-redux";

import { guessWord, giveUp } from "./actions";

export class UnconnectedInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGuess: "",
    };

    //bind this for submit guessed word
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
    this.giveUpGame = this.giveUpGame.bind(this);
  }

  submitGuessedWord = (event) => {
    event.preventDefault();
    let guessedWord = this.state.currentGuess;
    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
      this.setState({ currentGuess: "" });
    }
  };

  //Challenge 3 in Section 99 of course - added Give Up button
  giveUpGame = (event) => {
    event.preventDefault();
    this.props.giveUp();
  };

  render() {
    //show if you haven't won and haven't given up yet
    const showInput = !this.props.givenUp && !this.props.success;
    let contents;
    if (showInput) {
      contents = (
        <form className="form-inline">
          <input
            data-test="input-box"
            className="mb-2 mx-sm-3"
            type="text"
            value={this.state.currentGuess}
            onChange={(event) => {
              this.setState({ currentGuess: event.target.value });
            }}
            placeholder="enter guess"
          />
          <button
            data-test="submit-button"
            className="btn btn-primary mb-2"
            type="submit"
            onClick={(event) => {
              this.submitGuessedWord(event);
            }}
          >
            Guess
          </button>
          <button
            data-test="give-up-button"
            className="btn btn-danger mb-2"
            onClick={(event) => {
              this.giveUpGame(event);
            }}
          >
            Give Up
          </button>
        </form>
      );
    } else {
      contents = null;
    }
    return <div data-test="component-input">{contents}</div>;
  }
}

const mapStateToProps = ({ success, givenUp }) => {
  return { success, givenUp };
};

//provide guessWord action creator as prop to component
export default connect(mapStateToProps, { guessWord, giveUp })(
  UnconnectedInput
);
