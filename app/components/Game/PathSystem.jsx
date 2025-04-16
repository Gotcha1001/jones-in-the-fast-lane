// PathSystem.jsx
import { useMemo } from 'react';

export default function PathSystem({ locationPositions, player, isWalking, targetLocation, isMobile }) {
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
        const locationKeys = Object.keys(locationPositions);

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

    // Generate stone tiles along all paths
    const generateStoneSegments = useMemo(() => {
        const segments = [];
        const locationKeys = Object.keys(locationPositions);
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
    }, [pathNetwork, locationPositions]);

    return (
        <>
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
        </>
    );
}