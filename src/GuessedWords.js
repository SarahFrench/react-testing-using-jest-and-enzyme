import PropTypes from "prop-types";
import React from "react";

const GuessedWords = ({ guessedWords }) => {
  let contents;
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">Try to guess the secret word!</span>
    );
  } else {
    const guessedWordRows = guessedWords.map((word, index) => {
      return (
        <tr data-test="guessed-word" key={index}>
          <td data-test="guessed-word-index">{index + 1}</td>
          <td>{word.guessedWord}</td>
          <td>{word.letterMatchCount}</td>
        </tr>
      );
    });
    contents = (
      <div data-test="guessed-words">
        <h3>Guessed Words</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>#</th>
              <th>Guess</th>
              <th>Matching Letters</th>
            </tr>
          </thead>
          <tbody>{guessedWordRows}</tbody>
        </table>
      </div>
    );
  }
  return <div data-test="component-guessed-words">{contents}</div>;
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    })
  ),
};

export default GuessedWords;
