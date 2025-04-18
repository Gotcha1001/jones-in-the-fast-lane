// // components/Locations/EmploymentOffice.jsx

// import { useGame } from "@/app/context/GameContext";
// import { initAudio, loadEmploymentMusic, playEmploymentMusic, stopEmploymentMusic } from "@/data/audioManager";
// import { jobs } from "@/data/jobs";
// import { useEffect } from "react";
// import FeatureMotionWrapper from "../FramerMotion/FeatureMotionWrapperMap";



// export default function JobOffice() {
//     const { state, dispatch } = useGame();
//     const { player } = state;


//     // Add useEffect to handle employment office music
//     useEffect(() => {
//         // Initialize audio and load employment office music
//         initAudio();
//         loadEmploymentMusic('/sounds/employment.mp3').then(() => {
//             playEmploymentMusic();
//         });

//         // Clean up function to stop music when leaving the component
//         return () => {
//             stopEmploymentMusic();
//         };
//     }, []); // Empty dependency array means this runs once when component mounts

//     const goBackToLocation = () => {
//         dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'location' } });
//     };

//     const applyForJob = (job) => {
//         if (player.education < job.eduReq) {
//             dispatch({
//                 type: 'SET_MESSAGE',
//                 payload: { text: `You need ${job.eduReq} education points for this job.` }
//             });
//             return;
//         }

//         if (player.experience < job.expReq) {
//             dispatch({
//                 type: 'SET_MESSAGE',
//                 payload: { text: `You need ${job.expReq} experience points for this job.` }
//             });
//             return;
//         }

//         // Get the job
//         dispatch({ type: 'GET_JOB', payload: { job } });
//     };

//     return (
//         <div className="employment-office mt-4">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Employment Office</h2>
//                 <button
//                     onClick={goBackToLocation}
//                     className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
//                 >
//                     Back
//                 </button>
//             </div>

//             <div className="bg-gray-900 p-4 rounded-lg mb-4">
//                 <h3 className="text-lg font-semibold mb-3">Available Jobs</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {jobs.map((job, index) => {
//                         const canApply = player.education >= job.eduReq && player.experience >= job.expReq;
//                         const isCurrentJob = player.job && player.job.title === job.title;

//                         return (
//                             <FeatureMotionWrapper key={index} index={index}>
//                                 <div
//                                     className={`border transition duration-300 hover:bg-gradient-to-r hover:from-indigo-900 hover:via-purple-900 hover:to-teal-900
//     ${isCurrentJob ? ' border-2 bg-gradient-to-r from-indigo-900 via-purple-900 to-teal-900' : canApply ? 'border-blue-500' : 'border-gray-700'}
//     rounded-lg p-3`}
//                                 >

//                                     <div className="flex flex-col md:flex-row md:justify-between gap-3">
//                                         <div>
//                                             <h4 className={`font-medium ${isCurrentJob ? 'text-green-400' : ''}`}>
//                                                 {job.title} {isCurrentJob && '(Current Job)'}
//                                             </h4>
//                                             <div className="grid grid-cols-3 gap-2 mt-1 text-sm">
//                                                 <div>
//                                                     Salary:{' '}
//                                                     <span className="text-green-400">${job.salary}/week</span>
//                                                 </div>
//                                                 <div>
//                                                     Education req:{' '}
//                                                     <span className={player.education >= job.eduReq ? 'text-green-400' : 'text-red-400'}>
//                                                         {job.eduReq}
//                                                     </span>
//                                                 </div>
//                                                 <div>
//                                                     Experience req:{' '}
//                                                     <span className={player.experience >= job.expReq ? 'text-green-400' : 'text-red-400'}>
//                                                         {job.expReq}
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {!isCurrentJob && (
//                                             <button
//                                                 onClick={() => applyForJob(job)}
//                                                 disabled={!canApply}
//                                                 className={`w-full md:w-auto py-2 px-4 rounded-xl text-white font-semibold transition duration-300
//                                    ${canApply
//                                                         ? 'bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-800 hover:brightness-110 shadow-lg'
//                                                         : 'bg-gradient-to-r from-black via-gray-400 to-white text-gray-700 cursor-not-allowed'
//                                                     }`}
//                                             >
//                                                 Apply
//                                             </button>

//                                         )}
//                                     </div>
//                                 </div>
//                             </FeatureMotionWrapper>



//                         );
//                     })}
//                 </div>
//             </div>


//             <div className="bg-gray-900 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold mb-2">Your Qualifications</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <p className="text-gray-400">Education Level:</p>
//                         <div className="mt-1 bg-gray-800 h-4 rounded-full overflow-hidden">
//                             <div
//                                 className="bg-blue-600 h-full"
//                                 style={{ width: `${player.education}%` }}
//                             ></div>
//                         </div>
//                         <p className="text-sm mt-1">{player.education}/100</p>
//                     </div>

//                     <div>
//                         <p className="text-gray-400">Experience Level:</p>
//                         <div className="mt-1 bg-gray-800 h-4 rounded-full overflow-hidden">
//                             <div
//                                 className="bg-green-600 h-full"
//                                 style={{ width: `${player.experience}%` }}
//                             ></div>
//                         </div>
//                         <p className="text-sm mt-1">{player.experience}/100</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// import { useGame } from "@/app/context/GameContext";
// import { initAudio, loadEmploymentMusic, playEmploymentMusic, stopEmploymentMusic } from "@/data/audioManager";
// import { jobs } from "@/data/jobs";
// import { useEffect } from "react";
// import FeatureMotionWrapper from "../FramerMotion/FeatureMotionWrapperMap";

// export default function JobOffice() {
//     const { state, dispatch } = useGame();
//     const { player } = state;

//     // Add useEffect to handle employment office music
//     useEffect(() => {
//         // Initialize audio and load employment office music
//         initAudio();
//         loadEmploymentMusic('/sounds/employment.mp3').then(() => {
//             playEmploymentMusic();
//         });

//         // Clean up function to stop music when leaving the component
//         return () => {
//             stopEmploymentMusic();
//         };
//     }, []); // Empty dependency array means this runs once when component mounts

//     const goBackToLocation = () => {
//         dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'location' } });
//     };

//     const applyForJob = (job) => {
//         if (player.education < job.eduReq) {
//             dispatch({
//                 type: 'SET_MESSAGE',
//                 payload: { text: `You need ${job.eduReq} education points for this job.` }
//             });
//             return;
//         }

//         if (player.experience < job.expReq) {
//             dispatch({
//                 type: 'SET_MESSAGE',
//                 payload: { text: `You need ${job.expReq} experience points for this job.` }
//             });
//             return;
//         }

//         // Get the job
//         dispatch({ type: 'GET_JOB', payload: { job } });
//     };

//     return (
//         <div className="employment-office relative mt-4 overflow-hidden">
//             {/* Content */}
//             <div className="relative z-10 p-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold">Employment Office</h2>
//                     <button
//                         onClick={goBackToLocation}
//                         className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
//                     >
//                         Back
//                     </button>
//                 </div>

//                 {/* Center Image - Added to match Healing Centre */}
//                 <div className="mb-6 flex flex-col items-center">
//                     <div className="flex justify-center mb-6 mt-4">
//                         <img
//                             src="https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-30568.jpg"
//                             alt="Employment Office"
//                             className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-blue-500 shadow-xl object-cover"
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = "https://img.freepik.com/free-photo/business-people-shaking-hands-finishing-meeting_53876-102637.jpg";
//                             }}
//                         />
//                     </div>
//                     <div className="mt-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
//                         <p className="text-sm italic text-white">
//                             "Welcome to the Employment Office. Our mission is to help you find your dream job and build a successful career. What career path would you like to explore today?"
//                         </p>
//                     </div>
//                 </div>

//                 {/* Available Jobs */}
//                 <div className="bg-gradient-to-bl from-indigo-500 via-black to-blue-900 p-4 rounded-lg mb-4">
//                     <h3 className="text-lg font-semibold mb-3">Available Jobs</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {jobs.map((job, index) => {
//                             const canApply = player.education >= job.eduReq && player.experience >= job.expReq;
//                             const isCurrentJob = player.job && player.job.title === job.title;

//                             return (
//                                 <FeatureMotionWrapper key={index} index={index}>
//                                     <div
//                                         className={`gradient-background2 p-3 rounded-lg border-2
//                                             ${isCurrentJob ? 'border-green-500' : canApply ? 'border-blue-500' : 'border-transparent'}
//                                             transition-all hover:border-blue-500`}
//                                     >
//                                         <div className="flex flex-col md:flex-row md:justify-between gap-3">
//                                             <div>
//                                                 <h4 className={`font-medium text-white ${isCurrentJob ? 'text-green-400' : ''}`}>
//                                                     {job.title} {isCurrentJob && '(Current Job)'}
//                                                 </h4>
//                                                 <div className="grid grid-cols-3 gap-2 mt-1 text-sm">
//                                                     <div>
//                                                         Salary:{' '}
//                                                         <span className="text-green-400">${job.salary}/week</span>
//                                                     </div>
//                                                     <div>
//                                                         Education req:{' '}
//                                                         <span className={player.education >= job.eduReq ? 'text-green-400' : 'text-red-400'}>
//                                                             {job.eduReq}
//                                                         </span>
//                                                     </div>
//                                                     <div>
//                                                         Experience req:{' '}
//                                                         <span className={player.experience >= job.expReq ? 'text-green-400' : 'text-red-400'}>
//                                                             {job.expReq}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             {!isCurrentJob && (
//                                                 <button
//                                                     onClick={() => applyForJob(job)}
//                                                     disabled={!canApply}
//                                                     className={`w-full md:w-auto py-2 px-4 rounded-xl text-white font-semibold transition duration-300
//                                                     ${canApply
//                                                             ? 'bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 hover:brightness-110 shadow-lg'
//                                                             : 'bg-gradient-to-r from-black via-gray-400 to-white text-gray-700 cursor-not-allowed'
//                                                         }`}
//                                                 >
//                                                     Apply
//                                                 </button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </FeatureMotionWrapper>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Qualifications */}
//                 <div className="bg-gradient-to-bl from-indigo-500 via-black to-blue-900 p-4 rounded-lg">
//                     <h3 className="text-lg font-semibold mb-2">Your Qualifications</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <p className="text-gray-300">Education Level:</p>
//                             <div className="mt-1 bg-gray-800 h-4 rounded-full overflow-hidden">
//                                 <div
//                                     className="bg-blue-600 h-full"
//                                     style={{ width: `${player.education}%` }}
//                                 ></div>
//                             </div>
//                             <p className="text-sm mt-1">{player.education}/100</p>
//                         </div>
//                         <div>
//                             <p className="text-gray-300">Experience Level:</p>
//                             <div className="mt-1 bg-gray-800 h-4 rounded-full overflow-hidden">
//                                 <div
//                                     className="bg-green-600 h-full"
//                                     style={{ width: `${player.experience}%` }}
//                                 ></div>
//                             </div>
//                             <p className="text-sm mt-1">{player.experience}/100</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Career Tips - Added to match Healing Centre's "Wellbeing Tips" section */}
//                 <div className="p-4 rounded mt-4">
//                     <h3 className="text-lg font-semibold mb-2">Career Tips</h3>
//                     <p className="text-gray-400 text-sm">
//                         • Higher education increases your job opportunities.<br />
//                         • Gaining experience through internships can boost your career.<br />
//                         • A balanced career path leads to better financial security.<br />
//                         • Higher paying jobs often require more qualifications.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useGame } from "@/app/context/GameContext";
import { initAudio, loadEmploymentMusic, playEmploymentMusic, stopEmploymentMusic } from "@/data/audioManager";
import { jobs } from "@/data/jobs";
import { useEffect } from "react";
import FeatureMotionWrapper from "../FramerMotion/FeatureMotionWrapperMap";
import { toast } from 'sonner'; // Add this import

export default function JobOffice() {
    const { state, dispatch } = useGame();
    const { player } = state;

    // Add useEffect to handle employment office music
    useEffect(() => {
        // Initialize audio and load employment office music
        initAudio();
        loadEmploymentMusic('/sounds/employment.mp3').then(() => {
            playEmploymentMusic();
        });

        // Clean up function to stop music when leaving the component
        return () => {
            stopEmploymentMusic();
        };
    }, []); // Empty dependency array means this runs once when component mounts

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

    const goBackToLocation = () => {
        dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'location' } });
    };

    const applyForJob = (job) => {
        if (player.education < job.eduReq) {
            // Use the showMessage function
            showMessage(`You need ${job.eduReq} education points for this job.`);
            return;
        }

        if (player.experience < job.expReq) {
            // Use the showMessage function
            showMessage(`You need ${job.expReq} experience points for this job.`);
            return;
        }

        // Get the job
        dispatch({ type: 'GET_JOB', payload: { job } });

        // Show success message
        showMessage(`Congratulations! You got the ${job.title} job!`);
    };

    return (
        <div className="employment-office relative mt-4 overflow-hidden">
            {/* Content */}
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Employment Office</h2>
                    <button
                        onClick={goBackToLocation}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back
                    </button>
                </div>

                {/* Center Image - Added to match Healing Centre */}
                <div className="mb-6 flex flex-col items-center">
                    <div className="flex justify-center mb-6 mt-4">
                        <img
                            src="https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-30568.jpg"
                            alt="Employment Office"
                            className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-blue-500 shadow-xl object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://img.freepik.com/free-photo/business-people-shaking-hands-finishing-meeting_53876-102637.jpg";
                            }}
                        />
                    </div>

                    <div className="mt-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
                        <p className="text-sm italic text-white">
                            "Welcome to the Employment Office. Our mission is to help you find your dream job and build a successful career. What career path would you like to explore today?"
                        </p>
                    </div>
                </div>

                {/* Available Jobs */}
                <div className="bg-gradient-to-bl from-indigo-500 via-black to-blue-900 p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold mb-3">Available Jobs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {jobs.map((job, index) => {
                            const canApply = player.education >= job.eduReq && player.experience >= job.expReq;
                            const isCurrentJob = player.job && player.job.title === job.title;

                            return (
                                <FeatureMotionWrapper key={index} index={index}>
                                    <div
                                        className={`gradient-background2 p-3 rounded-lg border-2
                                            ${isCurrentJob ? 'border-green-500' : canApply ? 'border-blue-500' : 'border-transparent'}
                                            transition-all hover:border-blue-500`}
                                    >
                                        <div className="flex flex-col md:flex-row md:justify-between gap-3">
                                            <div>
                                                <h4 className={`font-medium text-white ${isCurrentJob ? 'text-green-400' : ''}`}>
                                                    {job.title} {isCurrentJob && '(Current Job)'}
                                                </h4>
                                                <div className="grid grid-cols-3 gap-2 mt-1 text-sm">
                                                    <div>
                                                        Salary: {' '}
                                                        <span className="text-green-400">${job.salary}/week</span>
                                                    </div>
                                                    <div>
                                                        Education req: {' '}
                                                        <span className={player.education >= job.eduReq ? 'text-green-400' : 'text-red-400'}>
                                                            {job.eduReq}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        Experience req: {' '}
                                                        <span className={player.experience >= job.expReq ? 'text-green-400' : 'text-red-400'}>
                                                            {job.expReq}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {!isCurrentJob && (
                                                <button
                                                    onClick={() => applyForJob(job)}
                                                    disabled={!canApply}
                                                    className={`w-full md:w-auto py-2 px-4 rounded-xl text-white font-semibold transition duration-300
                                                    ${canApply
                                                            ? 'bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 hover:brightness-110 shadow-lg'
                                                            : 'bg-gradient-to-r from-black via-gray-400 to-white text-gray-700 cursor-not-allowed'
                                                        }`}
                                                >
                                                    Apply
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </FeatureMotionWrapper>
                            );
                        })}
                    </div>
                </div>

                {/* Qualifications */}
                <div className="bg-gradient-to-bl from-indigo-500 via-black to-blue-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Your Qualifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-300">Education Level:</p>
                            <div className="mt-1 bg-gray-800 h-4 rounded-full overflow-hidden">
                                <div
                                    className="bg-blue-600 h-full"
                                    style={{ width: `${player.education}%` }}
                                ></div>
                            </div>
                            <p className="text-sm mt-1">{player.education}/100</p>
                        </div>
                        <div>
                            <p className="text-gray-300">Experience Level:</p>
                            <div className="mt-1 bg-gray-800 h-4 rounded-full overflow-hidden">
                                <div
                                    className="bg-green-600 h-full"
                                    style={{ width: `${player.experience}%` }}
                                ></div>
                            </div>
                            <p className="text-sm mt-1">{player.experience}/100</p>
                        </div>
                    </div>
                </div>

                {/* Career Tips - Added to match Healing Centre's "Wellbeing Tips" section */}
                <div className="p-4 rounded mt-4">
                    <h3 className="text-lg font-semibold mb-2">Career Tips</h3>
                    <p className="text-gray-400 text-sm">
                        • Higher education increases your job opportunities.<br />
                        • Gaining experience through internships can boost your career.<br />
                        • A balanced career path leads to better financial security.<br />
                        • Higher paying jobs often require more qualifications.
                    </p>
                </div>
            </div>
        </div>
    );
}