

import { useGame } from '@/app/context/GameContext';
import { initAudio, loadWalkingSound, playWalkingSound, stopWalkingSound } from '@/data/audioManager';
import { locations } from '@/data/locations';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Map() {
    const { state, dispatch } = useGame();
    const { player, isWalking } = state;
    const [targetLocation, setTargetLocation] = useState(null);
    const [animationProgress, setAnimationProgress] = useState(0);
    const [currentPathSegment, setCurrentPathSegment] = useState(0);
    const [pathSegments, setPathSegments] = useState([]);
    const [overallProgress, setOverallProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        initAudio();
        loadWalkingSound('/sounds/walk.mp3'); // adjust the path if needed
    }, []);

    useEffect(() => {
        if (isWalking) {
            playWalkingSound();
        } else {
            stopWalkingSound();
        }
    }, [isWalking])


    // Check if screen is mobile size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Add event listener
        window.addEventListener('resize', checkMobile);

        // Clean up
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Define location positions (percentage-based for responsive layout)
    const locationPositions = useMemo(() => {
        const positions = {};
        const locationKeys = Object.keys(locations);

        // Define your desired larger values
        const margin = 15;  // Increased from 10
        const squareSize = 100;  // Increased from 80

        // Calculate the total size of the map area
        const totalWidth = margin * 2 + squareSize;
        const totalHeight = margin * 2 + squareSize;

        locationKeys.forEach((id, index) => {
            let x, y;

            switch (index) {
                case 0: x = margin + 5; y = margin + 5; break;
                case 1: x = margin + squareSize - 5; y = margin + 5; break;
                case 2: x = margin + squareSize - 5; y = margin + squareSize - 5; break;
                case 3: x = margin + 5; y = margin + squareSize - 5; break;
                case 4: x = margin + squareSize / 2; y = margin; break;
                case 5: x = margin + squareSize; y = margin + squareSize / 2; break;
                case 6: x = margin + squareSize / 2; y = margin + squareSize; break;
                case 7: x = margin; y = margin + squareSize / 2; break;
                default:
                    const section = index % 4;
                    const offset = Math.floor(index / 4) * 0.25;
                    switch (section) {
                        case 0: x = margin + 15 + offset * squareSize; y = margin + 15; break;
                        case 1: x = margin + squareSize - 15; y = margin + 15 + offset * squareSize; break;
                        case 2: x = margin + squareSize - 15 - offset * squareSize; y = margin + squareSize - 15; break;
                        case 3: x = margin + 15; y = margin + squareSize - 15 - offset * squareSize; break;
                    }
            }

            // Convert absolute coordinates to percentages
            positions[id] = {
                x: (x / totalWidth) * 100,
                y: (y / totalHeight) * 100
            };
        });

        return positions;
    }, []);

    // Define the complete path network connecting all locations
    const pathNetwork = useMemo(() => {
        // Define key path points (main circuit) - in percentages now
        const mainPath = [
            { x: 15, y: 15 },  // Top left
            { x: 50, y: 10 },  // Top middle
            { x: 85, y: 15 },  // Top right
            { x: 90, y: 50 },  // Right middle
            { x: 85, y: 85 },  // Bottom right
            { x: 50, y: 90 },  // Bottom middle
            { x: 15, y: 85 },  // Bottom left
            { x: 10, y: 50 },  // Left middle
            { x: 15, y: 15 },  // Back to top left
        ];

        // Create a network structure
        const network = {};
        const locationKeys = Object.keys(locations);

        // Connect each location to the nearest path point
        locationKeys.forEach(id => {
            const pos = locationPositions[id];
            // Find the closest path point
            let closestPoint = null;
            let minDistance = Infinity;

            mainPath.forEach(point => {
                const distance = Math.sqrt(
                    Math.pow(pos.x - point.x, 2) +
                    Math.pow(pos.y - point.y, 2)
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    closestPoint = point;
                }
            });

            // Create a direct path from location to closest point
            network[id] = {
                mainPathConnection: closestPoint,
                directConnections: {}
            };
        });

        // For each pair of locations, determine the path between them
        locationKeys.forEach(fromId => {
            locationKeys.forEach(toId => {
                if (fromId !== toId) {
                    const from = locationPositions[fromId];
                    const to = locationPositions[toId];

                    // Get the main path connections
                    const fromMainPoint = network[fromId].mainPathConnection;
                    const toMainPoint = network[toId].mainPathConnection;

                    // Find the indices of these points in the main path
                    const fromIndex = mainPath.findIndex(p =>
                        p.x === fromMainPoint.x && p.y === fromMainPoint.y);
                    const toIndex = mainPath.findIndex(p =>
                        p.x === toMainPoint.x && p.y === toMainPoint.y);

                    // Create the complete path
                    let pathPoints = [];

                    // Add the starting location
                    pathPoints.push({ x: from.x, y: from.y });

                    // Add the connection to the main path
                    pathPoints.push({ x: fromMainPoint.x, y: fromMainPoint.y });

                    // Determine the direction to go around the main path
                    const clockwise = (toIndex > fromIndex &&
                        toIndex - fromIndex <= mainPath.length / 2) ||
                        (fromIndex > toIndex &&
                            fromIndex - toIndex > mainPath.length / 2);

                    if (clockwise) {
                        // Go clockwise
                        let i = fromIndex;
                        while (i !== toIndex) {
                            i = (i + 1) % (mainPath.length - 1); // -1 because the last point is the same as first
                            pathPoints.push({ x: mainPath[i].x, y: mainPath[i].y });
                        }
                    } else {
                        // Go counter-clockwise
                        let i = fromIndex;
                        while (i !== toIndex) {
                            i = (i - 1 + (mainPath.length - 1)) % (mainPath.length - 1);
                            pathPoints.push({ x: mainPath[i].x, y: mainPath[i].y });
                        }
                    }

                    // Add the connection from the main path to the destination
                    pathPoints.push({ x: to.x, y: to.y });

                    // Store the path
                    network[fromId].directConnections[toId] = pathPoints;
                }
            });
        });

        return network;
    }, [locationPositions]);

    // Easing function for smoother transitions
    const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    // Generate stone tiles along all paths
    const generateStoneSegments = useMemo(() => {
        const segments = [];
        const locationKeys = Object.keys(locations);
        const addedPoints = new Set(); // To avoid duplicates

        // Add stones for every path in the network
        locationKeys.forEach(fromId => {
            Object.entries(pathNetwork[fromId].directConnections).forEach(([toId, path]) => {
                for (let i = 0; i < path.length - 1; i++) {
                    const start = path[i];
                    const end = path[i + 1];
                    const distance = Math.sqrt(
                        Math.pow(end.x - start.x, 2) +
                        Math.pow(end.y - start.y, 2)
                    );

                    // Determine number of stones based on distance
                    const steps = Math.max(3, Math.floor(distance / 2));
                    for (let step = 0; step <= steps; step++) {
                        const progress = step / steps;
                        const x = start.x + (end.x - start.x) * progress;
                        const y = start.y + (end.y - start.y) * progress;

                        // Create a unique identifier for this point
                        const pointId = `${Math.round(x * 10)},${Math.round(y * 10)}`;

                        // Only add if we haven't already
                        if (!addedPoints.has(pointId)) {
                            addedPoints.add(pointId);

                            // Add some small randomness to make it look natural
                            const jitterX = (Math.random() - 0.5) * 1.5;
                            const jitterY = (Math.random() - 0.5) * 1.5;

                            segments.push({
                                x: x + jitterX,
                                y: y + jitterY,
                                size: 4 + Math.random() * 2, // Varied sizes
                                rotation: Math.random() * 360, // Random rotation
                                opacity: 0.7 + Math.random() * 0.3 // Varied opacity
                            });
                        }
                    }
                }
            });
        });

        return segments;
    }, [pathNetwork]);

    // Handle walking animation along the path
    useEffect(() => {
        if (isWalking && targetLocation) {
            // Get the path from current location to target
            const path = pathNetwork[player.location].directConnections[targetLocation];
            setPathSegments(path);

            const totalSegments = path.length - 1;
            const duration = 5000; // 5 seconds total animation time

            let startTime = null;
            let animationId = null;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;

                const elapsed = timestamp - startTime;
                const rawProgress = Math.min(elapsed / duration, 1);

                // Use easing for smoother animation
                const smoothProgress = easeInOutQuad(rawProgress);

                // Set overall progress for center avatar animation
                setOverallProgress(smoothProgress);

                // Determine which segment we're on
                const segmentProgress = smoothProgress * totalSegments;
                const currentSegment = Math.min(Math.floor(segmentProgress), totalSegments - 1);
                const segmentSpecificProgress = segmentProgress - currentSegment;

                setCurrentPathSegment(currentSegment);
                setAnimationProgress(segmentSpecificProgress);

                if (rawProgress < 1) {
                    animationId = requestAnimationFrame(animate);
                }
            };

            animationId = requestAnimationFrame(animate);

            // Clean up animation when component unmounts or animation changes
            return () => {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                }
            };
        } else {
            setAnimationProgress(0);
            setOverallProgress(0);
            setPathSegments([]);
        }
    }, [isWalking, targetLocation, player.location, pathNetwork]);

    const walkToLocation = (locationId) => {
        if (isWalking || locationId === player.location) return;

        const travelTime = 5;
        if (player.timeLeft <= 0) {
            dispatch({ type: 'SET_MESSAGE', payload: { text: "You've run out of time for this week!" } });
            return;
        }

        if (player.timeLeft < travelTime) {
            dispatch({ type: 'SET_MESSAGE', payload: { text: "Not enough time to travel there." } });
            return;
        }

        setTargetLocation(locationId);
        dispatch({ type: 'MOVE_TO_LOCATION', payload: { locationId } });
        setTimeout(() => {
            dispatch({ type: 'COMPLETE_MOVE', payload: { locationId } });
            setTargetLocation(null);
        }, 5000); // Matched to animation duration
    };

    const enterLocation = (locationId) => {
        dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'location' } });
    };

    // Get the current animated position along the path
    const getAnimatedPosition = () => {
        if (!isWalking || !targetLocation || pathSegments.length === 0) return null;

        if (currentPathSegment >= pathSegments.length - 1) return pathSegments[pathSegments.length - 1];

        const start = pathSegments[currentPathSegment];
        const end = pathSegments[currentPathSegment + 1];

        return {
            x: start.x + (end.x - start.x) * animationProgress,
            y: start.y + (end.y - start.y) * animationProgress
        };
    };

    // Calculate center avatar animation during walk - with continuous visibility
    const getCenterAvatarStyles = () => {
        if (!isWalking) return {};

        // During first half, center avatar grows and spins
        // During second half, it stays at same size
        const scale = overallProgress < 0.3
            ? 1 + (overallProgress * 0.25) // Scale up to 1.25x in first 30%
            : 1.25; // Stay at 1.25x scale

        // Add opacity transition for a smooth fade effect in the later stages
        const opacity = overallProgress > 0.7 ? 1 - ((overallProgress - 0.7) / 0.3) : 1;

        return {
            transform: `scale(${scale})`,
            opacity: opacity
        };
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold mb-3">City Map</h3>
            <div
                className="map-background w-full h-[90vh] relative bg-gray-900 rounded-lg overflow-hidden shadow-xl px-4 sm:px-8"
                style={{
                    backgroundImage: "url('/grass.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >

                {/* Background path image */}
                <img
                    src="/stone2.png"
                    alt="Stone Path"
                    className="absolute z-0 opacity-90 pointer-events-none"
                    style={{
                        top: '50%',
                        left: '50%',
                        width: isMobile ? '90%' : '70%',
                        height: isMobile ? '90%' : '70%',
                        objectFit: 'contain',
                        transform: 'translate(-50%, -50%)',
                    }}
                />


                {/* Stone path */}
                {generateStoneSegments.map((stone, index) => (
                    <div
                        key={`stone-${index}`}
                        className="absolute"
                        style={{
                            left: `${stone.x}%`,
                            top: `${stone.y}%`,
                            width: `${stone.size}%`,
                            height: `${stone.size}%`,
                            transform: `translate(-50%, -50%) rotate(${stone.rotation}deg)`,
                            opacity: stone.opacity,
                            zIndex: 5
                        }}
                    >
                        <img
                            src="/stone.png"
                            alt="Stone"
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}

                {/* Avatar walking animation - always visible */}
                {isWalking && getAnimatedPosition() && (
                    <div
                        className="absolute z-30 transition-transform duration-300 ease-in-out"
                        style={{
                            left: `${getAnimatedPosition().x}%`,
                            top: `${getAnimatedPosition().y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <div className={`${isMobile ? 'h-12 w-12' : 'h-20 w-20'} bg-blue-600 rounded-full flex items-center justify-center shadow-lg relative`}>
                            <div className="absolute inset-0 rounded-full border-2 border-yellow-400 z-20"></div>
                            <img
                                src={player.avatar}
                                alt={player.name}
                                className={`${isMobile ? 'h-10 w-10' : 'h-18 w-18'} rounded-full z-10`}
                            />
                        </div>
                        <div className="mt-1 bg-black px-2 py-1 rounded text-xs text-center shadow-md">
                            {player.name}
                        </div>
                    </div>
                )}

                {/* Static player position when not walking */}
                {!isWalking && player.location && (
                    <div
                        className="absolute z-30"
                        style={{
                            left: `${locationPositions[player.location].x}%`,
                            top: `${locationPositions[player.location].y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <div className={`${isMobile ? 'h-16 w-16' : 'h-20 w-20'} rounded-full flex items-center justify-center shadow-lg relative`}>
                            <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-pulse z-20"></div>
                            <div className={`${isMobile ? 'h-14 w-14' : 'h-18 w-18'} bg-indigo-600 rounded-full flex items-center justify-center z-10 m-1`}>
                                <img
                                    src={player.avatar}
                                    alt={player.name}
                                    className={`${isMobile ? 'h-14 w-14' : 'h-18 w-18'} rounded-full`}
                                />
                            </div>
                        </div>
                        <div className="mt-2 bg-black px-3 py-1 rounded text-sm text-center font-bold shadow-md">
                            {player.name}
                        </div>
                    </div>
                )}

                {/* Center avatar display - always visible throughout animation */}
                <div
                    className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{
                        opacity: isWalking && overallProgress > 0.95 ? 0 : 1, // Only fade out completely at the very end
                        pointerEvents: isWalking ? 'none' : 'auto'
                    }}
                >
                    <div
                        className={`transition-all duration-500 ${isWalking ? 'animate-spin-slow' : ''}`}
                        style={getCenterAvatarStyles()}
                    >
                        <img
                            src={player.avatar}
                            alt={player.name}
                            className={`${isMobile ? 'h-40 w-32' : 'h-72 w-48'} rounded-lg border-4 border-yellow-400 shadow-2xl`}
                        />
                        <div className="text-center mt-2 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-900 to-black px-3 py-1 rounded">
                            {player.name}
                        </div>
                    </div>
                </div>

                {/* Destination highlight effect - appears at destination during walk */}
                {isWalking && targetLocation && (
                    <div
                        className="absolute z-20"
                        style={{
                            left: `${locationPositions[targetLocation].x}%`,
                            top: `${locationPositions[targetLocation].y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <div className={`${isMobile ? 'h-20 w-20' : 'h-24 w-24'} rounded-full animate-ping bg-yellow-400/30 absolute`}></div>
                        <div className={`${isMobile ? 'h-16 w-16' : 'h-20 w-20'} rounded-full animate-ping bg-yellow-400/50 absolute inset-1`}></div>
                    </div>
                )}

                {/* Locations */}
                {Object.entries(locations).map(([id, location]) => {
                    const pos = locationPositions[id];
                    const isCurrent = player.location === id;
                    const isTarget = targetLocation === id;
                    return (
                        <div
                            key={id}
                            className="absolute"
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                                transform: 'translate(-50%, -50%)',
                                zIndex: 10
                            }}
                            onClick={() => isCurrent ? enterLocation(id) : walkToLocation(id)}
                        >
                            <motion.div
                                className={`location-marker relative ${isCurrent ? 'bg-green-500' : isTarget ? 'bg-amber-500' : 'bg-indigo-500'} 
                                ${isMobile ? 'h-16 w-16 md:h-24 md:w-24' : 'h-24 w-24 md:h-40 md:w-40'} rounded-full flex items-center justify-center cursor-pointer shadow-lg`}
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{
                                    scale: 0.95
                                }}
                            >
                                <div className={`absolute inset-0 rounded-full ${isCurrent ? 'border-yellow-400 border-4' : isTarget ? 'border-amber-300 border-4' : 'border-white border-2'}`}></div>

                                <img
                                    src={location.image}
                                    alt={location.name}
                                    className={`${isMobile ? 'h-14 w-14 md:h-22 md:w-22' : 'h-22 w-22 md:h-36 md:w-36'} rounded-full z-10`}
                                />
                            </motion.div>

                            <div className="mt-1 bg-black px-2 py-1 rounded text-sm text-center shadow-md">
                                {location.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Location info */}
            <div className="mt-4 bg-gray-900 rounded-lg p-4">
                <div className="flex items-center">
                    <img src={locations[player.location].image} alt={locations[player.location].name} className="h-24 w-24 object-cover rounded-lg mr-4 border-2 border-blue-400" />
                    <div>
                        <h4 className="text-lg font-bold">{locations[player.location].name}</h4>
                        <p className="text-sm text-gray-300">{locations[player.location].description}</p>
                    </div>
                </div>
                <div className="mt-2">
                    <button onClick={() => enterLocation(player.location)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                        Enter Location
                    </button>
                </div>
            </div>
        </div>
    );
}

