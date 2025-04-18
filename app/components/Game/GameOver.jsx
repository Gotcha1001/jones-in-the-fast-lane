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



// components/Game/GameOver.jsx
import { useGame } from "@/app/context/GameContext";

export default function GameOver({ won }) {
    const { state, dispatch } = useGame();
    const { player, goals } = state;

    const restartGame = () => {
        console.log("GameOver: Dispatching RESTART_GAME");
        dispatch({ type: 'RESTART_GAME' });
    };

    // Enhanced guard
    if (!player || typeof player.cash === 'undefined') {
        console.error("GameOver: Invalid player state:", player);
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

    console.log("GameOver: Rendering for player:", player);

    return (
        <div className="game-over flex flex-col items-center justify-center p-6 my-8">
            <h2 className={`text-3xl font-bold mb-6 ${won ? 'text-green-400' : 'text-red-400'}`}>
                {won ? 'Congratulations!' : 'Game Over'}
            </h2>
            {won ? (
                <div className="text-center mb-8">
                    <p className="text-xl">You've achieved all your goals and won the game!</p>
                    <p className="mt-2">You completed the game in {player.week} weeks.</p>
                </div>
            ) : (
                <div className="text-center mb-8">
                    <p className="text-xl">You ran out of resources!</p>
                    <p className="mt-2">Better luck next time.</p>
                </div>
            )}
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Final Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-400">Cash:</p>
                        <p className={`text-lg ${player.cash >= goals.cash ? 'text-green-400' : 'text-red-400'}`}>
                            ${player.cash} / ${goals.cash}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Education:</p>
                        <p className={`text-lg ${player.education >= goals.education ? 'text-green-400' : 'text-red-400'}`}>
                            {player.education} / {goals.education}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Job Level:</p>
                        <p className={`text-lg ${player.job && goals.winningJobs.includes(player.job.title) ? 'text-green-400' : 'text-red-400'}`}>
                            {player.job ? player.job.title : 'Unemployed'} / {goals.winningJobs.join(" or ")}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Happiness:</p>
                        <p className={`text-lg ${player.happiness >= goals.happiness ? 'text-green-400' : 'text-red-400'}`}>
                            {player.happiness} / {goals.happiness}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400">Experience:</p>
                        <p className="text-lg">{player.experience}/100</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Weeks Played:</p>
                        <p className="text-lg">{player.week}</p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-2xl mb-8">
                <h3 className="text-xl font-semibold mb-4">Possessions</h3>
                {player.possessions.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {player.possessions.map((item, index) => (
                            <div key={index} className="bg-gray-800 p-3 rounded">
                                {item}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">You didn't acquire any possessions.</p>
                )}
            </div>
            <button
                onClick={restartGame}
                className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl"
            >
                Play Again
            </button>
        </div>
    );
}