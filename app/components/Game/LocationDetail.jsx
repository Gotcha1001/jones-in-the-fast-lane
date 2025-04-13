// components/Game/LocationDetail.jsx

import { useGame } from '@/app/context/GameContext';

import Button from '../UI/Button';
import { locations } from '@/data/locations';
import { toast } from 'sonner';

export default function LocationDetail({ locationId }) {
    const { state, dispatch } = useGame();
    const { player } = state;
    const location = locations[locationId];

    const handleAction = (action) => {

        console.log("Action triggered:", action, "Current player state:", player);

        switch (action) {


            case 'leisure':
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'leisure' }
                });
                break;

            case 'sleep':
                if (player.energy < 100) {
                    dispatch({ type: 'SLEEP' });
                    dispatch({ type: 'USE_TIME', payload: { amount: 30 } });
                } else {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You're already full of energy!" }
                    });
                }
                break;

            case 'study':
                if (player.energy < 10) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You're too tired to study!" }
                    });
                } else if (player.education >= 100) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You've reached maximum education!" }
                    });
                } else {
                    dispatch({ type: 'STUDY' });
                    dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
                    console.log("Dispatched USE_TIME with amount:", 15);
                }
                break;

            case 'work':
                if (!player.job) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You need to get a job first!" }
                    });
                } else if (player.energy < 15) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You're too tired to work!" }
                    });
                } else {
                    dispatch({ type: 'WORK' });
                    dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
                    console.log("Dispatched USE_TIME with amount:", 15);
                }
                break;

            case 'relax':
                if (player.energy < 5) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You're too tired to enjoy yourself!" }
                    });
                } else if (player.happiness >= 100) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You're already completely happy!" }
                    });
                } else {
                    dispatch({ type: 'RELAX' });
                    dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
                    console.log("Dispatched USE_TIME with amount:", 15);
                }
                break;

            case 'findJob':
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'job' }
                });
                break;

            case 'shop':
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'shop' }
                });
                break;

            case 'checkGoals':
                dispatch({ type: 'CHECK_GOALS' });
                break;

            case 'checkBalance':
                dispatch({
                    type: 'SET_MESSAGE',
                    payload: {
                        text: `Your cash: $${player.cash}. Savings account: $${player.bankAccount.savings}.`
                    }
                });
                break;

            case 'deposit':
                const depositAmount = action.amount || 50; // Default or use modal for custom amount
                if (player.cash >= depositAmount) {
                    dispatch({
                        type: 'DEPOSIT_MONEY',
                        payload: { amount: depositAmount }
                    });
                    dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
                } else {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You don't have enough cash to deposit that amount." }
                    });
                }
                break;

            case 'withdraw':
                const withdrawAmount = action.amount || 50; // Default or use modal for custom amount
                if (player.bankAccount.savings >= withdrawAmount) {
                    dispatch({
                        type: 'WITHDRAW_MONEY',
                        payload: { amount: withdrawAmount }
                    });
                    dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
                } else {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You don't have enough savings to withdraw that amount." }
                    });
                }
                break;


            case 'bank':
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'bank' }
                });
                break;


            default:
                break;
        }
        toast.success(`Action "${action}" executed successfully!`);
    };

    const goBackToMap = () => {
        dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'map' } });
    };

    return (
        <div className="location-detail mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{location.name}</h2>
                <button
                    onClick={goBackToMap}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded"
                >
                    Back to Map
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                    <img
                        src={location.image}
                        alt={location.name}
                        className="w-full md:w-80 h-60 object-cover rounded-lg"
                    />
                    <p className="mt-2 text-gray-300 text-sm">{location.description}</p>
                </div>

                <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-3">Available Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {location.actions.map(action => {
                            let actionName = '';
                            let actionDesc = '';

                            switch (action) {
                                case 'bank':
                                    actionName = 'Visit Bank';
                                    actionDesc = 'Manage your savings and view your finances';
                                    break;

                                case 'sleep':
                                    actionName = 'Sleep';
                                    actionDesc = 'Restore energy (Takes 30 time units)';
                                    break;
                                case 'study':
                                    actionName = 'Study';
                                    actionDesc = 'Gain education (Takes 15 time units, costs 10 energy)';
                                    break;
                                case 'work':
                                    actionName = player.job ? `Work as ${player.job.title}` : 'No job yet';
                                    actionDesc = player.job ? `Earn $${player.job.salary} (Takes 20 time units, costs 15 energy)` : 'Visit Employment Office to get a job';
                                    break;
                                case 'relax':
                                    actionName = 'Relax';
                                    actionDesc = 'Increase happiness (Takes 10 time units, costs 5 energy)';
                                    break;
                                case 'findJob':
                                    actionName = 'Look for a Job';
                                    actionDesc = 'See available job opportunities';
                                    break;
                                case 'shop':
                                    actionName = 'Go Shopping';
                                    actionDesc = 'Browse items for purchase';
                                    break;
                                case 'checkBalance':
                                    actionName = 'Check Account';
                                    actionDesc = 'View your current balance';
                                    break;
                                case 'checkGoals':
                                    actionName = 'Review Goals';
                                    actionDesc = 'Check your progress towards winning';
                                    break;
                                default:
                                    actionName = action;
                                    actionDesc = 'Perform this action';
                            }

                            return (
                                <button
                                    key={action}
                                    onClick={() => handleAction(action)}
                                    className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
                                >
                                    <span className="font-medium">{actionName}</span>
                                    <span className="text-xs text-blue-200">{actionDesc}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}