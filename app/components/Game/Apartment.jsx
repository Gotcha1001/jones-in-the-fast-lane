// components/Game/Apartment.jsx
import { useGame } from '@/app/context/GameContext';
import { initAudio, loadHomeMusic, playHomeMusic, stopHomeMusic } from '@/data/audioManager';
import { useState, useEffect } from 'react';

export default function Apartment() {
    const { state, dispatch } = useGame();
    const { player } = state;

    // Add useEffect to handle apartment music
    useEffect(() => {

        initAudio();
        loadHomeMusic('/sounds/apartment.mp3').then(() => {
            playHomeMusic();
        });


        return () => {
            stopHomeMusic();
        };
    }, []);

    const goBackToLocation = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'location' }
        });
    };

    const handleSleep = () => {
        if (player.energy < 100) {
            dispatch({ type: 'SLEEP' });
            dispatch({ type: 'USE_TIME', payload: { amount: 30 } });
        } else {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "You're already full of energy!" }
            });
        }
    };

    const handleStudy = () => {
        if (player.energy < 10) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "You're too tired to study!" }
            });
        } else if (player.education >= 100) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "You've reached maximum education!" }
            });
        } else {
            dispatch({ type: 'STUDY' });
            dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
        }
    };

    return (
        <div className="apartment-interface relative mt-4 overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
            >
                <source src="/videos/apartment.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Apartment content */}
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Your Apartment</h2>
                    <button
                        onClick={goBackToLocation}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back
                    </button>
                </div>

                {/* Apartment Image */}
                <div className="mb-4">
                    <img
                        src="/home.jpg"
                        alt="Apartment Interior"
                        className="w-full h-64 object-cover rounded-lg"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2095.jpg";
                        }}
                    />
                </div>

                {/* Player Info */}
                <div className=" p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-center">Home Status</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Energy:</span>
                            <span className="ml-2 text-blue-400">{player.energy}%</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Happiness:</span>
                            <span className="ml-2 text-green-400">{player.happiness}%</span>
                        </div>
                    </div>
                </div>

                {/* Home Actions */}
                <div className=" p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Home Activities</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleSleep}
                            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Sleep
                            <span className="block text-xs text-blue-200">Restore energy (30 min)</span>
                        </button>
                        <button
                            onClick={handleStudy}
                            className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded"
                        >
                            Study
                            <span className="block text-xs text-purple-200">+5 Education (15 min)</span>
                        </button>
                        <button
                            onClick={() => dispatch({ type: 'CHECK_GOALS' })}
                            className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded col-span-2"
                        >
                            Check Goals
                            <span className="block text-xs text-green-200">Review your progress</span>
                        </button>
                    </div>
                </div>

                {/* Possessions */}
                <div className=" p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Your Possessions</h3>
                    {player.possessions.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {player.possessions.map((item, index) => (
                                <div key={index} className="p-2 bg-gray-700 rounded text-sm">
                                    {item}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm">You don't have any possessions yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}