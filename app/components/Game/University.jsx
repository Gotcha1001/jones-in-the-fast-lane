

// import { useGame } from '@/app/context/GameContext';
// import { initAudio, loadClickSound, loadUniversityMusic, playClickSound, playUniversityMusic, stopUniversityMusic } from '@/data/audioManager';
// import { useState, useEffect } from 'react';
// import { toast } from 'sonner';

// export default function University() {
//     const { state, dispatch } = useGame();
//     const { player } = state;
//     const [studyHours, setStudyHours] = useState(1);
//     const [selectedSubject, setSelectedSubject] = useState('computerScience');

//     const withSound = (handler) => (event) => {
//         playClickSound()
//         if (handler) {
//             handler(event)
//         }
//     }

//     useEffect(() => {
//         initAudio();

//         loadClickSound('/sounds/click.mp3').then((success) => {
//             if (!success) {
//                 console.warn("Cant Load Click Sound")
//             }
//         })

//         loadUniversityMusic('/sounds/universitymusic.mp3').then(() => {
//             playUniversityMusic();
//         });
//         return () => {
//             stopUniversityMusic();
//         };
//     }, []);

//     const showMessage = (message) => {
//         dispatch({
//             type: 'SET_MESSAGE',
//             payload: { text: message },
//         });
//         toast.success(message);
//     };

//     const getSubjectVisual = (level) => {
//         const books = Math.min(Math.ceil(level / 10), 10);
//         return Array(books).fill(0).map((_, index) => (
//             <div key={index} className="relative">
//                 <div className={`w-6 h-${Math.min(2 + Math.floor(level / 20), 10)} bg-blue-400 rounded-sm border border-blue-600 shadow-lg`}></div>
//                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-800">📚</div>
//             </div>
//         ));
//     };

//     const handleStudy = () => {
//         if (player.subjects[selectedSubject] >= 100) {
//             showMessage(`You've mastered ${selectedSubject}! Choose another subject to study.`);
//             return;
//         }
//         if (player.energy >= 10) {
//             dispatch({
//                 type: 'STUDY_SUBJECT',
//                 payload: { hours: studyHours, subject: selectedSubject },
//             });
//             dispatch({ type: 'USE_TIME', payload: { amount: studyHours } });
//             showMessage(`You studied ${selectedSubject} for ${studyHours} hours!`);
//         } else {
//             showMessage("You're too tired to study. Get some rest first!");
//         }
//     };

//     const goBackToLocation = () => {
//         dispatch({
//             type: 'CHANGE_SCREEN',
//             payload: { screen: 'location' },
//         });
//     };

//     const subjects = [
//         { id: 'computerScience', name: 'Computer Science', description: 'Learn programming and algorithms' },
//         { id: 'engineering', name: 'Engineering', description: 'Develop technical problem-solving skills' },
//         { id: 'business', name: 'Business Administration', description: 'Study management and finance' },
//         { id: 'liberalArts', name: 'Liberal Arts', description: 'Broaden your horizons' },
//     ];

//     return (
//         <div className="university-interface relative mt-4 overflow-hidden">
//             <video
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-100"
//             >
//                 <source src="https://cdn.pixabay.com/video/2023/10/10/184469-873483892_tiny.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video>
//             <div className="relative z-10 p-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold">University of Python</h2>
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
//                             src="/professor.jpg"
//                             alt="Professor"
//                             className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-blue-500 shadow-xl object-cover object-[center_top]"
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = "https://img.freepik.com/free-photo/smiling-teacher-with-chalk-standing-near-blackboard_23-2148201043.jpg";
//                             }}
//                         />
//                     </div>
//                     <div className="mt-4 bg-gradient-to-r from-blue-500 via-purple-900 to-black px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
//                         <p className="text-sm italic text-white">
//                             "Welcome to the University of Python! Choose a subject to study and improve your skills for better career opportunities."
//                         </p>
//                     </div>
//                 </div>
//                 <div className="p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Your Status</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {subjects.map((subject) => (
//                             <div key={subject.id} className="p-2 gradient-background2 rounded">
//                                 <span className="text-white">{subject.name} Level:</span>
//                                 <span className="ml-2 text-blue-400">{player.subjects[subject.id] || 0}/100</span>
//                             </div>
//                         ))}
//                         <div className="p-2 gradient-background2 rounded">
//                             <span className="text-white">Energy:</span>
//                             <span className="ml-2 text-green-400">{player.energy}/100</span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-gradient-to-bl from-indigo-500 via-black to-blue-900 p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Your Knowledge</h3>
//                     {subjects.map((subject) => (
//                         <div key={subject.id} className="mb-4">
//                             <h4 className="text-white">{subject.name}</h4>
//                             <div className="flex justify-center items-end h-24 space-x-2 mb-2">
//                                 {(player.subjects[subject.id] || 0) > 0 ? (
//                                     getSubjectVisual(player.subjects[subject.id] || 0)
//                                 ) : (
//                                     <div className="text-gray-400 italic">No {subject.name} knowledge yet. Start studying!</div>
//                                 )}
//                             </div>
//                             <div className="w-full bg-gray-700 h-2 rounded-full">
//                                 <div
//                                     className="bg-blue-500 h-2 rounded-full"
//                                     style={{ width: `${Math.min(player.subjects[subject.id] || 0, 100)}%` }}
//                                 ></div>
//                             </div>
//                             <div className="text-xs text-right text-gray-400 mt-1">
//                                 Progress: {player.subjects[subject.id] || 0}/100
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2 text-center">Study Options</h3>
//                     <div className="flex items-center mb-3 justify-center">
//                         <span className="mr-2">Select Subject:</span>
//                         <select
//                             value={selectedSubject}
//                             onChange={withSound((e) => setSelectedSubject(e.target.value))}
//                             className="bg-gray-700 text-white px-2 py-1 rounded"
//                         >
//                             {subjects.map((subject) => (
//                                 <option key={subject.id} value={subject.id}>
//                                     {subject.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="flex items-center mb-3 justify-center">
//                         <span className="mr-2">Study Hours:</span>
//                         <input
//                             type="number"
//                             min="1"
//                             max="15"
//                             value={studyHours}
//                             onChange={withSound((e) => setStudyHours(parseInt(e.target.value) || 1))}
//                             className="bg-gray-700 text-white px-2 py-1 rounded w-24"
//                         />
//                     </div>
//                     <div className="grid grid-cols-1 gap-4">
//                         <button
//                             onClick={withSound(handleStudy)}
//                             className={`${player.energy < 10
//                                 ? 'bg-gray-600 cursor-not-allowed'
//                                 : 'bg-blue-600 hover:bg-blue-500'
//                                 } text-white py-2 px-4 rounded`}
//                         >
//                             Study {selectedSubject} ({studyHours} hours)
//                         </button>
//                         <div className="p-3 gradient-background2 rounded">
//                             <p className="text-sm text-white">
//                                 Each hour of study costs 2 energy and gives you subject points based on your current level.
//                                 The higher your subject level, the more efficient your studying becomes!
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-gradient-to-bl from-indigo-500 via-black to-blue-900 p-4 rounded">
//                     <h3 className="text-lg font-semibold mb-2">Courses Available</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         {subjects.map((subject) => (
//                             <div
//                                 key={subject.id}
//                                 className="gradient-background2 p-3 rounded-lg border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all"
//                                 onClick={withSound(() => setSelectedSubject(subject.id))}
//                             >
//                                 <h4 className="font-semibold text-white">{subject.name}</h4>
//                                 <p className="text-xs text-gray-300">{subject.description}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



import { useGame } from '@/app/context/GameContext';
import { useState, useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';
import { initAudio, loadClickSound, loadUniversityMusic, playClickSound, playUniversityMusic, stopUniversityMusic } from '@/data/audioManager';

export default function University() {
    const { state, dispatch } = useGame();
    const { player } = state;
    const [studyHours, setStudyHours] = useState(1);
    const [selectedSubject, setSelectedSubject] = useState('computerScience');

    // Use useRef to store audio instances
    const audioRefs = useRef({
        click: null,
        universityMusic: null,
    });

    // Preload audio only once
    useEffect(() => {
        initAudio();
        loadClickSound('/sounds/click.mp3').then((success) => {
            if (success) {
                audioRefs.current.click = new Audio('/sounds/click.mp3');
            } else {
                console.warn("Can't Load Click Sound");
            }
        });
        loadUniversityMusic('/sounds/universitymusic.mp3').then(() => {
            audioRefs.current.universityMusic = new Audio('/sounds/universitymusic.mp3');
            playUniversityMusic();
        });

        return () => {
            stopUniversityMusic();
            if (audioRefs.current.universityMusic) {
                audioRefs.current.universityMusic.pause();
            }
        };
    }, []);

    // Memoize the subject visuals to avoid recomputing
    const getSubjectVisual = useMemo(() => (level) => {
        const books = Math.min(Math.ceil(level / 10), 10);
        return Array(books).fill(0).map((_, index) => (
            <div key={index} className="relative">
                <div className={`w-6 h-${Math.min(2 + Math.floor(level / 20), 10)} bg-blue-400 rounded-sm border border-blue-600 shadow-lg`}></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-800">📚</div>
            </div>
        ));
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

    const handleStudy = () => {
        if (player.subjects[selectedSubject] >= 100) {
            showMessage(`You've mastered ${selectedSubject}! Choose another subject to study.`);
            return;
        }
        if (player.energy >= 10) {
            dispatch({
                type: 'STUDY_SUBJECT',
                payload: { hours: studyHours, subject: selectedSubject },
            });
            dispatch({ type: 'USE_TIME', payload: { amount: studyHours } });
            showMessage(`You studied ${selectedSubject} for ${studyHours} hours!`);
        } else {
            showMessage("You're too tired to study. Get some rest first!");
        }
    };

    const goBackToLocation = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'location' },
        });
    };

    const subjects = useMemo(() => [
        { id: 'computerScience', name: 'Computer Science', description: 'Learn programming and algorithms' },
        { id: 'engineering', name: 'Engineering', description: 'Develop technical problem-solving skills' },
        { id: 'business', name: 'Business Administration', description: 'Study management and finance' },
        { id: 'liberalArts', name: 'Liberal Arts', description: 'Broaden your horizons' },
    ], []);

    return (
        <div className="university-interface relative mt-4 overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-100"
            >
                <source src="https://cdn.pixabay.com/video/2023/10/10/184469-873483892_tiny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">University of Python</h2>
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
                            src="/professor.jpg"
                            alt="Professor"
                            className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-blue-500 shadow-xl object-cover object-[center_top]"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://img.freepik.com/free-photo/smiling-teacher-with-chalk-standing-near-blackboard_23-2148201043.jpg";
                            }}
                        />
                    </div>
                    <div className="mt-4 bg-gradient-to-r from-blue-500 via-purple-900 to-black px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
                        <p className="text-sm italic text-white">
                            "Welcome to the University of Python! Choose a subject to study and improve your skills for better career opportunities."
                        </p>
                    </div>
                </div>
                <div className="p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Your Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {subjects.map((subject) => (
                            <div key={subject.id} className="p-2 gradient-background2 rounded">
                                <span className="text-white">{subject.name} Level:</span>
                                <span className="ml-2 text-blue-400">{player.subjects[subject.id] || 0}/100</span>
                            </div>
                        ))}
                        <div className="p-2 gradient-background2 rounded">
                            <span className="text-white">Energy:</span>
                            <span className="ml-2 text-green-400">{player.energy}/100</span>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-bl from-indigo-500 via-black to-blue-900 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Your Knowledge</h3>
                    {subjects.map((subject) => (
                        <div key={subject.id} className="mb-4">
                            <h4 className="text-white">{subject.name}</h4>
                            <div className="flex justify-center items-end h-24 space-x-2 mb-2">
                                {(player.subjects[subject.id] || 0) > 0 ? (
                                    getSubjectVisual(player.subjects[subject.id] || 0)
                                ) : (
                                    <div className="text-gray-400 italic">No {subject.name} knowledge yet. Start studying!</div>
                                )}
                            </div>
                            <div className="w-full bg-gray-700 h-2 rounded-full">
                                <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${Math.min(player.subjects[subject.id] || 0, 100)}%` }}
                                ></div>
                            </div>
                            <div className="text-xs text-right text-gray-400 mt-1">
                                Progress: {player.subjects[subject.id] || 0}/100
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-center">Study Options</h3>
                    <div className="flex items-center mb-3 justify-center">
                        <span className="mr-2">Select Subject:</span>
                        <select
                            value={selectedSubject}
                            onChange={withSound((e) => setSelectedSubject(e.target.value))}
                            className="bg-gray-700 text-white px-2 py-1 rounded"
                        >
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center mb-3 justify-center">
                        <span className="mr-2">Study Hours:</span>
                        <input
                            type="number"
                            min="1"
                            max="15"
                            value={studyHours}
                            onChange={withSound((e) => setStudyHours(parseInt(e.target.value) || 1))}
                            className="bg-gray-700 text-white px-2 py-1 rounded w-24"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={withSound(handleStudy)}
                            className={`${player.energy < 10
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-500'
                                } text-white py-2 px-4 rounded`}
                        >
                            Study {selectedSubject} ({studyHours} hours)
                        </button>
                        <div className="p-3 gradient-background2 rounded">
                            <p className="text-sm text-white">
                                Each hour of study costs 2 energy and gives you subject points based on your current level.
                                The higher your subject level, the more efficient your studying becomes!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-bl from-indigo-500 via-black to-blue-900 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Courses Available</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {subjects.map((subject) => (
                            <div
                                key={subject.id}
                                className="gradient-background2 p-3 rounded-lg border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all"
                                onClick={withSound(() => setSelectedSubject(subject.id))}
                            >
                                <h4 className="font-semibold text-white">{subject.name}</h4>
                                <p className="text-xs text-gray-300">{subject.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}