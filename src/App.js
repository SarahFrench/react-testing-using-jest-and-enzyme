import React, { Component } from "react";
import { connect } from "react-redux";

import { getSecretWord } from "./actions";
import Congrats from "./Congrats";
import NewWord from "./NewWord";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import FailureMessage from "./FailureMessage";

export class UnconnectedApp extends Component {
  componentDidMount() {
    //get the secret word and store in Redux store
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="App container">
        <h1>Jotto</h1>
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.success} />
        <FailureMessage
          givenUp={this.props.givenUp}
          secretWord={this.props.secretWord}
        />
        <NewWord />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //state from the redux store passed in as props here
  const { success, guessedWords, secretWord, givenUp } = state;
  return { success, guessedWords, secretWord, givenUp };
};

//action creators passed in here
export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
