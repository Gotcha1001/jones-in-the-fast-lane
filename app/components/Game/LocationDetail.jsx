// // components/Game/LocationDetail.jsx

// import { useGame } from '@/app/context/GameContext';


// import { locations } from '@/data/locations';
// import { toast } from 'sonner';
// import { Button } from '../ui/button';

// export default function LocationDetail({ locationId }) {
//     const { state, dispatch } = useGame();
//     const { player } = state;
//     const location = locations[locationId];



//     // Helper function to handle both message and toast
//     const showMessage = (message, actionType = null) => {
//         // Set message in game state
//         dispatch({
//             type: 'SET_MESSAGE',
//             payload: { text: message }
//         });

//         // Show toast notification
//         toast.success(message);

//         // If there's an action type, dispatch it too
//         if (actionType) {
//             dispatch({ type: actionType });
//         }
//     };

//     const handleAction = (action) => {

//         console.log("Action triggered:", action, "Current player state:", player);

//         switch (action) {

//             case 'payRent':
//                 if (!player.rental.hasApartment) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You don't have an apartment to pay rent for." }
//                     });
//                     return;
//                 }

//                 if (player.cash < player.rental.rentAmount) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: `You don't have enough cash to pay the rent of $${player.rental.rentAmount}.` }
//                     });
//                     return;
//                 }

//                 dispatch({ type: 'PAY_RENT' });
//                 dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//                 break;

//             case 'rentApartment':
//                 if (player.rental.hasApartment) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You already have an apartment." }
//                     });
//                     return;
//                 }


//             // In your handleAction function, add a case for 'healingCentre':
//             case 'healingCentre':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'healingCentre' }
//                 });
//                 break;

//                 // Redirect to rental office
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'rentoffice' }
//                 });
//                 break;

//             case 'checkRentStatus':
//                 const weeksSinceLastPayment = player.rental.lastPaidWeek
//                     ? player.week - player.rental.lastPaidWeek
//                     : 0;

//                 if (!player.rental.hasApartment) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You don't have an apartment yet." }
//                     });
//                 } else if (player.rental.rentDue) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: `Your rent of $${player.rental.rentAmount} is due! You're ${weeksSinceLastPayment - 4} weeks late.` }
//                     });
//                 } else {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: `Your rent is $${player.rental.rentAmount} per month. Next payment due in ${4 - weeksSinceLastPayment} weeks.` }
//                     });
//                 }
//                 break;

//             // Make sure you add the rentoffice entry
//             case 'rentoffice':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'rentoffice' }
//                 });
//                 break;

//             // In your handleAction function, add a case for 'fastFood':
//             case 'fastFood':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'fastFood' }
//                 });
//                 break;


//             case 'leisure':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'leisure' }
//                 });
//                 break;

//             case 'sleep':
//                 if (player.energy < 100) {
//                     dispatch({ type: 'SLEEP' });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 30 } });
//                 } else {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You're already full of energy!" }
//                     });
//                 }
//                 break;

//             case 'apartment':
//                 if (!player?.rental?.hasApartment) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You need to rent an apartment first! Visit the Rental Office." }
//                     });
//                     toast.error("You need to rent an apartment first!");
//                     return;
//                 }
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'apartment' }
//                 });
//                 break;


//             case 'study':
//                 if (player.location === 'university') {
//                     // If at university, go to university screen
//                     dispatch({
//                         type: 'CHANGE_SCREEN',
//                         payload: { screen: 'university' }
//                     });
//                 } else if (player.energy < 10) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You're too tired to study!" }
//                     });
//                 } else if (player.education >= 100) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You've reached maximum education!" }
//                     });
//                 } else {
//                     dispatch({ type: 'STUDY' });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
//                 }
//                 break;

//             case 'work':
//                 if (!player.job) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You need to get a job first!" }
//                     });
//                 } else if (player.energy < 15) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You're too tired to work!" }
//                     });
//                 } else {
//                     dispatch({ type: 'WORK' });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
//                     console.log("Dispatched USE_TIME with amount:", 15);
//                 }
//                 break;

//             case 'workplace':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'workplace' }
//                 });
//                 break;



//             case 'relax':
//                 if (player.energy < 5) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You're too tired to enjoy yourself!" }
//                     });
//                 } else if (player.happiness >= 100) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You're already completely happy!" }
//                     });
//                 } else {
//                     dispatch({ type: 'RELAX' });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
//                     console.log("Dispatched USE_TIME with amount:", 15);
//                 }
//                 break;


//             // In your handleAction function, add a case for 'datingOffice':
//             case 'datingOffice':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'datingOffice' }
//                 });
//                 break;

//             case 'findJob':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'job' }
//                 });
//                 break;

//             case 'shop':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'shop' }
//                 });
//                 break;

//             case 'checkGoals':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'goals' }
//                 });
//                 break;

//             case 'checkBalance':
//                 dispatch({
//                     type: 'SET_MESSAGE',
//                     payload: {
//                         text: `Your cash: $${player.cash}. Savings account: $${player.bankAccount.savings}.`
//                     }
//                 });
//                 break;



//             case 'deposit':
//                 const depositAmount = action.amount || 50; // Default or use modal for custom amount
//                 if (player.cash >= depositAmount) {
//                     dispatch({
//                         type: 'DEPOSIT_MONEY',
//                         payload: { amount: depositAmount }
//                     });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//                 } else {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You don't have enough cash to deposit that amount." }
//                     });
//                 }
//                 break;

//             case 'withdraw':
//                 const withdrawAmount = action.amount || 50; // Default or use modal for custom amount
//                 if (player.bankAccount.savings >= withdrawAmount) {
//                     dispatch({
//                         type: 'WITHDRAW_MONEY',
//                         payload: { amount: withdrawAmount }
//                     });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//                 } else {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You don't have enough savings to withdraw that amount." }
//                     });
//                 }
//                 break;


//             case 'bank':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'bank' }
//                 });
//                 break;


//             default:
//                 break;
//         }
//         toast.success(`Action "${action}" executed successfully!`);
//     };

//     const goBackToMap = () => {
//         dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'map' } });
//     };

//     return (
//         <div className="location-detail mt-4">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">{location.name}</h2>
//                 <Button
//                     variant="sex2"
//                     onClick={goBackToMap}
//                     className="bg-indigo-500 hover:bg-purple-600 text-white py-1 px-3 rounded"
//                 >
//                     Back to Map
//                 </Button>
//             </div>

//             <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-shrink-0">
//                     <img
//                         src={location.image}
//                         alt={location.name}
//                         className="w-full md:w-80 h-72 object-cover rounded-lg"
//                     />
//                     <p className="mt-2 text-gray-300 text-lg font-bold text-center">{location.description}</p>
//                 </div>

//                 <div className="flex-grow">
//                     <h3 className="text-lg font-semibold mb-3">Available Actions</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         {location.actions.map(action => {
//                             let actionName = '';
//                             let actionDesc = '';

//                             switch (action) {
//                                 case 'bank':
//                                     actionName = 'Visit Bank';
//                                     actionDesc = 'Manage your savings and view your finances';
//                                     break;

//                                 case 'fastFood':
//                                     actionName = 'Order Food';
//                                     actionDesc = 'Grab something to eat';
//                                     break;

//                                 case 'sleep':
//                                     actionName = 'Sleep';
//                                     actionDesc = 'Restore energy (Takes 30 time units)';
//                                     break;
//                                 case 'study':
//                                     actionName = 'Study';
//                                     actionDesc = 'Gain education (Takes 15 time units, costs 10 energy)';
//                                     break;


//                                 //action to actually do work and earn money
//                                 case 'work':
//                                     actionName = player.job ? `Work as ${player.job.title}` : 'No job yet';
//                                     actionDesc = player.job ? `Earn $${player.job.salary} (Takes 20 time units, costs 15 energy)` : 'Visit Employment Office to get a job';
//                                     break;

//                                 //action to go to the workplace interface
//                                 case 'workplace':
//                                     actionName = 'Visit Workplace';
//                                     actionDesc = 'Go to your workplace interface';
//                                     break;


//                                 // Then in the action mapping section lower down
//                                 case 'healingCentre':
//                                     actionName = 'Visit Healing Centre';
//                                     actionDesc = 'Boost your health and wellbeing';
//                                     break;


//                                 case 'apartment':
//                                     actionName = 'Enter Apartment';
//                                     actionDesc = 'Visit your home to rest and organize';
//                                     break;

//                                 case 'rentoffice':
//                                     actionName = 'Enter Rent Office';
//                                     actionDesc = 'Visit Your Rent Office';
//                                     break;


//                                 case 'datingOffice':
//                                     actionName = 'Find a Date';
//                                     actionDesc = 'Meet someone special';
//                                     break;

//                                 case 'relax':
//                                     actionName = 'Relax';
//                                     actionDesc = 'Increase happiness (Takes 10 time units, costs 5 energy)';
//                                     break;
//                                 case 'findJob':
//                                     actionName = 'Look for a Job';
//                                     actionDesc = 'See available job opportunities';
//                                     break;
//                                 case 'shop':
//                                     actionName = 'Go Shopping';
//                                     actionDesc = 'Browse items for purchase';
//                                     break;
//                                 case 'checkBalance':
//                                     actionName = 'Check Account';
//                                     actionDesc = 'View your current balance';
//                                     break;
//                                 case 'checkGoals':
//                                     actionName = 'Review Goals';
//                                     actionDesc = 'Check your progress towards winning';
//                                     break;
//                                 default:
//                                     actionName = action;
//                                     actionDesc = 'Perform this action';
//                             }

//                             return (
//                                 <button
//                                     key={action}
//                                     onClick={() => handleAction(action)}
//                                     className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
//                                 >
//                                     <span className="font-medium">{actionName}</span>
//                                     <span className="text-xs text-blue-200">{actionDesc}</span>
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import { useGame } from '@/app/context/GameContext';
// import { locations } from '@/data/locations';
// import { toast } from 'sonner';
// import { Button } from '../ui/button';

// export default function LocationDetail({ locationId }) {
//     const { state, dispatch } = useGame();
//     const { player } = state;
//     const location = locations[locationId];

//     // Helper function to handle both message and toast
//     const showMessage = (message, actionType = null) => {
//         // Set message in game state
//         dispatch({
//             type: 'SET_MESSAGE',
//             payload: { text: message }
//         });

//         // Show toast notification
//         toast.success(message);

//         // If there's an action type, dispatch it too
//         if (actionType) {
//             dispatch({ type: actionType });
//         }
//     };

//     const handleAction = (action) => {
//         console.log("Action triggered:", action, "Current player state:", player);

//         let skipGenericToast = false; // Flag to skip generic toast for specific actions

//         switch (action) {
//             case 'payRent':
//                 if (!player.rental.hasApartment) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You don't have an apartment to pay rent for." }
//                     });
//                     return;
//                 }

//                 if (player.cash < player.rental.rentAmount) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: `You don't have enough cash to pay the rent of $${player.rental.rentAmount}.` }
//                     });
//                     return;
//                 }

//                 dispatch({ type: 'PAY_RENT' });
//                 dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//                 break;

//             case 'rentApartment':
//                 if (player.rental.hasApartment) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You already have an apartment." }
//                     });
//                     return;
//                 }

//                 // Redirect to rental office
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'rentoffice' }
//                 });
//                 break;

//             case 'healingCentre':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'healingCentre' }
//                 });
//                 break;

//             case 'checkRentStatus':
//                 const weeksSinceLastPayment = player.rental.lastPaidWeek
//                     ? player.week - player.rental.lastPaidWeek
//                     : 0;

//                 if (!player.rental.hasApartment) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You don't have an apartment yet." }
//                     });
//                 } else if (player.rental.rentDue) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: `Your rent of $${player.rental.rentAmount} is due! You're ${weeksSinceLastPayment - 4} weeks late.` }
//                     });
//                 } else {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: `Your rent is $${player.rental.rentAmount} per month. Next payment due in ${4 - weeksSinceLastPayment} weeks.` }
//                     });
//                 }
//                 break;

//             case 'rentoffice':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'rentoffice' }
//                 });
//                 break;

//             case 'fastFood':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'fastFood' }
//                 });
//                 break;

//             case 'leisure':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'leisure' }
//                 });
//                 break;

//             case 'sleep':
//                 if (player.energy < 100) {
//                     dispatch({ type: 'SLEEP' });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 30 } });
//                 } else {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You're already full of energy!" }
//                     });
//                 }
//                 break;

//             case 'apartment':
//                 if (!player?.rental?.hasApartment) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You need to rent an apartment first! Visit the Rental Office." }
//                     });
//                     toast.error("You need to rent an apartment first!");
//                     return;
//                 }
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'apartment' }
//                 });
//                 break;

//             case 'study':
//                 if (player.location === 'university') {
//                     dispatch({
//                         type: 'CHANGE_SCREEN',
//                         payload: { screen: 'university' }
//                     });
//                 } else if (player.energy < 10) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You're too tired to study!" }
//                     });
//                 } else if (player.education >= 100) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You've reached maximum education!" }
//                     });
//                 } else {
//                     dispatch({ type: 'STUDY' });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
//                 }
//                 break;

//             case 'work':
//                 if (!player.job) {
//                     showMessage("You need to get a job first!");
//                     skipGenericToast = true;
//                 } else if (player.energy < 15) {
//                     showMessage("You're too tired to work!");
//                     skipGenericToast = true;
//                 } else {
//                     dispatch({ type: 'WORK' });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
//                     showMessage(`You completed your work shift as ${player.job.title}!`);
//                     skipGenericToast = true;
//                     console.log("Dispatched USE_TIME with amount:", 15);
//                 }
//                 break;

//             case 'workplace':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'workplace' }
//                 });
//                 break;

//             case 'relax':
//                 if (player.energy < 5) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You're too tired to enjoy yourself!" }
//                     });
//                 } else if (player.happiness >= 100) {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You're already completely happy!" }
//                     });
//                 } else {
//                     dispatch({ type: 'RELAX' });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
//                     console.log("Dispatched USE_TIME with amount:", 15);
//                 }
//                 break;

//             case 'datingOffice':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'datingOffice' }
//                 });
//                 break;

//             case 'findJob':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'job' }
//                 });
//                 break;

//             case 'shop':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'shop' }
//                 });
//                 break;

//             case 'checkGoals':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'goals' }
//                 });
//                 break;

//             case 'checkBalance':
//                 dispatch({
//                     type: 'SET_MESSAGE',
//                     payload: {
//                         text: `Your cash: $${player.cash}. Savings account: $${player.bankAccount.savings}.`
//                     }
//                 });
//                 break;

//             case 'deposit':
//                 const depositAmount = action.amount || 50;
//                 if (player.cash >= depositAmount) {
//                     dispatch({
//                         type: 'DEPOSIT_MONEY',
//                         payload: { amount: depositAmount }
//                     });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//                 } else {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You don't have enough cash to deposit that amount." }
//                     });
//                 }
//                 break;

//             case 'withdraw':
//                 const withdrawAmount = action.amount || 50;
//                 if (player.bankAccount.savings >= withdrawAmount) {
//                     dispatch({
//                         type: 'WITHDRAW_MONEY',
//                         payload: { amount: withdrawAmount }
//                     });
//                     dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
//                 } else {
//                     dispatch({
//                         type: 'SET_MESSAGE',
//                         payload: { text: "You don't have enough savings to withdraw that amount." }
//                     });
//                 }
//                 break;

//             case 'bank':
//                 dispatch({
//                     type: 'CHANGE_SCREEN',
//                     payload: { screen: 'bank' }
//                 });
//                 break;

//             default:
//                 break;
//         }

//         // Skip generic toast for actions that handle their own toasts
//         if (!skipGenericToast) {
//             toast.success(`Action "${action}" executed successfully!`);
//         }
//     };

//     const goBackToMap = () => {
//         dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'map' } });
//     };

//     return (
//         <div className="location-detail mt-4">
//             <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold">{location.name}</h2>
//                 <Button
//                     variant="sex2"
//                     onClick={goBackToMap}
//                     className="bg-indigo-500 hover:bg-purple-600 text-white py-1 px-3 rounded"
//                 >
//                     Back to Map
//                 </Button>
//             </div>

//             <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-shrink-0">
//                     <img
//                         src={location.image}
//                         alt={location.name}
//                         className="w-full md:w-80 h-72 object-cover rounded-lg"
//                     />
//                     <p className="mt-2 text-gray-300 text-lg font-bold text-center">{location.description}</p>
//                 </div>

//                 <div className="flex-grow">
//                     <h3 className="text-lg font-semibold mb-3">Available Actions</h3>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         {location.actions.map(action => {
//                             let actionName = '';
//                             let actionDesc = '';

//                             switch (action) {
//                                 case 'bank':
//                                     actionName = 'Visit Bank';
//                                     actionDesc = 'Manage your savings and view your finances';
//                                     break;

//                                 case 'fastFood':
//                                     actionName = 'Order Food';
//                                     actionDesc = 'Grab something to eat';
//                                     break;

//                                 case 'sleep':
//                                     actionName = 'Sleep';
//                                     actionDesc = 'Restore energy (Takes 30 time units)';
//                                     break;
//                                 case 'study':
//                                     actionName = 'Study';
//                                     actionDesc = 'Gain education (Takes 15 time units, costs 10 energy)';
//                                     break;

//                                 case 'work':
//                                     actionName = player.job ? `Work as ${player.job.title}` : 'No job yet';
//                                     actionDesc = player.job ? `Earn $${player.job.salary} (Takes 20 time units, costs 15 energy)` : 'Visit Employment Office to get a job';
//                                     break;

//                                 case 'workplace':
//                                     actionName = 'Visit Workplace';
//                                     actionDesc = 'Go to your workplace interface';
//                                     break;

//                                 case 'healingCentre':
//                                     actionName = 'Visit Healing Centre';
//                                     actionDesc = 'Boost your health and wellbeing';
//                                     break;

//                                 case 'apartment':
//                                     actionName = 'Enter Apartment';
//                                     actionDesc = 'Visit your home to rest and organize';
//                                     break;

//                                 case 'rentoffice':
//                                     actionName = 'Enter Rent Office';
//                                     actionDesc = 'Visit Your Rent Office';
//                                     break;

//                                 case 'datingOffice':
//                                     actionName = 'Find a Date';
//                                     actionDesc = 'Meet someone special';
//                                     break;

//                                 case 'relax':
//                                     actionName = 'Relax';
//                                     actionDesc = 'Increase happiness (Takes 10 time units, costs 5 energy)';
//                                     break;
//                                 case 'findJob':
//                                     actionName = 'Look for a Job';
//                                     actionDesc = 'See available job opportunities';
//                                     break;
//                                 case 'shop':
//                                     actionName = 'Go Shopping';
//                                     actionDesc = 'Browse items for purchase';
//                                     break;
//                                 case 'checkBalance':
//                                     actionName = 'Check Account';
//                                     actionDesc = 'View your current balance';
//                                     break;
//                                 case 'checkGoals':
//                                     actionName = 'Review Goals';
//                                     actionDesc = 'Check your progress towards winning';
//                                     break;
//                                 default:
//                                     actionName = action;
//                                     actionDesc = 'Perform this action';
//                             }

//                             return (
//                                 <button
//                                     key={action}
//                                     onClick={() => handleAction(action)}
//                                     className="bg-blue-700 hover:bg-indigo-600 text-white py-2 px-4 rounded flex flex-col items-start"
//                                 >
//                                     <span className="font-medium">{actionName}</span>
//                                     <span className="text-xs text-blue-200">{actionDesc}</span>
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client"
import { useGame } from '@/app/context/GameContext';
import { locations } from '@/data/locations';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { initAudio, loadClickSound, loadLeisureMusic, playClickSound, playLeisureMusic, stopLeisureMusic } from '@/data/audioManager';
import { useEffect } from 'react';

export default function LocationDetail({ locationId }) {
    const { state, dispatch } = useGame();
    const { player } = state;
    const location = locations[locationId];

    // Helper function to handle both message and toast
    const showMessage = (message, actionType = null) => {
        // Set message in game state
        dispatch({
            type: 'SET_MESSAGE',
            payload: { text: message }
        });

        // Show toast notification
        toast.success(message);

        // If there's an action type, dispatch it too
        if (actionType) {
            dispatch({ type: actionType });
        }
    };

    const withSound = (handler) => (event) => {
        playClickSound()
        if (handler) {
            handler(event)
        }
    }



    useEffect(() => {
        initAudio();
        loadClickSound('/sounds/click.mp3').then((success) => {
            if (!success) {
                console.warn("Failed to load click sound")
            }
        })
        loadLeisureMusic('/sounds/leisuresound.mp3').then(() => {
            playLeisureMusic();
        });
        return () => {
            stopLeisureMusic();
        };
    }, []);

    const handleAction = (action) => {
        console.log("Action triggered:", action, "Current player state:", player);

        let skipGenericToast = false; // Flag to skip generic toast for specific actions

        switch (action) {
            case 'payRent': {
                if (!player?.rental?.hasApartment) {
                    showMessage("You don't have an apartment to pay rent for.");
                    return;
                }
                const weeksSinceLastPayment = player.rental.lastPaidWeek ? player.week - player.rental.lastPaidWeek : 0;
                if (!player.rental.rentDue && weeksSinceLastPayment < 4) {
                    showMessage("You've already paid your rent for this month!");
                    return;
                }

                if (player.cash < player.rental.rentAmount) {
                    showMessage(`You don't have enough cash to pay the rent of $${player.rental.rentAmount}.`);
                    return;
                }
                dispatch({ type: 'PAY_RENT' });
                dispatch({ type: 'USE_TIME', payload: { amount: 5 } });
                showMessage("Rent payment successful!");
                break;
            }

            case 'checkRentStatus': {
                const weeksSinceLastPayment = player.rental.lastPaidWeek
                    ? player.week - player.rental.lastPaidWeek
                    : 0;
                if (!player.rental.hasApartment) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You don't have an apartment yet." }
                    });
                } else if (player.rental.rentDue) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: `Your rent of $${player.rental.rentAmount} is due! You're ${weeksSinceLastPayment - 4} weeks late.` }
                    });
                } else {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: `Your rent is $${player.rental.rentAmount} per month. Next payment due in ${4 - weeksSinceLastPayment} weeks.` }
                    });
                }
                break;
            }

            case 'rentApartment':
                if (player.rental.hasApartment) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You already have an apartment." }
                    });
                    return;
                }

                // Redirect to rental office
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'rentoffice' }
                });
                break;

            case 'healingCentre':
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'healingCentre' }
                });
                break;

            case 'checkRentStatus':
                const weeksSinceLastPayment = player.rental.lastPaidWeek
                    ? player.week - player.rental.lastPaidWeek
                    : 0;

                if (!player.rental.hasApartment) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You don't have an apartment yet." }
                    });
                } else if (player.rental.rentDue) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: `Your rent of $${player.rental.rentAmount} is due! You're ${weeksSinceLastPayment - 4} weeks late.` }
                    });
                } else {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: `Your rent is $${player.rental.rentAmount} per month. Next payment due in ${4 - weeksSinceLastPayment} weeks.` }
                    });
                }
                break;

            case 'rentoffice':
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'rentoffice' }
                });
                break;

            case 'fastFood':
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'fastFood' }
                });
                break;

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

            case 'apartment':
                if (!player?.rental?.hasApartment) {
                    dispatch({
                        type: 'SET_MESSAGE',
                        payload: { text: "You need to rent an apartment first! Visit the Rental Office." }
                    });
                    toast.error("You need to rent an apartment first!");
                    return;
                }
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'apartment' }
                });
                break;

            case 'study':
                if (player.location === 'university') {
                    dispatch({
                        type: 'CHANGE_SCREEN',
                        payload: { screen: 'university' }
                    });
                } else if (player.energy < 10) {
                    showMessage("You're too tired to study!");
                    skipGenericToast = true;
                } else if (player.education >= 100) {
                    showMessage("You've reached maximum education!");
                    skipGenericToast = true;
                } else {
                    dispatch({ type: 'STUDY' });
                    dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
                    showMessage("You studied and gained education!");
                    skipGenericToast = true;
                }
                break;

            case 'work':
                if (!player.job) {
                    showMessage("You need to get a job first!");
                    skipGenericToast = true;
                } else if (player.energy < 15) {
                    showMessage("You're too tired to work!");
                    skipGenericToast = true;
                } else {
                    dispatch({ type: 'WORK' });
                    dispatch({ type: 'USE_TIME', payload: { amount: 15 } });
                    showMessage(`You completed your work shift as ${player.job.title}!`);
                    skipGenericToast = true;
                    console.log("Dispatched USE_TIME with amount:", 15);
                }
                break;

            case 'workplace':
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'workplace' }
                });
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

            case 'datingOffice':
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'datingOffice' }
                });
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
                dispatch({
                    type: 'CHANGE_SCREEN',
                    payload: { screen: 'goals' }
                });
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
                const depositAmount = action.amount || 50;
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
                const withdrawAmount = action.amount || 50;
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

        // Skip generic toast for actions that handle their own toasts
        if (!skipGenericToast) {
            toast.success(`Action "${action}" executed successfully!`);
        }
    };

    const goBackToMap = () => {
        dispatch({ type: 'CHANGE_SCREEN', payload: { screen: 'map' } });
    };

    return (
        <div className="location-detail mt-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{location.name}</h2>
                <Button
                    variant="sex2"
                    onClick={withSound(goBackToMap)}
                    className="bg-indigo-500 hover:bg-purple-600 text-white py-1 px-3 rounded"
                >
                    Back to Map
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                    <img
                        src={location.image}
                        alt={location.name}
                        className="w-full md:w-80 h-72 object-cover rounded-lg"
                    />
                    <p className="mt-2 text-gray-300 text-lg font-bold text-center">{location.description}</p>
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

                                case 'fastFood':
                                    actionName = 'Order Food';
                                    actionDesc = 'Grab something to eat';
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

                                case 'workplace':
                                    actionName = 'Visit Workplace';
                                    actionDesc = 'Go to your workplace interface';
                                    break;

                                case 'healingCentre':
                                    actionName = 'Visit Healing Centre';
                                    actionDesc = 'Boost your health and wellbeing';
                                    break;

                                case 'apartment':
                                    actionName = 'Enter Apartment';
                                    actionDesc = 'Visit your home to rest and organize';
                                    break;

                                case 'rentoffice':
                                    actionName = 'Enter Rent Office';
                                    actionDesc = 'Visit Your Rent Office';
                                    break;

                                case 'datingOffice':
                                    actionName = 'Find a Date';
                                    actionDesc = 'Meet someone special';
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
                                    onClick={withSound(() => handleAction(action))}
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