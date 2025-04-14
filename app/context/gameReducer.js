import initialState from "./initialState";

function gameReducer(state, action) {
  console.log("Action:", action.type, action.payload);
  console.log("State before:", state);

  switch (action.type) {
    case "SAVE_GAME":
      const saveSuccess = saveGame(state);
      return {
        ...state,
        message: saveSuccess
          ? "Game saved successfully!"
          : "Failed to save the game.",
      };

    case "LOAD_GAME":
      const savedGame = action.payload.savedGame;
      if (!savedGame) {
        return {
          ...state,
          message: "No saved game found or error loading game.",
        };
      }
      return {
        ...savedGame,
        message: "Game loaded successfully!",
      };

    // Add this to your existing gameReducer.js file within the switch statement

    case "STUDY_ADVANCED":
      const hours = action.payload.hours;
      // Calculate education gain based on current level (better efficiency as you learn)
      const baseGain = 2;
      const efficiency = 1 + state.player.education / 100; // Efficiency increases with education
      const educationGain = Math.floor(baseGain * hours * efficiency);

      return {
        ...state,
        player: {
          ...state.player,
          education: Math.min(state.player.education + educationGain, 100),
          energy: state.player.energy - hours * 2, // Each hour costs 2 energy
        },
        message: `You studied for ${hours} hours and gained ${educationGain} education points!`,
      };

    // This action is dispatched when the player chooses to do a leisure activity

    case "DO_LEISURE_ACTIVITY":
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash - action.payload.cost,
          happiness: Math.min(
            state.player.happiness + action.payload.happiness,
            100
          ),
          energy: state.player.energy - action.payload.energy,
        },
        message: `You enjoyed the activity and gained ${action.payload.happiness} happiness!`,
      };

    // NEW BANK ACTIONS FOR DEPOSITED AND WITHDRAWLS
    case "DEPOSIT_MONEY":
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash - action.payload.amount,
          bankAccount: {
            ...state.player.bankAccount,
            savings: state.player.bankAccount.savings + action.payload.amount,
          },
        },
        message: `Deposited $${action.payload.amount} into your savings account.`,
      };

    case "WITHDRAW_MONEY":
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash + action.payload.amount,
          bankAccount: {
            ...state.player.bankAccount,
            savings: state.player.bankAccount.savings - action.payload.amount,
          },
        },
        message: `Withdrew $${action.payload.amount} from your savings account.`,
      };

    case "CALCULATE_INTEREST":
      const interestRate = 0.05; // 5% interest
      const interest = Math.floor(
        state.player.bankAccount.savings * interestRate
      );
      return {
        ...state,
        player: {
          ...state.player,
          bankAccount: {
            ...state.player.bankAccount,
            savings: state.player.bankAccount.savings + interest,
            lastInterestDate: action.payload.date,
          },
        },
        message: `You earned $${interest} in interest!`,
      };

    case "BUY_SHARES":
      // Simply use the shares data from the payload directly
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash - action.payload.cost,
          shares: action.payload.shares,
        },
        message: `You bought ${action.payload.amount} shares for $${action.payload.cost}.`,
      };

    case "SELL_SHARES":
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash + action.payload.value,
          shares: action.payload.shares,
        },
        message: `You sold ${action.payload.amount} shares for $${action.payload.value}.`,
      };

    case "UPDATE_SHARES":
      // Get current owned shares
      const currentShares = state.player.shares || [];

      // Update prices while preserving ownership AND change values
      const newShares = action.payload.shares
        .filter((share) => {
          // Keep all shares that player owns
          const ownedShare = currentShares.find((s) => s.id === share.id);
          return ownedShare && ownedShare.owned > 0;
        })
        .map((share) => {
          const ownedShare = currentShares.find((s) => s.id === share.id);
          return {
            id: share.id,
            name: share.name,
            price: share.price,
            owned: ownedShare ? ownedShare.owned : 0,
            change: share.change, // Make sure to include the change property
          };
        });

      return {
        ...state,
        player: {
          ...state.player,
          shares: newShares,
        },
        message: "Stock market prices have been updated!",
      };

    case "MOVE_TO_LOCATION":
      return {
        ...state,
        isWalking: true,
      };

    case "COMPLETE_MOVE":
      return {
        ...state,
        isWalking: false,
        player: {
          ...state.player,
          location: action.payload.locationId,
        },
        currentScreen: "location",
      };

    case "CHANGE_SCREEN":
      return {
        ...state,
        currentScreen: action.payload.screen,
      };

    case "USE_TIME":
      const newTimeLeft = state.player.timeLeft - action.payload.amount;

      console.log("Processing USE_TIME:", {
        before: state.player.timeLeft,
        amount: action.payload.amount,
        after: newTimeLeft,
      });

      // If time runs out for current player
      if (newTimeLeft <= 0) {
        // Create updated player with new week and reset time
        const updatedPlayer = {
          ...state.player,
          week: state.player.week + 1,
          timeLeft: 100,
          energy: Math.min(state.player.energy + 20, 100),
          happiness:
            state.player.happiness > 50
              ? state.player.happiness - 5
              : state.player.happiness,
        };

        // Update the players array with the current player's updated info
        const updatedPlayers = state.players.map((p) =>
          p.id === state.currentPlayerId ? updatedPlayer : p
        );

        // Check if multiplayer mode
        if (state.totalPlayers > 1) {
          // Update players array but switch to next player
          const nextPlayerId =
            state.currentPlayerId === state.totalPlayers
              ? 1
              : state.currentPlayerId + 1;

          // Find the next player from the players array
          const nextPlayer = updatedPlayers.find((p) => p.id === nextPlayerId);

          return {
            ...state,
            players: updatedPlayers,
            currentPlayerId: nextPlayerId,
            player: nextPlayer, // Switch to next player
            currentScreen: "map",
            message: `Player ${nextPlayerId}'s turn! Week ${nextPlayer.week} continues.`,
          };
        } else {
          // Single player mode - continue with same player, new week
          return {
            ...state,
            players: updatedPlayers,
            player: updatedPlayer,
            currentScreen: "map",
            message: `Week ${updatedPlayer.week} has begun! You have a fresh 100 time units.`,
          };
        }
      }

      // If time still remains, update both player object and players array
      const updatedPlayer = {
        ...state.player,
        timeLeft: newTimeLeft,
      };

      // Make sure to update the player in the players array as well
      const updatedPlayers = state.players.map((p) =>
        p.id === state.currentPlayerId ? updatedPlayer : p
      );

      return {
        ...state,
        player: updatedPlayer,
        players: updatedPlayers,
      };

    // Add this case to your game reducer
    case "GAME_WON":
      return {
        ...state,
        gameWon: true,
        gameRunning: false,
        currentScreen: "gameOver",
        viewingStats: false, // Reset this when game is won
        message: "🎉 Congratulations! You've won the game! 🎉",
      };

    case "SLEEP":
      return {
        ...state,
        player: {
          ...state.player,
          energy: 100,
        },
        message: "You slept and restored your energy!",
      };

    case "STUDY":
      return {
        ...state,
        player: {
          ...state.player,
          education: Math.min(state.player.education + 5, 100),
          energy: state.player.energy - 10,
        },
        message: "You studied and gained 5 education points!",
      };

    case "WORK":
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash + state.player.job.salary,
          energy: state.player.energy - 15,
          experience: Math.min(state.player.experience + 2, 100),
        },
        message: `You worked and earned $${state.player.job.salary}!`,
      };

    case "GET_JOB":
      return {
        ...state,
        player: {
          ...state.player,
          job: action.payload.job,
        },
        currentScreen: "location",
        message: `Congratulations! You got the job as a ${action.payload.job.title}!`,
      };

    case "RELAX":
      return {
        ...state,
        player: {
          ...state.player,
          happiness: Math.min(state.player.happiness + 15, 100),
          energy: state.player.energy - 5,
        },
        message: "You relaxed and gained 15 happiness points!",
      };

    case "BUY_ITEM":
      const item = action.payload.item;
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash - item.price,
          possessions: [...state.player.possessions, item.name],
          energy: item.energy
            ? Math.min(state.player.energy + item.energy, 100)
            : state.player.energy,
          happiness: item.happiness
            ? Math.min(state.player.happiness + item.happiness, 100)
            : state.player.happiness,
        },
        message: `You bought ${item.name} for $${item.price}!`,
      };

    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload.text,
      };

    case "CLEAR_MESSAGE":
      return {
        ...state,
        message: null,
      };

    case "CHECK_GOALS":
      const { player, goals } = state;

      // Check if player has one of the winning jobs
      const hasWinningJob =
        player.job && goals.winningJobs.includes(player.job.title);

      const achieved =
        player.cash >= goals.cash &&
        player.education >= goals.education &&
        player.happiness >= goals.happiness &&
        hasWinningJob;

      console.log("Checking goals:", {
        achieved,
        cash: `${player.cash}/${goals.cash}`,
        education: `${player.education}/${goals.education}`,
        happiness: `${player.happiness}/${goals.happiness}`,
        job: `${
          player.job ? player.job.title : "None"
        }/${goals.winningJobs.join(" or ")}`,
      });

      if (achieved) {
        return {
          ...state,
          gameWon: true,
          gameRunning: false,
          currentScreen: "gameOver",
          message: "🎉 Congratulations! You've won the game! 🎉",
        };
      }

      return {
        ...state,
        message: "Keep working toward your goals!",
      };

    case "RESTART_GAME":
      return {
        ...initialState,
        isPlayerSelect: true,
        viewingStats: false, // Make sure this is reset
      };

    case "SET_VIEWING_STATS":
      return {
        ...state,
        viewingStats: action.payload.viewingStats,
      };

    case "START_GAME":
      // Make sure players are correctly added to the players array
      const initializedPlayers = action.payload.players.map((player) => ({
        ...initialState.player,
        id: player.id,
        name: player.name,
        avatar: player.avatar,
      }));

      if (initializedPlayers.length === 0) {
        // Fallback if no players provided
        initializedPlayers.push({ ...initialState.player });
      }

      return {
        ...state,
        isPlayerSelect: false,
        players: initializedPlayers,
        player: initializedPlayers[0], // Make sure player references the first element in players
        currentPlayerId: 1,
        totalPlayers: action.payload.numPlayers,
        gameRunning: true,
        currentScreen: "map",
      };

    case "END_PLAYER_TURN":
      const nextPlayerId =
        state.currentPlayerId === state.totalPlayers
          ? 1
          : state.currentPlayerId + 1;

      return {
        ...state,
        currentPlayerId: nextPlayerId,
        player: state.players.find((p) => p.id === nextPlayerId),
        message: `Player ${nextPlayerId}'s turn!`,
      };

    default:
      return state;
  }
}

export default gameReducer;
