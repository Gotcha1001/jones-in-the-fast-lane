"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _player;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Updated initialState.js to support multiple players
var initialState = {
  isPlayerSelect: true,
  // Start with player selection
  player: (_player = {
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
      health: 80 // New stat for health/wellbeing

    },
    shares: [],
    // Initialize empty shares array
    education: 0
  }, _defineProperty(_player, "experience", 0), _defineProperty(_player, "happiness", 70), _defineProperty(_player, "energy", 100), _defineProperty(_player, "job", null), _defineProperty(_player, "possessions", []), _defineProperty(_player, "location", "apartment"), _defineProperty(_player, "week", 1), _defineProperty(_player, "timeLeft", 100), _player),
  players: [],
  // Will store all players
  currentPlayerId: 1,
  totalPlayers: 1,
  gameRunning: false,
  // Don't start until player selection is done
  gameWon: false,
  isWalking: false,
  viewingStats: false,
  // Add this line here
  currentScreen: "map",
  // "map", "location", "job", "shop"
  message: null,
  // Add these new properties for random events
  lastRandomEvent: null,
  showRandomEvent: false,
  goals: {
    cash: 10000,
    education: 80,
    happiness: 90,
    winningJobs: ["Executive", "Engineer", "Startup Founder", "Investor"]
  }
};
var _default = initialState;
exports["default"] = _default;