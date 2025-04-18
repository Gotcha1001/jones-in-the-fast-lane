


// import { useGame } from '@/app/context/GameContext';
// import { initAudio, loadBankMusic, playBankMusic, stopBankMusic } from '@/data/audioManager';
// import { useState, useEffect } from 'react';

// export default function Bank() {
//     const { state, dispatch } = useGame();
//     const { player } = state;
//     const [amount, setAmount] = useState(50);



//     // Add useEffect to handle bank music
//     useEffect(() => {
//         // Initialize audio and load bank music
//         initAudio();
//         loadBankMusic('/sounds/bankmusic.mp3').then(() => {
//             playBankMusic();
//         });

//         // Clean up function to stop music when leaving the component
//         return () => {
//             stopBankMusic();
//         };
//     }, []); // Empty dependency array means this runs once when component mounts

//     // Create a visual representation of savings with stacks of coins
//     const getSavingsVisual = (savings) => {
//         // Calculate how many stacks to show (max 10)
//         const stacks = Math.min(Math.ceil(savings / 100), 10);
//         return Array(stacks).fill(0).map((_, index) => (
//             <div key={index} className="relative">
//                 <div className={`w-8 h-${Math.min(2 + Math.floor(savings / 200), 8)} bg-yellow-400 rounded-full border border-yellow-600 shadow-lg`}></div>
//                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-yellow-800">$</div>
//             </div>
//         ));
//     };

//     const handleDeposit = () => {
//         if (player.cash >= amount) {
//             dispatch({
//                 type: 'DEPOSIT_MONEY',
//                 payload: { amount }
//             });
//             dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//         } else {
//             dispatch({
//                 type: 'SET_MESSAGE',
//                 payload: { text: "You don't have enough cash to deposit that amount." }
//             });
//         }
//     };

//     const handleWithdraw = () => {
//         if (player.bankAccount.savings >= amount) {
//             dispatch({
//                 type: 'WITHDRAW_MONEY',
//                 payload: { amount }
//             });
//             dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//         } else {
//             dispatch({
//                 type: 'SET_MESSAGE',
//                 payload: { text: "You don't have enough savings to withdraw that amount." }
//             });
//         }
//     };

//     const calculateInterest = () => {
//         dispatch({
//             type: 'CALCULATE_INTEREST',
//             payload: { date: new Date() }
//         });
//         dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//     };

//     const goBackToLocation = () => {
//         dispatch({
//             type: 'CHANGE_SCREEN',
//             payload: { screen: 'location' }
//         });
//     };

//     return (
//         <div className="bank-interface relative mt-4 overflow-hidden">
//             {/* Video Background */}
//             <video
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
//             >
//                 <source src="/videos/bank.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video>

//             {/* Bank content */}
//             <div className="relative z-10 p-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold">Python Bank</h2>
//                     <button
//                         onClick={goBackToLocation}
//                         className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
//                     >
//                         Back
//                     </button>
//                 </div>

//                 {/* Bank Teller Image */}
//                 <div className="flex mb-4">
//                     <div className="flex-shrink-0 mr-4">
//                         <img
//                             src="/banklady.jpg"
//                             alt="Bank Teller"
//                             className="w-32 h-32 rounded-full border-2 border-yellow-500 shadow-lg"
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = "https://img.freepik.com/free-photo/portrait-young-businesswoman-with-crossed-arms_23-2148168745.jpg";
//                             }}
//                         />
//                     </div>
//                     <div className="bg-gradient-to-r from-teal-500 via-purple-900 to-black p-3 rounded-lg shadow-md">
//                         <p className="text-sm italic text-gray-300">
//                             "Welcome to Python National Bank! How can I help you today? Remember, saving is the first step toward your financial goals."
//                         </p>
//                     </div>
//                 </div>

//                 {/* Account Information */}
//                 <div className="bg-gray-800 p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Account Information</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="p-2 bg-gray-700 rounded">
//                             <span className="text-gray-400">Cash:</span>
//                             <span className="ml-2 text-green-400">${player.cash.toFixed(2)}</span>
//                         </div>
//                         <div className="p-2 bg-gray-700 rounded">
//                             <span className="text-gray-400">Savings:</span>
//                             <span className="ml-2 text-green-400">${player.bankAccount.savings}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Visual representation of savings */}
//                 <div className="bg-gray-800 p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Your Savings</h3>
//                     <div className="flex justify-center items-end h-24 space-x-2 mb-2">
//                         {player.bankAccount.savings > 0 ? (
//                             getSavingsVisual(player.bankAccount.savings)
//                         ) : (
//                             <div className="text-gray-400 italic">No savings yet. Start saving!</div>
//                         )}
//                     </div>
//                     <div className="w-full bg-gray-700 h-2 rounded-full">
//                         <div
//                             className="bg-green-500 h-2 rounded-full"
//                             style={{ width: `${Math.min(player.bankAccount.savings / 50, 100)}%` }}
//                         ></div>
//                     </div>
//                     <div className="text-xs text-right text-gray-400 mt-1">
//                         Progress to goal: ${player.bankAccount.savings} / $5000
//                     </div>
//                 </div>

//                 {/* Banking Actions */}
//                 <div className="bg-gray-800 p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Banking Actions</h3>
//                     <div className="flex items-center mb-3">
//                         <span className="mr-2">Amount: $</span>
//                         <input
//                             type="number"
//                             min="1"
//                             value={amount}
//                             onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
//                             className="bg-gray-700 text-white px-2 py-1 rounded w-24"
//                         />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                         <button
//                             onClick={handleDeposit}
//                             className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
//                             disabled={player.cash < amount}
//                         >
//                             Deposit Money
//                         </button>
//                         <button
//                             onClick={handleWithdraw}
//                             className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
//                             disabled={player.bankAccount.savings < amount}
//                         >
//                             Withdraw Money
//                         </button>
//                         <button
//                             onClick={() => dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'shares' } })}
//                             className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded col-span-2 mt-2"
//                         >
//                             Trade Shares
//                         </button>
//                         <button
//                             onClick={calculateInterest}
//                             className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded col-span-2"
//                         >
//                             Calculate Interest (5%)
//                         </button>
//                     </div>
//                 </div>

//                 <div className="bg-gray-800 p-4 rounded">
//                     <h3 className="text-lg font-semibold mb-2">Banking Tips</h3>
//                     <p className="text-gray-400 text-sm">
//                         • Save your money to earn interest over time.<br />
//                         • Your savings are safe in the bank.<br />
//                         • Interest is calculated at 5% when you check your account.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import { useGame } from '@/app/context/GameContext';
// import { initAudio, loadBankMusic, playBankMusic, stopBankMusic } from '@/data/audioManager';
// import { useState, useEffect } from 'react';

// export default function Bank() {
//     const { state, dispatch } = useGame();
//     const { player } = state;
//     const [amount, setAmount] = useState(50);

//     // Add useEffect to handle bank music
//     useEffect(() => {
//         // Initialize audio and load bank music
//         initAudio();
//         loadBankMusic('/sounds/bankmusic.mp3').then(() => {
//             playBankMusic();
//         });

//         // Clean up function to stop music when leaving the component
//         return () => {
//             stopBankMusic();
//         };
//     }, []); // Empty dependency array means this runs once when component mounts

//     // Create a visual representation of savings with stacks of coins
//     const getSavingsVisual = (savings) => {
//         // Calculate how many stacks to show (max 10)
//         const stacks = Math.min(Math.ceil(savings / 100), 10);
//         return Array(stacks).fill(0).map((_, index) => (
//             <div key={index} className="relative">
//                 <div className={`w-8 h-${Math.min(2 + Math.floor(savings / 200), 8)} bg-yellow-400 rounded-full border border-yellow-600 shadow-lg`}></div>
//                 <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-yellow-800">$</div>
//             </div>
//         ));
//     };

//     const handleDeposit = () => {
//         if (player.cash >= amount) {
//             dispatch({
//                 type: 'DEPOSIT_MONEY',
//                 payload: { amount }
//             });
//             dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//         } else {
//             dispatch({
//                 type: 'SET_MESSAGE',
//                 payload: { text: "You don't have enough cash to deposit that amount." }
//             });
//         }
//     };

//     const handleWithdraw = () => {
//         if (player.bankAccount.savings >= amount) {
//             dispatch({
//                 type: 'WITHDRAW_MONEY',
//                 payload: { amount }
//             });
//             dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//         } else {
//             dispatch({
//                 type: 'SET_MESSAGE',
//                 payload: { text: "You don't have enough savings to withdraw that amount." }
//             });
//         }
//     };

//     const calculateInterest = () => {
//         dispatch({
//             type: 'CALCULATE_INTEREST',
//             payload: { date: new Date() }
//         });
//         dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//     };

//     const goBackToLocation = () => {
//         dispatch({
//             type: 'CHANGE_SCREEN',
//             payload: { screen: 'location' }
//         });
//     };

//     return (
//         <div className="bank-interface relative mt-4 overflow-hidden">
//             {/* Video Background */}
//             <video
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
//             >
//                 <source src="/videos/bank.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video>

//             {/* Bank content */}
//             <div className="relative z-10 p-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold">Python Bank</h2>
//                     <button
//                         onClick={goBackToLocation}
//                         className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
//                     >
//                         Back
//                     </button>
//                 </div>

//                 {/* Bank Teller Image - UPDATED to center and enlarge */}
//                 <div className="mb-6 flex flex-col items-center">
//                     <div className="flex justify-center mb-6 mt-4">
//                         <img
//                             src="/banklady.jpg"
//                             alt="Bank Teller"
//                             className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-purple-900 shadow-xl object-cover"
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = "https://img.freepik.com/free-photo/portrait-young-businesswoman-with-crossed-arms_23-2148168745.jpg";
//                             }}
//                         />
//                     </div>

//                     {/* UPDATED gradient similar to healing center */}
//                     <div className="mt-4 bg-gradient-to-r from-indigo-500 via-blue-700 to-purple-900 px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
//                         <p className="text-sm italic text-white">
//                             "Welcome to Python National Bank! How can I help you today? Remember, saving is the first step toward your financial goals."
//                         </p>
//                     </div>

//                     {/* Additional welcome message box like healing center */}
//                     <div className="bg-gradient-to-r from-indigo-500 via-blue-700 to-purple-900 p-3 rounded-lg shadow-md mb-5 mt-5">
//                         <p className="text-sm italic text-white">
//                             "Our secure banking services are designed to help you manage your finances effectively. Invest in your future with Python Bank."
//                         </p>
//                     </div>
//                 </div>

//                 {/* Account Information */}
//                 <div className="p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Account Information</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="p-2 gradient-background2 rounded">
//                             <span className="text-white">Cash:</span>
//                             <span className="ml-2 text-green-400">${player.cash.toFixed(2)}</span>
//                         </div>
//                         <div className="p-2 gradient-background2 rounded">
//                             <span className="text-white">Savings:</span>
//                             <span className="ml-2 text-green-400">${player.bankAccount.savings}</span>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Visual representation of savings */}
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-blue-900 p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Your Savings</h3>
//                     <div className="flex justify-center items-end h-24 space-x-2 mb-2">
//                         {player.bankAccount.savings > 0 ? (
//                             getSavingsVisual(player.bankAccount.savings)
//                         ) : (
//                             <div className="text-gray-400 italic">No savings yet. Start saving!</div>
//                         )}
//                     </div>
//                     <div className="w-full bg-gray-700 h-2 rounded-full">
//                         <div
//                             className="bg-green-500 h-2 rounded-full"
//                             style={{ width: `${Math.min(player.bankAccount.savings / 50, 100)}%` }}
//                         ></div>
//                     </div>
//                     <div className="text-xs text-right text-gray-400 mt-1">
//                         Progress to goal: ${player.bankAccount.savings} / $5000
//                     </div>
//                 </div>

//                 {/* Banking Actions */}
//                 <div className="bg-gradient-to-r from-indigo-500 via-black to-blue-900 p-4 rounded mb-4">
//                     <h3 className="text-lg font-semibold mb-2">Banking Actions</h3>
//                     <div className="flex items-center mb-3">
//                         <span className="mr-2">Amount: $</span>
//                         <input
//                             type="number"
//                             min="1"
//                             value={amount}
//                             onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
//                             className="bg-gray-700 text-white px-2 py-1 rounded w-24"
//                         />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                         <button
//                             onClick={handleDeposit}
//                             className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
//                             disabled={player.cash < amount}
//                         >
//                             Deposit Money
//                         </button>
//                         <button
//                             onClick={handleWithdraw}
//                             className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
//                             disabled={player.bankAccount.savings < amount}
//                         >
//                             Withdraw Money
//                         </button>
//                         <button
//                             onClick={() => dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'shares' } })}
//                             className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded col-span-2 mt-2"
//                         >
//                             Trade Shares
//                         </button>
//                         <button
//                             onClick={calculateInterest}
//                             className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded col-span-2"
//                         >
//                             Calculate Interest (5%)
//                         </button>
//                     </div>
//                 </div>

//                 <div className="p-4 rounded">
//                     <h3 className="text-lg font-semibold mb-2">Banking Tips</h3>
//                     <p className="text-gray-400 text-sm">
//                         • Save your money to earn interest over time.<br />
//                         • Your savings are safe in the bank.<br />
//                         • Interest is calculated at 5% when you check your account.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useGame } from '@/app/context/GameContext';
import { initAudio, loadBankMusic, playBankMusic, stopBankMusic } from '@/data/audioManager';
import { useState, useEffect } from 'react';
import { toast } from 'sonner'; // Add this import

export default function Bank() {
    const { state, dispatch } = useGame();
    const { player } = state;
    const [amount, setAmount] = useState(50);

    // Add useEffect to handle bank music
    useEffect(() => {
        // Initialize audio and load bank music
        initAudio();
        loadBankMusic('/sounds/bankmusic.mp3').then(() => {
            playBankMusic();
        });

        // Clean up function to stop music when leaving the component
        return () => {
            stopBankMusic();
        };
    }, []); // Empty dependency array means this runs once when component mounts

    // Create a visual representation of savings with stacks of coins
    const getSavingsVisual = (savings) => {
        // Calculate how many stacks to show (max 10)
        const stacks = Math.min(Math.ceil(savings / 100), 10);
        return Array(stacks).fill(0).map((_, index) => (
            <div key={index} className="relative">
                <div className={`w-8 h-${Math.min(2 + Math.floor(savings / 200), 8)} bg-yellow-400 rounded-full border border-yellow-600 shadow-lg`}></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-bold text-yellow-800">$</div>
            </div>
        ));
    };

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

    const handleDeposit = () => {
        if (player.cash >= amount) {
            dispatch({
                type: 'DEPOSIT_MONEY',
                payload: { amount }
            });
            dispatch({ type: 'USE_TIME', payload: { amount: 5 } });

            // Use the showMessage function
            showMessage(`Successfully deposited $${amount} into your account.`);
        } else {
            // Use the showMessage function
            showMessage("You don't have enough cash to deposit that amount.");
        }
    };

    const handleWithdraw = () => {
        if (player.bankAccount.savings >= amount) {
            dispatch({
                type: 'WITHDRAW_MONEY',
                payload: { amount }
            });
            dispatch({ type: 'USE_TIME', payload: { amount: 5 } });

            // Use the showMessage function
            showMessage(`Successfully withdrew $${amount} from your account.`);
        } else {
            // Use the showMessage function
            showMessage("You don't have enough savings to withdraw that amount.");
        }
    };

    const calculateInterest = () => {
        dispatch({
            type: 'CALCULATE_INTEREST',
            payload: { date: new Date() }
        });
        dispatch({ type: 'USE_TIME', payload: { amount: 5 } });

        // Use the showMessage function
        showMessage("Interest calculated and added to your savings!");
    };

    const goBackToLocation = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'location' }
        });
    };

    return (
        <div className="bank-interface relative mt-4 overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
            >
                <source src="/videos/bank.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Bank content */}
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Python Bank</h2>
                    <button
                        onClick={goBackToLocation}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back
                    </button>
                </div>

                {/* Bank Teller Image - UPDATED to center and enlarge */}
                <div className="mb-6 flex flex-col items-center">
                    <div className="flex justify-center mb-6 mt-4">
                        <img
                            src="/banklady.jpg"
                            alt="Bank Teller"
                            className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-purple-900 shadow-xl object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://img.freepik.com/free-photo/portrait-young-businesswoman-with-crossed-arms_23-2148168745.jpg";
                            }}
                        />
                    </div>

                    {/* UPDATED gradient similar to healing center */}
                    <div className="mt-4 bg-gradient-to-r from-indigo-500 via-blue-700 to-purple-900 px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
                        <p className="text-sm italic text-white">
                            "Welcome to Python National Bank! How can I help you today? Remember, saving is the first step toward your financial goals."
                        </p>
                    </div>

                    {/* Additional welcome message box like healing center */}
                    <div className="bg-gradient-to-r from-indigo-500 via-blue-700 to-purple-900 p-3 rounded-lg shadow-md mb-5 mt-5">
                        <p className="text-sm italic text-white">
                            "Our secure banking services are designed to help you manage your finances effectively. Invest in your future with Python Bank."
                        </p>
                    </div>
                </div>

                {/* Account Information */}
                <div className="p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Account Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-2 gradient-background2 rounded">
                            <span className="text-white">Cash:</span>
                            <span className="ml-2 text-green-400">${player.cash.toFixed(2)}</span>
                        </div>
                        <div className="p-2 gradient-background2 rounded">
                            <span className="text-white">Savings:</span>
                            <span className="ml-2 text-green-400">${player.bankAccount.savings}</span>
                        </div>
                    </div>
                </div>

                {/* Visual representation of savings */}
                <div className="bg-gradient-to-r from-indigo-500 via-black to-blue-900 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Your Savings</h3>
                    <div className="flex justify-center items-end h-24 space-x-2 mb-2">
                        {player.bankAccount.savings > 0 ? (
                            getSavingsVisual(player.bankAccount.savings)
                        ) : (
                            <div className="text-gray-400 italic">No savings yet. Start saving!</div>
                        )}
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                        <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${Math.min(player.bankAccount.savings / 50, 100)}%` }}
                        ></div>
                    </div>
                    <div className="text-xs text-right text-gray-400 mt-1">
                        Progress to goal: ${player.bankAccount.savings} / $5000
                    </div>
                </div>

                {/* Banking Actions */}
                <div className="bg-gradient-to-r from-indigo-500 via-black to-blue-900 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Banking Actions</h3>
                    <div className="flex items-center mb-3">
                        <span className="mr-2">Amount: $</span>
                        <input
                            type="number"
                            min="1"
                            value={amount}
                            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                            className="bg-gray-700 text-white px-2 py-1 rounded w-24"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleDeposit}
                            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
                            disabled={player.cash < amount}
                        >
                            Deposit Money
                        </button>
                        <button
                            onClick={handleWithdraw}
                            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
                            disabled={player.bankAccount.savings < amount}
                        >
                            Withdraw Money
                        </button>
                        <button
                            onClick={() => dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'shares' } })}
                            className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded col-span-2 mt-2"
                        >
                            Trade Shares
                        </button>
                        <button
                            onClick={calculateInterest}
                            className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded col-span-2"
                        >
                            Calculate Interest (5%)
                        </button>
                    </div>
                </div>

                <div className="p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Banking Tips</h3>
                    <p className="text-gray-400 text-sm">
                        • Save your money to earn interest over time.<br />
                        • Your savings are safe in the bank.<br />
                        • Interest is calculated at 5% when you check your account.
                    </p>
                </div>
            </div>
        </div>
    );
}