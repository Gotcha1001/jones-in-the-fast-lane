


// import { useGame } from '@/app/context/GameContext';
// import { useEffect } from 'react';
// import GameOver from './GameOver';
// import Map from './Map';
// import LocationDetail from './LocationDetail';
// import JobOffice from './EmploymentOffice';
// import ShoppingMall from './Mall';
// import MessageArea from './MessageArea';
// import Stats from './Stats';
// import PlayerSelect from './PlayerSelect';
// import { motion, AnimatePresence } from 'framer-motion';
// import WinNotification from './WinNotification';
// import Bank from './Bank';
// import SharesMarket from './SharesMarket';
// import LeisureCentre from './LeisureCentre';
// import SaveLoadMenu from './SaveLoadMenu';

// import University from './University';
// import Apartment from './Apartment';
// import RentalOffice from './RentalOffice';
// import GoalsTracker from './GoalsTracker';
// import RandomEventAlert from './RandomEventAlert';
// import FastFood from './FastFood';
// import DatingOffice from './DatingOffice';
// import HealingCentre from './HealingCentre';
// import { jobs } from '@/data/jobs';
// import Workplace from './WorkPlace';

// export default function GameContainer() {
//     const { state, dispatch } = useGame();

//     // Check for win condition on any state change
//     useEffect(() => {
//         console.log("GameContainer: useEffect triggered with state:", {
//             player: state.player,
//             gameRunning: state.gameRunning,
//             gameWon: state.gameWon,
//             currentScreen: state.currentScreen,
//         });

//         if (!state.gameRunning) return;
//         const timer = setTimeout(() => {
//             const { player } = state;
//             if (!player || typeof player.cash === 'undefined') {
//                 console.error("GameContainer: Invalid player state:", player);
//                 dispatch({
//                     type: 'SET_MESSAGE',
//                     payload: { text: "Error: Player data missing. Please restart." },
//                 });
//                 return;
//             }
//             console.log("GameContainer: Checking win conditions for player:", player);
//             const goals = player?.goals ?? initialState.player.goals;
//             const hasWinningJob = player?.job && goals?.winningJobs?.includes(player.job.title);
//             const hasLuxuryApartment = player?.rental && player?.rental?.hasApartment && player?.rental?.rentAmount === 200;
//             const hasGoodHealth = (player?.relationship?.health || 0) >= 80;
//             const hasEnoughHappiness = (player?.happiness || 0) >= goals.happiness;
//             const subjectLevels = Object.values(player.subjects);
//             const educationAverage = subjectLevels.length
//                 ? Math.floor(subjectLevels.reduce((sum, level) => sum + level, 0) / subjectLevels.length)
//                 : 0;
//             const hasRequiredEducation = educationAverage >= goals.education;
//             const hasRequiredSubjects = goals.winningJobs.some((jobTitle) => {
//                 const job = jobs.find((j) => j.title === jobTitle);
//                 return Object.entries(job.requiredSubjects).every(
//                     ([subject, level]) => (player.subjects[subject] || 0) >= level
//                 );
//             });
//             const achieved =
//                 player.cash >= goals.cash &&
//                 hasWinningJob &&
//                 hasLuxuryApartment &&
//                 hasGoodHealth &&
//                 hasEnoughHappiness &&
//                 hasRequiredEducation &&
//                 hasRequiredSubjects;
//             console.log("GameContainer: Win condition check:", {
//                 achieved,
//                 cash: player.cash >= goals.cash,
//                 job: hasWinningJob,
//                 luxury: hasLuxuryApartment,
//                 health: hasGoodHealth,
//                 happiness: hasEnoughHappiness,
//                 education: hasRequiredEducation,
//                 subjects: hasRequiredSubjects,
//             });
//             if (achieved && !state.gameWon) {
//                 console.log("GameContainer: Dispatching GAME_WON for player:", player);
//                 dispatch({ type: 'GAME_WON' });
//             }
//         }, 100);
//         return () => clearTimeout(timer);
//     }, [state.player, state.gameRunning, state.gameWon, dispatch]);

//     // Determine which screen to show based on game state
//     const renderScreen = () => {
//         console.log("GameContainer: Rendering screen:", {
//             currentScreen: state.currentScreen,
//             playerExists: !!state.player,
//             goalsExist: !!state.player?.goals,
//             gameWon: state.gameWon,
//         });
//         if (state.isPlayerSelect) {
//             return <PlayerSelect />;
//         }
//         if (state.currentScreen === "gameOver") {
//             if (!state.player || !state.player.goals) {
//                 console.error("GameContainer: Cannot render GameOver, invalid player state:", state.player);
//                 return (
//                     <div className="error-screen flex flex-col items-center justify-center p-6">
//                         <h2 className="text-3xl font-bold mb-6 text-red-400">Error</h2>
//                         <p className="text-xl">Player data is missing. Please restart the game.</p>
//                         <button
//                             onClick={() => dispatch({ type: 'RESTART_GAME' })}
//                             className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-4"
//                         >
//                             Restart Game
//                         </button>
//                     </div>
//                 );
//             }
//             return <GameOver won={state.gameWon} />;
//         }
//         switch (state.currentScreen) {
//             case 'map':
//                 return <Map />;
//             case 'location':
//                 return <LocationDetail locationId={state.player.location} />;
//             case 'job':
//                 return <JobOffice />;
//             case 'shop':
//                 return <ShoppingMall />;
//             case 'bank':
//                 return <Bank />;
//             case 'workplace':
//                 return <Workplace />;
//             case 'university':
//                 return <University />;
//             case 'datingOffice':
//                 return <DatingOffice />;
//             case 'healingCentre':
//                 return <HealingCentre />;
//             case 'apartment':
//                 return <Apartment />;
//             case 'rentoffice':
//                 return <RentalOffice />;
//             case 'shares':
//                 return <SharesMarket />;
//             case 'leisure':
//                 return <LeisureCentre />;
//             case 'fastFood':
//                 return <FastFood />;
//             case 'goals':
//                 return <GoalsTracker />;
//             case 'saveload':
//                 return <SaveLoadMenu />;
//             default:
//                 console.warn("GameContainer: Unknown screen, defaulting to Map:", state.currentScreen);
//                 return <Map />;
//         }
//     };

//     return (
//         <motion.div
//             className="game-container gradient-background2 rounded-lg shadow-lg my-4 p-2"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//         >
//             <RandomEventAlert />
//             <WinNotification />
//             {!state.isPlayerSelect && <Stats />}
//             <MessageArea message={state.message} />
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={state.currentScreen}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     {renderScreen()}
//                 </motion.div>
//             </AnimatePresence>
//         </motion.div>
//     );
// }



// import { useGame } from '@/app/context/GameContext';
// import { useEffect } from 'react';
// import GameOver from './GameOver';
// import Map from './Map';
// import LocationDetail from './LocationDetail';
// import JobOffice from './EmploymentOffice';
// import ShoppingMall from './Mall';
// import MessageArea from './MessageArea';
// import Stats from './Stats';
// import PlayerSelect from './PlayerSelect';
// import { motion, AnimatePresence } from 'framer-motion';
// import WinNotification from './WinNotification';
// import Bank from './Bank';
// import SharesMarket from './SharesMarket';
// import LeisureCentre from './LeisureCentre';
// import SaveLoadMenu from './SaveLoadMenu';
// import University from './University';
// import Apartment from './Apartment';
// import RentalOffice from './RentalOffice';
// import GoalsTracker from './GoalsTracker';
// import RandomEventAlert from './RandomEventAlert';
// import FastFood from './FastFood';
// import DatingOffice from './DatingOffice';
// import HealingCentre from './HealingCentre';
// import { jobs } from '@/data/jobs';
// import Workplace from './WorkPlace';

// export default function GameContainer() {
//     const { state, dispatch } = useGame();

//     // Preload the player's avatar image to optimize loading on map render
//     useEffect(() => {
//         if (state.player && state.player.avatar) {
//             const img = new Image();
//             img.src = state.player.avatar;
//         }
//     }, [state.player?.avatar]);

//     // Check for win condition on any state change
//     useEffect(() => {
//         console.log("GameContainer: useEffect triggered with state:", {
//             player: state.player,
//             gameRunning: state.gameRunning,
//             gameWon: state.gameWon,
//             currentScreen: state.currentScreen,
//         });
//         if (!state.gameRunning) return;
//         const timer = setTimeout(() => {
//             const { player } = state;
//             if (!player || typeof player.cash === 'undefined') {
//                 console.error("GameContainer: Invalid player state:", player);
//                 dispatch({
//                     type: 'SET_MESSAGE',
//                     payload: { text: "Error: Player data missing. Please restart." },
//                 });
//                 return;
//             }
//             console.log("GameContainer: Checking win conditions for player:", player);
//             const goals = player?.goals ?? initialState.player.goals;
//             const hasWinningJob = player?.job && goals?.winningJobs?.includes(player.job.title);
//             const hasLuxuryApartment = player?.rental && player?.rental?.hasApartment && player?.rental?.rentAmount === 200;
//             const hasGoodHealth = (player?.relationship?.health || 0) >= 80;
//             const hasEnoughHappiness = (player?.happiness || 0) >= goals.happiness;
//             const subjectLevels = Object.values(player.subjects);
//             const educationAverage = subjectLevels.length
//                 ? Math.floor(subjectLevels.reduce((sum, level) => sum + level, 0) / subjectLevels.length)
//                 : 0;
//             const hasRequiredEducation = educationAverage >= goals.education;
//             const hasRequiredSubjects = goals.winningJobs.some((jobTitle) => {
//                 const job = jobs.find((j) => j.title === jobTitle);
//                 return Object.entries(job.requiredSubjects).every(
//                     ([subject, level]) => (player.subjects[subject] || 0) >= level
//                 );
//             });
//             const achieved =
//                 player.cash >= goals.cash &&
//                 hasWinningJob &&
//                 hasLuxuryApartment &&
//                 hasGoodHealth &&
//                 hasEnoughHappiness &&
//                 hasRequiredEducation &&
//                 hasRequiredSubjects;
//             console.log("GameContainer: Win condition check:", {
//                 achieved,
//                 cash: player.cash >= goals.cash,
//                 job: hasWinningJob,
//                 luxury: hasLuxuryApartment,
//                 health: hasGoodHealth,
//                 happiness: hasEnoughHappiness,
//                 education: hasRequiredEducation,
//                 subjects: hasRequiredSubjects,
//             });
//             if (achieved && !state.gameWon) {
//                 console.log("GameContainer: Dispatching GAME_WON for player:", player);
//                 dispatch({ type: 'GAME_WON' });
//             }
//         }, 100);
//         return () => clearTimeout(timer);
//     }, [state.player, state.gameRunning, state.gameWon, dispatch]);

//     // Determine which screen to show based on game state
//     const renderScreen = () => {
//         console.log("GameContainer: Rendering screen:", {
//             currentScreen: state.currentScreen,
//             playerExists: !!state.player,
//             goalsExist: !!state.player?.goals,
//             gameWon: state.gameWon,
//         });
//         if (state.isPlayerSelect) {
//             return <PlayerSelect />;
//         }
//         if (state.currentScreen === "gameOver") {
//             if (!state.player || !state.player.goals) {
//                 console.error("GameContainer: Cannot render GameOver, invalid player state:", state.player);
//                 return (
//                     <div className="error-screen flex flex-col items-center justify-center p-6">
//                         <h2 className="text-3xl font-bold mb-6 text-red-400">Error</h2>
//                         <p className="text-xl">Player data is missing. Please restart the game.</p>
//                         <button
//                             onClick={() => dispatch({ type: 'RESTART_GAME' })}
//                             className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-4"
//                         >
//                             Restart Game
//                         </button>
//                     </div>
//                 );
//             }
//             return <GameOver won={state.gameWon} />;
//         }
//         switch (state.currentScreen) {
//             case 'map':
//                 return <Map />;
//             case 'location':
//                 return <LocationDetail locationId={state.player.location} />;
//             case 'job':
//                 return <JobOffice />;
//             case 'shop':
//                 return <ShoppingMall />;
//             case 'bank':
//                 return <Bank />;
//             case 'workplace':
//                 return <Workplace />;
//             case 'university':
//                 return <University />;
//             case 'datingOffice':
//                 return <DatingOffice />;
//             case 'healingCentre':
//                 return <HealingCentre />;
//             case 'apartment':
//                 return <Apartment />;
//             case 'rentoffice':
//                 return <RentalOffice />;
//             case 'shares':
//                 return <SharesMarket />;
//             case 'leisure':
//                 return <LeisureCentre />;
//             case 'fastFood':
//                 return <FastFood />;
//             case 'goals':
//                 return <GoalsTracker />;
//             case 'saveload':
//                 return <SaveLoadMenu />;
//             default:
//                 console.warn("GameContainer: Unknown screen, defaulting to Map:", state.currentScreen);
//                 return <Map />;
//         }
//     };

//     return (
//         <motion.div
//             className="game-container gradient-background2 rounded-lg shadow-lg my-4 p-2"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//         >
//             <RandomEventAlert />
//             <WinNotification />
//             {!state.isPlayerSelect && <Stats />}
//             <MessageArea message={state.message} />
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={state.currentScreen}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     {renderScreen()}
//                 </motion.div>
//             </AnimatePresence>
//         </motion.div>
//     );
// }




import { useGame } from '@/app/context/GameContext';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameOver from './GameOver';
import Map from './Map';
import LocationDetail from './LocationDetail';
import JobOffice from './EmploymentOffice';
import ShoppingMall from './Mall';
import MessageArea from './MessageArea';
import Stats from './Stats';
import PlayerSelect from './PlayerSelect';
import WinNotification from './WinNotification';
import Bank from './Bank';
import SharesMarket from './SharesMarket';
import LeisureCentre from './LeisureCentre';
import SaveLoadMenu from './SaveLoadMenu';
import University from './University';
import Apartment from './Apartment';
import RentalOffice from './RentalOffice';
import GoalsTracker from './GoalsTracker';
import RandomEventAlert from './RandomEventAlert';
import FastFood from './FastFood';
import DatingOffice from './DatingOffice';
import HealingCentre from './HealingCentre';
import Workplace from './WorkPlace';
import initialState from '../../context/initialState';
import { jobs } from '@/data/jobs';

export default function GameContainer() {
    const { state, dispatch } = useGame();

    // Define memoized defaultGoals
    const defaultGoals = useMemo(() => ({
        cash: 10000,
        education: 80,
        happiness: 90,
        winningJobs: ["Executive", "Engineer", "Startup Founder", "Investor"],
    }), []);

    // Preload all game images, audio, and videos when the component mounts
    useEffect(() => {
        // List of all image URLs used in the game
        const imageUrls = [
            // Player avatars (used in PlayerSelect and elsewhere)
            '/avatars/avatar30.jpg', '/avatars/avatar25.jpg', '/avatars/avatar24.jpg', '/avatars/avatar26.jpg',
            '/avatars/avatar27.jpg', '/avatars/avatar32.jpg', '/avatars/avatar34.jpg', '/avatars/avatar35.jpg',
            '/avatars/avatar38.jpg', '/avatars/avatar39.jpg', '/avatars/avatar28.jpg', '/avatars/avatar21.jpg',
            '/avatars/avatar31.jpg', '/avatars/avatar37.jpg', '/avatars/avatar40.jpg', '/avatars/avatar41.jpg',
            '/avatars/avatar29.jpg', '/avatars/avatar17.jpg', '/avatars/avatar15.jpg', '/avatars/avatar16.jpg',
            '/avatars/avatar19.jpg', '/avatars/avatar42.jpg', '/avatars/avatar33.jpg', '/avatars/avatar36.jpg',
            '/avatars/person.jpg', '/avatars/sexygirl.jpg', '/avatars/sexygirl1.jpg', '/avatars/sexygirl2.jpg',
            '/avatars/sexygirl3.jpg', '/avatars/sexygirl4.jpg', '/avatars/sexyguy1.jpg', '/avatars/sexyguy2.jpg',
            '/avatars/sexyguy.jpg', '/avatars/sexyguy3.jpg', '/avatars/sexyguy4.jpg',
            // Component-specific images
            '/professor.jpg', // University
            '/boss.jpg', // Workplace
            '/stone.png', // PathSystem in Map
            '/home.jpg', // Apartment
            '/home2.jpg', // Apartment
            '/home3.jpg', // Apartment
            '/home4.jpg', // Apartment
            '/meditate.jpg', // LeisureCentre
            '/rent.jpg', // RentalOffice
            '/tv.jpg', // Apartment or LeisureCentre
            '/universityimage.jpg', // University
            '/datingoffice.jpg', // DatingOffice
            '/banklady.jpg', // Bank
            '/gaming.jpg', // LeisureCentre
            '/grass.jpg', // Map
            '/logo1.jpg', // UI element
            '/logo2.jpg', // UI element
            '/logo3.jpg', // UI element
        ];

        // Preload images by creating Image objects
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });

        // List of all audio URLs used in the game
        const audioUrls = [
            '/sounds/click.mp3', // Click sound
            '/sounds/universitymusic.mp3', // University background music
            '/sounds/workmusic.mp3', // Workplace background music
            '/sounds/walk.mp3', // Map movement
            '/sounds/mallmusic.mp3', // ShoppingMall background
            '/sounds/leisuresound.mp3', // LeisureCentre background
            '/sounds/healing.mp3', // HealingCentre background
            '/sounds/fastfood.mp3', // FastFood background
            '/sounds/employment.mp3', // JobOffice background
            '/sounds/datingmusic.mp3', // DatingOffice background
            '/sounds/bankmusic.mp3', // Bank background
            '/sounds/apartment.mp3', // Apartment background
        ];

        // Preload audio by creating Audio objects
        audioUrls.forEach(url => {
            const audio = new Audio(url);
            audio.preload = 'auto'; // Ensures audio is preloaded
        });

        // List of all video URLs used in the game
        const videoUrls = [
            'https://cdn.pixabay.com/video/2023/10/10/184469-873483892_tiny.mp4', // University background
            '/videos/workplacevideo.mp4', // Workplace background
            '/videos/apartment.mp4',
            '/videos/bank.mp4',
            '/videos/leisure.mp4',
            '/videos/universityvideo.mp4',
            '/videos/workplacevideo.mp4'
        ];

        // Preload videos by creating Video elements
        videoUrls.forEach(url => {
            const video = document.createElement('video');
            video.src = url;
            video.preload = 'auto'; // Preload metadata and initial frames
            // Optionally mute to prevent autoplay issues during preloading
            video.muted = true;
        });
    }, []); // Empty dependency array ensures this runs only once on mount

    // Preload the player's avatar specifically when it changes
    useEffect(() => {
        if (state.player && state.player.avatar) {
            const img = new Image();
            img.src = state.player.avatar;
        }
    }, [state.player?.avatar]);

    // Check win condition whenever relevant state changes
    useEffect(() => {
        if (!state.gameRunning) return;
        const timer = setTimeout(() => {
            const { player } = state;
            if (!player || typeof player.cash === 'undefined') {
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: { text: "Error: Player data missing. Please restart." },
                });
                return;
            }
            const goals = player?.goals ?? defaultGoals; // Use memoized defaultGoals
            const hasWinningJob = player?.job && goals?.winningJobs?.includes(player.job.title);
            const hasLuxuryApartment = player?.rental?.hasApartment && player?.rental?.rentAmount === 200;
            const hasGoodHealth = (player?.relationship?.health || 0) >= 80;
            const hasEnoughHappiness = (player?.happiness || 0) >= goals.happiness;
            const subjectLevels = Object.values(player.subjects);
            const educationAverage = subjectLevels.length
                ? Math.floor(subjectLevels.reduce((sum, level) => sum + level, 0) / subjectLevels.length)
                : 0;
            const hasRequiredEducation = educationAverage >= goals.education;
            const hasRequiredSubjects = goals.winningJobs.some((jobTitle) => {
                const job = jobs.find((j) => j.title === jobTitle);
                return Object.entries(job.requiredSubjects).every(
                    ([subject, level]) => (player.subjects[subject] || 0) >= level
                );
            });
            const achieved =
                player.cash >= goals.cash &&
                hasWinningJob &&
                hasLuxuryApartment &&
                hasGoodHealth &&
                hasEnoughHappiness &&
                hasRequiredEducation &&
                hasRequiredSubjects;
            if (achieved && !state.gameWon) {
                dispatch({ type: 'GAME_WON' });
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [state.player, state.gameRunning, state.gameWon, dispatch, defaultGoals]);

    // Determine which screen to render based on game state
    const renderScreen = useMemo(() => {
        if (state.isPlayerSelect) {
            return <PlayerSelect />;
        }
        if (state.currentScreen === "gameOver") {
            if (!state.player || !state.player.goals) {
                return (
                    <div className="error-screen flex flex-col items-center justify-center p-6">
                        <h2 className="text-3xl font-bold mb-6 text-red-400">Error</h2>
                        <p className="text-xl">Player data is missing. Please restart the game.</p>
                        <button
                            onClick={() => dispatch({ type: 'RESTART_GAME' })}
                            className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl mt-4"
                        >
                            Restart Game
                        </button>
                    </div>
                );
            }
            return <GameOver won={state.gameWon} />;
        }
        switch (state.currentScreen) {
            case 'map': return <Map />;
            case 'location': return <LocationDetail locationId={state.player.location} />;
            case 'job': return <JobOffice />;
            case 'shop': return <ShoppingMall />;
            case 'bank': return <Bank />;
            case 'workplace': return <Workplace />;
            case 'university': return <University />;
            case 'datingOffice': return <DatingOffice />;
            case 'healingCentre': return <HealingCentre />;
            case 'apartment': return <Apartment />;
            case 'rentoffice': return <RentalOffice />;
            case 'shares': return <SharesMarket />;
            case 'leisure': return <LeisureCentre />;
            case 'fastFood': return <FastFood />;
            case 'goals': return <GoalsTracker />;
            case 'saveload': return <SaveLoadMenu />;
            default: return <Map />;
        }
    }, [state.currentScreen, state.isPlayerSelect, state.player, state.gameWon, dispatch]);

    return (
        <motion.div
            className="game-container gradient-background2 rounded-lg shadow-lg my-4 p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <RandomEventAlert />
            <WinNotification />
            {!state.isPlayerSelect && <Stats />}
            <MessageArea message={state.message} />
            <AnimatePresence mode="wait">
                <motion.div
                    key={state.currentScreen}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderScreen}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}