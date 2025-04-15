// import { useGame } from '@/app/context/GameContext';
// import { useState } from 'react';
// import { toast } from 'sonner';

// export default function RentalOffice() {
//     const { state, dispatch } = useGame();
//     const { player } = state;
//     const [showRentModal, setShowRentModal] = useState(false);

//     const handleAction = (action) => {
//         switch (action) {
//             case 'payRent':
//                 if (!player?.rental?.hasApartment) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You don't have an apartment to pay rent for." }
//                     });
//                     return;
//                 }

//                 if (player.cash < player.rental.rentAmount) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: `You don't have enough cash to pay the rent of $${player.rental.rentAmount}.` }
//                     });
//                     return;
//                 }

//                 dispatch({ type: 'PAY_RENT' });
//                 dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//                 toast.success("Rent payment successful!");
//                 break;

//             case 'rentApartment':
//                 if (player?.rental?.hasApartment) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You already have an apartment." }
//                     });
//                     return;
//                 }

//                 setShowRentModal(true);
//                 break;

//             case 'checkRentStatus':
//                 const weeksSinceLastPayment = player.rental.lastPaidWeek
//                     ? player.week - player.rental.lastPaidWeek
//                     : 0;

//                 if (!player.rental.hasApartment) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You don't have an apartment yet." }
//                     });
//                 } else if (player.rental.rentDue) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: `Your rent of $${player.rental.rentAmount} is due! You're ${weeksSinceLastPayment - 4} weeks late.` }
//                     });
//                 } else {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: `Your rent is $${player.rental.rentAmount} per month. Next payment due in ${4 - weeksSinceLastPayment} weeks.` }
//                     });
//                 }
//                 break;

//             default:
//                 break;
//         }
//     };

//     const rentApartment = (tier) => {
//         let rentAmount, deposit;

//         // Different apartment tiers
//         switch (tier) {
//             case 'basic':
//                 rentAmount = 50;
//                 deposit = 100;
//                 break;
//             case 'standard':
//                 rentAmount = 300;
//                 deposit = 500;
//                 break;
//             case 'luxury':
//                 rentAmount = 1000;
//                 deposit = 2000;
//                 break;
//             default:
//                 rentAmount = 50;
//                 deposit = 100;
//         }

//         if (player.cash < deposit) {
//             dispatch({
//                 type: 'SET_MESSAGE',
//                 payload: { text: `You need $${deposit} for the deposit.` }
//             });
//             return;
//         }

//         dispatch({
//             type: 'RENT_APARTMENT',
//             payload: { rentAmount, deposit }
//         });

//         dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
//         setShowRentModal(false);
//         toast.success("You've successfully rented an apartment!");
//     };

//     const goBackToMap = () => {
//         dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'map' } });
//     };

//     return (
//         <div className="rental-office mt-4">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Rental Office</h2>
//                 <button
//                     onClick={goBackToMap}
//                     className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
//                 >
//                     Back to Map
//                 </button>
//             </div>

//             <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-shrink-0">
//                     <img
//                         src="/rent.jpg"
//                         alt="Rental Office"
//                         className="w-full md:w-80 h-60 object-cover rounded-lg"
//                     />
//                     <p className="mt-2 text-gray-300 text-sm">
//                         Manage your living arrangements here. Rent is due every 4 weeks.
//                         Missing rent payments will decrease your happiness!
//                     </p>
//                 </div>

//                 <div className="flex-grow">
//                     <h3 className="text-lg font-semibold mb-3">Available Actions</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         <button
//                             onClick={() => handleAction('payRent')}
//                             className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
//                         >
//                             <span className="font-medium">Pay Rent</span>
//                             <span className="text-xs text-blue-200">
//                                 {player?.rental?.hasApartment
//                                     ? `Pay your monthly rent of $${player.rental.rentAmount}`
//                                     : "You don't have an apartment yet"}
//                             </span>
//                         </button>

//                         <button
//                             onClick={() => handleAction('rentApartment')}
//                             className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
//                         >
//                             <span className="font-medium">Rent Apartment</span>
//                             <span className="text-xs text-blue-200">
//                                 {player?.rental?.hasApartment
//                                     ? "You already have an apartment"
//                                     : "Get a place to live"}
//                             </span>
//                         </button>

//                         <button
//                             onClick={() => handleAction('checkRentStatus')}
//                             className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
//                         >
//                             <span className="font-medium">Check Rent Status</span>
//                             <span className="text-xs text-blue-200">
//                                 See when your next payment is due
//                             </span>
//                         </button>
//                     </div>

//                     {/* Current Rental Status Card */}
//                     {player?.rental?.hasApartment && (
//                         <div className="mt-4 bg-gray-800 p-4 rounded-lg border border-blue-500">
//                             <h4 className="text-lg font-semibold mb-2">Your Rental Status</h4>
//                             <div className="grid grid-cols-2 gap-2">
//                                 <div>
//                                     <p className="text-sm text-gray-400">Monthly Rent:</p>
//                                     <p className="font-medium">${player.rental.rentAmount}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-400">Last Paid:</p>
//                                     <p className="font-medium">Week {player.rental.lastPaidWeek}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-400">Status:</p>
//                                     <p className={`font-medium ${player.rental.rentDue ? 'text-red-500' : 'text-green-500'}`}>
//                                         {player.rental.rentDue ? 'OVERDUE' : 'Paid'}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-400">Next Due:</p>
//                                     <p className="font-medium">
//                                         Week {player.rental.lastPaidWeek + 4}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Apartment Rental Modal */}
//             {showRentModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//                     <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
//                         <h3 className="text-xl font-bold mb-4">Choose an Apartment</h3>
//                         <p className="text-sm text-gray-300 mb-4">
//                             Select an apartment tier. Higher tiers cost more but may provide happiness bonuses.
//                         </p>

//                         <div className="grid gap-4">
//                             <button
//                                 onClick={() => rentApartment('basic')}
//                                 className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex justify-between items-center"
//                             >
//                                 <div>
//                                     <div className="font-medium">Basic Apartment</div>
//                                     <div className="text-xs text-blue-200">$50/month, $100 deposit</div>
//                                 </div>
//                                 <div className="text-lg">🏠</div>
//                             </button>

//                             <button
//                                 onClick={() => rentApartment('standard')}
//                                 className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg flex justify-between items-center"
//                             >
//                                 <div>
//                                     <div className="font-medium">Standard Apartment</div>
//                                     <div className="text-xs text-purple-200">$100/month, $200 deposit</div>
//                                 </div>
//                                 <div className="text-lg">🏡</div>
//                             </button>

//                             <button
//                                 onClick={() => rentApartment('luxury')}
//                                 className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-lg flex justify-between items-center"
//                             >
//                                 <div>
//                                     <div className="font-medium">Luxury Apartment</div>
//                                     <div className="text-xs text-amber-200">$200/month, $400 deposit</div>
//                                 </div>
//                                 <div className="text-lg">🏘️</div>
//                             </button>
//                         </div>

//                         <button
//                             onClick={() => setShowRentModal(false)}
//                             className="mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded w-full"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


import { useGame } from '@/app/context/GameContext';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RentalOffice() {
    const { state, dispatch } = useGame();
    const { player } = state;
    const [showRentModal, setShowRentModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);



    const showMessage = (message) => {
        // Set message in game state
        dispatch({
            type: 'SET_MESSAGE',
            payload: { text: message }
        });
        // Show toast notification
        toast.success(message);
    };

    const handleAction = (action) => {
        switch (action) {
            case 'payRent':
                if (!player?.rental?.hasApartment) {
                    showMessage("You don't have an apartment to pay rent for.");
                    return;
                }

                if (player.cash < player.rental.rentAmount) {
                    showMessage(`You don't have enough cash to pay the rent of $${player.rental.rentAmount}.`);
                    return;
                }

                dispatch({ type: 'PAY_RENT' });
                dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
                showMessage("Rent payment successful!");
                break;

            case 'rentApartment':
                if (player?.rental?.hasApartment) {
                    // Instead of just showing a message, offer to upgrade
                    setShowUpgradeModal(true);
                    return;
                }

                setShowRentModal(true);
                break;

            case 'checkRentStatus':
                const weeksSinceLastPayment = player.rental.lastPaidWeek
                    ? player.week - player.rental.lastPaidWeek
                    : 0;

                if (!player.rental.hasApartment) {
                    showMessage("You don't have an apartment yet.");
                } else if (player.rental.rentDue) {
                    showMessage(`Your rent of $${player.rental.rentAmount} is due! You're ${weeksSinceLastPayment - 4} weeks late.`);
                } else {
                    showMessage(`Your rent is $${player.rental.rentAmount} per month. Next payment due in ${4 - weeksSinceLastPayment} weeks.`);
                }
                break;

            default:
                break;
        }
    };


    const rentApartment = (tier) => {
        let rentAmount, deposit;

        // Different apartment tiers
        switch (tier) {
            case 'basic':
                rentAmount = 50;
                deposit = 100;
                break;
            case 'standard':
                rentAmount = 100;
                deposit = 200;
                break;
            case 'luxury':
                rentAmount = 200;
                deposit = 400;
                break;
            default:
                rentAmount = 50;
                deposit = 100;
        }

        if (player.cash < deposit) {
            showMessage(`You need $${deposit} for the deposit.`);
            return;
        }

        dispatch({
            type: 'RENT_APARTMENT',
            payload: { rentAmount, deposit }
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
        setShowRentModal(false);
        showMessage("You've successfully rented an apartment!");
    };

    const upgradeApartment = (tier) => {
        let rentAmount, upgradeFee;

        // Get current tier
        const currentTier = getApartmentTier();

        // If trying to upgrade to the same tier or lower
        if ((currentTier === 'standard' && tier === 'basic') ||
            (currentTier === 'luxury' && (tier === 'basic' || tier === 'standard'))) {
            showMessage("You can't downgrade your apartment. Consider renting a new one instead.");
            setShowUpgradeModal(false);
            return;
        }

        // Different apartment tiers
        switch (tier) {
            case 'standard':
                rentAmount = 100;
                upgradeFee = 150; // Upgrade fee from basic to standard
                break;
            case 'luxury':
                rentAmount = 200;
                upgradeFee = currentTier === 'basic' ? 350 : 250; // Different fee based on current tier
                break;
            default:
                rentAmount = 50;
                upgradeFee = 0;
        }

        if (player.cash < upgradeFee) {
            showMessage(`You need $${upgradeFee} for the upgrade fee.`);
            return;
        }

        dispatch({
            type: 'UPGRADE_APARTMENT',
            payload: { rentAmount, upgradeFee }
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
        setShowUpgradeModal(false);
        showMessage(`You've successfully upgraded to a ${tier} apartment!`);
    };

    const getApartmentTier = () => {
        if (!player?.rental?.hasApartment) return "none";

        switch (player.rental.rentAmount) {
            case 50: return "basic";
            case 100: return "standard";
            case 200: return "luxury";
            default: return "basic";
        }
    };

    const goBackToMap = () => {
        dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'map' } });
    };

    return (
        <div className="rental-office mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Rental Office</h2>
                <button
                    onClick={goBackToMap}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                >
                    Back to Map
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                    <img
                        src="/rent.jpg"
                        alt="Rental Office"
                        className="w-full md:w-80 h-60 object-cover rounded-lg"
                    />
                    <p className="mt-2 text-gray-300 text-sm">
                        Manage your living arrangements here. Rent is due every 4 weeks.
                        Missing rent payments will decrease your happiness!
                    </p>
                </div>

                <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-3">Available Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            onClick={() => handleAction('payRent')}
                            className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
                        >
                            <span className="font-medium">Pay Rent</span>
                            <span className="text-xs text-blue-200">
                                {player?.rental?.hasApartment
                                    ? `Pay your monthly rent of $${player.rental.rentAmount}`
                                    : "You don't have an apartment yet"}
                            </span>
                        </button>

                        <button
                            onClick={() => handleAction('rentApartment')}
                            className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
                        >
                            <span className="font-medium">
                                {player?.rental?.hasApartment ? "Upgrade Apartment" : "Rent Apartment"}
                            </span>
                            <span className="text-xs text-blue-200">
                                {player?.rental?.hasApartment
                                    ? "Move to a better place"
                                    : "Get a place to live"}
                            </span>
                        </button>

                        <button
                            onClick={() => handleAction('checkRentStatus')}
                            className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
                        >
                            <span className="font-medium">Check Rent Status</span>
                            <span className="text-xs text-blue-200">
                                See when your next payment is due
                            </span>
                        </button>
                    </div>

                    {/* Current Rental Status Card */}
                    {player?.rental?.hasApartment && (
                        <div className="mt-4 bg-gray-800 p-4 rounded-lg border border-blue-500">
                            <h4 className="text-lg font-semibold mb-2">Your Rental Status</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-sm text-gray-400">Monthly Rent:</p>
                                    <p className="font-medium">${player.rental.rentAmount}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Apartment Type:</p>
                                    <p className="font-medium capitalize">{getApartmentTier()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Last Paid:</p>
                                    <p className="font-medium">Week {player.rental.lastPaidWeek}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Status:</p>
                                    <p className={`font-medium ${player.rental.rentDue ? 'text-red-500' : 'text-green-500'}`}>
                                        {player.rental.rentDue ? 'OVERDUE' : 'Paid'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Next Due:</p>
                                    <p className="font-medium">
                                        Week {player.rental.lastPaidWeek + 4}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Apartment Rental Modal */}
            {showRentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Choose an Apartment</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Select an apartment tier. Higher tiers cost more but may provide happiness bonuses.
                        </p>
                        <div className="grid gap-4">
                            <button
                                onClick={() => rentApartment('basic')}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <div className="font-medium">Basic Apartment</div>
                                    <div className="text-xs text-blue-200">$50/month, $100 deposit</div>
                                </div>
                                <div className="text-lg">🏠</div>
                            </button>

                            <button
                                onClick={() => rentApartment('standard')}
                                className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <div className="font-medium">Standard Apartment</div>
                                    <div className="text-xs text-purple-200">$100/month, $200 deposit</div>
                                </div>
                                <div className="text-lg">🏡</div>
                            </button>

                            <button
                                onClick={() => rentApartment('luxury')}
                                className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <div className="font-medium">Luxury Apartment</div>
                                    <div className="text-xs text-amber-200">$200/month, $400 deposit</div>
                                </div>
                                <div className="text-lg">🏘️</div>
                            </button>
                        </div>

                        <button
                            onClick={() => setShowRentModal(false)}
                            className="mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Apartment Upgrade Modal */}
            {showUpgradeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Upgrade Your Apartment</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Your current apartment: <span className="font-bold capitalize">{getApartmentTier()}</span>.
                            You can upgrade to a better place for additional amenities and happiness bonuses.
                        </p>

                        <div className="grid gap-4">
                            {getApartmentTier() === "basic" && (
                                <>
                                    <button
                                        onClick={() => upgradeApartment('standard')}
                                        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg flex justify-between items-center"
                                    >
                                        <div>
                                            <div className="font-medium">Standard Apartment</div>
                                            <div className="text-xs text-purple-200">$100/month, $150 upgrade fee</div>
                                            <div className="text-xs text-purple-200">Includes TV for entertainment</div>
                                        </div>
                                        <div className="text-lg">🏡</div>
                                    </button>

                                    <button
                                        onClick={() => upgradeApartment('luxury')}
                                        className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-lg flex justify-between items-center"
                                    >
                                        <div>
                                            <div className="font-medium">Luxury Apartment</div>
                                            <div className="text-xs text-amber-200">$200/month, $350 upgrade fee</div>
                                            <div className="text-xs text-amber-200">Includes TV, Gaming Console, and Meditation Space</div>
                                        </div>
                                        <div className="text-lg">🏘️</div>
                                    </button>
                                </>
                            )}

                            {getApartmentTier() === "standard" && (
                                <button
                                    onClick={() => upgradeApartment('luxury')}
                                    className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-lg flex justify-between items-center"
                                >
                                    <div>
                                        <div className="font-medium">Luxury Apartment</div>
                                        <div className="text-xs text-amber-200">$200/month, $250 upgrade fee</div>
                                        <div className="text-xs text-amber-200">Includes TV, Gaming Console, and Meditation Space</div>
                                    </div>
                                    <div className="text-lg">🏘️</div>
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => setShowUpgradeModal(false)}
                            className="mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}