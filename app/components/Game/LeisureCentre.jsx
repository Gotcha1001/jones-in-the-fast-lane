
import { useGame } from '@/app/context/GameContext';
import { initAudio, loadLeisureMusic, playLeisureMusic, stopLeisureMusic } from '@/data/audioManager';
import { useState, useEffect } from 'react';

export default function LeisureCentre() {
    const { state, dispatch } = useGame();
    const { player } = state;
    const [selectedActivity, setSelectedActivity] = useState('basic');

    useEffect(() => {
        initAudio();
        loadLeisureMusic('/sounds/leisuresound.mp3').then(() => {
            playLeisureMusic();
        });

        return () => {
            stopLeisureMusic();
        };
    }, []);

    // Activities with their costs, time requirements, and benefits
    const activities = {
        basic: {
            name: "Basic Relaxation",
            description: "Take a short break to unwind",
            cost: 0,
            time: 10,
            energy: 5,
            happiness: 15
        },
        swimming: {
            name: "Swimming Session",
            description: "Enjoy the pool facilities",
            cost: 15,
            time: 20,
            energy: 10,
            happiness: 25
        },
        gym: {
            name: "Gym Workout",
            description: "Build strength and fitness",
            cost: 10,
            time: 25,
            energy: 15,
            happiness: 20
        },
        spa: {
            name: "Spa Treatment",
            description: "Luxury relaxation experience",
            cost: 40,
            time: 30,
            energy: 0,
            happiness: 40
        },
        games: {
            name: "Gaming Zone",
            description: "Play the latest games",
            cost: 20,
            time: 15,
            energy: 10,
            happiness: 30
        }
    };

    const handleActivitySelect = (activityKey) => {
        setSelectedActivity(activityKey);
    };

    const handleDoActivity = () => {
        const activity = activities[selectedActivity];

        if (player.cash < activity.cost) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: `You don't have enough cash for ${activity.name}.` }
            });
            return;
        }

        if (player.energy < activity.energy) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: `You're too tired for ${activity.name}.` }
            });
            return;
        }

        // Process the activity
        dispatch({
            type: 'DO_LEISURE_ACTIVITY',
            payload: {
                cost: activity.cost,
                energy: activity.energy,
                happiness: activity.happiness
            }
        });

        dispatch({
            type: 'USE_TIME',
            payload: { amount: activity.time }
        });

        dispatch({
            type: 'SET_MESSAGE',
            payload: { text: `You enjoyed ${activity.name} and gained ${activity.happiness} happiness!` }
        });
    };

    const goBackToLocation = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'location' }
        });
    };

    // Visual representation of happiness with smiley faces
    const getHappinessVisual = (happiness) => {
        const faces = Math.ceil(happiness / 10);
        return Array(faces).fill(0).map((_, index) => (
            <div key={index} className="text-2xl">
                {index < faces / 2 ? "😊" : "😃"}
            </div>
        ));
    };

    return (
        <div className="leisure-interface relative mt-4 overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
            >
                <source src="/videos/leisure.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Leisure Centre content */}
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Python Leisure Centre</h2>
                    <button
                        onClick={goBackToLocation}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back
                    </button>
                </div>

                {/* Staff Image */}
                <div className="flex mb-4">
                    <div className="flex-shrink-0 mr-4">
                        <img
                            src="/leisurelady.jpg"
                            alt="Leisure Centre Staff"
                            className="w-32 h-32 rounded-full border-2 border-purple-500 shadow-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://img.freepik.com/free-photo/portrait-young-sportive-girl-training-with-dumbbells-isolated-blue-wall_155003-14158.jpg";
                            }}
                        />
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 via-blue-900 to-black p-3 rounded-lg shadow-md">
                        <p className="text-sm italic text-gray-300">
                            "Welcome to Python Leisure Centre! Take a break from your busy life and enjoy our fantastic facilities. Whether you want to swim, work out, or just relax, we've got you covered!"
                        </p>
                    </div>
                </div>

                {/* Player Information */}
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Your Status</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Cash:</span>
                            <span className="ml-2 text-green-400">${player.cash.toFixed(2)}</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Energy:</span>
                            <span className="ml-2 text-blue-400">{player.energy}/100</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Happiness:</span>
                            <span className="ml-2 text-yellow-400">{player.happiness}/100</span>
                        </div>
                    </div>
                </div>

                {/* Visual representation of happiness */}
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Your Happiness Level</h3>
                    <div className="flex justify-center items-center h-12 space-x-2 mb-2">
                        {player.happiness > 0 ? (
                            getHappinessVisual(player.happiness)
                        ) : (
                            <div className="text-gray-400 italic">You're not feeling happy at all!</div>
                        )}
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${player.happiness}%` }}
                        ></div>
                    </div>
                </div>

                {/* Activities List */}
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Available Activities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.keys(activities).map(activityKey => (
                            <div
                                key={activityKey}
                                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedActivity === activityKey ? 'bg-purple-700 border-2 border-purple-400' : 'bg-gray-700 hover:bg-gray-600'}`}
                                onClick={() => handleActivitySelect(activityKey)}
                            >
                                <h4 className="font-semibold">{activities[activityKey].name}</h4>
                                <p className="text-sm text-gray-300">{activities[activityKey].description}</p>
                                <div className="mt-2 flex justify-between text-xs">
                                    <span className="text-green-400">Cost: ${activities[activityKey].cost}</span>
                                    <span className="text-blue-400">Energy: -{activities[activityKey].energy}</span>
                                    <span className="text-yellow-400">+{activities[activityKey].happiness} Happiness</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected Activity */}
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Selected Activity</h3>
                    <div className="p-4 bg-gray-700 rounded mb-4">
                        <h4 className="font-bold text-lg">{activities[selectedActivity].name}</h4>
                        <p className="mb-2 text-gray-300">{activities[selectedActivity].description}</p>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="bg-gray-800 p-2 rounded text-center">
                                <span className="block text-xs text-gray-400">Cost</span>
                                <span className="text-green-400">${activities[selectedActivity].cost}</span>
                            </div>
                            <div className="bg-gray-800 p-2 rounded text-center">
                                <span className="block text-xs text-gray-400">Time</span>
                                <span className="text-purple-400">{activities[selectedActivity].time} units</span>
                            </div>
                            <div className="bg-gray-800 p-2 rounded text-center">
                                <span className="block text-xs text-gray-400">Happiness</span>
                                <span className="text-yellow-400">+{activities[selectedActivity].happiness}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleDoActivity}
                            disabled={player.cash < activities[selectedActivity].cost || player.energy < activities[selectedActivity].energy}
                            className={`w-full py-2 px-4 rounded text-white font-medium ${player.cash >= activities[selectedActivity].cost && player.energy >= activities[selectedActivity].energy ? 'bg-purple-600 hover:bg-purple-500' : 'bg-gray-600 cursor-not-allowed'}`}
                        >
                            Do Activity
                        </button>
                    </div>
                </div>

                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Leisure Tips</h3>
                    <p className="text-gray-400 text-sm">
                        • Regular relaxation helps maintain your happiness level.<br />
                        • Different activities provide varying benefits.<br />
                        • Higher-cost activities generally yield better happiness benefits.<br />
                        • Don't forget to balance work and leisure!
                    </p>
                </div>
            </div>
        </div>
    );
}