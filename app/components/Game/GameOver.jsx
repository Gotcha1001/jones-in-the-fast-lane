// // components/Game/GameOver.jsx

// import { useGame } from "@/app/context/GameContext";


// export default function GameOver({ won }) {
//     const { state, dispatch } = useGame();
//     const { player, goals } = state;

//     const restartGame = () => {
//         dispatch({ type: 'RESTART_GAME' });
//     };

//     return (
//         <div className="game-over flex flex-col items-center justify-center p-6 my-8">
//             <h2 className={`text-3xl font-bold mb-6 ${won ? 'text-green-400' : 'text-red-400'}`}>
//                 {won ? 'Congratulations!' : 'Game Over'}
//             </h2>

//             {won ? (
//                 <div className="text-center mb-8">
//                     <p className="text-xl">You've achieved all your goals and won the game!</p>
//                     <p className="mt-2">You completed the game in {player.week} weeks.</p>
//                 </div>
//             ) : (
//                 <div className="text-center mb-8">
//                     <p className="text-xl">You ran out of resources!</p>
//                     <p className="mt-2">Better luck next time.</p>
//                 </div>
//             )}

//             <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
//                 <h3 className="text-xl font-semibold mb-4">Final Stats</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <p className="text-gray-400">Cash:</p>
//                         <p className={`text-lg ${player.cash >= goals.cash ? 'text-green-400' : 'text-red-400'}`}>
//                             ${player.cash} / ${goals.cash}
//                         </p>
//                     </div>

//                     <div>
//                         <p className="text-gray-400">Education:</p>
//                         <p className={`text-lg ${player.education >= goals.education ? 'text-green-400' : 'text-red-400'}`}>
//                             {player.education} / {goals.education}
//                         </p>
//                     </div>

//                     <div>
//                         <p className="text-gray-400">Job Level:</p>
//                         <p className={`text-lg ${player.job && player.job.title === goals.job ? 'text-green-400' : 'text-red-400'}`}>
//                             {player.job ? player.job.title : 'Unemployed'} / {goals.job}
//                         </p>
//                     </div>

//                     <div>
//                         <p className="text-gray-400">Happiness:</p>
//                         <p className={`text-lg ${player.happiness >= goals.happiness ? 'text-green-400' : 'text-red-400'}`}>
//                             {player.happiness} / {goals.happiness}
//                         </p>
//                     </div>

//                     <div>
//                         <p className="text-gray-400">Experience:</p>
//                         <p className="text-lg">{player.experience}/100</p>
//                     </div>

//                     <div>
//                         <p className="text-gray-400">Weeks Played:</p>
//                         <p className="text-lg">{player.week}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
//                 <h3 className="text-xl font-semibold mb-4">Possessions</h3>
//                 {player.possessions.length > 0 ? (
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                         {player.possessions.map((item, index) => (
//                             <div key={index} className="bg-gray-800 p-3 rounded">
//                                 {item}
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-gray-400">You didn't acquire any possessions.</p>
//                 )}
//             </div>

//             <button
//                 onClick={restartGame}
//                 className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl"
//             >
//                 Play Again
//             </button>
//         </div>
//     );
// }



// import { useGame } from "@/app/context/GameContext";
// import { useEffect } from "react";

// export default function GameOver({ won }) {
//     const { state, dispatch } = useGame();
//     const { player } = state;
//     const goals = player?.goals; // Access goals from player

//     // Calculate progress with defensive defaults
//     const cashProgress = Math.min(100, ((player?.cash ?? 0) / (goals?.cash ?? 10000)) * 100);
//     const educationProgress = Math.min(100, ((player?.education ?? 0) / (goals?.education ?? 80)) * 100);
//     const happinessProgress = Math.min(100, ((player?.happiness ?? 0) / (goals?.happiness ?? 90)) * 100);

//     useEffect(() => {
//         console.log("GameOver: Rendering with props and state:", {
//             won,
//             player,
//             goals, // Log the correct goals
//             currentScreen: state.currentScreen,
//         });
//     }, [player, goals, won, state.currentScreen]);

//     const restartGame = () => {
//         console.log("GameOver: Dispatching RESTART_GAME");
//         dispatch({ type: 'RESTART_GAME' });
//     };

//     // Guard for invalid player state
//     if (!player || typeof player?.cash === 'undefined' || !player?.goals) {
//         console.error("GameOver: Invalid player state:", player);
//         return (
//             <div className="game-over flex flex-col items-center justify-center p-6 my-8">
//                 <h2 className="text-3xl font-bold mb-6 text-red-400">Error</h2>
//                 <p className="text-xl">Player data is missing or incomplete. Please restart the game.</p>
//                 <button
//                     onClick={() => dispatch({ type: 'RESTART_GAME' })}
//                     className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-4"
//                 >
//                     Play Again
//                 </button>
//             </div>
//         );
//     }

//     // Defensive check for goals
//     if (!goals || typeof goals.cash === 'undefined') {
//         console.error("GameOver: Invalid goals state:", goals);
//         return (
//             <div className="game-over flex flex-col items-center justify-center p-6 my-8">
//                 <h2 className="text-3xl font-bold mb-6 text-red-400">Error</h2>
//                 <p className="text-xl">Goals data is missing. Please restart the game.</p>
//                 <button
//                     onClick={() => dispatch({ type: 'RESTART_GAME' })}
//                     className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-4"
//                 >
//                     Play Again
//                 </button>
//             </div>
//         );
//     }

//     console.log("GameOver: Rendering for player:", player);

//     return (
//         <div className="game-over flex flex-col items-center justify-center p-6 my-8">
//             <h2 className={`text-3xl font-bold mb-6 ${won ? 'text-green-400' : 'text-red-400'}`}>
//                 {won ? 'Congratulations!' : 'Game Over'}
//             </h2>
//             {won ? (
//                 <div className="text-center mb-8">
//                     <p className="text-xl">You've achieved all your goals and won the game!</p>
//                     <p className="mt-2">You completed the game in {player.week} weeks.</p>
//                 </div>
//             ) : (
//                 <div className="text-center mb-8">
//                     <p className="text-xl">You ran out of resources!</p>
//                     <p className="mt-2">Better luck next time.</p>
//                 </div>
//             )}
//             <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
//                 <h3 className="text-xl font-semibold mb-4">Final Stats</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <p className="text-gray-400">Cash:</p>
//                         <p className={`text-lg ${player.cash >= goals.cash ? 'text-green-400' : 'text-red-400'}`}>
//                             ${player.cash} / ${goals.cash}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Education:</p>
//                         <p className={`text-lg ${player.education >= goals.education ? 'text-green-400' : 'text-red-400'}`}>
//                             {player.education} / {goals.education}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Job Level:</p>
//                         <p className={`text-lg ${player.job && goals.winningJobs.includes(player.job.title) ? 'text-green-400' : 'text-red-400'}`}>
//                             {player.job ? player.job.title : 'Unemployed'} / {goals.winningJobs.join(" or ")}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Happiness:</p>
//                         <p className={`text-lg ${player.happiness >= goals.happiness ? 'text-green-400' : 'text-red-400'}`}>
//                             {player.happiness} / {goals.happiness}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Experience:</p>
//                         <p className="text-lg">{player.experience}/100</p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Weeks Played:</p>
//                         <p className="text-lg">{player.week}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
//                 <h3 className="text-xl font-semibold mb-4">Possessions</h3>
//                 {player.possessions.length > 0 ? (
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                         {player.possessions.map((item, index) => (
//                             <div key={index} className="bg-gray-800 p-3 rounded">
//                                 {item}
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-gray-400">You didn't acquire any possessions.</p>
//                 )}
//             </div>
//             <button
//                 onClick={restartGame}
//                 className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl"
//             >
//                 Play Again
//             </button>
//         </div>
//     );
// }


// import { useGame } from "@/app/context/GameContext";
// import { useEffect } from "react";

// export default function GameOver({ won }) {
//     const { state, dispatch } = useGame();
//     const { player, totalPlayers } = state;
//     const goals = player?.goals; // Access goals from player

//     // Calculate progress with defensive defaults
//     const cashProgress = Math.min(100, ((player?.cash ?? 0) / (goals?.cash ?? 10000)) * 100);
//     const educationProgress = Math.min(100, ((player?.education ?? 0) / (goals?.education ?? 80)) * 100);
//     const happinessProgress = Math.min(100, ((player?.happiness ?? 0) / (goals?.happiness ?? 90)) * 100);

//     useEffect(() => {
//         console.log("GameOver: Rendering with props and state:", {
//             won,
//             player,
//             goals,
//             totalPlayers,
//             currentScreen: state.currentScreen,
//         });
//     }, [player, goals, won, totalPlayers, state.currentScreen]);

//     const restartGame = () => {
//         console.log("GameOver: Dispatching RESTART_GAME");
//         dispatch({ type: 'RESTART_GAME' });
//     };

//     // Guard for invalid player state
//     if (!player || typeof player?.cash === 'undefined' || !player?.goals || !player?.name) {
//         console.error("GameOver: Invalid player state:", player);
//         return (
//             <div className="game-over flex flex-col items-center justify-center p-6 my-8">
//                 <h2 className="text-3xl font-bold mb-6 text-red-400">Error</h2>
//                 <p className="text-xl">Player data is missing or incomplete. Please restart the game.</p>
//                 <button
//                     onClick={() => dispatch({ type: 'RESTART_GAME' })}
//                     className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-4"
//                 >
//                     Play Again
//                 </button>
//             </div>
//         );
//     }

//     // Defensive check for goals
//     if (!goals || typeof goals.cash === 'undefined') {
//         console.error("GameOver: Invalid goals state:", goals);
//         return (
//             <div className="game-over flex flex-col items-center justify-center p-6 my-8">
//                 <h2 className="text-3xl font-bold mb-6 text-red-400">Error</h2>
//                 <p className="text-xl">Goals data is missing. Please restart the game.</p>
//                 <button
//                     onClick={() => dispatch({ type: 'RESTART_GAME' })}
//                     className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-4"
//                 >
//                     Play Again
//                 </button>
//             </div>
//         );
//     }

//     console.log("GameOver: Rendering for player:", player);

//     return (
//         <div className="game-over flex flex-col items-center justify-center p-6 my-8">
//             {/* Display avatar in multi-player mode when won */}
//             {totalPlayers > 1 && won && player.avatar && (
//                 <div className="mb-4">
//                     <img
//                         src={player.avatar}
//                         alt={`${player.name}'s avatar`}
//                         className="w-full h-full object-cover object-[center_top] rounded-xl"
//                     />
//                 </div>
//             )}

//             <h2 className={`text-3xl font-bold mb-6 ${won ? 'text-green-400' : 'text-red-400'}`}>
//                 {won ? `Congratulations, ${player.name}!` : `Game Over, ${player.name}`}
//             </h2>
//             {won ? (
//                 <div className="text-center mb-8">
//                     <p className="text-xl">
//                         {totalPlayers > 1
//                             ? `You've achieved all your goals and won the game!`
//                             : 'You achieved all your goals and won the game!'}
//                     </p>
//                     <p className="mt-2">You completed the game in {player.week} weeks.</p>
//                 </div>
//             ) : (
//                 <div className="text-center mb-8">
//                     <p className="text-xl">You ran out of resources!</p>
//                     <p className="mt-2">Better luck next time.</p>
//                 </div>
//             )}
//             <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
//                 <h3 className="text-xl font-semibold mb-4">Final Stats for {player.name}</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <p className="text-gray-400">Cash:</p>
//                         <p className={`text-lg ${player.cash >= goals.cash ? 'text-green-400' : 'text-red-400'}`}>
//                             ${player.cash} / ${goals.cash}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Education:</p>
//                         <p className={`text-lg ${player.education >= goals.education ? 'text-green-400' : 'text-red-400'}`}>
//                             {player.education} / {goals.education}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Job Level:</p>
//                         <p className={`text-lg ${player.job && goals.winningJobs.includes(player.job.title) ? 'text-green-400' : 'text-red-400'}`}>
//                             {player.job ? player.job.title : 'Unemployed'} / {goals.winningJobs.join(" or ")}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Happiness:</p>
//                         <p className={`text-lg ${player.happiness >= goals.happiness ? 'text-green-400' : 'text-red-400'}`}>
//                             {player.happiness} / {goals.happiness}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Experience:</p>
//                         <p className="text-lg">{player.experience}/100</p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Weeks Played:</p>
//                         <p className="text-lg">{player.week}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
//                 <h3 className="text-xl font-semibold mb-4">Possessions</h3>
//                 {player.possessions.length > 0 ? (
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                         {player.possessions.map((item, index) => (
//                             <div key={index} className="bg-gray-800 p-3 rounded">
//                                 {item}
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-gray-400">You didn't acquire any possessions.</p>
//                 )}
//             </div>
//             <button
//                 onClick={restartGame}
//                 className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl"
//             >
//                 Play Again
//             </button>
//         </div>
//     );
// }


// import { useGame } from "@/app/context/GameContext";
// import { useEffect, useState } from "react";

// export default function GameOver({ won }) {
//     const { state, dispatch } = useGame();
//     const { player, players, totalPlayers } = state;
//     const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

//     // Get the current player to display
//     const displayPlayer = players[currentPlayerIndex] || player;
//     const goals = displayPlayer?.goals;

//     // Calculate progress with defensive defaults
//     const cashProgress = Math.min(100, ((displayPlayer?.cash ?? 0) / (goals?.cash ?? 10000)) * 100);
//     const educationProgress = Math.min(100, ((displayPlayer?.education ?? 0) / (goals?.education ?? 80)) * 100);
//     const happinessProgress = Math.min(100, ((displayPlayer?.happiness ?? 0) / (goals?.happiness ?? 90)) * 100);

//     // Determine if the current player is the winner
//     const isWinner = won && displayPlayer?.id === player?.id;

//     useEffect(() => {
//         console.log("GameOver: Rendering with props and state:", {
//             won,
//             displayPlayer,
//             goals,
//             totalPlayers,
//             currentPlayerIndex,
//             currentScreen: state.currentScreen,
//         });
//     }, [displayPlayer, goals, won, totalPlayers, currentPlayerIndex, state.currentScreen]);

//     const restartGame = () => {
//         console.log("GameOver: Dispatching RESTART_GAME");
//         dispatch({ type: 'RESTART_GAME' });
//     };

//     const viewNextPlayer = () => {
//         setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % totalPlayers);
//     };

//     // Guard for invalid player state
//     if (!displayPlayer || typeof displayPlayer?.cash === 'undefined' || !displayPlayer?.goals || !displayPlayer?.name) {
//         console.error("GameOver: Invalid player state:", displayPlayer);
//         return (
//             <div className="game-over flex flex-col items-center justify-center p-6 my-8">
//                 <h2 className="text-3xl font-bold mb-6 text-red-400">Error</h2>
//                 <p className="text-xl">Player data is missing or incomplete. Please restart the game.</p>
//                 <button
//                     onClick={() => dispatch({ type: 'RESTART_GAME' })}
//                     className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-4"
//                 >
//                     Play Again
//                 </button>
//             </div>
//         );
//     }

//     // Defensive check for goals
//     if (!goals || typeof goals.cash === 'undefined') {
//         console.error("GameOver: Invalid goals state:", goals);
//         return (
//             <div className="game-over flex flex-col items-center justify-center p-6 my-8">
//                 <h2 className="text-3xl font-bold mb-6 text-red-400">Error</h2>
//                 <p className="text-xl">Goals data is missing. Please restart the game.</p>
//                 <button
//                     onClick={() => dispatch({ type: 'RESTART_GAME' })}
//                     className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-4"
//                 >
//                     Play Again
//                 </button>
//             </div>
//         );
//     }

//     console.log("GameOver: Rendering for player:", displayPlayer);

//     return (
//         <div className="game-over flex flex-col items-center justify-center p-6 my-8">
//             {/* Display avatar in multi-player mode when viewing the winner */}
//             {totalPlayers > 1 && isWinner && displayPlayer.avatar && (
//                 <div className="mb-4">
//                     <img
//                         src={displayPlayer.avatar}
//                         alt={`${displayPlayer.name}'s avatar`}
//                         className="w-24 h-24 rounded-full object-cover"
//                     />
//                 </div>
//             )}

//             <h2 className={`text-3xl font-bold mb-6 ${isWinner ? 'text-green-400' : 'text-red-400'}`}>
//                 {isWinner ? `Congratulations, ${displayPlayer.name}!` : `Game Over, ${displayPlayer.name}`}
//                 {isWinner && <span className="ml-2 text-green-400">(Winner!)</span>}
//             </h2>
//             {isWinner ? (
//                 <div className="text-center mb-8">
//                     <p className="text-xl">
//                         {totalPlayers > 1
//                             ? `You've achieved all your goals and won the game!`
//                             : 'You achieved all your goals and won the game!'}
//                     </p>
//                     <p className="mt-2">You completed the game in {displayPlayer.week} weeks.</p>
//                 </div>
//             ) : (
//                 <div className="text-center mb-8">
//                     <p className="text-xl">{totalPlayers > 1 ? `${displayPlayer.name} ran out of resources or the game ended!` : 'You ran out of resources!'}</p>
//                     <p className="mt-2">Better luck next time.</p>
//                 </div>
//             )}
//             <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
//                 <h3 className="text-xl font-semibold mb-4">Final Stats for {displayPlayer.name}</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <p className="text-gray-400">Cash:</p>
//                         <p className={`text-lg ${displayPlayer.cash >= goals.cash ? 'text-green-400' : 'text-red-400'}`}>
//                             ${displayPlayer.cash} / ${goals.cash}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Education:</p>
//                         <p className={`text-lg ${displayPlayer.education >= goals.education ? 'text-green-400' : 'text-red-400'}`}>
//                             {displayPlayer.education} / {goals.education}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Job Level:</p>
//                         <p className={`text-lg ${displayPlayer.job && goals.winningJobs.includes(displayPlayer.job.title) ? 'text-green-400' : 'text-red-400'}`}>
//                             {displayPlayer.job ? displayPlayer.job.title : 'Unemployed'} / {goals.winningJobs.join(" or ")}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Happiness:</p>
//                         <p className={`text-lg ${displayPlayer.happiness >= goals.happiness ? 'text-green-400' : 'text-red-400'}`}>
//                             {displayPlayer.happiness} / {goals.happiness}
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Experience:</p>
//                         <p className="text-lg">{displayPlayer.experience}/100</p>
//                     </div>
//                     <div>
//                         <p className="text-gray-400">Weeks Played:</p>
//                         <p className="text-lg">{displayPlayer.week}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
//                 <h3 className="text-xl font-semibold mb-4">Possessions</h3>
//                 {displayPlayer.possessions.length > 0 ? (
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                         {displayPlayer.possessions.map((item, index) => (
//                             <div key={index} className="bg-gray-800 p-3 rounded">
//                                 {item}
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-gray-400">No possessions acquired.</p>
//                 )}
//             </div>
//             <div className="flex gap-4">
//                 {totalPlayers > 1 && (
//                     <button
//                         onClick={viewNextPlayer}
//                         className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl"
//                     >
//                         Next Player
//                     </button>
//                 )}
//                 <button
//                     onClick={restartGame}
//                     className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl"
//                 >
//                     Play Again
//                 </button>
//             </div>
//         </div>
//     );
// }

import { useGame } from "@/app/context/GameContext";
import { useEffect, useState } from "react";
import { jobs } from '@/data/jobs';

export default function GameOver({ won }) {
    const { state, dispatch } = useGame();
    const { player, players, totalPlayers } = state;
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

    // Get the current player to display
    const displayPlayer = players[currentPlayerIndex] || player;
    const goals = displayPlayer?.goals;

    // Calculate progress with defensive defaults
    const cashProgress = Math.min(100, ((displayPlayer?.cash ?? 0) / (goals?.cash ?? 10000)) * 100);
    const educationProgress = Math.min(100, ((displayPlayer?.education ?? 0) / (goals?.education ?? 80)) * 100);
    const happinessProgress = Math.min(100, ((displayPlayer?.happiness ?? 0) / (goals?.happiness ?? 90)) * 100);

    // Double-check win condition locally
    const isWinner = won && displayPlayer?.id === player?.id;
    const hasEnoughCash = (displayPlayer?.cash || 0) >= goals?.cash;
    const hasEnoughEducation = (displayPlayer?.education || 0) >= goals?.education;
    const hasEnoughHappiness = (displayPlayer?.happiness || 0) >= goals?.happiness;
    const hasWinningJob = displayPlayer?.job && goals?.winningJobs?.includes(displayPlayer.job.title);
    const hasLuxuryApartment =
        displayPlayer?.rental &&
        displayPlayer?.rental.hasApartment &&
        displayPlayer?.rental.rentAmount === 200;
    const hasGoodHealth = (displayPlayer?.relationship?.health || 0) >= 80;
    const subjectLevels = Object.values(displayPlayer?.subjects || {});
    const educationAverage = subjectLevels.length
        ? Math.floor(subjectLevels.reduce((sum, level) => sum + level, 0) / subjectLevels.length)
        : 0;
    const hasRequiredEducation = educationAverage >= goals?.education;
    const hasRequiredSubjects = goals?.winningJobs?.some((jobTitle) => {
        const job = jobs.find((j) => j.title === jobTitle);
        return Object.entries(job?.requiredSubjects || {}).every(
            ([subject, level]) => (displayPlayer?.subjects?.[subject] || 0) >= level
        );
    });
    const localWinCheck =
        isWinner &&
        hasEnoughCash &&
        hasEnoughEducation &&
        hasEnoughHappiness &&
        hasWinningJob &&
        hasLuxuryApartment &&
        hasGoodHealth &&
        hasRequiredSubjects;

    // Determine why the player didn't win (if applicable)
    const unmetGoals = [];
    if (!hasEnoughCash) unmetGoals.push('Cash');
    if (!hasEnoughEducation) unmetGoals.push('Education');
    if (!hasEnoughHappiness) unmetGoals.push('Happiness');
    if (!hasWinningJob) unmetGoals.push('Job');
    if (!hasLuxuryApartment) unmetGoals.push('Luxury Apartment');
    if (!hasGoodHealth) unmetGoals.push('Health');
    if (!hasRequiredSubjects) unmetGoals.push('Required Subjects');

    useEffect(() => {
        console.log("GameOver: Rendering with props and state:", {
            won,
            displayPlayer,
            goals,
            totalPlayers,
            currentPlayerIndex,
            localWinCheck,
            unmetGoals,
            currentScreen: state.currentScreen,
        });
    }, [displayPlayer, goals, won, totalPlayers, currentPlayerIndex, localWinCheck, unmetGoals, state.currentScreen]);

    const restartGame = () => {
        console.log("GameOver: Dispatching RESTART_GAME");
        dispatch({ type: 'RESTART_GAME' });
    };

    const viewNextPlayer = () => {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % totalPlayers);
    };

    // Guard for invalid player state
    if (!displayPlayer || typeof displayPlayer?.cash === 'undefined' || !displayPlayer?.goals || !displayPlayer?.name) {
        console.error("GameOver: Invalid player state:", displayPlayer);
        return (
            <div className="game-over flex flex-col items-center justify-center p-6 my-8">
                <h2 className="text-3xl font-bold mb-6 text-red-400">Error</h2>
                <p className="text-xl">Player data is missing or incomplete. Please restart the game.</p>
                <button
                    onClick={() => dispatch({ type: 'RESTART_GAME' })}
                    className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-4"
                >
                    Play Again
                </button>
            </div>
        );
    }

    // Defensive check for goals
    if (!goals || typeof goals.cash === 'undefined') {
        console.error("GameOver: Invalid goals state:", goals);
        return (
            <div className="game-over flex flex-col items-center justify-center p-6 my-8">
                <h2 className="text-3xl font-bold mb-6 text-red-400">Error</h2>
                <p className="text-xl">Goals data is missing. Please restart the game.</p>
                <button
                    onClick={() => dispatch({ type: 'RESTART_GAME' })}
                    className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-4"
                >
                    Play Again
                </button>
            </div>
        );
    }

    console.log("GameOver: Rendering for player:", displayPlayer);

    return (
        <div className="game-over flex flex-col items-center justify-center p-6 my-8">
            {/* Display avatar in multi-player mode when viewing the winner */}
            {totalPlayers > 1 && localWinCheck && displayPlayer.avatar && (
                <div className="mb-4">
                    <img
                        src={displayPlayer.avatar}
                        alt={`${displayPlayer.name}'s avatar`}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                </div>
            )}

            <h2 className={`text-3xl font-bold mb-6 ${localWinCheck ? 'text-green-400' : 'text-red-400'}`}>
                {localWinCheck ? `Congratulations, ${displayPlayer.name}!` : `Game Over, ${displayPlayer.name}`}
                {localWinCheck && <span className="ml-2 text-green-400">(Winner!)</span>}
            </h2>
            {localWinCheck ? (
                <div className="text-center mb-8">
                    <p className="text-xl">
                        {totalPlayers > 1
                            ? `You've achieved all your goals and won the game!`
                            : 'You achieved all your goals and won the game!'}
                    </p>
                    <p className="mt-2">You completed the game in {displayPlayer.week} weeks.</p>
                </div>
            ) : (
                <div className="text-center mb-8">
                    <p className="text-xl">
                        {totalPlayers > 1
                            ? `${displayPlayer.name} did not meet all goals or the game ended!`
                            : 'You did not meet all goals!'}
                    </p>
                    {unmetGoals.length > 0 && (
                        <p className="mt-2 text-red-400">Unmet goals: {unmetGoals.join(', ')}</p>
                    )}
                    <p className="mt-2">Better luck next time.</p>
                </div>
            )}
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Final Stats for {displayPlayer.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-400">Cash:</p>
                        <p className={`text-lg ${hasEnoughCash ? 'text-green-400' : 'text-red-400'}`}>
                            ${displayPlayer.cash} / ${goals.cash}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Education:</p>
                        <p className={`text-lg ${hasRequiredEducation ? 'text-green-400' : 'text-red-400'}`}>
                            {educationAverage} / {goals.education}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Job Level:</p>
                        <p className={`text-lg ${hasWinningJob ? 'text-green-400' : 'text-red-400'}`}>
                            {displayPlayer.job ? displayPlayer.job.title : 'Unemployed'} / {goals.winningJobs.join(" or ")}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Happiness:</p>
                        <p className={`text-lg ${hasEnoughHappiness ? 'text-green-400' : 'text-red-400'}`}>
                            {displayPlayer.happiness} / {goals.happiness}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Health:</p>
                        <p className={`text-lg ${hasGoodHealth ? 'text-green-400' : 'text-red-400'}`}>
                            {displayPlayer.relationship?.health || 0} / 80
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Apartment:</p>
                        <p className={`text-lg ${hasLuxuryApartment ? 'text-green-400' : 'text-red-400'}`}>
                            {hasLuxuryApartment ? 'Luxury' : 'Not Luxury'}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Experience:</p>
                        <p className="text-lg">{displayPlayer.experience}/100</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Weeks Played:</p>
                        <p className="text-lg">{displayPlayer.week}</p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Possessions</h3>
                {displayPlayer.possessions.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {displayPlayer.possessions.map((item, index) => (
                            <div key={index} className="bg-gray-800 p-3 rounded">
                                {item}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No possessions acquired.</p>
                )}
            </div>
            <div className="flex gap-4">
                {totalPlayers > 1 && (
                    <button
                        onClick={viewNextPlayer}
                        className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl"
                    >
                        Next Player
                    </button>
                )}
                <button
                    onClick={restartGame}
                    className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl"
                >
                    Play Again
                </button>
            </div>
        </div>
    );
}