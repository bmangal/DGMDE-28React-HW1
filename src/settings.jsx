import React, { useState, useEffect } from 'react';
import { Header } from './app_header';
import './App.css';

// Helper functions to get settings from local storage and provide defaults
function getMaxGuesses() {
    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    return settings?.maxGuesses || 10;
}

function getMinRange() {
    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    return settings?.minRange || 1;
}

function getMaxRange() {
    const settings = JSON.parse(localStorage.getItem('gameSettings'));
    return settings?.maxRange || 100;
}

// Settings component to manage game settings
function Settings() {
    // State variables for settings
    const [maxGuesses, setMaxGuesses] = useState(getMaxGuesses);
    const [minRange, setMinRange] = useState(getMinRange);
    const [maxRange, setMaxRange] = useState(getMaxRange);

    // Load settings from local storage on component mount
    useEffect(() => {
        setMaxGuesses(getMaxGuesses());
        setMinRange(getMinRange());
        setMaxRange(getMaxRange());
    }, []);

    // Save settings to local storage
    const handleSave = () => {
        localStorage.setItem('gameSettings', JSON.stringify({
            maxGuesses,
            minRange,
            maxRange,
        }));
    };

    // Reset settings to default values
    const handleReset = () => {
        setMaxGuesses(getMaxGuesses());
        setMinRange(getMinRange());
        setMaxRange(getMaxRange());
    };    

    // Render the settings form
    return (
        <div>
            <Header />
            <h2>Game Settings</h2>
            <div>
                <label>
                    Max Guess Count:
                    <input
                        type="number"
                        value={maxGuesses}
                        onChange={(e) => setMaxGuesses(parseInt(e.target.value))}
                        min="1"
                    />
                </label>
            </div>

            <div>
                <label>
                    Minimum Range:
                    <input
                        type="number"
                        value={minRange}
                        onChange={(e) => setMinRange(parseInt(e.target.value))}
                    />
                </label>
            </div>

            <div>
                <label>
                    Maximum Range:
                    <input
                        type="number"
                        value={maxRange}
                        onChange={(e) => setMaxRange(parseInt(e.target.value))}                        
                    />
                </label>
            </div>

            <button onClick={handleSave}>Save</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}

// Export the Settings component and helper functions
export { Settings, getMaxGuesses, getMinRange, getMaxRange };