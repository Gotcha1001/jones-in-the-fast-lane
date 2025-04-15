import { useGame } from '@/app/context/GameContext';
import { useState, useEffect } from 'react';
import { jobs } from '@/data/jobs'; // Import jobs data
import { initAudio, loadWorkMusic, playWorkMusic, stopWorkMusic } from '@/data/audioManager';
import { toast } from 'sonner';

export default function Workplace() {
    const { state, dispatch } = useGame();
    const { player } = state;

    // Add useEffect to handle workplace environment
    useEffect(() => {
        // Initialize audio and load work music
        initAudio();
        loadWorkMusic('/sounds/workmusic.mp3').then(() => {
            playWorkMusic();
        });

        // Clean up function to stop music when leaving the component
        return () => {
            stopWorkMusic();
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



    // Function to calculate experience progress percentage
    const getExperienceProgress = () => {
        return Math.min((player.experience / 100) * 100, 100);
    };

    // Function to handle working
    // Function to handle working
    const handleWork = () => {
        if (player.energy < 15) {
            showMessage("You're too tired to work!"); // Use showMessage consistently here
        } else {
            dispatch({ type: 'WORK' });
            dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
            showMessage(`You completed your work shift and earned money! ${player.job.salary}`);
        }
    };

    // Function to get salary after potential bonuses
    const getSalaryWithBonus = () => {
        if (!player.job) return 0;

        // Could implement bonuses based on experience or other factors
        const experienceBonus = Math.floor(player.experience / 20); // 5% bonus per 20 experience points
        const bonusAmount = Math.floor(player.job.salary * (experienceBonus / 100));

        return player.job.salary + bonusAmount;
    };

    const goBackToLocation = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'location' }
        });
    };

    const renderRentWarning = () => {
        if (player.rental && player.rental.hasApartment && player.rental.rentDue) {
            return (
                <div className="bg-red-900 border-red-700 border p-3 rounded-lg shadow-md mb-4">
                    <p className="text-red-300 font-bold">⚠️ Rent Overdue Warning</p>
                    <p className="text-sm text-red-200">
                        Your rent is overdue! 20% of your salary will be garnished until paid.
                        Visit the Rental Office to pay your rent.
                    </p>
                </div>
            );
        }
        return null;
    };

    // If player doesn't have a job, show a message
    if (!player.job) {
        return (
            <div className="workplace-interface relative mt-4 flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Workplace</h2>
                <p className="text-center mb-4">You don't currently have a job. Visit the Employment Office to get hired!</p>
                <button
                    onClick={goBackToLocation}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                    Back
                </button>
            </div>
        );
    }

    return (
        <div className="workplace-interface relative mt-4 overflow-hidden">
            {/* Video or Image Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
                >
                    <source src="/videos/workplacevideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Workplace content */}
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Workplace</h2>
                    <button
                        onClick={goBackToLocation}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back
                    </button>
                </div>

                {/* Boss/Manager Image */}
                <div className="flex mb-4">
                    <div className="flex-shrink-0 mr-4">
                        <img
                            src="/boss.jpg"
                            alt="Manager"
                            className="w-32 h-32 rounded-full border-2 border-blue-500 shadow-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://img.freepik.com/free-photo/portrait-successful-businesswoman_23-2149758372.jpg";
                            }}
                        />
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 via-purple-900 to-black p-3 rounded-lg shadow-md">
                        <p className="text-sm italic text-gray-300">
                            {`"Welcome back to work! You're doing great as our ${player.job.title}. Keep up the good work and you'll be climbing the corporate ladder in no time!"`}
                        </p>
                    </div>
                </div>

                {renderRentWarning()}

                {/* Job Information */}
                <div className=" p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Job Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Position:</span>
                            <span className="ml-2 text-blue-400">{player.job.title}</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Salary:</span>
                            <span className="ml-2 text-green-400">${getSalaryWithBonus()} per shift</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Education Required:</span>
                            <span className="ml-2 text-blue-400">{player.job.eduReq}</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Experience Required:</span>
                            <span className="ml-2 text-blue-400">{player.job.expReq}</span>
                        </div>
                    </div>
                </div>

                {/* Visual representation of experience */}
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Your Experience</h3>
                    <div className="w-full bg-gray-700 h-4 rounded-full">
                        <div
                            className="bg-blue-500 h-4 rounded-full"
                            style={{ width: `${getExperienceProgress()}%` }}
                        ></div>
                    </div>
                    <div className="text-xs text-right text-gray-400 mt-1">
                        Experience: {player.experience} / 100
                    </div>
                </div>

                {/* Work Actions */}
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Work Actions</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={handleWork}
                            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
                            disabled={player.energy < 15}
                        >
                            Work Shift (Earn ${getSalaryWithBonus()})
                        </button>

                        {/* Additional job-specific actions could be added here */}
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Energy:</span>
                            <span className="ml-2 text-yellow-400">{player.energy}/100</span>
                            <div className="w-full bg-gray-600 h-2 rounded-full mt-1">
                                <div
                                    className="bg-yellow-500 h-2 rounded-full"
                                    style={{ width: `${player.energy}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Workplace Tips</h3>
                    <p className="text-gray-400 text-sm">
                        • Each work shift earns you salary and increases your experience.<br />
                        • Higher experience can lead to better job opportunities.<br />
                        • Make sure you have enough energy before working (15 energy required).<br />
                        • Working takes 15 time units per shift.
                    </p>
                </div>
            </div>
        </div>
    );
}