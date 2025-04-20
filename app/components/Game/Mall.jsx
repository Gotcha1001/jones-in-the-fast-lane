// // components/Locations/Mall.jsx

// import { useGame } from "@/app/context/GameContext";
// import { initAudio, loadMallMusic, playMallMusic, stopMallMusic } from "@/data/audioManager";
// import { shopItems } from "@/data/items";
// import { useEffect } from "react";
// import FeatureMotionWrapper from "../FramerMotion/FeatureMotionWrapperMap";
// import { toast } from 'sonner'; // Add this import


// export default function ShoppingMall() {
//     const { state, dispatch } = useGame();
//     const { player } = state;


//     // Add useEffect to handle mall music
//     useEffect(() => {
//         // Initialize audio and load mall music
//         initAudio();
//         loadMallMusic('/sounds/mallmusic.mp3').then(() => {
//             playMallMusic();
//         });

//         // Clean up function to stop music when leaving the component
//         return () => {
//             stopMallMusic();
//         };
//     }, []);

//     // Helper function to handle both message and toast
//     const showMessage = (message) => {
//         // Set message in game state
//         dispatch({
//             type: 'SET_MESSAGE',
//             payload: { text: message }
//         });
//         // Show toast notification
//         toast.success(message);
//     };


//     const goBackToLocation = () => {
//         dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'location' } });
//     };

//     const buyItem = (item) => {
//         if (player.cash < item.price) {
//             showMessage(`You don't have enough money to buy ${item.name}.`);
//             return;
//         }

//         if (player.possessions.includes(item.name)) {
//             showMessage(`You already own a ${item.name}.`);
//             return;
//         }

//         dispatch({ type: 'BUY_ITEM', payload: { item } });
//         showMessage(`You bought a ${item.name}!`);
//     };

//     return (
//         <div className="shopping-mall mt-4">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">Shopping Mall</h2>
//                 <button
//                     onClick={goBackToLocation}
//                     className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
//                 >
//                     Back
//                 </button>
//             </div>

//             <div className="flex items-center justify-between mb-4 bg-gray-900 p-3 rounded-lg">
//                 <p className="text-lg">Your Cash: <span className="text-green-400">${player.cash}</span></p>
//                 <p className="text-sm">Items cost 5 time units to purchase</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {shopItems.map((item, index) => {
//                     const alreadyOwns = player.possessions.includes(item.name);
//                     const canAfford = player.cash >= item.price;

//                     return (
//                         <FeatureMotionWrapper key={index} index={index}>

//                             <div

//                                 className={`bg-gray-900 p-4 rounded-lg border ${alreadyOwns ? 'border-green-500' : !canAfford ? 'border-red-800' : 'border-blue-800'}`}
//                             >
//                                 <div className="flex items-center mb-3">
//                                     <div className="text-4xl mr-3">{item.image}</div>
//                                     <div>
//                                         <h4 className="font-semibold">{item.name}</h4>
//                                         <p className={`text-lg ${canAfford ? 'text-green-400' : 'text-red-400'}`}>${item.price}</p>
//                                     </div>
//                                 </div>

//                                 <div className="text-sm mb-3">
//                                     {item.energy && <p>+{item.energy} Energy</p>}
//                                     {item.happiness && <p>+{item.happiness} Happiness</p>}
//                                     {item.eduBonus && <p>+{item.eduBonus} Education Bonus</p>}
//                                     {item.timeBonus && <p>+{item.timeBonus} Time Efficiency</p>}
//                                 </div>

//                                 <button
//                                     onClick={() => buyItem(item)}
//                                     disabled={alreadyOwns || !canAfford}
//                                     className={`w-full py-2 rounded-lg ${alreadyOwns
//                                         ? 'bg-green-800 text-green-300 cursor-not-allowed'
//                                         : !canAfford
//                                             ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
//                                             : 'bg-blue-600 hover:bg-blue-500 text-white'
//                                         }`}
//                                 >
//                                     {alreadyOwns ? 'Already Owned' : (canAfford ? 'Buy Item' : 'Cannot Afford')}
//                                 </button>
//                             </div>
//                         </FeatureMotionWrapper>

//                     );
//                 })}
//             </div>
//         </div>
//     );
// }


// components/Locations/Mall.jsx

import { useGame } from "@/app/context/GameContext";
import { initAudio, loadClickSound, loadMallMusic, playClickSound, playMallMusic, stopMallMusic } from "@/data/audioManager";
import { shopItems } from "@/data/items";
import { useEffect } from "react";
import FeatureMotionWrapper from "../FramerMotion/FeatureMotionWrapperMap";
import { toast } from 'sonner'; // Add this import

export default function ShoppingMall() {
    const { state, dispatch } = useGame();
    const { player } = state;


    const withSound = (handler) => (event) => {
        playClickSound()
        if (handler) {
            handler(event)
        }
    }

    // Add useEffect to handle mall music
    useEffect(() => {
        // Initialize audio and load mall music
        initAudio();
        loadClickSound('/sounds/click.mp3').then((success) => {
            if (!success) {
                console.warn("Failed to load click sound")
            }
        })
        loadMallMusic('/sounds/mallmusic.mp3').then(() => {
            playMallMusic();
        });

        // Clean up function to stop music when leaving the component
        return () => {
            stopMallMusic();
        };
    }, []);

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

    const buyItem = (item) => {
        if (player.cash < item.price) {
            showMessage(`You don't have enough money to buy ${item.name}.`);
            return;
        }

        if (player.possessions.includes(item.name)) {
            showMessage(`You already own a ${item.name}.`);
            return;
        }

        dispatch({ type: 'BUY_ITEM', payload: { item } });
        showMessage(`You bought a ${item.name}!`);
    };

    return (
        <div className="shopping-mall-interface relative mt-4 overflow-hidden">
            {/* Optional: Video Background - if you have one */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-100"
            >
                <source src="https://videos.pexels.com/video-files/2845487/2845487-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Mall content */}
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Shopping Mall</h2>
                    <button
                        onClick={withSound(goBackToLocation)}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back
                    </button>
                </div>

                {/* Mall Image - Added to match the Healing Centre style */}
                <div className="mb-6 flex flex-col items-center">
                    <div className="flex justify-center mb-6 mt-4">
                        <img
                            src="https://img.freepik.com/free-photo/dreamy-interior-mall_23-2151591462.jpg?uid=R194451028&ga=GA1.1.1480099583.1741975489&semt=ais_hybrid&w=740"
                            alt="Shopping Mall"
                            className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-purple-900 shadow-xl object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://img.freepik.com/free-photo/shopping-mall-interior_1127-3082.jpg";
                            }}
                        />
                    </div>

                    <div className="mt-4 bg-gradient-to-r from-purple-900 via-pink-300 to-blue-700 px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
                        <p className="text-sm italic text-white">
                            "Welcome to the Shopping Mall! Here you can find everything you need to improve your life and boost your stats. Each item provides unique benefits that will help you on your journey."
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-900 via-pink-300 to-blue-700 p-3 rounded-lg shadow-md mb-5 mt-5">
                        <p className="text-sm italic text-white">
                            "From electronics to books, from furniture to fitness equipment - we have it all! Browse our selection and upgrade your life today."
                        </p>
                    </div>
                </div>

                {/* Player Cash Information */}
                <div className="p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Your Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-2 gradient-background2 rounded">
                            <span className="text-white">Your Cash:</span>
                            <span className="ml-2 text-green-400">${player.cash}</span>
                        </div>
                        <div className="p-2 gradient-background2 rounded">
                            <span className="text-white">Items Owned:</span>
                            <span className="ml-2 text-blue-400">{player.possessions.length}</span>
                        </div>
                    </div>
                    <div className="text-sm text-center mt-3 text-gray-300">
                        Items cost 5 time units to purchase
                    </div>
                </div>

                {/* Shop Items */}
                <div className="bg-gradient-to-bl from-purple-500 via-black to-blue-900 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-center">Available Items</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {shopItems.map((item, index) => {
                            const alreadyOwns = player.possessions.includes(item.name);
                            const canAfford = player.cash >= item.price;

                            return (
                                <FeatureMotionWrapper key={index} index={index}>
                                    <div
                                        className={`gradient-background2 p-3 rounded-lg border-2 ${alreadyOwns
                                            ? 'border-green-500'
                                            : !canAfford
                                                ? 'border-red-500'
                                                : 'border-transparent hover:border-purple-400'
                                            } transition-all`}
                                    >
                                        <div className="flex items-center mb-3">
                                            <div className="text-4xl mr-3">{item.image}</div>
                                            <div>
                                                <h4 className="font-semibold text-white">{item.name}</h4>
                                                <p className={`text-lg ${canAfford ? 'text-green-400' : 'text-red-400'}`}>${item.price}</p>
                                            </div>
                                        </div>

                                        <div className="text-sm mb-3 text-gray-300">
                                            {item.energy && <p>+{item.energy} Energy</p>}
                                            {item.happiness && <p>+{item.happiness} Happiness</p>}
                                            {item.eduBonus && <p>+{item.eduBonus} Education Bonus</p>}
                                            {item.timeBonus && <p>+{item.timeBonus} Time Efficiency</p>}
                                        </div>

                                        <button
                                            onClick={withSound(() => buyItem(item))}
                                            disabled={alreadyOwns || !canAfford}
                                            className={`mt-2 w-full py-2 rounded-lg ${alreadyOwns
                                                ? 'bg-green-800 text-green-300 cursor-not-allowed'
                                                : !canAfford
                                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                                                }`}
                                        >
                                            {alreadyOwns ? 'Already Owned' : (canAfford ? 'Buy Item' : 'Cannot Afford')}
                                        </button>
                                    </div>
                                </FeatureMotionWrapper>
                            );
                        })}
                    </div>
                </div>

                {/* Shopping Tips */}
                <div className="p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Shopping Tips</h3>
                    <p className="text-gray-400 text-sm">
                        • Items with education bonuses will help you study more efficiently.<br />
                        • Time efficiency items allow you to do more activities each day.<br />
                        • Having the right possessions can unlock special opportunities!<br />
                        • Some items provide passive happiness or energy benefits.
                    </p>
                </div>
            </div>
        </div>
    );
}