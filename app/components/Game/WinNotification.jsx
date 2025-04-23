

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
import { motion } from 'framer-motion';

export default function WinNotification() {
    const { state, dispatch } = useGame();
    const { gameWon, player, viewingStats } = state;

    const handlePlayAgain = () => {
        console.log("WinNotification: Dispatching RESTART_GAME");
        dispatch({ type: 'RESTART_GAME' });
    };

    const handleViewStats = () => {
        console.log("WinNotification: Dispatching SET_VIEWING_STATS");
        dispatch({ type: 'SET_VIEWING_STATS', payload: { viewingStats: true } });
    };

    const fireConfetti = () => {
        const duration = 7 * 1000; // Extended duration for more celebration
        const animationEnd = Date.now() + duration;
        const defaults = {
            startVelocity: 40, // Higher velocity for larger spread
            spread: 360, // Full circle spread
            ticks: 80, // Longer particle life
            zIndex: 1000, // Ensure confetti is above modal
            scalar: 1.5, // Larger particles
        };

        console.log("WinNotification: Firing enhanced confetti for player:", player);

        const colors = ['#FFD700', '#FF4500', '#00FF00', '#1E90FF', '#FF69B4']; // Vibrant colors
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 100 * (timeLeft / duration); // More particles
            // Main confetti burst
            confetti({
                ...defaults,
                particleCount,
                colors,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                shapes: ['circle', 'square', 'star'], // Varied shapes
                scalar: randomInRange(1, 2), // Random size variation
            });
            confetti({
                ...defaults,
                particleCount,
                colors,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                shapes: ['circle', 'square', 'star'],
                scalar: randomInRange(1, 2),
            });

            // Light flash effect (white/yellow bursts)
            if (Math.random() > 0.7) {
                confetti({
                    ...defaults,
                    particleCount: 20,
                    colors: ['#FFFFFF', '#FFFFE0', '#FFD700'],
                    spread: 60, // Narrower spread for flash
                    startVelocity: 50, // Faster for flash effect
                    origin: { x: randomInRange(0.4, 0.6), y: randomInRange(0.3, 0.7) },
                    scalar: randomInRange(0.5, 1), // Smaller particles for flash
                });
            }
        }, 200); // Faster intervals for dynamic effect
    };

    useEffect(() => {
        if (gameWon && !viewingStats) {
            console.log("WinNotification: Firing confetti for player:", player);
            fireConfetti();
            const timer = setTimeout(() => {
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'gameOver' },
                });
            }, 7000); // Match confetti duration
            return () => clearTimeout(timer);
        }
    }, [gameWon, viewingStats, dispatch, player]);

    if (!gameWon || viewingStats || !player || typeof player?.week === 'undefined' || typeof player?.cash === 'undefined') {
        console.log("WinNotification: Skipped rendering due to invalid state:", { gameWon, viewingStats, player });
        return null;
    }

    console.log("WinNotification: Rendering for player:", player);

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
        >
            <AlertDialog open={gameWon} onOpenChange={() => { }}>
                <AlertDialogContent className="bg-gradient-to-br from-gray-900 to-blue-900 border-4 border-green-400 rounded-xl shadow-2xl animate-pulse-glow max-w-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400 animate-pulse">
                            🎉 Congratulations! 🎉
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-2xl text-white font-semibold">
                            {player.name} has achieved all goals and won the game!
                            <br />
                            <span className="block mt-3 text-yellow-300">
                                Completed in {player.week} weeks
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                        <AlertDialogAction
                            onClick={handleViewStats}
                            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-3 px-8 rounded-lg text-xl font-bold shadow-lg transform hover:scale-105 transition-transform"
                        >
                            View Final Stats
                        </AlertDialogAction>
                        <AlertDialogAction
                            onClick={handlePlayAgain}
                            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-3 px-8 rounded-lg text-xl font-bold shadow-lg transform hover:scale-105 transition-transform"
                        >
                            Play Again
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.div>
    );
}