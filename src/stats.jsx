import React, { useState, useEffect } from 'react';
import { Header } from './app_header';
import './App.css';

// Stats component to display game statistics
function Stats() {
    // Default stats values
    const defaultStats = {
        gamesWon: 0,
        totalGuesses: 0,
        gamesPlayed: 0,
    };
    // State variable to hold stats
    const [stats, setStats] = useState(defaultStats);

    // Load stats from local storage on component mount
    useEffect(() => {
        const savedStats = localStorage.getItem('gameStats');
        if (savedStats) {
            setStats(JSON.parse(savedStats));
        }
    }, []);

    // Calculate average guesses per game won
    const averageGuesses = (stats.gamesWon == 0) ? 0 : 
        (stats.totalGuesses / stats.gamesWon).toFixed(1);

    // Function to reset stats and clear local storage
    const resetStats = () => {
        setStats(defaultStats);
        localStorage.removeItem('gameStats');
    };

    // Render the stats display
    return (
        <div>
            <Header />
            <h2>Game Statistics</h2>
            <p>Games Won: {stats.gamesWon}</p>
            <p>Games Played: {stats.gamesPlayed}</p>
            <p>Average Guesses: {averageGuesses}</p>
            <button onClick={resetStats}>Reset Stats</button>
        </div>
    );
}

// Export the Stats component
export default Stats;