

// import { useGame } from '@/app/context/GameContext';
// import { initAudio, loadDatingOfficeMusic, playDatingOfficeMusic, stopDatingOfficeMusic } from '@/data/audioManager';
// import { useState, useEffect } from 'react';
// import { datingOptions } from '@/data/datingData';
// import DatingOption from './DatingOption';
// import { toast } from 'sonner'; // Add this import

// export default function DatingOffice() {
//     const { state, dispatch } = useGame();
//     const { player } = state;
//     const [selectedPerson, setSelectedPerson] = useState(null);
//     const [genderFilter, setGenderFilter] = useState('all'); // 'all', 'male', 'female'

//     // Add useEffect to handle dating office music
//     useEffect(() => {
//         // Initialize audio and load dating office music
//         initAudio();
//         loadDatingOfficeMusic('/sounds/datingmusic.mp3').then(() => {
//             playDatingOfficeMusic();
//         });

//         // Clean up function to stop music when leaving the component
//         return () => {
//             stopDatingOfficeMusic();
//         };
//     }, []); // Empty dependency array means this runs once when component mounts

//     // Helper function to handle both message and toast
//     const showMessage = (message) => {
//         // Set message in game state
//         dispatch({
//             type: 'SET_MESSAGE',
//             payload: { text: message }
//         });

//         // Show toast notification
//         toast.success(message);
//     };

//     // Ensure player.relationship exists
//     const relationship = player.relationship || { isDating: false, health: 80 };

//     const handleStartRelationship = (person) => {
//         if (relationship.isDating) {
//             showMessage(`You're already dating ${relationship.partner?.name || 'someone'}. You need to break up first.`);
//             return;
//         }

//         dispatch({
//             type: 'START_RELATIONSHIP',
//             payload: {
//                 partner: person
//             }
//         });

//         dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
//         showMessage(`You've started dating ${person.name}!`);
//     };

//     const handleGoOnDate = (person) => {
//         if (player.cash < person.datePrice) {
//             showMessage("You don't have enough cash for this date.");
//             return;
//         }

//         dispatch({
//             type: 'GO_ON_DATE',
//             payload: {
//                 partner: person,
//                 cost: person.datePrice,
//                 happinessBoost: person.happinessBoost,
//                 healthBoost: person.healthBoost
//             }
//         });

//         dispatch({ type: 'USE_TIME', payload: { amount: 20 } });
//         showMessage(`You had a great date with ${person.name}! Your happiness increased by ${person.happinessBoost} and relationship health by ${person.healthBoost}.`);
//     };

//     const handleBreakUp = () => {
//         const partnerName = relationship.partner?.name || 'your partner';

//         dispatch({
//             type: 'BREAK_UP'
//         });

//         dispatch({ type: 'USE_TIME', payload: { amount: 10 } });
//         showMessage(`You broke up with ${partnerName}. It's time to move on.`);
//     };

//     const goBackToLocation = () => {
//         dispatch({
//             type: 'CHANGE_SCREEN',
//             payload: { screen: 'location' }
//         });
//     };

//     // Filter dating options based on current relationship status and gender filter
//     const filteredDatingOptions = relationship.isDating && relationship.partner
//         ? [relationship.partner]
//         : datingOptions.filter(person => {
//             if (genderFilter === 'all') return true;
//             return genderFilter === 'male' ? person.gender === 'Male' : person.gender === 'Female';
//         });

//     return (
//         <div className="dating-office-interface relative mt-4 overflow-hidden">
//             {/* Video Background */}
//             <video
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
//             >
//                 <source src="https://cdn.pixabay.com/video/2023/02/05/149481-796105914_tiny.mp4" />
//                 Your browser does not support the video tag.
//             </video>

//             {/* Dating Office content */}
//             <div className="relative z-10 p-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold">Dating Office</h2>
//                     <button
//                         onClick={goBackToLocation}
//                         className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
//                     >
//                         Back
//                     </button>
//                 </div>

//                 {/* Office Image - UPDATED LAYOUT */}
//                 <div className="mb-6 flex flex-col items-center">
//                     <div className="flex justify-center mb-6 mt-4">
//                         <img
//                             src="/datingoffice.jpg"
//                             alt="Dating Office"
//                             className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-pink-500 shadow-xl object-cover"
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = "https://img.freepik.com/free-photo/dating-office-with-heart-decorations_23-2149193485.jpg";
//                             }}
//                         />
//                     </div>

//                     <div className="mt-4 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
//                         <p className="text-sm italic text-white">
//                             {relationship.isDating && relationship.partner
//                                 ? `You're currently dating ${relationship.partner.name}. You've been on ${relationship.dateCount || 0} date(s) together.`
//                                 : "Welcome to the Dating Office! Find your perfect match and enjoy some quality time together."}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Player Information */}
//                 <div className=" p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Your Status</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                         <div className="p-2 bg-gray-700 rounded">
//                             <span className="text-gray-400">Cash:</span>
//                             <span className="ml-2 text-green-400">${player.cash}</span>
//                         </div>
//                         <div className="p-2 bg-gray-700 rounded">
//                             <span className="text-gray-400">Energy:</span>
//                             <span className="ml-2 text-blue-400">{player.energy}/100</span>
//                         </div>
//                         <div className="p-2 bg-gray-700 rounded">
//                             <span className="text-gray-400">Happiness:</span>
//                             <span className="ml-2 text-yellow-400">{player.happiness}/100</span>
//                         </div>
//                         <div className="p-2 bg-gray-700 rounded">
//                             <span className="text-gray-400">Health:</span>
//                             <span className="ml-2 text-red-400">{(relationship.health !== undefined ? relationship.health : 80)}/100</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Gender Filter (only show when not dating) */}
//                 {!relationship.isDating && (
//                     <div className="flex justify-center mb-4">
//                         <div className="bg-gray-800 rounded p-2 inline-flex shadow-md">
//                             <button
//                                 className={`px-4 py-1 rounded mr-2 ${genderFilter === 'all' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-300'}`}
//                                 onClick={() => setGenderFilter('all')}
//                             >
//                                 All
//                             </button>
//                             <button
//                                 className={`px-4 py-1 rounded mr-2 ${genderFilter === 'female' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-300'}`}
//                                 onClick={() => setGenderFilter('female')}
//                             >
//                                 Girls
//                             </button>
//                             <button
//                                 className={`px-4 py-1 rounded ${genderFilter === 'male' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-300'}`}
//                                 onClick={() => setGenderFilter('male')}
//                             >
//                                 Boys
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Dating Options */}
//                 <div className="bg-gray-800 p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">
//                         {relationship.isDating ? "Your Relationship" : "Dating Options"}
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {filteredDatingOptions.map(person => (
//                             <DatingOption
//                                 key={person.id}
//                                 person={person}
//                                 player={player}
//                                 isDating={relationship.isDating}
//                                 onStartRelationship={handleStartRelationship}
//                                 onGoOnDate={handleGoOnDate}
//                                 onBreakUp={handleBreakUp}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* Relationship Tips */}
//                 <div className="bg-gray-800 p-4 rounded">
//                     <h3 className="text-lg font-semibold mb-2">Relationship Tips</h3>
//                     <p className="text-gray-400 text-sm">
//                         • Regular dates increase your relationship happiness.<br />
//                         • A happy relationship improves your overall health and wellbeing.<br />
//                         • Different people provide different benefits to your happiness and health.<br />
//                         • Breaking up can temporarily decrease your happiness, but sometimes it's necessary.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useGame } from '@/app/context/GameContext';
import {
    initAudio,
    loadDatingOfficeMusic,
    playDatingOfficeMusic,
    stopDatingOfficeMusic,
    loadClickSound,
    playClickSound,
} from '@/data/audioManager';
import { useState, useEffect } from 'react';
import { datingOptions } from '@/data/datingData';
import DatingOption from './DatingOption';
import { toast } from 'sonner';

export default function DatingOffice() {
    const { state, dispatch } = useGame();
    const { player } = state;
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [genderFilter, setGenderFilter] = useState('all'); // 'all', 'male', 'female'

    // Wrapper function to play click sound before executing the handler
    const withSound = (handler) => (event) => {
        playClickSound();
        if (handler) {
            handler(event);
        }
    };

    useEffect(() => {
        initAudio();
        loadDatingOfficeMusic('/sounds/datingmusic.mp3').then(() => {
            playDatingOfficeMusic();
        });
        loadClickSound('/sounds/click.mp3').then((success) => {
            if (!success) {
                console.warn("Failed to load click sound");
            }
        });
        return () => {
            stopDatingOfficeMusic();
        };
    }, []);

    const showMessage = (message) => {
        dispatch({
            type: 'SET_MESSAGE',
            payload: { text: message },
        });
        toast.success(message);
    };

    const relationship = player.relationship || { isDating: false, health: 80 };

    const handleStartRelationship = (person) => {
        if (relationship.isDating) {
            showMessage(`You're already dating ${relationship.partner?.name || 'someone'}. You need to break up first.`);
            return;
        }
        dispatch({
            type: 'START_RELATIONSHIP',
            payload: {
                partner: person,
            },
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
        showMessage(`You've started dating ${person.name}!`);
    };

    const handleGoOnDate = (person) => {
        if (player.cash < person.datePrice) {
            showMessage("You don't have enough cash for this date.");
            return;
        }
        dispatch({
            type: 'GO_ON_DATE',
            payload: {
                partner: person,
                cost: person.datePrice,
                happinessBoost: person.happinessBoost,
                healthBoost: person.healthBoost,
            },
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 20 } });
        showMessage(`You had a great date with ${person.name}! Your happiness increased by ${person.happinessBoost} and relationship health by ${person.healthBoost}.`);
    };

    const handleBreakUp = () => {
        const partnerName = relationship.partner?.name || 'your partner';
        dispatch({
            type: 'BREAK_UP',
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 10 } });
        showMessage(`You broke up with ${partnerName}. It's time to move on.`);
    };

    const goBackToLocation = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'location' },
        });
    };

    const filteredDatingOptions = relationship.isDating && relationship.partner
        ? [relationship.partner]
        : datingOptions.filter((person) => {
            if (genderFilter === 'all') return true;
            return genderFilter === 'male' ? person.gender === 'Male' : person.gender === 'Female';
        });

    return (
        <div className="dating-office-interface relative mt-4 overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
            >
                <source src="https://cdn.pixabay.com/video/2023/02/05/149481-796105914_tiny.mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Dating Office</h2>
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
                            src="/datingoffice.jpg"
                            alt="Dating Office"
                            className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-pink-500 shadow-xl object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://img.freepik.com/free-photo/dating-office-with-heart-decorations_23-2149193485.jpg";
                            }}
                        />
                    </div>
                    <div className="mt-4 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
                        <p className="text-sm italic text-white">
                            {relationship.isDating && relationship.partner
                                ? `You're currently dating ${relationship.partner.name}. You've been on ${relationship.dateCount || 0} date(s) together.`
                                : "Welcome to the Dating Office! Find your perfect match and enjoy some quality time together."}
                        </p>
                    </div>
                </div>
                <div className="p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Your Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Cash:</span>
                            <span className="ml-2 text-green-400">${player.cash}</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Energy:</span>
                            <span className="ml-2 text-blue-400">{player.energy}/100</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Happiness:</span>
                            <span className="ml-2 text-yellow-400">{player.happiness}/100</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Health:</span>
                            <span className="ml-2 text-red-400">{(relationship.health !== undefined ? relationship.health : 80)}/100</span>
                        </div>
                    </div>
                </div>
                {!relationship.isDating && (
                    <div className="flex justify-center mb-4">
                        <div className="bg-gray-800 rounded p-2 inline-flex shadow-md">
                            <button
                                className={`px-4 py-1 rounded mr-2 ${genderFilter === 'all' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                                onClick={withSound(() => setGenderFilter('all'))}
                            >
                                All
                            </button>
                            <button
                                className={`px-4 py-1 rounded mr-2 ${genderFilter === 'female' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                                onClick={withSound(() => setGenderFilter('female'))}
                            >
                                Girls
                            </button>
                            <button
                                className={`px-4 py-1 rounded ${genderFilter === 'male' ? 'bg-pink-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                                onClick={withSound(() => setGenderFilter('male'))}
                            >
                                Boys
                            </button>
                        </div>
                    </div>
                )}
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                        {relationship.isDating ? "Your Relationship" : "Dating Options"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredDatingOptions.map((person) => (
                            <DatingOption
                                key={person.id}
                                person={person}
                                player={player}
                                isDating={relationship.isDating}
                                onStartRelationship={handleStartRelationship}
                                onGoOnDate={handleGoOnDate}
                                onBreakUp={handleBreakUp}
                            />
                        ))}
                    </div>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Relationship Tips</h3>
                    <p className="text-gray-400 text-sm">
                        • Regular dates increase your relationship happiness.<br />
                        • A happy relationship improves your overall health and wellbeing.<br />
                        • Different people provide different benefits to your happiness and health.<br />
                        • Breaking up can temporarily decrease your happiness, but sometimes it's necessary.
                    </p>
                </div>
            </div>
        </div>
    );
}