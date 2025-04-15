// Updated initialState.js to support multiple players
const initialState = {
  isPlayerSelect: true, // Start with player selection
  player: {
    id: 1,
    name: "Jones",
    avatar: "👤",
    cash: 200,
    rental: {
      hasApartment: false,
      lastPaidWeek: null,
      rentAmount: 50,
      rentDue: false,
      missedPayments: 0,
    },
    bankAccount: {
      savings: 0,
      lastInterestDate: null,
    },
    shares: [], // Initialize empty shares array
    education: 0,
    experience: 0,
    happiness: 70,
    energy: 100,
    job: null,
    possessions: [],
    location: "apartment",
    week: 1,
    timeLeft: 100,
  },
  players: [], // Will store all players
  currentPlayerId: 1,
  totalPlayers: 1,
  gameRunning: false, // Don't start until player selection is done
  gameWon: false,
  isWalking: false,
  viewingStats: false, // Add this line here
  currentScreen: "map", // "map", "location", "job", "shop"
  message: null,
  goals: {
    cash: 10000,
    education: 80,
    happiness: 90,
    winningJobs: ["Executive", "Engineer", "Startup Founder", "Investor"],
  },
};

export default initialState;
