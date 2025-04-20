


// components/Game/Stats.jsx
"use client"
import { useGame } from '@/app/context/GameContext';
import { loadClickSound, playClickSound } from '@/data/audioManager';
import { locations } from '@/data/locations';
import { useEffect } from 'react';

export default function Stats() {
    const { state, dispatch } = useGame();
    const { player } = state;

    const withSound = (handler) => (event) => {
        playClickSound()
        if (handler) {
            handler(event)
        }
    }

    useEffect(() => {
        loadClickSound('/sounds/click.mp3').then((success) => {
            if (!success) {
                console.warn("Cant Load Click Sound")
            }
        })

    }, [])

    const checkGoals = () => {
        dispatch({ type: 'CHECK_GOALS' });
    };

    const openSaveLoadMenu = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'saveload' },
        });
    };

    const handleBreakup = () => {
        dispatch({
            type: 'BREAK_UP',
            payload: {},
        });
    };



    return (
        <div className="bg-black rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{player.name}</h2>
                <div className="flex items-center">
                    <span className="mr-4">Week {player.week}</span>
                    <span>Time Left: {player.timeLeft}/100</span>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Cash: ${player.cash.toFixed(2)}
                </div>

                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Experience: {player.experience}/100
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Job: {player.job ? player.job.title : 'Unemployed'}
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Energy: {player.energy}/100
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Happiness: {player.happiness}/100
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Health: {player.relationship.health}/100
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Location: {locations[player.location].name}
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Relationship: {player.relationship.isDating ? (
                        <>
                            Dating {player.relationship.partner.name}
                            <button
                                onClick={withSound(handleBreakup)}
                                className="ml-2 bg-red-500 hover:bg-red-400 text-white px-2 py-0.5 rounded text-xs"
                            >
                                Break Up
                            </button>
                        </>
                    ) : (
                        'Single'
                    )}
                </div>

                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    <button
                        onClick={withSound(checkGoals)}
                        className="text-blue-400 hover:underline"
                    >
                        Check Goals
                    </button>
                </div>
                <button
                    onClick={withSound(openSaveLoadMenu)}
                    className="bg-indigo-500 hover:bg-indigo-900 text-white px-2 py-1 rounded text-sm"
                >
                    Save/Load
                </button>
            </div>
        </div>
    );
}

