import React from "react";
import { connect } from "react-redux";

import { getSecretWord, guessWord } from "./actions";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
};

export default connect(mapStateToProps, { getSecretWord, guessWord })(App);
