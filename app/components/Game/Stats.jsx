// import { useGame } from '@/app/context/GameContext';
// import { locations } from '@/data/locations';

// export default function Stats() {
//     const { state, dispatch } = useGame();
//     const { player } = state;

//     const checkGoals = () => {
//         dispatch({ type: 'CHECK_GOALS' });
//     };

//     const openSaveLoadMenu = () => {
//         dispatch({
//             type: 'CHANGE_SCREEN',
//             payload: { screen: 'saveload' }
//         });
//     };

//     return (
//         <div className="bg-black rounded-lg p-4 mb-4">
//             <div className="flex justify-between items-center mb-2">
//                 <h2 className="text-xl font-bold">{player.name}</h2>
//                 <div className="flex items-center">
//                     <span className="mr-4">Week {player.week}</span>
//                     <span>Time Left: {player.timeLeft}/100</span>
//                 </div>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                 <div className="bg-gray-800 p-2 rounded">Cash: ${player.cash.toFixed(2)}</div>
//                 <div className="bg-gray-800 p-2 rounded">Education: {player.education}/100</div>
//                 <div className="bg-gray-800 p-2 rounded">Experience: {player.experience}/100</div>
//                 <div className="bg-gray-800 p-2 rounded">Job: {player.job ? player.job.title : 'Unemployed'}</div>
//                 <div className="bg-gray-800 p-2 rounded">Energy: {player.energy}/100</div>
//                 <div className="bg-gray-800 p-2 rounded">Happiness: {player.happiness}/100</div>
//                 <div className="bg-gray-800 p-2 rounded">Location: {locations[player.location].name}</div>
//                 <div className="bg-gray-800 p-2 rounded">Health: {player.relationship.health || 80}/100</div>

//                 {/* Relationship Status */}
//                 <div className="bg-gray-800 p-2 rounded col-span-2">
//                     Relationship: {player.relationship.isDating
//                         ? `Dating ${player.relationship.partner.name} (${player.relationship.happiness}/100)`
//                         : 'Single'}
//                 </div>

//                 <div className="bg-gray-800 p-2 rounded">
//                     <button
//                         onClick={checkGoals}
//                         className="text-blue-400 hover:underline"
//                     >
//                         Check Goals
//                     </button>
//                 </div>
//                 <button
//                     onClick={openSaveLoadMenu}
//                     className="bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded text-sm"
//                 >
//                     Save/Load
//                 </button>

//                 {/* Break Up Quick Action */}
//                 {player.relationship.isDating && (
//                     <button
//                         onClick={() => dispatch({ type: 'BREAK_UP' })}
//                         className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded text-sm"
//                     >
//                         Break Up
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// }


// import { useGame } from '@/app/context/GameContext';
// import { locations } from '@/data/locations';

// export default function Stats() {
//     const { state, dispatch } = useGame();
//     const { player } = state;

//     const checkGoals = () => {
//         dispatch({ type: 'CHECK_GOALS' });
//     };

//     const openSaveLoadMenu = () => {
//         dispatch({
//             type: 'CHANGE_SCREEN',
//             payload: { screen: 'saveload' }
//         });
//     };

//     // Handle breakup if player is dating
//     const handleBreakup = () => {
//         dispatch({
//             type: 'BREAK_UP',
//             payload: {}
//         });
//     };

//     return (
//         <div className="bg-black rounded-lg p-4 mb-4">
//             <div className="flex justify-between items-center mb-2">
//                 <h2 className="text-xl font-bold">{player.name}</h2>
//                 <div className="flex items-center">
//                     <span className="mr-4">Week {player.week}</span>
//                     <span>Time Left: {player.timeLeft}/100</span>
//                 </div>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">Cash: ${player.cash.toFixed(2)}</div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">Education: {player.education}/100</div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">Experience: {player.experience}/100</div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">Job: {player.job ? player.job.title : 'Unemployed'}</div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">Energy: {player.energy}/100</div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">Happiness: {player.happiness}/100</div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">Health: {player.relationship.health}/100</div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">Location: {locations[player.location].name}</div>

//                 {/* Relationship Status */}
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     Relationship: {player.relationship.isDating ?
//                         <>
//                             Dating {player.relationship.partner.name}
//                             <button onClick={handleBreakup} className="ml-2 bg-red-500 hover:bg-red-400 text-white px-2 py-0.5 rounded text-xs">
//                                 Break Up
//                             </button>
//                         </>
//                         : 'Single'}
//                 </div>

//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     Job Goal: {state.goals.winningJobs.join(" or ")}
//                 </div>

//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     <button
//                         onClick={checkGoals}
//                         className="text-blue-400 hover:underline"
//                     >
//                         Check Goals
//                     </button>
//                 </div>

//                 <button
//                     onClick={openSaveLoadMenu}
//                     className="bg-indigo-500 hover:bg-indigo-900 text-white px-2 py-1 rounded text-sm"
//                 >
//                     Save/Load
//                 </button>
//             </div>
//         </div>
//     );
// }



// import { useGame } from '@/app/context/GameContext';
// import { locations } from '@/data/locations';

// export default function Stats() {
//     const { state, dispatch } = useGame();
//     const { player } = state;

//     const checkGoals = () => {
//         dispatch({ type: 'CHECK_GOALS' });
//     };

//     const openSaveLoadMenu = () => {
//         dispatch({
//             type: 'CHANGE_SCREEN',
//             payload: { screen: 'saveload' }
//         });
//     };

//     const handleBreakup = () => {
//         dispatch({
//             type: 'BREAK_UP',
//             payload: {}
//         });
//     };

//     // Define subjects for display
//     const subjects = [
//         { id: 'computerScience', name: 'Computer Science' },
//         { id: 'engineering', name: 'Engineering' },
//         { id: 'business', name: 'Business Administration' },
//         { id: 'liberalArts', name: 'Liberal Arts' },
//     ];

//     return (
//         <div className="bg-black rounded-lg p-4 mb-4">
//             <div className="flex justify-between items-center mb-2">
//                 <h2 className="text-xl font-bold">{player.name}</h2>
//                 <div className="flex items-center">
//                     <span className="mr-4">Week {player.week}</span>
//                     <span>Time Left: {player.timeLeft}/100</span>
//                 </div>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     Cash: ${player.cash.toFixed(2)}
//                 </div>
//                 {subjects.map((subject) => (
//                     <div
//                         key={subject.id}
//                         className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded"
//                     >
//                         {subject.name}: {(player.subjects[subject.id] || 0)}/100
//                     </div>
//                 ))}

//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     Experience: {player.experience}/100
//                 </div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     Job: {player.job ? player.job.title : 'Unemployed'}
//                 </div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     Energy: {player.energy}/100
//                 </div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     Happiness: {player.happiness}/100
//                 </div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     Health: {player.relationship.health}/100
//                 </div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     Location: {locations[player.location].name}
//                 </div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     Relationship: {player.relationship.isDating ? (
//                         <>
//                             Dating {player.relationship.partner.name}
//                             <button
//                                 onClick={handleBreakup}
//                                 className="ml-2 bg-red-500 hover:bg-red-400 text-white px-2 py-0.5 rounded text-xs"
//                             >
//                                 Break Up
//                             </button>
//                         </>
//                     ) : (
//                         'Single'
//                     )}
//                 </div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     Job Goal: {state.goals.winningJobs.join(" or ")}
//                 </div>
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
//                     <button
//                         onClick={checkGoals}
//                         className="text-blue-400 hover:underline"
//                     >
//                         Check Goals
//                     </button>
//                 </div>
//                 <button
//                     onClick={openSaveLoadMenu}
//                     className="bg-indigo-500 hover:bg-indigo-900 text-white px-2 py-1 rounded text-sm"
//                 >
//                     Save/Load
//                 </button>
//             </div>
//         </div>
//     );
// }



// components/Game/Stats.jsx
import { useGame } from '@/app/context/GameContext';
import { locations } from '@/data/locations';

export default function Stats() {
    const { state, dispatch } = useGame();
    const { player } = state;

    const checkGoals = () => {
        dispatch({ type: 'CHECK_GOALS' });
    };

    const openSaveLoadMenu = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'saveload' },
        });
    };

    const handleBreakup = () => {
        dispatch({
            type: 'BREAK_UP',
            payload: {},
        });
    };



    return (
        <div className="bg-black rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{player.name}</h2>
                <div className="flex items-center">
                    <span className="mr-4">Week {player.week}</span>
                    <span>Time Left: {player.timeLeft}/100</span>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Cash: ${player.cash.toFixed(2)}
                </div>

                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Experience: {player.experience}/100
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Job: {player.job ? player.job.title : 'Unemployed'}
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Energy: {player.energy}/100
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Happiness: {player.happiness}/100
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Health: {player.relationship.health}/100
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Location: {locations[player.location].name}
                </div>
                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    Relationship: {player.relationship.isDating ? (
                        <>
                            Dating {player.relationship.partner.name}
                            <button
                                onClick={handleBreakup}
                                className="ml-2 bg-red-500 hover:bg-red-400 text-white px-2 py-0.5 rounded text-xs"
                            >
                                Break Up
                            </button>
                        </>
                    ) : (
                        'Single'
                    )}
                </div>

                <div className="bg-gradient-to-r from-indigo-500 via-black to-purple-900 p-2 rounded">
                    <button
                        onClick={checkGoals}
                        className="text-blue-400 hover:underline"
                    >
                        Check Goals
                    </button>
                </div>
                <button
                    onClick={openSaveLoadMenu}
                    className="bg-indigo-500 hover:bg-indigo-900 text-white px-2 py-1 rounded text-sm"
                >
                    Save/Load
                </button>
            </div>
        </div>
    );
}

