

// import { useGame } from '@/app/context/GameContext';
// import { useState } from 'react';
// import { toast } from 'sonner';

// export default function RentalOffice() {
//     const { state, dispatch } = useGame();
//     const { player } = state;

//     const [showRentModal, setShowRentModal] = useState(false);
//     const [showUpgradeModal, setShowUpgradeModal] = useState(false);

//     const showMessage = (message) => {
//         dispatch({
//             type: 'SET_MESSAGE',
//             payload: { text: message }
//         });
//         toast.success(message);
//     };

//     const handleAction = (action) => {
//         switch (action) {
//             case 'payRent':
//                 if (!player?.rental?.hasApartment) {
//                     showMessage("You don't have an apartment to pay rent for.");
//                     return;
//                 }

//                 const weeksSinceLastPayment = player.rental.lastPaidWeek ? player.week - player.rental.lastPaidWeek : 0;
//                 if (!player.rental.rentDue && weeksSinceLastPayment < 4) {
//                     showMessage("You've already paid your rent for this month!");
//                     return;
//                 }

//                 if (player.cash < player.rental.rentAmount) {
//                     showMessage(`You don't have enough cash to pay the rent of $${player.rental.rentAmount}.`);
//                     return;
//                 }

//                 dispatch({ type: 'PAY_RENT' });
//                 dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//                 showMessage("Rent payment successful!");
//                 break;

//             case 'rentApartment':
//                 if (player?.rental?.hasApartment) {
//                     setShowUpgradeModal(true);
//                     return;
//                 }
//                 setShowRentModal(true);
//                 break;
//             case 'checkRentStatus':
//                 const weeksSincePayment = player.rental.lastPaidWeek
//                     ? player.week - player.rental.lastPaidWeek
//                     : 0;

//                 if (!player.rental.hasApartment) {
//                     showMessage("You don't have an apartment yet.");
//                 } else if (player.rental.rentDue) {
//                     showMessage(`Your rent of $${player.rental.rentAmount} is due! You're ${weeksSincePayment - 4} weeks late.`);
//                 } else {
//                     showMessage(`Your rent is $${player.rental.rentAmount} per month. Next payment due in ${4 - weeksSincePayment} weeks.`);
//                 }
//                 break;

//             default:
//                 break;
//         }
//     };

//     const rentApartment = (tier) => {
//         let rentAmount, deposit;
//         switch (tier) {
//             case 'basic':
//                 rentAmount = 50;
//                 deposit = 100;
//                 break;
//             case 'standard':
//                 rentAmount = 100;
//                 deposit = 200;
//                 break;
//             case 'luxury':
//                 rentAmount = 200;
//                 deposit = 400;
//                 break;
//             default:
//                 rentAmount = 50;
//                 deposit = 100;
//         }
//         if (player.cash < deposit) {
//             showMessage(`You need $${deposit} for the deposit.`);
//             return;
//         }
//         dispatch({
//             type: 'RENT_APARTMENT',
//             payload: { rentAmount, deposit }
//         });
//         dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
//         setShowRentModal(false);
//         showMessage("You've successfully rented an apartment!");
//     };

//     const upgradeApartment = (tier) => {
//         let rentAmount, upgradeFee;
//         const currentTier = getApartmentTier();
//         if ((currentTier === 'standard' && tier === 'basic') ||
//             (currentTier === 'luxury' && (tier === 'basic' || tier === 'standard'))) {
//             showMessage("You can't downgrade your apartment. Consider renting a new one instead.");
//             setShowUpgradeModal(false);
//             return;
//         }
//         switch (tier) {
//             case 'standard':
//                 rentAmount = 100;
//                 upgradeFee = 150;
//                 break;
//             case 'luxury':
//                 rentAmount = 200;
//                 upgradeFee = currentTier === 'basic' ? 350 : 250;
//                 break;
//             default:
//                 rentAmount = 50;
//                 upgradeFee = 0;
//         }
//         if (player.cash < upgradeFee) {
//             showMessage(`You need $${upgradeFee} for the upgrade fee.`);
//             return;
//         }
//         dispatch({
//             type: 'UPGRADE_APARTMENT',
//             payload: { rentAmount, upgradeFee }
//         });
//         dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
//         setShowUpgradeModal(false);
//         showMessage(`You've successfully upgraded to a ${tier} apartment!`);
//     };

//     const getApartmentTier = () => {
//         if (!player?.rental?.hasApartment) return "none";
//         switch (player.rental.rentAmount) {
//             case 50: return "basic";
//             case 100: return "standard";
//             case 200: return "luxury";
//             default: return "basic";
//         }
//     };

//     const goBackToMap = () => {
//         dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'map' } });
//     };

//     return (
//         <div className="rental-office relative mt-4 overflow-hidden">
//             {/* Top section with video background */}
//             <div className="relative">
//                 <div className="absolute top-0 left-0 w-full h-full bg-gray-900 z-0">
//                     <video
//                         autoPlay
//                         loop
//                         muted
//                         playsInline
//                         className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-100"
//                     >
//                         <source src="/videos/rentals.mp4" type="video/mp4" />
//                         Your browser does not support the video tag.
//                     </video>
//                 </div>
//                 {/* Content for top section */}
//                 <div className="relative z-10 p-4">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-bold">Rental Office</h2>
//                         <button
//                             onClick={goBackToMap}
//                             className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
//                         >
//                             Back to Map
//                         </button>
//                     </div>
//                     <div className="mb-6 flex flex-col items-center">
//                         <div className="flex justify-center mb-6 mt-4">
//                             <img
//                                 src="https://img.freepik.com/free-photo/view-pretty-woman-black-short-dress-sitting-table-terrace-cafeteria-she-is-looking-camera_197531-1094.jpg?uid=R194451028&ga=GA1.1.1480099583.1741975489&semt=ais_hybrid&w=740"
//                                 alt="Rental Office"
//                                 className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-blue-500 shadow-xl object-cover"
//                                 onError={(e) => {
//                                     e.target.onerror = null;
//                                     e.target.src = "https://img.freepik.com/free-photo/business-people-shaking-hands-finishing-meeting_53876-102637.jpg";
//                                 }}
//                             />
//                         </div>
//                         <div className="mt-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
//                             <p className="text-sm italic text-white">
//                                 "Welcome to the Rental Office. Manage your living arrangements here. Rent is due every 4 weeks!"
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* Rest of the content without video background */}
//             <div className="p-4">
//                 <div className="flex flex-col gap-4 max-w-5xl mx-auto">
//                     <div className="flex flex-col md:flex-row gap-4">
//                         <div className="flex-shrink-0 w-full md:w-80">
//                             <img
//                                 src="/rent.jpg"
//                                 alt="Rental Office"
//                                 className="w-full h-60 object-cover rounded-lg"
//                             />
//                             <p className="mt-2 text-gray-300 text-sm">
//                                 Manage your living arrangements here. Rent is due every 4 weeks.
//                                 Missing rent payments will decrease your happiness!
//                             </p>
//                         </div>
//                         <div className="flex-grow">
//                             <h3 className="text-lg font-semibold mb-3">Available Actions</h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                 <button
//                                     onClick={() => handleAction('payRent')}
//                                     className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
//                                 >
//                                     <span className="font-medium">Pay Rent</span>
//                                     <span className="text-xs text-blue-200">
//                                         {player?.rental?.hasApartment
//                                             ? `Pay your monthly rent of $${player.rental.rentAmount}`
//                                             : "You don't have an apartment yet"}
//                                     </span>
//                                 </button>
//                                 <button
//                                     onClick={() => handleAction('rentApartment')}
//                                     className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
//                                 >
//                                     <span className="font-medium">
//                                         {player?.rental?.hasApartment ? "Upgrade Apartment" : "Rent Apartment"}
//                                     </span>
//                                     <span className="text-xs text-blue-200">
//                                         {player?.rental?.hasApartment
//                                             ? "Move to a better place"
//                                             : "Get a place to live"}
//                                     </span>
//                                 </button>
//                                 <button
//                                     onClick={() => handleAction('checkRentStatus')}
//                                     className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
//                                 >
//                                     <span className="font-medium">Check Rent Status</span>
//                                     <span className="text-xs text-blue-200">
//                                         See when your next payment is due
//                                     </span>
//                                 </button>
//                             </div>
//                             {player?.rental?.hasApartment && (
//                                 <div className="mt-4 bg-gray-800 p-4 rounded-lg border border-blue-500">
//                                     <h4 className="text-lg font-semibold mb-2">Your Rental Status</h4>
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                                         <div>
//                                             <p className="text-sm text-gray-400">Monthly Rent:</p>
//                                             <p className="font-medium">${player.rental.rentAmount}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-gray-400">Apartment Type:</p>
//                                             <p className="font-medium capitalize">{getApartmentTier()}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-gray-400">Last Paid:</p>
//                                             <p className="font-medium">Week {player.rental.lastPaidWeek}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-gray-400">Status:</p>
//                                             <p className={`font-medium ${player.rental.rentDue ? 'text-red-500' : 'text-green-500'}`}>
//                                                 {player.rental.rentDue ? 'OVERDUE' : 'Paid'}
//                                             </p>
//                                         </div>
//                                         <div>
//                                             <p className="text-sm text-gray-400">Next Due:</p>
//                                             <p className="font-medium">
//                                                 Week {player.rental.lastPaidWeek + 4}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
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
//             {/* Apartment Upgrade Modal */}
//             {showUpgradeModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
//                     <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
//                         <h3 className="text-xl font-bold mb-4">Upgrade Your Apartment</h3>
//                         <p className="text-sm text-gray-300 mb-4">
//                             Your current apartment: <span className="font-bold capitalize">{getApartmentTier()}</span>.
//                             You can upgrade to a better place for additional amenities and happiness bonuses.
//                         </p>
//                         <div className="grid gap-4">
//                             {getApartmentTier() === "basic" && (
//                                 <>
//                                     <button
//                                         onClick={() => upgradeApartment('standard')}
//                                         className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg flex justify-between items-center"
//                                     >
//                                         <div>
//                                             <div className="font-medium">Standard Apartment</div>
//                                             <div className="text-xs text-purple-200">$100/month, $150 upgrade fee</div>
//                                             <div className="text-xs text-purple-200">Includes TV for entertainment</div>
//                                         </div>
//                                         <div className="text-lg">🏡</div>
//                                     </button>
//                                     <button
//                                         onClick={() => upgradeApartment('luxury')}
//                                         className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-lg flex justify-between items-center"
//                                     >
//                                         <div>
//                                             <div className="font-medium">Luxury Apartment</div>
//                                             <div className="text-xs text-amber-200">$200/month, $350 upgrade fee</div>
//                                             <div className="text-xs text-amber-200">Includes TV, Gaming Console, and Meditation Space</div>
//                                         </div>
//                                         <div className="text-lg">🏘️</div>
//                                     </button>
//                                 </>
//                             )}
//                             {getApartmentTier() === "standard" && (
//                                 <button
//                                     onClick={() => upgradeApartment('luxury')}
//                                     className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-lg flex justify-between items-center"
//                                 >
//                                     <div>
//                                         <div className="font-medium">Luxury Apartment</div>
//                                         <div className="text-xs text-amber-200">$200/month, $250 upgrade fee</div>
//                                         <div className="text-xs text-amber-200">Includes TV, Gaming Console, and Meditation Space</div>
//                                     </div>
//                                     <div className="text-lg">🏘️</div>
//                                 </button>
//                             )}
//                         </div>
//                         <button
//                             onClick={() => setShowUpgradeModal(false)}
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
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
    initAudio,
    loadClickSound,
    playClickSound,
} from '@/data/audioManager';

export default function RentalOffice() {
    const { state, dispatch } = useGame();
    const { player } = state;
    const [showRentModal, setShowRentModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    // Wrapper function to play click sound before executing the handler
    const withSound = (handler) => (event) => {
        playClickSound();
        if (handler) {
            handler(event);
        }
    };

    useEffect(() => {
        initAudio();
        loadClickSound('/sounds/click.mp3').then((success) => {
            if (!success) {
                console.warn("Failed to load click sound");
            }
        });
    }, []);

    const showMessage = (message) => {
        dispatch({
            type: 'SET_MESSAGE',
            payload: { text: message },
        });
        toast.success(message);
    };

    const handleAction = (action) => {
        switch (action) {
            case 'payRent':
                if (!player?.rental?.hasApartment) {
                    showMessage("You don't have an apartment to pay rent for.");
                    return;
                }
                const weeksSinceLastPayment = player.rental.lastPaidWeek ? player.week - player.rental.lastPaidWeek : 0;
                if (!player.rental.rentDue && weeksSinceLastPayment < 4) {
                    showMessage("You've already paid your rent for this month!");
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
                    setShowUpgradeModal(true);
                    return;
                }
                setShowRentModal(true);
                break;
            case 'checkRentStatus':
                const weeksSincePayment = player.rental.lastPaidWeek ? player.week - player.rental.lastPaidWeek : 0;
                if (!player.rental.hasApartment) {
                    showMessage("You don't have an apartment yet.");
                } else if (player.rental.rentDue) {
                    showMessage(`Your rent of $${player.rental.rentAmount} is due! You're ${weeksSincePayment - 4} weeks late.`);
                } else {
                    showMessage(`Your rent is $${player.rental.rentAmount} per month. Next payment due in ${4 - weeksSincePayment} weeks.`);
                }
                break;
            default:
                break;
        }
    };

    const rentApartment = (tier) => {
        let rentAmount, deposit;
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
            payload: { rentAmount, deposit },
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
        setShowRentModal(false);
        showMessage("You've successfully rented an apartment!");
    };

    const upgradeApartment = (tier) => {
        let rentAmount, upgradeFee;
        const currentTier = getApartmentTier();
        if (
            (currentTier === 'standard' && tier === 'basic') ||
            (currentTier === 'luxury' && (tier === 'basic' || tier === 'standard'))
        ) {
            showMessage("You can't downgrade your apartment. Consider renting a new one instead.");
            setShowUpgradeModal(false);
            return;
        }
        switch (tier) {
            case 'standard':
                rentAmount = 100;
                upgradeFee = 150;
                break;
            case 'luxury':
                rentAmount = 200;
                upgradeFee = currentTier === 'basic' ? 350 : 250;
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
            payload: { rentAmount, upgradeFee },
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
        setShowUpgradeModal(false);
        showMessage(`You've successfully upgraded to a ${tier} apartment!`);
    };

    const getApartmentTier = () => {
        if (!player?.rental?.hasApartment) return "none";
        switch (player.rental.rentAmount) {
            case 50:
                return "basic";
            case 100:
                return "standard";
            case 200:
                return "luxury";
            default:
                return "basic";
        }
    };

    const goBackToMap = () => {
        dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'map' } });
    };

    return (
        <div className="rental-office relative mt-4 overflow-hidden">
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-100"
                    >
                        <source src="/videos/rentals.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="relative z-10 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Rental Office</h2>
                        <button
                            onClick={withSound(goBackToMap)}
                            className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                        >
                            Back to Map
                        </button>
                    </div>
                    <div className="mb-6 flex flex-col items-center">
                        <div className="flex justify-center mb-6 mt-4">
                            <img
                                src="https://img.freepik.com/free-photo/view-pretty-woman-black-short-dress-sitting-table-terrace-cafeteria-she-is-looking-camera_197531-1094.jpg?uid=R194451028&ga=GA1.1.1480099583.1741975489&semt=ais_hybrid&w=740"
                                alt="Rental Office"
                                className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-blue-500 shadow-xl object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://img.freepik.com/free-photo/business-people-shaking-hands-finishing-meeting_53876-102637.jpg";
                                }}
                            />
                        </div>
                        <div className="mt-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
                            <p className="text-sm italic text-white">
                                "Welcome to the Rental Office. Manage your living arrangements here. Rent is due every 4 weeks!"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="flex flex-col gap-4 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-shrink-0 w-full md:w-80">
                            <img
                                src="/rent.jpg"
                                alt="Rental Office"
                                className="w-full h-60 object-cover rounded-lg"
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
                                    onClick={withSound(() => handleAction('payRent'))}
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
                                    onClick={withSound(() => handleAction('rentApartment'))}
                                    className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
                                >
                                    <span className="font-medium">
                                        {player?.rental?.hasApartment ? "Upgrade Apartment" : "Rent Apartment"}
                                    </span>
                                    <span className="text-xs text-blue-200">
                                        {player?.rental?.hasApartment ? "Move to a better place" : "Get a place to live"}
                                    </span>
                                </button>
                                <button
                                    onClick={withSound(() => handleAction('checkRentStatus'))}
                                    className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
                                >
                                    <span className="font-medium">Check Rent Status</span>
                                    <span className="text-xs text-blue-200">
                                        See when your next payment is due
                                    </span>
                                </button>
                            </div>
                            {player?.rental?.hasApartment && (
                                <div className="mt-4 bg-gray-800 p-4 rounded-lg border border-blue-500">
                                    <h4 className="text-lg font-semibold mb-2">Your Rental Status</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                </div>
            </div>
            {showRentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Choose an Apartment</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Select an apartment tier. Higher tiers cost more but may provide happiness bonuses.
                        </p>
                        <div className="grid gap-4">
                            <button
                                onClick={withSound(() => rentApartment('basic'))}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <div className="font-medium">Basic Apartment</div>
                                    <div className="text-xs text-blue-200">$50/month, $100 deposit</div>
                                </div>
                                <div className="text-lg">🏠</div>
                            </button>
                            <button
                                onClick={withSound(() => rentApartment('standard'))}
                                className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <div className="font-medium">Standard Apartment</div>
                                    <div className="text-xs text-purple-200">$100/month, $200 deposit</div>
                                </div>
                                <div className="text-lg">🏡</div>
                            </button>
                            <button
                                onClick={withSound(() => rentApartment('luxury'))}
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
                            onClick={withSound(() => setShowRentModal(false))}
                            className="mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
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
                                        onClick={withSound(() => upgradeApartment('standard'))}
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
                                        onClick={withSound(() => upgradeApartment('luxury'))}
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
                                    onClick={withSound(() => upgradeApartment('luxury'))}
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
                            onClick={withSound(() => setShowUpgradeModal(false))}
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