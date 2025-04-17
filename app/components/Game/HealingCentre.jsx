import { useGame } from '@/app/context/GameContext';
import { initAudio, loadHealingCentreMusic, playHealingCentreMusic, stopHealingCentreMusic } from '@/data/audioManager';
import { useState, useEffect } from 'react';
import FeatureMotionWrapper from '../FramerMotion/FeatureMotionWrapperMap';

export default function HealingCentre() {
    const { state, dispatch } = useGame();
    const { player } = state;
    const [selectedService, setSelectedService] = useState(null);

    // Define healing services available
    const services = [
        { id: 1, name: "Tarot Reading", price: 15, health: 5, happiness: 10 },
        { id: 2, name: "Massage Session", price: 25, health: 15, happiness: 15 },
        { id: 3, name: "Meditation Course", price: 20, health: 10, happiness: 20 },
        { id: 4, name: "Reiki Healing", price: 30, health: 20, happiness: 10 },
        { id: 5, name: "Hypnosis Therapy", price: 35, health: 15, happiness: 15 },
        { id: 6, name: "Counselling Session", price: 40, health: 20, happiness: 20 },
        { id: 7, name: "Sound Bath Therapy", price: 28, health: 12, happiness: 18 },
        { id: 8, name: "Acupuncture Treatment", price: 45, health: 25, happiness: 12 },
        { id: 9, name: "Yoga Class", price: 18, health: 18, happiness: 15 },
        { id: 10, name: "Crystal Healing", price: 22, health: 8, happiness: 22 },
        { id: 11, name: "Aromatherapy Session", price: 20, health: 12, happiness: 18 },
        { id: 12, name: "Chakra Balancing", price: 32, health: 18, happiness: 18 },
        { id: 13, name: "Reflexology Treatment", price: 30, health: 20, happiness: 12 },
        { id: 14, name: "Guided Visualization", price: 25, health: 10, happiness: 25 },
        { id: 15, name: "Energy Clearing", price: 35, health: 15, happiness: 20 }
    ];

    // Add useEffect to handle healing centre music
    useEffect(() => {
        // Initialize audio and load healing centre music
        initAudio();
        loadHealingCentreMusic('/sounds/healing.mp3').then(() => {
            playHealingCentreMusic();
        });

        // Clean up function to stop music when leaving the component
        return () => {
            stopHealingCentreMusic();
        };
    }, []); // Empty dependency array means this runs once when component mounts

    const handlePurchaseService = (service) => {
        if (player.cash >= service.price) {
            dispatch({
                type: 'PURCHASE_HEALING_SERVICE',
                payload: {
                    service,
                    cost: service.price,
                    health: service.health,
                    happiness: service.happiness
                }
            });
            dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
        } else {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "You don't have enough cash for that service." }
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
        <div className="healing-centre-interface relative mt-4 overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
            >
                <source src="https://cdn.pixabay.com/video/2023/11/24/190522-888122666_large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Healing Centre content */}
            <div className="relative z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold ">Zen Healing Centre</h2>
                    <button
                        onClick={goBackToLocation}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                    >
                        Back
                    </button>
                </div>

                {/* Centre Image */}
                <div className="mb-6 flex flex-col items-center">
                    <div className="flex justify-center mb-6 mt-4">
                        <img
                            src="https://img.freepik.com/free-photo/incense-holder-with-burning-charcoal-incense-resin-myrrh-rustic-wooden-table_181624-60529.jpg?uid=R194451028&ga=GA1.1.1480099583.1741975489&semt=ais_hybrid&w=740"
                            alt="Healing Centre"
                            className="w-60 h-60 md:w-72 md:h-72 rounded-full border-4 border-purple-500 shadow-xl object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://img.freepik.com/free-photo/wellness-composition-with-zen-stones_23-2147657572.jpg";
                            }}
                        />
                    </div>

                    <div className="mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 px-6 py-4 rounded-lg shadow-md max-w-xl text-center">
                        <p className="text-sm italic text-white">
                            "Welcome to the Zen Healing Centre. Here, we focus on balancing your mind, body, and spirit to enhance your overall wellbeing. How may we assist you on your journey today?"
                        </p>
                    </div>


                    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-3 rounded-lg shadow-md mb-5 mt-5">
                        <p className="text-sm italic text-white ">
                            "Welcome to the Zen Healing Centre. Here, we focus on balancing your mind, body, and spirit to enhance your overall wellbeing. How may we assist you on your journey today?"
                        </p>
                    </div>
                </div>

                {/* Player Information */}
                <div className=" p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Your Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-2 gradient-background2 rounded">
                            <span className="text-white">Cash:</span>
                            <span className="ml-2 text-green-400">${player.cash}</span>
                        </div>
                        <div className="p-2 gradient-background2 rounded">
                            <span className="text-white">Health:</span>
                            <span className="ml-2 text-red-400">{player.relationship.health}/100</span>
                        </div>
                        <div className="p-2 gradient-background2 rounded">
                            <span className="text-white">Energy:</span>
                            <span className="ml-2 text-blue-400">{player.energy}/100</span>
                        </div>
                        <div className="p-2 gradient-background2 rounded">
                            <span className="text-white">Happiness:</span>
                            <span className="ml-2 text-yellow-400">{player.happiness}/100</span>
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="bg-gradient-to-bl from-indigo-500 via-black to-purple-900 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold mb-2">Our Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service, index) => (
                            <FeatureMotionWrapper index={index} key={index}>
                                <div
                                    key={service.id}
                                    className="gradient-background2 p-3 rounded-lg border-2 border-transparent hover:border-purple-500 cursor-pointer transition-all"
                                    onClick={() => handlePurchaseService(service)}
                                >
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-medium text-white">{service.name}</h4>
                                        <span className="text-green-400">${service.price}</span>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-300">
                                        <div>Health: +{service.health}</div>
                                        <div>Happiness: +{service.happiness}</div>
                                    </div>
                                    <button
                                        className="mt-2 w-full bg-purple-600 hover:bg-purple-500 text-white py-1 px-4 rounded text-sm"
                                        disabled={player.cash < service.price}
                                    >
                                        {player.cash >= service.price ? 'Book Now' : 'Not Enough Cash'}
                                    </button>
                                </div>


                            </FeatureMotionWrapper>

                        ))}
                    </div>
                </div>

                {/* Wellbeing Tips */}
                <div className=" p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Wellbeing Tips</h3>
                    <p className="text-gray-400 text-sm">
                        • Regular healing sessions improve your long-term health.<br />
                        • Balance your physical and mental wellbeing for optimal performance.<br />
                        • Maintaining health above 80% is essential for winning the game!<br />
                        • Different services benefit different aspects of your wellbeing.
                    </p>
                </div>
            </div>
        </div >
    );
}