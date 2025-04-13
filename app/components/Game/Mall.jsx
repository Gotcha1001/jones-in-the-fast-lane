// components/Locations/Mall.jsx

import { useGame } from "@/app/context/GameContext";
import { initAudio, loadMallMusic, playMallMusic, stopMallMusic } from "@/data/audioManager";
import { shopItems } from "@/data/items";
import { useEffect } from "react";
import FeatureMotionWrapper from "../FramerMotion/FeatureMotionWrapperMap";


export default function ShoppingMall() {
    const { state, dispatch } = useGame();
    const { player } = state;


    // Add useEffect to handle mall music
    useEffect(() => {
        // Initialize audio and load mall music
        initAudio();
        loadMallMusic('/sounds/mallmusic.mp3').then(() => {
            playMallMusic();
        });

        // Clean up function to stop music when leaving the component
        return () => {
            stopMallMusic();
        };
    }, []);


    const goBackToLocation = () => {
        dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'location' } });
    };

    const buyItem = (item) => {
        if (player.cash < item.price) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: `You don't have enough money to buy ${item.name}.` }
            });
            return;
        }

        if (player.possessions.includes(item.name)) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: `You already own a ${item.name}.` }
            });
            return;
        }

        dispatch({ type: 'BUY_ITEM', payload: { item } });
    };

    return (
        <div className="shopping-mall mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Shopping Mall</h2>
                <button
                    onClick={goBackToLocation}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                >
                    Back
                </button>
            </div>

            <div className="flex items-center justify-between mb-4 bg-gray-900 p-3 rounded-lg">
                <p className="text-lg">Your Cash: <span className="text-green-400">${player.cash}</span></p>
                <p className="text-sm">Items cost 5 time units to purchase</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shopItems.map((item, index) => {
                    const alreadyOwns = player.possessions.includes(item.name);
                    const canAfford = player.cash >= item.price;

                    return (
                        <FeatureMotionWrapper key={index} index={index}>

                            <div

                                className={`bg-gray-900 p-4 rounded-lg border ${alreadyOwns ? 'border-green-500' : !canAfford ? 'border-red-800' : 'border-blue-800'}`}
                            >
                                <div className="flex items-center mb-3">
                                    <div className="text-4xl mr-3">{item.image}</div>
                                    <div>
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className={`text-lg ${canAfford ? 'text-green-400' : 'text-red-400'}`}>${item.price}</p>
                                    </div>
                                </div>

                                <div className="text-sm mb-3">
                                    {item.energy && <p>+{item.energy} Energy</p>}
                                    {item.happiness && <p>+{item.happiness} Happiness</p>}
                                    {item.eduBonus && <p>+{item.eduBonus} Education Bonus</p>}
                                    {item.timeBonus && <p>+{item.timeBonus} Time Efficiency</p>}
                                </div>

                                <button
                                    onClick={() => buyItem(item)}
                                    disabled={alreadyOwns || !canAfford}
                                    className={`w-full py-2 rounded-lg ${alreadyOwns
                                        ? 'bg-green-800 text-green-300 cursor-not-allowed'
                                        : !canAfford
                                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-500 text-white'
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
    );
}