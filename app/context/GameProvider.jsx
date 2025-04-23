

"use client"

import { useReducer, useEffect, useState } from 'react';
import GameContext from './GameContext';
import initialState from './initialState';
import gameReducer from './gameReducer';

function GameProvider({ children }) {
    // Use useState to handle the initial hydration issue
    const [state, dispatch] = useReducer(gameReducer, initialState);
    // Add a state to track if we're on the client side and hydration is complete
    const [isHydrated, setIsHydrated] = useState(false);

    // This effect runs only once after hydration is complete
    useEffect(() => {
        // Now we're safely on the client side
        setIsHydrated(true);

        // Try to load saved state from localStorage
        const savedState = localStorage.getItem('jonesGameAutoSave');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);
                // Dispatch the loaded state
                dispatch({
                    type: 'HYDRATE_STATE',
                    payload: parsedState
                });
            } catch (error) {
                console.error("Error parsing saved game state:", error);
            }
        }
    }, []);

    // This effect handles auto-saving to localStorage whenever state changes
    // but only after initial hydration is complete
    useEffect(() => {
        if (isHydrated && state.gameRunning) {
            localStorage.setItem('jonesGameAutoSave', JSON.stringify(state));
        }
    }, [state, isHydrated]);

    // Message timeout effect
    useEffect(() => {
        if (state.message) {
            const timer = setTimeout(() => {
                dispatch({ type: 'CLEAR_MESSAGE' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [state.message]);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
}

export default GameProvider;