// // components/Game/GoalsTracker.jsx
// import { useGame } from '@/app/context/GameContext';
// import { useState, useEffect } from 'react';

// export default function GoalsTracker() {
//     const { state, dispatch } = useGame();
//     const { player, goals } = state;

//     // Calculate progress percentages
//     const cashProgress = Math.min(100, (player.cash / goals.cash) * 100);
//     const educationProgress = Math.min(100, (player.education / goals.education) * 100);
//     const happinessProgress = Math.min(100, (player.happiness / goals.happiness) * 100);

//     // Check if player has one of the winning jobs
//     const hasWinningJob = player.job && goals.winningJobs.includes(player.job.title);

//     // Return to previous screen
//     const goBack = () => {
//         dispatch({
//             type: 'CHANGE_SCREEN',
//             payload: { screen: 'location' }
//         });
//     };

//     return (
//         <div className="goals-tracker bg-gray-900 rounded-lg p-6 mt-4">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-yellow-400">Your Path to Success</h2>
//                 <button
//                     onClick={goBack}
//                     className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
//                 >
//                     Back
//                 </button>
//             </div>

//             <div className="grid gap-6">
//                 {/* Cash Goal */}
//                 <div className="goal-item">
//                     <div className="flex justify-between mb-1">
//                         <span className="text-lg font-medium">Cash</span>
//                         <span className={`font-medium ${cashProgress >= 100 ? 'text-green-400' : 'text-white'}`}>
//                             ${player.cash.toFixed(0)} / ${goals.cash}
//                         </span>
//                     </div>
//                     <div className="w-full bg-gray-700 rounded h-4">
//                         <div
//                             className={`h-4 rounded ${cashProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
//                             style={{ width: `${cashProgress}%` }}
//                         ></div>
//                     </div>
//                     {cashProgress >= 100 && (
//                         <span className="text-xs text-green-400 mt-1 block">✓ Achieved!</span>
//                     )}
//                 </div>

//                 {/* Education Goal */}
//                 <div className="goal-item">
//                     <div className="flex justify-between mb-1">
//                         <span className="text-lg font-medium">Education</span>
//                         <span className={`font-medium ${educationProgress >= 100 ? 'text-green-400' : 'text-white'}`}>
//                             {player.education} / {goals.education}
//                         </span>
//                     </div>
//                     <div className="w-full bg-gray-700 rounded h-4">
//                         <div
//                             className={`h-4 rounded ${educationProgress >= 100 ? 'bg-green-500' : 'bg-purple-500'}`}
//                             style={{ width: `${educationProgress}%` }}
//                         ></div>
//                     </div>
//                     {educationProgress >= 100 && (
//                         <span className="text-xs text-green-400 mt-1 block">✓ Achieved!</span>
//                     )}
//                 </div>

//                 {/* Happiness Goal */}
//                 <div className="goal-item">
//                     <div className="flex justify-between mb-1">
//                         <span className="text-lg font-medium">Happiness</span>
//                         <span className={`font-medium ${happinessProgress >= 100 ? 'text-green-400' : 'text-white'}`}>
//                             {player.happiness} / {goals.happiness}
//                         </span>
//                     </div>
//                     <div className="w-full bg-gray-700 rounded h-4">
//                         <div
//                             className={`h-4 rounded ${happinessProgress >= 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
//                             style={{ width: `${happinessProgress}%` }}
//                         ></div>
//                     </div>
//                     {happinessProgress >= 100 && (
//                         <span className="text-xs text-green-400 mt-1 block">✓ Achieved!</span>
//                     )}
//                 </div>

//                 {/* Career Goal */}
//                 <div className="goal-item">
//                     <div className="flex justify-between mb-1">
//                         <span className="text-lg font-medium">Career</span>
//                         <span className={`font-medium ${hasWinningJob ? 'text-green-400' : 'text-white'}`}>
//                             {player.job ? player.job.title : 'Unemployed'}
//                         </span>
//                     </div>
//                     <div className="bg-gray-700 rounded p-3 flex items-center justify-between">
//                         <div>
//                             <p className="text-sm text-gray-300">Goal: Get one of these jobs:</p>
//                             <p className="text-sm text-white">{goals.winningJobs.join(", ")}</p>
//                         </div>
//                         <div>
//                             {hasWinningJob ? (
//                                 <span className="text-green-400 text-xl">✓</span>
//                             ) : (
//                                 <span className="text-gray-400 text-xl">○</span>
//                             )}
//                         </div>
//                     </div>
//                     {hasWinningJob && (
//                         <span className="text-xs text-green-400 mt-1 block">✓ Achieved!</span>
//                     )}
//                 </div>

//                 {/* Overall Progress */}
//                 <div className="mt-4 bg-gray-800 p-4 rounded">
//                     <h3 className="text-xl font-bold mb-2">Overall Progress</h3>
//                     <div className="flex flex-wrap gap-2">
//                         <span className={`badge px-2 py-1 rounded ${cashProgress >= 100 ? 'bg-green-600' : 'bg-gray-600'}`}>
//                             Cash {cashProgress >= 100 ? '✓' : '○'}
//                         </span>
//                         <span className={`badge px-2 py-1 rounded ${educationProgress >= 100 ? 'bg-green-600' : 'bg-gray-600'}`}>
//                             Education {educationProgress >= 100 ? '✓' : '○'}
//                         </span>
//                         <span className={`badge px-2 py-1 rounded ${happinessProgress >= 100 ? 'bg-green-600' : 'bg-gray-600'}`}>
//                             Happiness {happinessProgress >= 100 ? '✓' : '○'}
//                         </span>
//                         <span className={`badge px-2 py-1 rounded ${hasWinningJob ? 'bg-green-600' : 'bg-gray-600'}`}>
//                             Career {hasWinningJob ? '✓' : '○'}
//                         </span>
//                     </div>

//                     {cashProgress >= 100 && educationProgress >= 100 && happinessProgress >= 100 && hasWinningJob ? (
//                         <div className="mt-4 bg-green-900 p-3 rounded text-center">
//                             <p className="text-lg font-bold text-green-300">All goals achieved! You're ready to win!</p>
//                         </div>
//                     ) : (
//                         <div className="mt-4 bg-blue-900 p-3 rounded text-center">
//                             <p className="text-blue-300">Keep going! You're making progress!</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// components/Game/GoalsTracker.jsx

import { useGame } from '@/app/context/GameContext';
import { useState, useEffect } from 'react';

export default function GoalsTracker() {
    const { state, dispatch } = useGame();
    const { player, goals } = state;

    // Calculate progress percentages
    const cashProgress = Math.min(100, (player.cash / goals.cash) * 100);
    const educationProgress = Math.min(100, (player.education / goals.education) * 100);
    const happinessProgress = Math.min(100, (player.happiness / goals.happiness) * 100);

    // Check if player has one of the winning jobs
    const hasWinningJob = player.job && goals.winningJobs.includes(player.job.title);

    // Check if player has a luxury apartment
    const hasLuxuryApartment = player.rental && player.rental.hasApartment && player.rental.rentAmount === 200;

    // Return to previous screen
    const goBack = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'location' }
        });
    };

    return (
        <div className="goals-tracker bg-gray-900 rounded-lg p-6 mt-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-yellow-400">Your Path to Success</h2>
                <button
                    onClick={goBack}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                >
                    Back
                </button>
            </div>
            <div className="grid gap-6">
                {/* Cash Goal */}
                <div className="goal-item">
                    <div className="flex justify-between mb-1">
                        <span className="text-lg font-medium">Cash</span>
                        <span className={`font-medium ${cashProgress >= 100 ? 'text-green-400' : 'text-white'}`}>
                            ${player.cash.toFixed(0)} / ${goals.cash}
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded h-4">
                        <div
                            className={`h-4 rounded ${cashProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                            style={{ width: `${cashProgress}%` }}
                        ></div>
                    </div>
                    {cashProgress >= 100 && (
                        <span className="text-xs text-green-400 mt-1 block">✓ Achieved!</span>
                    )}
                </div>

                {/* Education Goal */}
                <div className="goal-item">
                    <div className="flex justify-between mb-1">
                        <span className="text-lg font-medium">Education</span>
                        <span className={`font-medium ${educationProgress >= 100 ? 'text-green-400' : 'text-white'}`}>
                            {player.education} / {goals.education}
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded h-4">
                        <div
                            className={`h-4 rounded ${educationProgress >= 100 ? 'bg-green-500' : 'bg-purple-500'}`}
                            style={{ width: `${educationProgress}%` }}
                        ></div>
                    </div>
                    {educationProgress >= 100 && (
                        <span className="text-xs text-green-400 mt-1 block">✓ Achieved!</span>
                    )}
                </div>

                {/* Happiness Goal */}
                <div className="goal-item">
                    <div className="flex justify-between mb-1">
                        <span className="text-lg font-medium">Happiness</span>
                        <span className={`font-medium ${happinessProgress >= 100 ? 'text-green-400' : 'text-white'}`}>
                            {player.happiness} / {goals.happiness}
                        </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded h-4">
                        <div
                            className={`h-4 rounded ${happinessProgress >= 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
                            style={{ width: `${happinessProgress}%` }}
                        ></div>
                    </div>
                    {happinessProgress >= 100 && (
                        <span className="text-xs text-green-400 mt-1 block">✓ Achieved!</span>
                    )}
                </div>

                {/* Career Goal */}
                <div className="goal-item">
                    <div className="flex justify-between mb-1">
                        <span className="text-lg font-medium">Career</span>
                        <span className={`font-medium ${hasWinningJob ? 'text-green-400' : 'text-white'}`}>
                            {player.job ? player.job.title : 'Unemployed'}
                        </span>
                    </div>
                    <div className="bg-gray-700 rounded p-3 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-300">Goal: Get one of these jobs:</p>
                            <p className="text-sm text-white">{goals.winningJobs.join(", ")}</p>
                        </div>
                        <div>
                            {hasWinningJob ? (
                                <span className="text-green-400 text-xl">✓</span>
                            ) : (
                                <span className="text-gray-400 text-xl">○</span>
                            )}
                        </div>
                    </div>
                    {hasWinningJob && (
                        <span className="text-xs text-green-400 mt-1 block">✓ Achieved!</span>
                    )}
                </div>

                {/* Luxury Apartment Goal */}
                <div className="goal-item">
                    <div className="flex justify-between mb-1">
                        <span className="text-lg font-medium">Housing</span>
                        <span className={`font-medium ${hasLuxuryApartment ? 'text-green-400' : 'text-white'}`}>
                            {player.rental && player.rental.hasApartment
                                ? player.rental.rentAmount === 200
                                    ? 'Luxury Apartment'
                                    : player.rental.rentAmount === 100
                                        ? 'Standard Apartment'
                                        : 'Basic Apartment'
                                : 'No Home'}
                        </span>
                    </div>
                    <div className="bg-gray-700 rounded p-3 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-300">Goal: Live in a luxury apartment</p>
                            <p className="text-sm text-white">Upgrade at the Rental Office</p>
                        </div>
                        <div>
                            {hasLuxuryApartment ? (
                                <span className="text-green-400 text-xl">✓</span>
                            ) : (
                                <span className="text-gray-400 text-xl">○</span>
                            )}
                        </div>
                    </div>
                    {hasLuxuryApartment && (
                        <span className="text-xs text-green-400 mt-1 block">✓ Achieved!</span>
                    )}
                </div>

                {/* Overall Progress */}
                <div className="mt-4 bg-gray-800 p-4 rounded">
                    <h3 className="text-xl font-bold mb-2">Overall Progress</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className={`badge px-2 py-1 rounded ${cashProgress >= 100 ? 'bg-green-600' : 'bg-gray-600'}`}>
                            Cash {cashProgress >= 100 ? '✓' : '○'}
                        </span>
                        <span className={`badge px-2 py-1 rounded ${educationProgress >= 100 ? 'bg-green-600' : 'bg-gray-600'}`}>
                            Education {educationProgress >= 100 ? '✓' : '○'}
                        </span>
                        <span className={`badge px-2 py-1 rounded ${happinessProgress >= 100 ? 'bg-green-600' : 'bg-gray-600'}`}>
                            Happiness {happinessProgress >= 100 ? '✓' : '○'}
                        </span>
                        <span className={`badge px-2 py-1 rounded ${hasWinningJob ? 'bg-green-600' : 'bg-gray-600'}`}>
                            Career {hasWinningJob ? '✓' : '○'}
                        </span>
                        <span className={`badge px-2 py-1 rounded ${hasLuxuryApartment ? 'bg-green-600' : 'bg-gray-600'}`}>
                            Luxury Home {hasLuxuryApartment ? '✓' : '○'}
                        </span>
                    </div>

                    {/* Victory conditions - now requires BOTH career AND luxury apartment */}
                    {cashProgress >= 100 && educationProgress >= 100 &&
                        happinessProgress >= 100 && hasWinningJob && hasLuxuryApartment ? (
                        <div className="mt-4 bg-green-900 p-3 rounded text-center">
                            <p className="text-lg font-bold text-green-300">All goals achieved! You're ready to win!</p>
                        </div>
                    ) : cashProgress >= 100 && educationProgress >= 100 &&
                        happinessProgress >= 100 && hasWinningJob ? (
                        <div className="mt-4 bg-yellow-800 p-3 rounded text-center">
                            <p className="text-lg font-bold text-yellow-300">Career goals achieved! Now get a luxury apartment!</p>
                        </div>
                    ) : cashProgress >= 100 && happinessProgress >= 100 && hasLuxuryApartment ? (
                        <div className="mt-4 bg-yellow-800 p-3 rounded text-center">
                            <p className="text-lg font-bold text-yellow-300">Luxury living achieved! Now get a prestigious job!</p>
                        </div>
                    ) : (
                        <div className="mt-4 bg-blue-900 p-3 rounded text-center">
                            <p className="text-blue-300">Keep going! You're making progress!</p>
                        </div>
                    )}

                    {/* Instructions panel */}
                    <div className="mt-4 bg-gray-900 p-3 rounded">
                        <p className="text-sm text-white font-bold">How to win:</p>
                        <p className="text-sm text-gray-300">You must achieve BOTH paths to success:</p>
                        <ul className="text-sm text-gray-300 list-disc pl-5 mt-1">
                            <li>Career success: Cash + Education + Happiness + Prestigious job</li>
                            <li>Luxury living: Cash + Happiness + Luxury apartment</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}