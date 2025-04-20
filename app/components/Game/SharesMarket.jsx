

import { useGame } from '@/app/context/GameContext';
import { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Add this import for toast notifications
import { initAudio, loadBankMusic, loadClickSound, playBankMusic, playClickSound, stopBankMusic } from '@/data/audioManager';

export default function SharesMarket() {
    const { state, dispatch } = useGame();
    const { player } = state;
    const [shares, setShares] = useState([
        { id: 1, name: "TechCorp", price: 25, owned: 0, change: 0 },
        { id: 2, name: "GreenEnergy", price: 15, owned: 0, change: 0 },
        { id: 3, name: "MegaRetail", price: 40, owned: 0, change: 0 },
        { id: 4, name: "HealthPlus", price: 30, owned: 0, change: 0 },
        { id: 5, name: "DataSec", price: 20, owned: 0, change: 0 }
    ]);
    const [shareAmount, setShareAmount] = useState(1);
    const [selectedShare, setSelectedShare] = useState(null);

    const withSound = (h) => (e) => {
        playClickSound();
        if (h) {
            h(e)
        }
    }

    // Load player's shares from state if they exist
    useEffect(() => {
        if (player.shares && player.shares.length > 0) {
            // Create a new array that merges the default share data with player's ownership data
            const updatedShares = shares.map(share => {
                const playerShare = player.shares.find(s => s.id === share.id);
                return playerShare ? {
                    ...share,
                    owned: playerShare.owned,
                    price: playerShare.price || share.price // Use the player's saved price if available
                } : share;
            });

            setShares(updatedShares);
        }
    }, [player.shares]);

    // Simulate market fluctuations when week changes
    useEffect(() => {
        // This effect will run every time the week changes
        if (player.week > 1) {
            updateSharePrices();
        }
    }, [player.week]);


    useEffect(() => {
        // Initialize audio and load bank music
        initAudio();

        // add the click sound
        loadClickSound('/sounds/click.mp3').then((success) => {
            if (!success) {
                console.warn("Failed to load click sound")
            }
        })

        loadBankMusic('/sounds/bankmusic.mp3').then(() => {
            playBankMusic();
        });

        // Clean up function to stop music when leaving the component
        return () => {
            stopBankMusic();
        };
    }, []); // Empty dependency array means this runs once when component mounts

    // Helper function to handle both message and toast, similar to FastFood component
    const showMessage = (message, type = 'success') => {
        // Set message in game state
        dispatch({
            type: 'SET_MESSAGE',
            payload: { text: message }
        });

        // Show toast notification based on the type
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        } else {
            toast(message);
        }
    };

    const updateSharePrices = () => {
        const updatedShares = shares.map(share => {
            // Random price change between -15% and +20%
            const changePercent = Math.random() * 35 - 15;
            const priceChange = Math.round((share.price * changePercent / 100) * 100) / 100;
            const newPrice = Math.max(5, Math.round((share.price + priceChange) * 100) / 100);

            return {
                ...share,
                price: newPrice,
                change: changePercent
            };
        });

        setShares(updatedShares);

        // Update player's shares in game state
        if (player.shares) {
            dispatch({
                type: 'UPDATE_SHARES',
                payload: { shares: updatedShares }
            });
        }

        // Show toast notification for market update
        showMessage("Stock market prices have been updated!");
    };

    const buyShares = () => {
        if (!selectedShare) return;

        const share = shares.find(s => s.id === selectedShare);
        const totalCost = share.price * shareAmount;

        if (player.cash >= totalCost) {
            const updatedShares = shares.map(s => {
                if (s.id === selectedShare) {
                    return { ...s, owned: s.owned + shareAmount };
                }
                return s;
            });

            setShares(updatedShares);

            dispatch({
                type: 'BUY_SHARES',
                payload: {
                    shareId: selectedShare,
                    amount: shareAmount,
                    cost: totalCost,
                    shares: updatedShares
                }
            });

            dispatch({ type: 'USE_TIME', payload: { amount: 5 } });

            // Use the showMessage function for success
            showMessage(`You bought ${shareAmount} shares of ${share.name} for $${totalCost.toFixed(2)}`);
        } else {
            // Use the showMessage function for error
            showMessage("You don't have enough cash to buy these shares.", "error");
        }
    };

    const sellShares = () => {
        if (!selectedShare) return;

        const share = shares.find(s => s.id === selectedShare);

        if (share.owned >= shareAmount) {
            const totalValue = share.price * shareAmount;

            const updatedShares = shares.map(s => {
                if (s.id === selectedShare) {
                    return { ...s, owned: s.owned - shareAmount };
                }
                return s;
            });

            setShares(updatedShares);

            dispatch({
                type: 'SELL_SHARES',
                payload: {
                    shareId: selectedShare,
                    amount: shareAmount,
                    value: totalValue,
                    shares: updatedShares
                }
            });

            dispatch({ type: 'USE_TIME', payload: { amount: 5 } });

            // Use the showMessage function for success
            showMessage(`You sold ${shareAmount} shares of ${share.name} for $${totalValue.toFixed(2)}`);
        } else {
            // Use the showMessage function for error
            showMessage("You don't own enough shares to sell.", "error");
        }
    };

    const goBackToBank = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'bank' }
        });
    };

    return (
        <div className="shares-market relative mt-4 overflow-hidden">
            <div className="bg-gradient-to-b from-blue-900 to-black p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Shares Market</h2>
                    <button
                        onClick={withSound(goBackToBank)}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back to Bank
                    </button>
                </div>

                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Your Portfolio</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Cash:</span>
                            <span className="ml-2 text-green-400">${player.cash.toFixed(2)}</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Portfolio Value:</span>
                            <span className="ml-2 text-green-400">
                                ${shares.reduce((total, share) => total + (share.price * share.owned), 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Stock Market</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-900 rounded">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 text-left">Company</th>
                                    <th className="py-2 px-4 text-right">Price</th>
                                    <th className="py-2 px-4 text-right">Change</th>
                                    <th className="py-2 px-4 text-right">Owned</th>
                                    <th className="py-2 px-4 text-right">Value</th>
                                    <th className="py-2 px-4 text-center">Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shares.map(share => (
                                    <tr
                                        key={share.id}
                                        className={`border-t border-gray-800 ${share.owned > 0
                                            ? 'bg-gradient-to-r from-indigo-900 to-indigo-800'
                                            : ''
                                            }`}
                                    >
                                        <td className="py-2 px-4">{share.name}</td>
                                        <td className="py-2 px-4 text-right">${share.price.toFixed(2)}</td>
                                        <td className={`py-2 px-4 text-right ${share.change > 0
                                            ? 'text-green-500'
                                            : share.change < 0
                                                ? 'text-red-500'
                                                : 'text-gray-400'
                                            }`}>
                                            {share.change > 0 ? `+${share.change.toFixed(1)}%` : `${share.change.toFixed(1)}%`}
                                        </td>
                                        <td className="py-2 px-4 text-right">{share.owned}</td>
                                        <td className="py-2 px-4 text-right">${(share.owned * share.price).toFixed(2)}</td>
                                        <td className="py-2 px-4 text-center">
                                            <button
                                                onClick={withSound(() => setSelectedShare(share.id))}
                                                className={`w-6 h-6 rounded-full ${selectedShare === share.id
                                                    ? 'bg-blue-500'
                                                    : 'bg-gray-700'
                                                    }`}
                                            ></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Trade Shares</h3>
                    <div className="flex items-center mb-3">
                        <span className="mr-2">Amount:</span>
                        <input
                            type="number"
                            min="1"
                            value={shareAmount}
                            onChange={(e) => setShareAmount(Math.max(1, parseInt(e.target.value) || 1))}
                            className="bg-gray-700 text-white px-2 py-1 rounded w-24"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={withSound(buyShares)}
                            disabled={!selectedShare}
                            className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded disabled:bg-gray-600"
                        >
                            Buy Shares
                        </button>
                        <button
                            onClick={withSound(sellShares)}
                            disabled={!selectedShare || (selectedShare && shares.find(s => s.id === selectedShare)?.owned < shareAmount)}
                            className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded disabled:bg-gray-600"
                        >
                            Sell Shares
                        </button>
                    </div>
                </div>

                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Stock Market Tips</h3>
                    <p className="text-gray-400 text-sm">
                        • Stock prices change every week.<br />
                        • Buy low and sell high to make a profit.<br />
                        • Diversify your portfolio to manage risk.<br />
                        • Stock prices can fluctuate between -15% and +20% each week.
                    </p>
                </div>
            </div>
        </div>
    );
}

