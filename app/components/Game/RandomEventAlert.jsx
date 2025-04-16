// components/Game/RandomEventAlert.jsx
"use client";

import { useGame } from '@/app/context/GameContext';
import { useState, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { motion } from 'framer-motion';

export default function RandomEventAlert() {
    const { state, dispatch } = useGame();
    const [open, setOpen] = useState(false);

    // Watch for random events and open the dialog when one occurs
    useEffect(() => {
        if (state.showRandomEvent && state.lastRandomEvent) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [state.showRandomEvent, state.lastRandomEvent]);

    // Handle closing the dialog
    const handleClose = () => {
        setOpen(false);
        dispatch({ type: 'DISMISS_RANDOM_EVENT' });
    };

    // If there's no event to show, don't render anything
    if (!state.lastRandomEvent) {
        return null;
    }

    const event = state.lastRandomEvent;

    // Generate effect description text
    const effectsDescription = Object.entries(event.effects)
        .map(([stat, change]) => {
            const sign = change > 0 ? '+' : '';
            switch (stat) {
                case 'cash':
                    return `${sign}$${change} cash`;
                case 'happiness':
                    return `${sign}${change} happiness`;
                case 'energy':
                    return `${sign}${change} energy`;
                case 'education':
                    return `${sign}${change} education`;
                case 'experience':
                    return `${sign}${change} experience`;
                default:
                    return `${sign}${change} ${stat}`;
            }
        })
        .join(', ');

    // Choose an icon based on the event category
    let icon = '📅'; // Default
    if (event.category) {
        switch (event.category) {
            case 'financial_positive':
                icon = '💰';
                break;
            case 'financial_negative':
                icon = '💸';
                break;
            case 'health':
                icon = '🏥';
                break;
            case 'happiness':
                icon = '😄';
                break;
            case 'mixed':
                icon = '🔄';
                break;
            case 'neutral':
                icon = '📊';
                break;
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="bg-indigo-900 border-2 border-purple-500 text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center text-2xl">
                        <span className="mr-2 text-3xl">{icon}</span>
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {event.title}
                        </motion.span>
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild className="text-lg text-blue-200">
                        <div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="mb-4"
                            >
                                {event.description}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="font-bold text-yellow-300"
                            >
                                Effects: {effectsDescription}
                            </motion.div>
                        </div>
                    </AlertDialogDescription>

                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={handleClose}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}