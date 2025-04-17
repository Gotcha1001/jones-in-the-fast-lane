import { useGame } from '@/app/context/GameContext';
import { initAudio, loadFastFoodMusic, playFastFoodMusic, stopFastFoodMusic } from '@/data/audioManager';
import { useState, useEffect } from 'react';

export default function FastFood() {
    const { state, dispatch } = useGame();
    const { player } = state;
    const [selectedMeal, setSelectedMeal] = useState(null);

    // Define meals available
    const meals = [
        { id: 1, name: "Value Meal", price: 5, energy: 10, happiness: 5 },
        { id: 2, name: "Regular Combo", price: 10, energy: 20, happiness: 10 },
        { id: 3, name: "Super Size Meal", price: 15, energy: 30, happiness: 15 },
        { id: 4, name: "Healthy Option", price: 12, energy: 25, happiness: 8 },
        { id: 5, name: "Code Crunch Burger", price: 8, energy: 15, happiness: 12 },
        { id: 6, name: "Boolean Breakfast", price: 7, energy: 18, happiness: 9 },
        { id: 7, name: "Algorithm Avocado Toast", price: 14, energy: 22, happiness: 14 },
        { id: 8, name: "Recursive Ribs", price: 18, energy: 35, happiness: 18 },
        { id: 9, name: "Function Fries", price: 4, energy: 8, happiness: 7 },
        { id: 10, name: "Exception Enchiladas", price: 11, energy: 25, happiness: 13 },
        { id: 11, name: "Python Protein Bowl", price: 16, energy: 30, happiness: 10 },
        { id: 12, name: "Debugging Donuts", price: 6, energy: 12, happiness: 16 },
        { id: 13, name: "Syntax Smoothie", price: 9, energy: 15, happiness: 14 },
        { id: 14, name: "Loop Lasagna", price: 13, energy: 28, happiness: 17 }
    ];

    // Add useEffect to handle fast food restaurant music
    useEffect(() => {
        // Initialize audio and load fast food music
        initAudio();
        loadFastFoodMusic('/sounds/fastfood.mp3').then(() => {
            playFastFoodMusic();
        });

        // Clean up function to stop music when leaving the component
        return () => {
            stopFastFoodMusic();
        };
    }, []); // Empty dependency array means this runs once when component mounts

    const handleBuyMeal = (meal) => {
        if (player.cash >= meal.price) {
            dispatch({
                type: 'BUY_MEAL',
                payload: {
                    meal,
                    cost: meal.price,
                    energy: meal.energy,
                    happiness: meal.happiness
                }
            });
            dispatch({ type: 'USE_TIME', payload: { amount: 10 } });
        } else {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "You don't have enough cash for that meal." }
            });
        }
    };

    const goBackToLocation = () => {
        dispatch({
            type: 'CHANGE_SCREEN',
            payload: { screen: 'location' }
        });
    };

    return (
        <div className="fast-food-interface relative mt-4 overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
            >
                <source src="/videos/fastfood.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Fast Food content */}
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Python Burgers</h2>
                    <button
                        onClick={goBackToLocation}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back
                    </button>
                </div>

                {/* Restaurant Image */}
                <div className="flex mb-4">
                    <div className="flex-shrink-0 mr-4">
                        <img
                            src="https://img.freepik.com/premium-photo/young-delivery-man-with-burgers_198067-914679.jpg?uid=R194451028&ga=GA1.1.1480099583.1741975489&semt=ais_hybrid&w=740"
                            alt="Fast Food Cashier"
                            className="w-32 h-32 rounded-full border-2 border-yellow-500 shadow-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://img.freepik.com/free-photo/female-cashier-uniform-welcomes-customer-checkout-counter_23-2148189632.jpg";
                            }}
                        />
                    </div>
                    <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 p-3 rounded-lg shadow-md">
                        <p className="text-sm italic text-white">
                            "Welcome to Python Burgers! Our food is so good, it'll have you looping back for more. What would you like to order today?"
                        </p>
                    </div>
                </div>

                {/* Player Information */}
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Your Status</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Cash:</span>
                            <span className="ml-2 text-green-400">${player.cash}</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Energy:</span>
                            <span className="ml-2 text-blue-400">{player.energy}/100</span>
                        </div>
                        <div className="p-2 bg-gray-700 rounded">
                            <span className="text-gray-400">Happiness:</span>
                            <span className="ml-2 text-yellow-400">{player.happiness}/100</span>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Today's Menu</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {meals.map(meal => (
                            <div
                                key={meal.id}
                                className="bg-gray-700 p-3 rounded-lg border-2 border-transparent hover:border-yellow-500 cursor-pointer transition-all"
                                onClick={() => handleBuyMeal(meal)}
                            >
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-white">{meal.name}</h4>
                                    <span className="text-green-400">${meal.price}</span>
                                </div>
                                <div className="mt-2 text-sm text-gray-300">
                                    <div>Energy: +{meal.energy}</div>
                                    <div>Happiness: +{meal.happiness}</div>
                                </div>
                                <button
                                    className="mt-2 w-full bg-yellow-600 hover:bg-yellow-500 text-white py-1 px-4 rounded text-sm"
                                    disabled={player.cash < meal.price}
                                >
                                    {player.cash >= meal.price ? 'Order Now' : 'Not Enough Cash'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tips Section */}
                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Nutrition Tips</h3>
                    <p className="text-gray-400 text-sm">
                        • Fast food provides quick energy boosts.<br />
                        • Balanced meals help maintain higher happiness.<br />
                        • Taking time to eat regularly keeps your energy levels up!
                    </p>
                </div>
            </div>
        </div>
    );
}