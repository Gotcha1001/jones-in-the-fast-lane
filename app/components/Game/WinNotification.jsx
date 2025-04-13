// // components/UI/WinNotification.jsx
// import React, { useEffect } from 'react';
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle
// } from '@/components/ui/alert-dialog';
// import { useGame } from '@/app/context/GameContext';


// export default function WinNotification() {
//     const { state, dispatch } = useGame();
//     const { gameWon, player } = state;

//     const handlePlayAgain = () => {
//         dispatch({ type: 'RESTART_GAME' });
//     };

//     // Only return the component when game is won
//     if (!gameWon) return null;

//     return (
//         <AlertDialog open={gameWon} onOpenChange={() => { }}>
//             <AlertDialogContent className="bg-gray-800 border border-green-500">
//                 <AlertDialogHeader>
//                     <AlertDialogTitle className="text-3xl font-bold text-green-400">
//                         Congratulations!
//                     </AlertDialogTitle>
//                     <AlertDialogDescription className="text-xl text-white">
//                         You've achieved all your goals and won the game!
//                         <br />
//                         <span className="block mt-2">You completed the game in {player.week} weeks.</span>
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogAction
//                         onClick={handlePlayAgain}
//                         className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg text-xl"
//                     >
//                         Play Again
//                     </AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     );
// }




// components/UI/WinNotification.jsx
// import React from 'react';
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle
// } from '@/components/ui/alert-dialog';
// import { useGame } from '@/app/context/GameContext';


// export default function WinNotification() {
//     const { state, dispatch } = useGame();
//     const { gameWon, player } = state;

//     const handlePlayAgain = () => {
//         dispatch({ type: 'RESTART_GAME' });
//     };

//     const handleViewStats = () => {
//         // Just close the modal, but keep the game in won state
//         dispatch({ type: 'SET_VIEWING_STATS', payload: { viewingStats: true } });
//     };

//     // Only return the component when game is won and not viewing stats
//     if (!gameWon || state.viewingStats) return null;

//     return (
//         <AlertDialog open={gameWon} onOpenChange={() => { }}>
//             <AlertDialogContent className="bg-gray-800 border border-green-500">
//                 <AlertDialogHeader>
//                     <AlertDialogTitle className="text-3xl font-bold text-green-400">
//                         Congratulations!
//                     </AlertDialogTitle>
//                     <AlertDialogDescription className="text-xl text-white">
//                         You've achieved all your goals and won the game!
//                         <br />
//                         <span className="block mt-2">You completed the game in {player.week} weeks.</span>
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
//                     <AlertDialogAction
//                         onClick={handleViewStats}
//                         className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-6 rounded-lg text-lg order-2 sm:order-1"
//                     >
//                         View Final Stats
//                     </AlertDialogAction>
//                     <AlertDialogAction
//                         onClick={handlePlayAgain}
//                         className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg text-lg order-1 sm:order-2"
//                     >
//                         Play Again
//                     </AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     );
// }



"use client";
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useGame } from '@/app/context/GameContext';

export default function WinNotification() {
    const { state, dispatch } = useGame();
    const { gameWon, player } = state;

    const handlePlayAgain = () => {
        dispatch({ type: 'RESTART_GAME' });
    };

    const handleViewStats = () => {
        dispatch({ type: 'SET_VIEWING_STATS', payload: { viewingStats: true } });
    };

    const fireConfetti = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);
    };

    useEffect(() => {
        if (gameWon && !state.viewingStats) {
            fireConfetti();
        }
    }, [gameWon, state.viewingStats]);

    if (!gameWon || state.viewingStats) return null;

    return (
        <AlertDialog open={gameWon} onOpenChange={() => { }}>
            <AlertDialogContent className="bg-gray-800 border border-green-500">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-3xl font-bold text-green-400">
                        Congratulations!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xl text-white">
                        You've achieved all your goals and won the game!
                        <br />
                        <span className="block mt-2">You completed the game in {player.week} weeks.</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                    <AlertDialogAction
                        onClick={handleViewStats}
                        className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-6 rounded-lg text-lg order-2 sm:order-1"
                    >
                        View Final Stats
                    </AlertDialogAction>
                    <AlertDialogAction
                        onClick={handlePlayAgain}
                        className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg text-lg order-1 sm:order-2"
                    >
                        Play Again
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
