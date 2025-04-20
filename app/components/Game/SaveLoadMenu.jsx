"use client"
import { useGame } from '@/app/context/GameContext';
import { loadClickSound, playClickSound } from '@/data/audioManager';
import { deleteSavedGame, hasSavedGame, loadGame, saveGame } from '@/data/saveManager';
import { useState, useEffect } from 'react';

export default function SaveLoadMenu() {
    const { state, dispatch } = useGame();
    const [hasSave, setHasSave] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingGame, setIsLoadingGame] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const withSound = (handler) => (event) => {
        playClickSound();
        if (handler) {
            handler(event);
        }
    };

    useEffect(() => {
        loadClickSound('/sounds/click.mp3').then((success) => {
            if (!success) {
                console.warn("Can't Load Click Sound");
            }
        });
    }, []);

    useEffect(() => {
        // Check if there's a saved game
        setHasSave(hasSavedGame());
    }, []);

    const handleSaveGame = async () => {
        setIsSaving(true);
        setErrorMessage('');

        try {
            const success = await saveGame(state);

            if (success) {
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { text: "Game saved successfully to file!" }
                });
                setHasSave(true);
            } else {
                setErrorMessage("Failed to save the game.");
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { text: "Failed to save the game." }
                });
            }
        } catch (error) {
            // Handle AbortError gracefully
            if (error.name === 'AbortError') {
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { text: "Save operation was cancelled." }
                });
            } else {
                setErrorMessage(`Error: ${error.message}`);
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { text: `Error saving game: ${error.message}` }
                });
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleLoadGame = async () => {
        setIsLoadingGame(true);
        setErrorMessage('');

        try {
            const savedGame = await loadGame();

            if (savedGame) {
                dispatch({
                    type: 'LOAD_GAME',
                    payload: { savedGame }
                });
            } else {
                setErrorMessage("No saved game found or error loading game.");
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { text: "No saved game found or error loading game." }
                });
            }
        } catch (error) {
            // Handle AbortError gracefully
            if (error.name === 'AbortError') {
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { text: "Load operation was cancelled." }
                });
            } else {
                setErrorMessage(`Error: ${error.message}`);
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { text: `Error loading game: ${error.message}` }
                });
            }
        } finally {
            setIsLoadingGame(false);
        }
    };

    const handleDeleteSave = () => {
        if (deleteSavedGame()) {
            setHasSave(false);
            setShowConfirm(false);
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "Saved game data deleted." }
            });
        } else {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "Failed to delete saved game." }
            });
        }
    };

    const closeMenu = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'map' }
        });
    };

    return (
        <div className="save-load-menu mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Save & Load Game</h2>
                <button
                    onClick={withSound(closeMenu)}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                >
                    Close
                </button>
            </div>

            <div className="bg-gray-800 p-4 rounded">
                {errorMessage && (
                    <div className="bg-red-800 text-white p-2 rounded mb-4">
                        {errorMessage}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                    <button
                        onClick={withSound(handleSaveGame)}
                        disabled={isSaving}
                        className={`${isSaving
                            ? "bg-gray-600"
                            : "bg-green-600 hover:bg-green-500"
                            } text-white py-3 px-4 rounded text-lg`}
                    >
                        {isSaving ? "Saving..." : "Save Game to File"}
                    </button>

                    <button
                        onClick={withSound(handleLoadGame)}
                        disabled={isLoadingGame}
                        className={`${isLoadingGame
                            ? "bg-gray-600"
                            : "bg-blue-600 hover:bg-blue-500"
                            } text-white py-3 px-4 rounded text-lg`}
                    >
                        {isLoadingGame ? "Loading..." : "Load Game from File"}
                    </button>

                    {hasSave && !showConfirm ? (
                        <button
                            onClick={withSound(() => setShowConfirm(true))}
                            disabled={isSaving || isLoadingGame}
                            className={`${(isSaving || isLoadingGame)
                                ? "bg-gray-600"
                                : "bg-red-600 hover:bg-red-500"
                                } text-white py-3 px-4 rounded text-lg`}
                        >
                            Delete Saved Game Data
                        </button>
                    ) : hasSave && showConfirm ? (
                        <div className="bg-gray-700 p-3 rounded">
                            <p className="text-yellow-300 mb-2">Are you sure you want to delete your saved game data?</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={withSound(handleDeleteSave)}
                                    disabled={isSaving || isLoadingGame}
                                    className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded flex-1"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={withSound(() => setShowConfirm(false))}
                                    disabled={isSaving || isLoadingGame}
                                    className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="bg-gray-800 p-4 rounded mt-4">
                <h3 className="text-lg font-semibold mb-2">About Saving & Loading</h3>
                <p className="text-gray-400 text-sm">
                    • Your game can now be saved to your local drive as a file.<br />
                    • This allows you to keep your game progress between browser sessions.<br />
                    • You can share your save files with others or keep multiple save files.<br />
                    • A backup is still kept in your browser's localStorage.
                </p>
            </div>
        </div>
    );
}