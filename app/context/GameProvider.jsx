"use client"
import { useReducer, useEffect } from 'react';
import GameContext from './GameContext';
import initialState from './initialState';
import gameReducer from './gameReducer';



function GameProvider({ children }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);

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
