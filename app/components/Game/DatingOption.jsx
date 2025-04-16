// import { useState } from 'react';

// export default function DatingOption({
//     person,
//     player,
//     isDating,
//     onStartRelationship,
//     onGoOnDate,
//     onBreakUp
// }) {
//     return (
//         <div className="bg-gray-700 p-3 rounded-lg border-2 border-transparent hover:border-pink-500 transition-all">
//             <div className="flex items-center mb-2">
//                 <div className="w-16 h-16 rounded-full overflow-hidden mr-3 border-2 border-pink-300">
//                     <img
//                         src={person.image}
//                         alt={person.name}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = "/api/placeholder/100/100";
//                         }}
//                     />
//                 </div>
//                 <div>
//                     <h4 className="font-medium text-white">{person.name}</h4>
//                     <div className="text-pink-300 text-sm">
//                         {isDating
//                             ? `Partner since week ${player.week - Math.floor(player.relationship.dateCount / 2)}`
//                             : `${person.compatibility}% Compatible`}
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-2 text-sm text-gray-300">
//                 <div>Personality: {person.personality}</div>
//                 <div>Interests: {person.interests}</div>
//                 <div>Gender: {person.gender}</div>
//                 {isDating && (
//                     <div>Relationship Happiness: {player.relationship.happiness}/100</div>
//                 )}
//             </div>

//             <div className="mt-3 flex space-x-2">
//                 {isDating ? (
//                     <>
//                         <button
//                             className="flex-1 bg-pink-600 hover:bg-pink-500 text-white py-1 px-4 rounded text-sm"
//                             onClick={() => onGoOnDate(person)}
//                             disabled={player.cash < person.datePrice}
//                         >
//                             Date (${person.datePrice})
//                         </button>
//                         <button
//                             className="flex-1 bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded text-sm"
//                             onClick={onBreakUp}
//                         >
//                             Break Up
//                         </button>
//                     </>
//                 ) : (
//                     <button
//                         className="w-full bg-pink-600 hover:bg-pink-500 text-white py-1 px-4 rounded text-sm"
//                         onClick={() => onStartRelationship(person)}
//                     >
//                         Start Dating
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// }


import { useState } from 'react';

export default function DatingOption({
    person,
    player,
    isDating,
    onStartRelationship,
    onGoOnDate,
    onBreakUp
}) {
    // Get relationship safely
    const relationship = player.relationship || {};

    return (
        <div className="bg-gray-700 p-3 rounded-lg border-2 border-transparent hover:border-pink-500 transition-all">
            <div className="flex items-center mb-2">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-3 border-2 border-pink-300">
                    <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/100/100";
                        }}
                    />
                </div>
                <div>
                    <h4 className="font-medium text-white">{person.name}</h4>
                    <div className="text-pink-300 text-sm">
                        {isDating && relationship.partner
                            ? `Partner since week ${player.week - Math.floor((relationship.dateCount || 0) / 2)}`
                            : `${person.compatibility}% Compatible`}
                    </div>
                </div>
            </div>

            <div className="mt-2 text-sm text-gray-300">
                <div>Personality: {person.personality}</div>
                <div>Interests: {person.interests}</div>
                <div>Gender: {person.gender}</div>
                {isDating && relationship.happiness !== undefined && (
                    <div>Relationship Happiness: {relationship.happiness}/100</div>
                )}
            </div>

            <div className="mt-3 flex space-x-2">
                {isDating ? (
                    <>
                        <button
                            className="flex-1 bg-pink-600 hover:bg-pink-500 text-white py-1 px-4 rounded text-sm"
                            onClick={() => onGoOnDate(person)}
                            disabled={player.cash < person.datePrice}
                        >
                            Date (${person.datePrice})
                        </button>
                        <button
                            className="flex-1 bg-red-600 hover:bg-red-500 text-white py-1 px-4 rounded text-sm"
                            onClick={onBreakUp}
                        >
                            Break Up
                        </button>
                    </>
                ) : (
                    <button
                        className="w-full bg-pink-600 hover:bg-pink-500 text-white py-1 px-4 rounded text-sm"
                        onClick={() => onStartRelationship(person)}
                    >
                        Start Dating
                    </button>
                )}
            </div>
        </div>
    );
}
