


import { useGame } from '@/app/context/GameContext';
import { initAudio, loadWalkingSound, playWalkingSound, stopWalkingSound } from '@/data/audioManager';
import { locations } from '@/data/locations';
import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import PathSystem from './PathSystem';

export default function Map() {
    const { state, dispatch } = useGame();
    const { player, isWalking } = state;
    const [targetLocation, setTargetLocation] = useState(null);
    const [animationProgress, setAnimationProgress] = useState(0);
    const [currentPathSegment, setCurrentPathSegment] = useState(0);
    const [pathSegments, setPathSegments] = useState([]);
    const [overallProgress, setOverallProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
    const mapRef = useRef(null);
    const [overlappingMarkers, setOverlappingMarkers] = useState(new Set());

    // Track map container size for dynamic calculations
    useEffect(() => {
        const updateDimensions = () => {
            if (mapRef.current) {
                const { width, height } = mapRef.current.getBoundingClientRect();
                setMapDimensions({ width, height });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Check if screen is mobile size (<768px)
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Calculate dynamic marker size for location markers
    // Adjust these values to change location marker sizes
    const getMarkerSize = () => {
        if (isMobile) {
            return { width: 16, height: 16 }; // Mobile: ~64px at 400px, ~96px at 600px
        } else if (window.innerWidth < 1024) {
            return { width: 12, height: 12 }; // Mid-screens: ~108px at 900px
        } else {
            return { width: 10, height: 10 }; // Desktop: ~120px at 1200px, ~192px at 1920px
        }
    };

    // Calculate dynamic center avatar size
    // Adjust these values to change center avatar sizes
    const getCenterAvatarSize = () => {
        if (isMobile) {
            return 'h-52 w-36'; // Mobile: ~520x360px at 400px
        } else if (window.innerWidth < 1024) {
            return 'h-72 w-48'; // Mid-screens: ~720x480px at 900px
        } else {
            return 'h-[48vh] w-72'; // Desktop: ~518x720px at 1080p
        }
    };

    // Initialize audio and load walking sound
    useEffect(() => {
        initAudio();
        loadWalkingSound('/sounds/walk.mp3');
    }, []);

    // Play/stop walking sound based on isWalking state
    useEffect(() => {
        if (isWalking) {
            playWalkingSound();
        } else {
            stopWalkingSound();
        }
    }, [isWalking]);

    // Calculate location positions with minimum spacing to prevent overlaps
    const locationPositions = useMemo(() => {
        const positions = {};
        Object.entries(locations).forEach(([id, location]) => {
            positions[id] = {
                x: location.mapX,
                y: location.mapY,
            };
        });

        // Adjust positions to enforce minimum spacing
        const adjustedPositions = { ...positions };
        const minDistance = isMobile ? 12 : 18; // Minimum distance in % units
        const locationKeys = Object.keys(positions);

        for (let i = 0; i < locationKeys.length; i++) {
            for (let j = i + 1; j < locationKeys.length; j++) {
                const id1 = locationKeys[i];
                const id2 = locationKeys[j];
                const pos1 = adjustedPositions[id1];
                const pos2 = adjustedPositions[id2];

                const distance = Math.sqrt(
                    Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
                );

                if (distance < minDistance && distance > 0) {
                    const angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
                    const offset = (minDistance - distance) / 2;

                    adjustedPositions[id1] = {
                        x: pos1.x - Math.cos(angle) * offset,
                        y: pos1.y - Math.sin(angle) * offset,
                    };
                    adjustedPositions[id2] = {
                        x: pos2.x + Math.cos(angle) * offset,
                        y: pos2.y + Math.sin(angle) * offset,
                    };
                }
            }
        }

        return adjustedPositions;
    }, [isMobile]);

    // Detect overlapping markers for opacity adjustment
    useEffect(() => {
        const overlaps = new Set();
        const locationKeys = Object.keys(locationPositions);
        const { width: markerSize } = getMarkerSize();
        const minPixelDistance = (markerSize / 100) * mapDimensions.width * 1.8;

        for (let i = 0; i < locationKeys.length; i++) {
            for (let j = i + 1; j < locationKeys.length; j++) {
                const id1 = locationKeys[i];
                const id2 = locationKeys[j];
                const pos1 = locationPositions[id1];
                const pos2 = locationPositions[id2];

                const pixelX1 = (pos1.x / 100) * mapDimensions.width;
                const pixelY1 = (pos1.y / 100) * mapDimensions.height;
                const pixelX2 = (pos2.x / 100) * mapDimensions.width;
                const pixelY2 = (pos2.y / 100) * mapDimensions.height;

                const distance = Math.sqrt(
                    Math.pow(pixelX1 - pixelX2, 2) + Math.pow(pixelY1 - pixelY2, 2)
                );

                if (distance < minPixelDistance) {
                    overlaps.add(id1);
                    overlaps.add(id2);
                }
            }
        }

        setOverlappingMarkers(overlaps);
    }, [locationPositions, mapDimensions, isMobile]);

    // Define path network for movement animations
    const pathNetwork = useMemo(() => {
        const mainPath = [
            { x: 15, y: 15 },
            { x: 50, y: 10 },
            { x: 85, y: 15 },
            { x: 90, y: 50 },
            { x: 85, y: 85 },
            { x: 50, y: 90 },
            { x: 15, y: 85 },
            { x: 10, y: 50 },
            { x: 15, y: 15 },
        ];

        const network = {};
        const locationKeys = Object.keys(locations);

        locationKeys.forEach(id => {
            const pos = locationPositions[id];
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

            network[id] = {
                mainPathConnection: closestPoint,
                directConnections: {}
            };
        });

        locationKeys.forEach(fromId => {
            locationKeys.forEach(toId => {
                if (fromId !== toId) {
                    const from = locationPositions[fromId];
                    const to = locationPositions[toId];
                    const fromMainPoint = network[fromId].mainPathConnection;
                    const toMainPoint = network[toId].mainPathConnection;

                    const fromIndex = mainPath.findIndex(p =>
                        p.x === fromMainPoint.x && p.y === fromMainPoint.y);
                    const toIndex = mainPath.findIndex(p =>
                        p.x === toMainPoint.x && p.y === toMainPoint.y);

                    let pathPoints = [];
                    pathPoints.push({ x: from.x, y: from.y });
                    pathPoints.push({ x: fromMainPoint.x, y: fromMainPoint.y });

                    const clockwise = (toIndex > fromIndex &&
                        toIndex - fromIndex <= mainPath.length / 2) ||
                        (fromIndex > toIndex &&
                            fromIndex - toIndex > mainPath.length / 2);

                    if (clockwise) {
                        let i = fromIndex;
                        while (i !== toIndex) {
                            i = (i + 1) % (mainPath.length - 1);
                            pathPoints.push({ x: mainPath[i].x, y: mainPath[i].y });
                        }
                    } else {
                        let i = fromIndex;
                        while (i !== toIndex) {
                            i = (i - 1 + (mainPath.length - 1)) % (mainPath.length - 1);
                            pathPoints.push({ x: mainPath[i].x, y: mainPath[i].y });
                        }
                    }

                    pathPoints.push({ x: to.x, y: to.y });
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

    // Handle walking animation along the path
    useEffect(() => {
        if (isWalking && targetLocation) {
            const path = pathNetwork[player.location].directConnections[targetLocation];
            setPathSegments(path);
            const totalSegments = path.length - 1;
            const duration = 5000;
            let startTime = null;
            let animationId = null;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const rawProgress = Math.min(elapsed / duration, 1);
                const smoothProgress = easeInOutQuad(rawProgress);

                setOverallProgress(smoothProgress);
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

    // Check time and end turn if needed
    const checkTimeAndEndTurnIfNeeded = () => {
        const minimumTimeForTravel = 5;
        if (player.timeLeft < minimumTimeForTravel && !isWalking) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: "Not enough time left to travel. Your turn is ending..." }
            });
            setTimeout(() => {
                dispatch({
                    type: 'USE_TIME',
                    payload: { amount: player.timeLeft }
                });
            }, 2000);
        }
    };

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
            dispatch({ type: 'USE_TIME', payload: { amount: travelTime } });
            setTargetLocation(null);
            checkTimeAndEndTurnIfNeeded();
        }, 5000);
    };

    useEffect(() => {
        if (!isWalking) {
            checkTimeAndEndTurnIfNeeded();
        }
    }, [player.timeLeft, player.location, isWalking]);

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

    // Calculate center avatar animation during walk
    const getCenterAvatarStyles = () => {
        if (!isWalking) return {};
        const scale = overallProgress < 0.3 ? 1 + (overallProgress * 0.25) : 1.25;
        const opacity = overallProgress > 0.7 ? 1 - ((overallProgress - 0.7) / 0.3) : 1;
        return {
            transform: `scale(${scale})`,
            opacity: opacity
        };
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold mb-3">City Map</h3>
            {/* Map Container: Adjust height/width here */}
            <div
                ref={mapRef}
                className="map-background w-full h-[70vh] sm:h-[90vh] lg:h-[120vh] max-h-[1800px] max-w-[1800px] mx-auto relative bg-gray-900 rounded-lg overflow-hidden shadow-xl px-4 sm:px-8"
                style={{
                    backgroundImage: "url('/logo1.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Stone Path Image: Adjust size/scaling here */}
                <img
                    src="/stone2.png"
                    alt="Stone Path"
                    className="absolute z-0 opacity-90 pointer-events-none"
                    style={{
                        top: '50%',
                        left: '50%',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: 'translate(-50%, -50%)',
                    }}
                />

                {/* Path System: Handles movement paths */}
                <PathSystem
                    locationPositions={locationPositions}
                    player={player}
                    isWalking={isWalking}
                    targetLocation={targetLocation}
                    isMobile={isMobile}
                />

                {/* Walking Avatar: Displayed during movement animation */}
                {isWalking && getAnimatedPosition() && (
                    <div
                        className="absolute z-30 transition-transform duration-300 ease-in-out"
                        style={{
                            left: `${getAnimatedPosition().x}%`,
                            top: `${getAnimatedPosition().y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {/* Adjust walking avatar size here */}
                        <div className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'} bg-blue-600 rounded-full flex items-center justify-center shadow-lg relative`}>
                            <div className="absolute inset-0 rounded-full border-2 border-yellow-400 z-20"></div>
                            <img
                                src={player.avatar}
                                alt={player.name}
                                className={`${isMobile ? 'h-10 w-10' : 'h-14 w-14'} rounded-full z-10`}
                            />
                        </div>
                        <div className="mt-1 bg-black px-2 py-1 rounded text-xs text-center shadow-md">
                            {player.name}
                        </div>
                    </div>
                )}

                {/* Static Player Avatar: Displayed at current location when not walking */}
                {!isWalking && player.location && (
                    <div
                        className="absolute z-30"
                        style={{
                            left: `${locationPositions[player.location].x}%`,
                            top: `${locationPositions[player.location].y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {/* Adjust static player avatar size here */}
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
                        <div className="mt-2 bg-gradient-to-r from-indigo-500 via-purple-900 to-black px-3 py-1 rounded text-sm text-center font-bold shadow-md">
                            {player.name}
                        </div>
                    </div>
                )}

                {/* Center Avatar: Main player avatar in map center */}
                <div
                    className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{
                        opacity: isWalking && overallProgress > 0.95 ? 0 : 1,
                        pointerEvents: isWalking ? 'none' : 'auto'
                    }}
                >
                    <div
                        className={`transition-all duration-500 ${isWalking ? 'animate-spin-slow' : ''}`}
                        style={getCenterAvatarStyles()}
                    >
                        {/* Adjust center avatar size here */}
                        <img
                            src={player.avatar}
                            alt={player.name}
                            className={`${getCenterAvatarSize()} rounded-lg border-4 border-yellow-400 shadow-2xl`}
                        />
                        <div className="text-center mt-2 text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-900 to-black px-3 py-1 rounded">
                            {player.name}
                        </div>
                    </div>
                </div>

                {/* Destination Highlight: Effect shown at target location during walking */}
                {isWalking && targetLocation && (
                    <div
                        className="absolute z-20"
                        style={{
                            left: `${locationPositions[targetLocation].x}%`,
                            top: `${locationPositions[targetLocation].y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {/* Adjust destination highlight size here */}
                        <div className={`${isMobile ? 'h-20 w-20' : 'h-24 w-24'} rounded-full animate-ping bg-yellow-400/30 absolute`}></div>
                        <div className={`${isMobile ? 'h-16 w-16' : 'h-20 w-20'} rounded-full animate-ping bg-yellow-400/50 absolute inset-1`}></div>
                    </div>
                )}

                {/* Location Markers: Circular markers for each location */}
                {Object.entries(locations).map(([id, location]) => {
                    const pos = locationPositions[id];
                    const isCurrent = player.location === id;
                    const isTarget = targetLocation === id;
                    const { width, height } = getMarkerSize();

                    return (
                        <div
                            key={id}
                            className="absolute"
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                                transform: 'translate(-50%, -50%)',
                                zIndex: isCurrent || isTarget ? 15 : overlappingMarkers.has(id) ? 8 : 10,
                            }}
                            onClick={() => (isCurrent ? enterLocation(id) : walkToLocation(id))}
                        >
                            {/* Adjust location marker size in getMarkerSize() function */}
                            <motion.div
                                className={`location-marker relative ${isCurrent ? 'bg-green-500' : isTarget ? 'bg-amber-500' : 'bg-indigo-500'} rounded-full flex items-center justify-center cursor-pointer shadow-lg`}
                                style={{
                                    width: `${width}vw`,
                                    height: `${height}vw`,
                                    opacity: overlappingMarkers.has(id) && !isCurrent && !isTarget ? 0.7 : 1,
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    opacity: 1,
                                    zIndex: 20,
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                role="button"
                                aria-label={`${isCurrent ? 'Enter' : 'Travel to'} ${location.name}`}
                            >
                                <div
                                    className={`absolute inset-0 rounded-full ${isCurrent ? 'border-yellow-400 border-4' : isTarget ? 'border-amber-300 border-4' : 'border-white border-2'}`}
                                ></div>
                                <img
                                    src={location.image}
                                    alt={location.name}
                                    className="rounded-full z-10"
                                    style={{
                                        width: `calc(${width}vw - 0.5rem)`,
                                        height: `calc(${height}vw - 0.5rem)`,
                                    }}
                                />
                            </motion.div>
                            <div
                                className="mt-2 gradient-background2 px-1 py-1 rounded text-xs sm:text-sm text-center shadow-md"
                                style={{
                                    transform: pos.y > 80 ? 'translateY(-0.5rem)' : 'none', // Offset for bottom locations
                                }}
                            >
                                {location.name}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}