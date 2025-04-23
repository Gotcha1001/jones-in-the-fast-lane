


import { useGame } from '@/app/context/GameContext';
import {
    initAudio,
    loadHomeMusic,
    playHomeMusic,
    stopHomeMusic,
    loadClickSound,
    playClickSound,
} from '@/data/audioManager';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

export default function Apartment() {
    const { state, dispatch } = useGame();
    const { player } = state;
    const [showTvModal, setShowTvModal] = useState(false);
    const [showGamingModal, setShowGamingModal] = useState(false);
    const [showMeditationModal, setShowMeditationModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('computerScience');

    // Wrapper function to play click sound before executing the handler
    const withSound = (handler) => (event) => {
        playClickSound();
        if (handler) {
            handler(event);
        }
    };

    useEffect(() => {
        if (!player?.rental?.hasApartment) {
            dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'map' } });
            toast.error("You need to rent an apartment first!");
        }
    }, [player, dispatch]);

    useEffect(() => {
        initAudio();
        loadHomeMusic('/sounds/apartment.mp3').then(() => {
            playHomeMusic();
        });
        loadClickSound('/sounds/click.mp3').then((success) => {
            if (!success) {
                console.warn("Failed to load click sound");
            }
        });
        return () => {
            stopHomeMusic();
        };
    }, []);

    const showMessage = (message) => {
        dispatch({ type: 'SET_MESSAGE', payload: { text: message } });
        toast.success(message);
    };

    const getApartmentImage = () => {
        if (!player?.rental?.hasApartment) return "/home.jpg";
        switch (player.rental.rentAmount) {
            case 50: return "/home.jpg";
            case 100: return "/home2.jpg";
            case 200: return "/home3.jpg";
            default: return "/home.jpg";
        }
    };

    const getApartmentTier = () => {
        if (!player?.rental?.hasApartment) return "none";
        switch (player.rental.rentAmount) {
            case 50: return "basic";
            case 100: return "standard";
            case 200: return "luxury";
            default: return "basic";
        }
    };

    const apartmentTier = getApartmentTier();

    const goBackToLocation = () => {
        dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'location' } });
    };

    const handleSleep = () => {
        if (player.energy < 100) {
            dispatch({ type: 'SLEEP' });
            dispatch({ type: 'USE_TIME', payload: { amount: 30 } });
            showMessage("You had a good rest and recovered energy!");
        } else {
            showMessage("You're already full of energy!");
        }
    };

    const handleStudy = () => {
        if (player.energy < 10) {
            showMessage("You're too tired to study!");
        } else if ((player.subjects[selectedSubject] || 0) >= 100) {
            showMessage(`You've reached maximum knowledge in ${selectedSubject}!`);
        } else {
            dispatch({
                type: 'STUDY_SUBJECT',
                payload: { hours: 1, subject: selectedSubject }
            });
            dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
            showMessage(`You studied ${selectedSubject} and improved your knowledge!`);
        }
    };

    const handleWatchTV = () => {
        if (player.energy < 5) {
            showMessage("You're too tired to watch TV!");
            return;
        }
        setShowTvModal(true);
        dispatch({
            type: 'DO_LEISURE_ACTIVITY',
            payload: { cost: 0, happiness: 10, energy: 5 }
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
        showMessage("You enjoyed watching TV and gained happiness!");
    };

    const handlePlayGames = () => {
        if (player.energy < 8) {
            showMessage("You're too tired to play video games!");
            return;
        }
        setShowGamingModal(true);
        dispatch({
            type: 'DO_LEISURE_ACTIVITY',
            payload: { cost: 0, happiness: 15, energy: 8 }
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 20 } });
        showMessage("You had fun playing games and gained happiness!");
    };

    const handleMeditate = () => {
        if (player.energy < 3) {
            showMessage("You're too tired to meditate effectively!");
            return;
        }
        setShowMeditationModal(true);
        dispatch({
            type: 'DO_LEISURE_ACTIVITY',
            payload: { cost: 0, happiness: 12, energy: -5 }
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
        showMessage("You meditated peacefully and feel refreshed!");
    };

    if (!player?.rental?.hasApartment) {
        return null;
    }

    const subjects = [
        { id: 'computerScience', name: 'Computer Science' },
        { id: 'engineering', name: 'Engineering' },
        { id: 'business', name: 'Business Administration' },
        { id: 'liberalArts', name: 'Liberal Arts' },
    ];

    return (
        <div className="apartment-interface relative mt-4 overflow-hidden">
            <style jsx>{`
        .apartment-image {
          width: 100%;
          max-height: 60vh;
          object-fit: cover;
          border-radius: 0.5rem;
          border: 2px solid #6366f1;
        }
        @media (max-width: 640px) {
          .apartment-image {
            max-height: 40vh;
          }
        }
        .study-select-container {
          width: 100%;
          max-width: 200px;
          overflow: hidden;
        }
        .study-select {
          width: 100%;
          background-color: #4b5563;
          color: white;
          padding: 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
          background-size: 1em;
        }
        @media (max-width: 640px) {
          .study-select-container {
            max-width: 150px;
          }
          .study-select {
            font-size: 0.75rem;
            padding: 0.375rem;
          }
        }
      `}</style>
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
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold">
                            Your {apartmentTier.charAt(0).toUpperCase() + apartmentTier.slice(1)} Apartment
                        </h2>
                        <p className="text-sm text-gray-300">${player.rental.rentAmount}/month</p>
                    </div>
                    <button
                        onClick={withSound(goBackToLocation)}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back
                    </button>
                </div>
                <div className="mb-4">
                    <img
                        src={getApartmentImage()}
                        alt="Apartment Interior"
                        className="apartment-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2095.jpg";
                        }}
                    />
                </div>
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
                <div className="p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Home Activities</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={withSound(handleSleep)}
                            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Sleep
                            <span className="block text-xs text-blue-200">Restore energy (30 min)</span>
                        </button>
                        <div className="bg-gray-700 p-2 rounded">
                            <div className="flex items-center mb-2">
                                <span className="mr-2 text-gray-400">Study Subject:</span>
                                <div className="study-select-container">
                                    <select
                                        value={selectedSubject}
                                        onChange={withSound((e) => setSelectedSubject(e.target.value))}
                                        className="study-select"
                                    >
                                        {subjects.map((subject) => (
                                            <option key={subject.id} value={subject.id}>
                                                {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button
                                onClick={withSound(handleStudy)}
                                className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded"
                            >
                                Study
                                <span className="block text-xs text-purple-200">Improve {selectedSubject} (15 min)</span>
                            </button>
                        </div>
                        <button
                            onClick={withSound(() => dispatch({
                                type: 'CHANGE_SCREEN',
                                payload: { screen: 'goals' }
                            }))}
                            className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded"
                        >
                            Check Goals
                            <span className="block text-xs text-green-200">Review your progress</span>
                        </button>
                        {(apartmentTier === "standard" || apartmentTier === "luxury") && (
                            <button
                                onClick={withSound(handleWatchTV)}
                                className="bg-amber-600 hover:bg-amber-500 text-white py-2 px-4 rounded"
                            >
                                Watch TV
                                <span className="block text-xs text-amber-200">+10 Happiness (15 min)</span>
                            </button>
                        )}
                        {apartmentTier === "luxury" && (
                            <>
                                <button
                                    onClick={withSound(handlePlayGames)}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded"
                                >
                                    Play Games
                                    <span className="block text-xs text-indigo-200">+15 Happiness (20 min)</span>
                                </button>
                                <button
                                    onClick={withSound(handleMeditate)}
                                    className="bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 rounded"
                                >
                                    Meditate
                                    <span className="block text-xs text-teal-200">+12 Happiness, +5 Energy (15 min)</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Relationship Status</h3>
                    {player.relationship.isDating ? (
                        <div className="bg-gray-700 p-3 rounded-lg">
                            <div className="flex items-center mb-2">
                                <div className="w-16 h-16 rounded-full overflow-hidden mr-3 border-2 border-pink-300">
                                    <img
                                        src={player.relationship.partner.image}
                                        alt={player.relationship.partner.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/api/placeholder/100/100";
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Dating: {player.relationship.partner.name}</h4>
                                    <div className="text-sm text-gray-300">
                                        <div>Dates: {player.relationship.dateCount}</div>
                                        <div>Relationship Happiness: {player.relationship.happiness}/100</div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={withSound(() => dispatch({ type: 'BREAK_UP' }))}
                                className="mt-2 bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded text-sm"
                            >
                                Break Up
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm">You're currently single. Visit the Dating Office to find someone!</p>
                    )}
                </div>
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
                            className="w-full max-h-[300px] object-cover"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={withSound(() => setShowTvModal(false))}
                            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded"
                        >
                            Close
                        </button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
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
                            className="w-full max-h-[300px] object-cover"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={withSound(() => setShowGamingModal(false))}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-6 rounded"
                        >
                            Close
                        </button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
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
                            className="w-full max-h-[300px] object-cover"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={withSound(() => setShowMeditationModal(false))}
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