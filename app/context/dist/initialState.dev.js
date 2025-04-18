"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Updated initialState.js to support multiple players
// const initialState = {
//   isPlayerSelect: true, // Start with player selection
//   player: {
//     id: 1,
//     name: "Jones",
//     avatar: "👤",
//     cash: 200,
//     subjects: {
//       engineering: 0,
//       computerScience: 0,
//       business: 0,
//       liberalArts: 0,
//     },
//     experience: 0,
//     rental: {
//       hasApartment: false,
//       lastPaidWeek: null,
//       rentAmount: 50,
//       rentDue: false,
//       missedPayments: 0,
//     },
//     bankAccount: {
//       savings: 0,
//       lastInterestDate: null,
//     },
//     relationship: {
//       isDating: false,
//       partner: null,
//       dateCount: 0,
//       happiness: 0,
//       health: 80, // New stat for health/wellbeing
//     },
//     shares: [], // Initialize empty shares array
//     education: 0,
//     experience: 0,
//     happiness: 70,
//     energy: 100,
//     job: null,
//     possessions: [],
//     location: "apartment",
//     week: 1,
//     timeLeft: 100,
//   },
//   players: [], // Will store all players
//   currentPlayerId: 1,
//   totalPlayers: 1,
//   gameRunning: false, // Don't start until player selection is done
//   gameWon: false,
//   isWalking: false,
//   viewingStats: false, // Add this line here
//   currentScreen: "map", // "map", "location", "job", "shop"
//   message: null,
//   // Add these new properties for random events
//   lastRandomEvent: null,
//   showRandomEvent: false,
//   goals: {
//     cash: 10000,
//     education: 80,
//     happiness: 90,
//     winningJobs: ["Executive", "Engineer", "Startup Founder", "Investor"],
//   },
// };
// export default initialState;
// initialState.js
var initialState = {
  isPlayerSelect: true,
  player: {
    id: 1,
    name: "Jones",
    avatar: "👤",
    cash: 200,
    subjects: {
      engineering: 0,
      computerScience: 0,
      business: 0,
      liberalArts: 0
    },
    experience: 0,
    rental: {
      hasApartment: false,
      lastPaidWeek: null,
      rentAmount: 50,
      rentDue: false,
      missedPayments: 0
    },
    bankAccount: {
      savings: 0,
      lastInterestDate: null
    },
    relationship: {
      isDating: false,
      partner: null,
      dateCount: 0,
      happiness: 0,
      health: 80
    },
    shares: [],
    education: 0,
    happiness: 70,
    energy: 100,
    job: null,
    possessions: [],
    location: "apartment",
    week: 1,
    timeLeft: 100,
    goals: {
      cash: 10000,
      education: 80,
      happiness: 90,
      winningJobs: ["Executive", "Engineer", "Startup Founder", "Investor"]
    }
  },
  players: [],
  currentPlayerId: 1,
  totalPlayers: 1,
  gameRunning: false,
  gameWon: false,
  isWalking: false,
  viewingStats: false,
  currentScreen: "map",
  message: null,
  lastRandomEvent: null,
  showRandomEvent: false
};
var _default = initialState;
exports["default"] = _default;