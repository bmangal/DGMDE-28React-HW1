import { useState, useEffect, React } from 'react';
import './App.css';
import { Settings, getMaxGuesses, getMinRange, getMaxRange  } from './settings';
import { Header } from './app_header';


// Main game component
function Game() {

  // State variables
  const [guess, setGuess] = useState('')
  const [guessCount, setGuessCount] = useState(0)
  const [status, setStatus] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [secretNumber, setSecretNumber] = useState(0)

  // Function to generate a random number within the specified range
  const generateRandomNumber = () => {
    let num = Math.floor(Math.random() * (getMaxRange() - getMinRange() + 1)) + getMinRange();
    console.log(`Generated number: ${num}`); // Debugging log
    return num;
 }

 // Initialize the secret number when the component mounts
  useEffect(() => {
    setSecretNumber(generateRandomNumber());
  }, []);

  // Function to submit the user's guess
  const submitGuess = () => {
    const numGuess = parseInt(guess);

    // Validate the user's input if it is within the specified range.
    if (numGuess < getMinRange() || numGuess > getMaxRange()) {
      setStatus(`Please enter a number between ${getMinRange()} and ${getMaxRange()}.`);
      return;
    }

    // Increment the guess count
    setGuessCount(guessCount + 1);

    if (numGuess === secretNumber) {
      setStatus('Congratulations! You won! Game is over.');
      endGame(true);
    } else if (numGuess < secretNumber) {
      setStatus('Too low');
    } else if (numGuess > secretNumber) {
      setStatus('Too high');
    }

    // Check if the user has reached the max # of guesses and end the game if they have.
    if (guessCount + 1 >= getMaxGuesses() && numGuess !== secretNumber) {
      setStatus(`Game is over. The number was ${secretNumber}.`);
      endGame(false);
    }

    // Clear the guess input field after each guess
    setGuess('');
  }

  // Function to end the game and update statistics in local storage
  const endGame = (won) => {
    setGameOver(true);
    const stats = JSON.parse(localStorage.getItem('gameStats')) || 
    { 
        gamesWon: 0,
        totalGuesses: 0,
        gamesPlayed: 0,
    };
    
    // Increase the total games played
    stats.gamesPlayed += 1;

    // Update wins and guesses in local storage if the user won.
    if (won) {
        stats.gamesWon += 1;
        stats.totalGuesses += guessCount;
    }
    // Save the updated statistics back to local storage
    localStorage.setItem('gameStats', JSON.stringify(stats));
  }

  // Function to restart the game and reset all relevant state variables
  const restartGame = () => {
    setSecretNumber(generateRandomNumber());
    setGuess('');
    setGuessCount(0);
    setStatus('');
    setGameOver(false);
  }

  // Render the game UI
  return (
        <div>
            <Header />
            <h2>Number Guessing Game</h2>
              <div>
              <p>Guess a number between {getMinRange()} and {getMaxRange()}</p>
              <p>Attempts left: {getMaxGuesses() - guessCount}</p>
              
              <div>                
                <input
                  type="number"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  disabled={gameOver}
                  placeholder="Enter your guess"
                />
                <button onClick={submitGuess} disabled={gameOver || guess === ''}>
                  Submit
                </button>
              </div>
              
              <p>{status}</p>
              
              <button onClick={restartGame} disabled={!gameOver}>
                Restart Game
              </button>
            </div>
        </div>
    );
}

// Export the Game component as the default export of this module
export default Game;