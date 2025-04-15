



import { useGame } from '@/app/context/GameContext';
import { initAudio, loadHomeMusic, playHomeMusic, stopHomeMusic } from '@/data/audioManager';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

export default function Apartment() {
    const { state, dispatch } = useGame();
    const { player } = state;

    // State for entertainment modal popups
    const [showTvModal, setShowTvModal] = useState(false);
    const [showGamingModal, setShowGamingModal] = useState(false);
    const [showMeditationModal, setShowMeditationModal] = useState(false);

    // Check if player has an apartment
    useEffect(() => {
        if (!player?.rental?.hasApartment) {
            // Redirect to map if player doesn't have an apartment
            dispatch({
                type: 'CHANGE_SCREEN',
                payload: { screen: 'map' }
            });
            toast.error("You need to rent an apartment first!");
        }
    }, [player, dispatch]);

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







    // Helper function to handle both message and toast
    const showMessage = (message) => {
        // Set message in game state
        dispatch({
            type: 'SET_MESSAGE',
            payload: { text: message }
        });

        // Show toast notification
        toast.success(message);
    };







    // Determine which apartment image to display based on rent amount
    const getApartmentImage = () => {
        if (!player?.rental?.hasApartment) return "/home.jpg"; // Fallback

        // Determine apartment tier based on rent amount
        switch (player.rental.rentAmount) {
            case 50:
                return "/home.jpg"; // Basic apartment
            case 100:
                return "/home1.jpg"; // Standard apartment
            case 200:
                return "/home3.jpg"; // Luxury apartment
            default:
                return "/home.jpg"; // Fallback to basic
        }
    };

    // Get apartment tier based on rent amount
    const getApartmentTier = () => {
        if (!player?.rental?.hasApartment) return "none";
        switch (player.rental.rentAmount) {
            case 50:
                return "basic";
            case 100:
                return "standard";
            case 200:
                return "luxury";
            default:
                return "basic";
        }
    };

    const apartmentTier = getApartmentTier();

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
            showMessage("You had a good rest and recovered energy!");
        } else {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "You're already full of energy!" }
            });
            showMessage("You're already full of energy!");
        }
    };

    const handleStudy = () => {
        if (player.energy < 10) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "You're too tired to study!" }
            });
            showMessage("You're too tired to study!");
        } else if (player.education >= 100) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "You've reached maximum education!" }
            });
            showMessage("You've reached maximum education!");
        } else {
            dispatch({ type: 'STUDY' });
            dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
            showMessage("You studied and improved your education!");
        }
    };

    // Entertainment options
    const handleWatchTV = () => {
        if (player.energy < 5) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "You're too tired to watch TV!" }
            });
            showMessage("You're too tired to watch TV!");
            return;
        }

        setShowTvModal(true);
        // Generate happiness
        dispatch({
            type: 'DO_LEISURE_ACTIVITY',
            payload: {
                cost: 0, // Free since you own the TV
                happiness: 10,
                energy: 5
            }
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
        showMessage("You enjoyed watching TV and gained happiness!");
    };

    const handlePlayGames = () => {
        if (player.energy < 8) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "You're too tired to play video games!" }
            });
            showMessage("You're too tired to play video games!");
            return;
        }

        setShowGamingModal(true);
        // Generate happiness
        dispatch({
            type: 'DO_LEISURE_ACTIVITY',
            payload: {
                cost: 0, // Free since you own the console
                happiness: 15,
                energy: 8
            }
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 20 } });
        showMessage("You had fun playing games and gained happiness!");
    };

    const handleMeditate = () => {
        if (player.energy < 3) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "You're too tired to meditate effectively!" }
            });
            showMessage("You're too tired to meditate effectively!");
            return;
        }

        setShowMeditationModal(true);
        // Generate happiness and restore some energy
        dispatch({
            type: 'DO_LEISURE_ACTIVITY',
            payload: {
                cost: 0,
                happiness: 12,
                energy: -5 // Gain energy instead of losing it
            }
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
        showMessage("You meditated peacefully and feel refreshed!");
    };

    // If player doesn't have an apartment, return null (will redirect in useEffect)
    if (!player?.rental?.hasApartment) {
        return null;
    }

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
                    <div>
                        <h2 className="text-xl font-bold">Your {apartmentTier.charAt(0).toUpperCase() + apartmentTier.slice(1)} Apartment</h2>
                        <p className="text-sm text-gray-300">${player.rental.rentAmount}/month</p>
                    </div>
                    <button
                        onClick={goBackToLocation}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back
                    </button>
                </div>

                {/* Apartment Image - Updated to use dynamic image based on tier */}
                <div className="mb-4">
                    <img
                        src={getApartmentImage()}
                        alt="Apartment Interior"
                        className="w-full h-[400px] object-cover rounded-lg p-1 border-2 border-indigo-500"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2095.jpg";
                        }}
                    />
                </div>

                {/* Player Info */}
                <div className="p-4 rounded mb-4">
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

                {/* Home Activities */}
                <div className="p-4 rounded mb-4">
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
                            onClick={() => dispatch({
                                type: 'CHANGE_SCREEN',
                                payload: { screen: 'goals' }
                            })}
                            className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded"
                        >
                            Check Goals
                            <span className="block text-xs text-green-200">Review your progress</span>
                        </button>

                        {/* Only standard and luxury apartments have TV */}
                        {(apartmentTier === "standard" || apartmentTier === "luxury") && (
                            <button
                                onClick={handleWatchTV}
                                className="bg-amber-600 hover:bg-amber-500 text-white py-2 px-4 rounded"
                            >
                                Watch TV
                                <span className="block text-xs text-amber-200">+10 Happiness (15 min)</span>
                            </button>
                        )}

                        {/* Only luxury apartments have gaming console and meditation */}
                        {apartmentTier === "luxury" && (
                            <>
                                <button
                                    onClick={handlePlayGames}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded"
                                >
                                    Play Games
                                    <span className="block text-xs text-indigo-200">+15 Happiness (20 min)</span>
                                </button>

                                <button
                                    onClick={handleMeditate}
                                    className="bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 rounded"
                                >
                                    Meditate
                                    <span className="block text-xs text-teal-200">+12 Happiness, +5 Energy (15 min)</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Possessions */}
                <div className="p-4 rounded">
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

            {/* TV Modal */}
            <AlertDialog open={showTvModal} onOpenChange={setShowTvModal}>
                <AlertDialogContent className="bg-gray-800 border border-gray-700">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Watching TV</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                            You relax on your couch and enjoy some entertainment on your TV.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-2 rounded-lg overflow-hidden">
                        <img
                            src="/tv.jpg"
                            alt="Watching TV"
                            className="w-full h-[300px] object-cover"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setShowTvModal(false)}
                            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded"
                        >
                            Close
                        </button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            {/* Gaming Console Modal */}
            <AlertDialog open={showGamingModal} onOpenChange={setShowGamingModal}>
                <AlertDialogContent className="bg-gray-800 border border-gray-700">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Gaming Session</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                            You grab your controller and immerse yourself in an exciting video game.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-2 rounded-lg overflow-hidden">
                        <img
                            src="/gaming.jpg"
                            alt="Playing Video Games"
                            className="w-full h-[300px] object-cover"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setShowGamingModal(false)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-6 rounded"
                        >
                            Close
                        </button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>

            {/* Meditation Modal */}
            <AlertDialog open={showMeditationModal} onOpenChange={setShowMeditationModal}>
                <AlertDialogContent className="bg-gray-800 border border-gray-700">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Meditation</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                            You find a quiet corner in your luxury apartment and practice mindfulness meditation.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="mt-2 rounded-lg overflow-hidden">
                        <img
                            src="/meditate.jpg"
                            alt="Meditation"
                            className="w-full h-[300px] object-cover"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setShowMeditationModal(false)}
                            className="bg-teal-600 hover:bg-teal-500 text-white py-2 px-6 rounded"
                        >
                            Close
                        </button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}