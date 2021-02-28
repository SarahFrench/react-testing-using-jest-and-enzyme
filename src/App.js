import React from "react";
import { connect } from "react-redux";

import { getSecretWord, guessWord } from "./actions";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";

export class UnconnectedApp extends Component {
  componentDidMount() {
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
  //state from the redux store passed in as props here
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
};

//action creators passed in here
export default connect(mapStateToProps, { getSecretWord, guessWord })(
  UnconnectedApp
);
