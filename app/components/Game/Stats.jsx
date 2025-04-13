
import { useGame } from '@/app/context/GameContext';
import { locations } from '@/data/locations';


export default function Stats() {
    const { state, dispatch } = useGame();
    const { player } = state;

    const checkGoals = () => {
        dispatch({ type: 'CHECK_GOALS' });
    };

    return (
        <div className="bg-black rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{player.name}</h2>
                <div className="flex items-center">
                    <span className="mr-4">Week {player.week}</span>
                    <span>Time Left: {player.timeLeft}/100</span>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="bg-gray-800 p-2 rounded">Cash: ${player.cash}</div>
                <div className="bg-gray-800 p-2 rounded">Education: {player.education}/100</div>
                <div className="bg-gray-800 p-2 rounded">Experience: {player.experience}/100</div>
                <div className="bg-gray-800 p-2 rounded">Job: {player.job ? player.job.title : 'Unemployed'}</div>
                <div className="bg-gray-800 p-2 rounded">Energy: {player.energy}/100</div>
                <div className="bg-gray-800 p-2 rounded">Happiness: {player.happiness}/100</div>
                <div className="bg-gray-800 p-2 rounded">Location: {locations[player.location].name}</div>
                <div className="bg-gray-800 p-2 rounded">
                    Job Goal: {state.goals.winningJobs.join(" or ")}
                </div>
                <div className="bg-gray-800 p-2 rounded">
                    <button
                        onClick={checkGoals}
                        className="text-blue-400 hover:underline"
                    >
                        Check Goals
                    </button>
                </div>
            </div>
        </div>
    );
}