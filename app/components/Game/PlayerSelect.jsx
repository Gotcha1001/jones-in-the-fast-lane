


// components/Game/PlayerSelect.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/app/context/GameContext';
import MotionWrapperDelay from '../FramerMotion/MotionWrapperDelay';
import FeatureMotionWrapper from '../FramerMotion/FeatureMotionWrapperMap';
import SmokeEffect from '../SmokeEffects/SmokeEffect';

export default function PlayerSelect() {
    const { dispatch } = useGame();
    const [numPlayers, setNumPlayers] = useState(1);
    const [playerName, setPlayerName] = useState("Jones");
    const [playerAvatar, setPlayerAvatar] = useState(1);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [players, setPlayers] = useState([]);
    const [customGoals, setCustomGoals] = useState(null); // Store custom goals temporarily
    const [useDefaultGoals, setUseDefaultGoals] = useState(true); // Track if default goals are used

    const avatars = [

        '/avatars/avatar30.jpg',
        '/avatars/avatar25.jpg',
        '/avatars/avatar24.jpg',
        '/avatars/avatar26.jpg',
        '/avatars/avatar27.jpg',
        '/avatars/avatar32.jpg',
        '/avatars/avatar34.jpg',
        '/avatars/avatar35.jpg',
        '/avatars/avatar38.jpg',
        '/avatars/avatar39.jpg',
        '/avatars/avatar28.jpg',
        '/avatars/avatar21.jpg',
        '/avatars/avatar 31.jpg',
        '/avatars/avatar37.jpg',
        '/avatars/avatar40.jpg',
        '/avatars/avatar41.jpg',
        '/avatars/avatar29.jpg',
        '/avatars/avatar17.jpg',
        '/avatars/avatar15.jpg',
        '/avatars/avatar16.jpg',
        '/avatars/avatar19.jpg',
        '/avatars/avatar42.jpg',
        '/avatars/avatar33.jpg',
        '/avatars/avatar36.jpg',

        '/avatars/person.jpg',


        '/avatars/sexygirl.jpg',
        '/avatars/sexygirl1.jpg',
        '/avatars/sexygirl2.jpg',
        '/avatars/sexygirl3.jpg',
        '/avatars/sexygirl4.jpg',

        '/avatars/sexyguy1.jpg',
        '/avatars/sexyguy2.jpg',
        '/avatars/sexyguy.jpg',
        '/avatars/sexyguy3.jpg',
        '/avatars/sexyguy4.jpg',

    ];

    const defaultGoals = {
        cash: 10000,
        education: 80,
        happiness: 90,
        winningJobs: ["Executive", "Engineer", "Startup Founder", "Investor"],
    };

    // Handle goal slider changes
    const handleGoalChange = (goal, value) => {
        setCustomGoals((prev) => ({
            ...prev,
            [goal]: parseInt(value),
        }));
    };

    // Toggle between custom and default goals
    const toggleGoals = () => {
        setUseDefaultGoals(!useDefaultGoals);
        if (!useDefaultGoals) {
            setCustomGoals(null); // Reset custom goals when switching to default
        } else {
            setCustomGoals({
                cash: 10000,
                education: 80,
                happiness: 90,
            }); // Initialize custom goals with default values
        }
    };

    const handleAddPlayer = () => {
        const newPlayer = {
            id: currentPlayer,
            name: playerName || `Player ${currentPlayer}`,
            avatar: avatars[playerAvatar - 1],
            goals: useDefaultGoals ? defaultGoals : { ...customGoals, winningJobs: defaultGoals.winningJobs },
        };

        const updatedPlayers = [...players, newPlayer];
        setPlayers(updatedPlayers);

        if (updatedPlayers.length < numPlayers) {
            // Setup for next player
            setCurrentPlayer(currentPlayer + 1);
            setPlayerName(`Player ${currentPlayer + 1}`);
            setPlayerAvatar(1);
            setUseDefaultGoals(true);
            setCustomGoals(null);
        } else {
            // Start the game with all players
            dispatch({
                type: 'START_GAME',
                payload: {
                    players: updatedPlayers,
                    numPlayers,
                },
            });
        }
    };

    return (
        <motion.div
            className="player-select bg-gradient-to-b from-black via-indigo-950 to-teal-500 rounded-lg p-6 max-w-2xl mx-auto my-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <SmokeEffect isVisible={true} />
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                variants={{
                    hidden: { opacity: 0, y: -100 },
                    visible: { opacity: 1, y: 0 },
                }}
            >
                <h2 className="text-5xl font-bold text-center mb-6 text-indigo-500 gradient-title">
                    Welcome to Jones in the Fast Lane
                </h2>
            </MotionWrapperDelay>

            {players.length < numPlayers ? (
                <>
                    <div className="mb-6">
                        <MotionWrapperDelay
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.9, delay: 0.8 }}
                            variants={{
                                hidden: { opacity: 0, y: 100 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <h3 className="text-lg mb-5 text-center font-bold">How many players?</h3>
                        </MotionWrapperDelay>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <MotionWrapperDelay
                                    key={num}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.9, delay: 0.8 }}
                                    variants={{
                                        hidden: { opacity: 0, x: num % 2 === 0 ? 100 : -100 },
                                        visible: { opacity: 1, x: 0 },
                                    }}
                                >
                                    <motion.button
                                        className={`px-4 py-2 rounded ${numPlayers === num ? 'bg-blue-600' : 'bg-gray-600'}`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setNumPlayers(num)}
                                    >
                                        {num} Player{num > 1 ? 's' : ''}
                                    </motion.button>
                                </MotionWrapperDelay>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg mb-2">Player {currentPlayer} Name:</h3>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="w-full p-2 bg-gray-700 rounded"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg mb-4 text-center font-bold">Select Avatar:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                            {avatars.map((avatar, index) => {
                                const isSelected = playerAvatar === index + 1;
                                return (
                                    <FeatureMotionWrapper key={index} index={index}>
                                        <motion.div
                                            className={`relative cursor-pointer flex items-center justify-center transition-all duration-300 ${isSelected ? 'ring-4 ring-blue-400' : ''
                                                } rounded-full w-32 aspect-square overflow-hidden`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setPlayerAvatar(index + 1)}
                                        >
                                            <img
                                                src={avatar}
                                                alt={`Avatar ${index + 1}`}
                                                className="w-full h-full object-cover object-[center_top] rounded-full"
                                            />
                                        </motion.div>
                                    </FeatureMotionWrapper>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg mb-2">Select Goals:</h3>
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                checked={useDefaultGoals}
                                onChange={toggleGoals}
                                className="mr-2"
                            />
                            <label>Use Default Goals</label>
                        </div>
                        {!useDefaultGoals && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1">Cash Goal: ${customGoals?.cash || 10000}</label>
                                    <input
                                        type="range"
                                        min="5000"
                                        max="20000"
                                        step="1000"
                                        value={customGoals?.cash || 10000}
                                        onChange={(e) => handleGoalChange('cash', e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Education Goal: {customGoals?.education || 80}/100</label>
                                    <input
                                        type="range"
                                        min="50"
                                        max="100"
                                        step="5"
                                        value={customGoals?.education || 80}
                                        onChange={(e) => handleGoalChange('education', e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1">Happiness Goal: {customGoals?.happiness || 90}/100</label>
                                    <input
                                        type="range"
                                        min="70"
                                        max="100"
                                        step="5"
                                        value={customGoals?.happiness || 90}
                                        onChange={(e) => handleGoalChange('happiness', e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <motion.button
                        className="w-full py-3 bg-blue-600 rounded-lg text-white font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddPlayer}
                    >
                        {players.length === numPlayers - 1 ? 'Start Game' : 'Next Player'}
                    </motion.button>
                </>
            ) : (
                <div className="text-center">
                    <p>Starting game...</p>
                </div>
            )}
        </motion.div>
    );
}