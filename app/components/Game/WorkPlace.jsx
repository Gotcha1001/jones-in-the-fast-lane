


// import { useGame } from '@/app/context/GameContext';
// import { useState, useEffect } from 'react';
// import { jobs } from '@/data/jobs';
// import { initAudio, loadWorkMusic, playWorkMusic, stopWorkMusic, loadClickSound, playClickSound } from '@/data/audioManager';
// import { toast } from 'sonner';

// export default function Workplace() {
//     const { state, dispatch } = useGame();
//     const { player } = state;

//     // Wrapper function to play click sound before executing the handler
//     const withSound = (handler) => (event) => {
//         playClickSound();
//         if (handler) {
//             handler(event);
//         }
//     };

//     useEffect(() => {
//         initAudio();
//         loadClickSound('/sounds/click.mp3').then((success) => {
//             if (!success) {
//                 console.warn("Failed to load click sound");
//             }
//         });
//         loadWorkMusic('/sounds/workmusic.mp3').then(() => {
//             playWorkMusic();
//         });
//         return () => {
//             stopWorkMusic();
//         };
//     }, []);

//     const showMessage = (message) => {
//         console.log('showMessage called with:', message); // Debug log
//         dispatch({
//             type: 'SET_MESSAGE',
//             payload: { text: message }
//         });
//         toast.success(message); // Changed to toast.error for visibility
//     };

//     const getExperienceProgress = () => {
//         return Math.min((player.experience / 100) * 100, 100);
//     };

//     const handleWork = () => {
//         console.log('handleWork called, energy:', player.energy); // Debug log
//         if (player.energy < 15) {
//             showMessage("You're too tired to work!");
//         } else {
//             dispatch({ type: 'WORK' });
//             dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
//             showMessage(`You completed your work shift and earned money! ${player.job.salary}`);
//         }
//     };

//     const getSalaryWithBonus = () => {
//         if (!player.job) return 0;
//         const experienceBonus = Math.floor(player.experience / 20);
//         const bonusAmount = Math.floor(player.job.salary * (experienceBonus / 100));
//         return player.job.salary + bonusAmount;
//     };

//     const goBackToLocation = () => {
//         dispatch({
//             type: 'CHANGE_SCREEN',
//             payload: { screen: 'location' }
//         });
//     };

//     const renderRentWarning = () => {
//         if (player.rental && player.rental.hasApartment && player.rental.rentDue) {
//             return (
//                 <div className="bg-red-900 border-red-700 border p-3 rounded-lg shadow-md mb-4">
//                     <p className="text-red-300 font-bold">⚠️ Rent Overdue Warning</p>
//                     <p className="text-sm text-red-200">
//                         Your rent is overdue! 20% of your salary will be garnished until paid.
//                         Visit the Rental Office to pay your rent.
//                     </p>
//                 </div>
//             );
//         }
//         return null;
//     };

//     if (!player.job) {
//         return (
//             <div className="workplace-interface relative mt-4 flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg">
//                 <h2 className="text-xl font-bold mb-4">Workplace</h2>
//                 <p className="text-center mb-4">You don't currently have a job. Visit the Employment Office to get hired!</p>
//                 <button
//                     onClick={withSound(goBackToLocation)}
//                     className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
//                 >
//                     Back
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="workplace-interface relative mt-4 overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-full bg-gray-900 z-0">
//                 <video
//                     autoPlay
//                     loop
//                     muted
//                     playsInline
//                     className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
//                 >
//                     <source src="/videos/workplacevideo.mp4" type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//             </div>
//             <div className="relative z-10 p-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold">Workplace</h2>
//                     <button
//                         onClick={withSound(goBackToLocation)}
//                         className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
//                     >
//                         Back
//                     </button>
//                 </div>
//                 <div className="mb-6 flex flex-col items-center">
//                     <div className="flex justify-center mb-6 mt-4">
//                         <img
//                             src="/boss.jpg"
//                             alt="Workplace"
//                             className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-blue-500 shadow-xl object-cover"
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers_23-2149139417.jpg";
//                             }}
//                         />
//                     </div>
//                     <div className="mt-4 bg-gradient-to-r from-blue-500 via-purple-900 to-black px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
//                         <p className="text-sm italic text-white">
//                             {`"Welcome back to work! You're doing great as our ${player.job.title}. Keep up the good work and you'll be climbing the corporate ladder in no time!"`}
//                         </p>
//                     </div>
//                 </div>
//                 {renderRentWarning()}
//                 <div className="p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Job Information</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="p-2 bg-gray-700 rounded">
//                             <span className="text-gray-400">Position:</span>
//                             <span className="ml-2 text-blue-400">{player.job.title}</span>
//                         </div>
//                         <div className="p-2 bg-gray-700 rounded">
//                             <span className="text-gray-400">Salary:</span>
//                             <span className="ml-2 text-green-400">${getSalaryWithBonus()} per shift</span>
//                         </div>
//                         <div className="p-2 bg-gray-700 rounded">
//                             <span className="text-gray-400">Education Required:</span>
//                             <span className="ml-2 text-blue-400">{player.job.eduReq}</span>
//                         </div>
//                         <div className="p-2 bg-gray-700 rounded">
//                             <span className="text-gray-400">Experience Required:</span>
//                             <span className="ml-2 text-blue-400">{player.job.expReq}</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-gray-800 p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Your Experience</h3>
//                     <div className="w-full bg-gray-700 h-4 rounded-full">
//                         <div
//                             className="bg-blue-500 h-4 rounded-full"
//                             style={{ width: `${getExperienceProgress()}%` }}
//                         ></div>
//                     </div>
//                     <div className="text-xs text-right text-gray-400 mt-1">
//                         Experience: {player.experience} / 100
//                     </div>
//                 </div>
//                 <div className="bg-gray-800 p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Work Actions</h3>
//                     <div className="grid grid-cols-1 gap-4">
//                         <button
//                             onClick={withSound(handleWork)}
//                             className={`${player.energy < 15
//                                 ? 'bg-gray-600 cursor-not-allowed'
//                                 : 'bg-blue-600 hover:bg-blue-500'
//                                 } text-white py-2 px-4 rounded`}
//                         >
//                             Work Shift (Earn ${getSalaryWithBonus()})
//                         </button>
//                         <div className="p-2 bg-gray-700 rounded">
//                             <span className="text-gray-400">Energy:</span>
//                             <span className="ml-2 text-yellow-400">{player.energy}/100</span>
//                             <div className="w-full bg-gray-600 h-2 rounded-full mt-1">
//                                 <div
//                                     className="bg-yellow-500 h-2 rounded-full"
//                                     style={{ width: `${player.energy}%` }}
//                                 ></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="p-4 rounded">
//                     <h3 className="text-lg font-semibold mb-2">Workplace Tips</h3>
//                     <p className="text-gray-400 text-sm">
//                         • Each work shift earns you salary and increases your experience.<br />
//                         • Higher experience can lead to better job opportunities.<br />
//                         • Make sure you have enough energy before working (15 energy required).<br />
//                         • Working takes 15 time units per shift.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useGame } from '@/app/context/GameContext';
import { useState, useEffect, useMemo, useRef } from 'react';
import { jobs } from '@/data/jobs';
import { initAudio, loadWorkMusic, playWorkMusic, stopWorkMusic, loadClickSound, playClickSound } from '@/data/audioManager';
import { toast } from 'sonner';

export default function Workplace() {
    const { state, dispatch } = useGame();
    const { player } = state;

    // Use useRef to store audio instances
    const audioRefs = useRef({
        click: null,
        workMusic: null,
    });

    // Preload audio only once
    useEffect(() => {
        initAudio();
        loadClickSound('/sounds/click.mp3').then((success) => {
            if (success) {
                audioRefs.current.click = new Audio('/sounds/click.mp3');
            } else {
                console.warn("Failed to load click sound");
            }
        });
        loadWorkMusic('/sounds/workmusic.mp3').then(() => {
            audioRefs.current.workMusic = new Audio('/sounds/workmusic.mp3');
            playWorkMusic();
        });

        return () => {
            stopWorkMusic();
            if (audioRefs.current.workMusic) {
                audioRefs.current.workMusic.pause();
            }
        };
    }, []);

    const withSound = (handler) => (event) => {
        if (audioRefs.current.click) {
            playClickSound();
        }
        if (handler) {
            handler(event);
        }
    };

    const showMessage = (message) => {
        dispatch({
            type: 'SET_MESSAGE',
            payload: { text: message },
        });
        toast.success(message);
    };

    const getExperienceProgress = useMemo(() => () => {
        return Math.min((player.experience / 100) * 100, 100);
    }, [player.experience]);

    const handleWork = () => {
        if (player.energy < 15) {
            showMessage("You're too tired to work!");
        } else {
            dispatch({ type: 'WORK' });
            dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
            showMessage(`You completed your work shift and earned money! $${player.job.salary}`);
        }
    };

    const getSalaryWithBonus = useMemo(() => () => {
        if (!player.job) return 0;
        const experienceBonus = Math.floor(player.experience / 20);
        const bonusAmount = Math.floor(player.job.salary * (experienceBonus / 100));
        return player.job.salary + bonusAmount;
    }, [player.job, player.experience]);

    const goBackToLocation = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'location' },
        });
    };

    const renderRentWarning = useMemo(() => () => {
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
    }, [player.rental]);

    if (!player.job) {
        return (
            <div className="workplace-interface relative mt-4 flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Workplace</h2>
                <p className="text-center mb-4">You don't currently have a job. Visit the Employment Office to get hired!</p>
                <button
                    onClick={withSound(goBackToLocation)}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                    Back
                </button>
            </div>
        );
    }

    return (
        <div className="workplace-interface relative mt-4 overflow-hidden">
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
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Workplace</h2>
                    <button
                        onClick={withSound(goBackToLocation)}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back
                    </button>
                </div>
                <div className="mb-6 flex flex-col items-center">
                    <div className="flex justify-center mb-6 mt-4">
                        <img
                            src="/boss.jpg"
                            alt="Workplace"
                            className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-blue-500 shadow-xl object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://img.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers_23-2149139417.jpg";
                            }}
                        />
                    </div>
                    <div className="mt-4 bg-gradient-to-r from-blue-500 via-purple-900 to-black px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
                        <p className="text-sm italic text-white">
                            {`"Welcome back to work! You're doing great as our ${player.job.title}. Keep up the good work and you'll be climbing the corporate ladder in no time!"`}
                        </p>
                    </div>
                </div>
                {renderRentWarning()}
                <div className="p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Job Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Position:</span>
                            <span className="ml-2 text-blue-400">{player.job.title}</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Salary:</span>
                            <span className="ml-2 text-green-400">${getSalaryWithBonus()}</span>
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
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Work Actions</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={withSound(handleWork)}
                            className={`${player.energy < 15
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-500'
                                } text-white py-2 px-4 rounded`}
                        >
                            Work Shift (Earn ${getSalaryWithBonus()})
                        </button>
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
                <div className="p-4 rounded">
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


