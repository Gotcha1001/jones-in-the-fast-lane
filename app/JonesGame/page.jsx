
'use client'

import { motion } from 'framer-motion';
import GameContainer from "../components/Game/GameContainer";
import GameProvider from "../context/GameProvider";
import MotionWrapperDelay from '../components/FramerMotion/MotionWrapperDelay';

export default function JonesGame() {
    // Add this function at the top of your JonesGame component
    const handleReturnHome = () => {
        // Clear the autosave from localStorage
        localStorage.removeItem('jonesGameAutoSave');
        // Also clear any saved games
        localStorage.removeItem('jonesInTheFactLane_saveGame');
        sessionStorage.removeItem('jonesInTheFactLane_hasFileHandle');

        // Now navigate to home
        window.location.href = '/';
    };


    return (
        <div className="text-white min-h-screen bg-gradient-to-b from-black via-indigo-950 to-teal-500">
            <motion.header
                className="bg-gradient-to-r from-indigo-600 via-purple-900 to-black p-4 shadow-lg w-full"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <motion.h1
                        className="text-2xl font-bold"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        Jones in the Fast Lane
                    </motion.h1>
                    <nav>
                        <motion.a
                            href="#"
                            onClick={handleReturnHome}
                            className="hover:text-blue-400"
                            whileHover={{ scale: 1.1 }}
                        >
                            Return Home
                        </motion.a>
                    </nav>
                </div>
            </motion.header>

            <main className="container mx-auto px-4 py-8 bg-black">
                <GameProvider>
                    <GameContainer />
                </GameProvider>

                <motion.div
                    className="mt-4 mb-8 w-full flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
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
                        <p id="instructions" className="text-gray-300 mb-2 text-center max-w-2xl">
                            Welcome to Jones in the Fast Lane! Manage your time, money, education, and career to achieve your goals.
                            Click on locations on the map to move your character there, then use actions at each location to improve your life.
                            Each action costs time and energy, so plan your activities wisely!
                        </p>
                    </MotionWrapperDelay>
                </motion.div>
            </main>
        </div>
    );
}