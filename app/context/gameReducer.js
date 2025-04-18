import { getRandomEvent } from "@/data/randomEvents";
import initialState from "./initialState";
import { jobs } from "@/data/jobs";

function gameReducer(state, action) {
  console.log("Action:", action.type, action.payload);
  console.log("State before:", state);

  const HANDLE_RANDOM_EVENT = "HANDLE_RANDOM_EVENT";

  switch (action.type) {
    // Add this case to your existing gameReducer within the switch statement
    case "HANDLE_RANDOM_EVENT":
      const event = action.payload.event;

      // Create a copy of the player with the event effects applied
      const playerAfterEvent = { ...state.player };

      // Apply all effects from the event
      Object.entries(event.effects).forEach(([stat, change]) => {
        // Handle each type of stat differently
        switch (stat) {
          case "cash":
            playerAfterEvent.cash = Math.max(0, playerAfterEvent.cash + change);
            break;
          case "happiness":
            playerAfterEvent.happiness = Math.max(
              0,
              Math.min(100, playerAfterEvent.happiness + change)
            );
            break;
          case "energy":
            playerAfterEvent.energy = Math.max(
              0,
              Math.min(100, playerAfterEvent.energy + change)
            );
            break;
          case "education":
            playerAfterEvent.education = Math.max(
              0,
              Math.min(100, playerAfterEvent.education + change)
            );
            break;
          case "experience":
            playerAfterEvent.experience = Math.max(
              0,
              Math.min(100, playerAfterEvent.experience + change)
            );
            break;
          // Add more cases if you have other player stats
        }
      });

      // Update the players array with this player's new stats
      const UpdatedPlayers = state.players.map((p) =>
        p.id === state.currentPlayerId ? playerAfterEvent : p
      );

      return {
        ...state,
        player: playerAfterEvent,
        players: UpdatedPlayers,
        lastRandomEvent: event, // Store the event for UI reference
        message: `${event.title}: ${event.description}`,
      };

    // Add these cases to your game reducer

    case "START_RELATIONSHIP":
      return {
        ...state,
        player: {
          ...state.player,
          relationship: {
            ...state.player.relationship,
            isDating: true,
            partner: action.payload.partner,
            dateCount: 1,
            happiness: 30, // Initial relationship happiness
            health: state.player.relationship?.health || 80, // Ensure health is initialized
          },
        },
        message: `You've started dating ${action.payload.partner.name}!`,
      };

    case "GO_ON_DATE":
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash - action.payload.cost,
          happiness: Math.min(
            state.player.happiness + action.payload.happinessBoost,
            100
          ),
          relationship: {
            ...state.player.relationship,
            dateCount: state.player.relationship.dateCount + 1,
            happiness: Math.min(state.player.relationship.happiness + 15, 100),
            health: Math.min(
              (state.player.relationship.health || 80) +
                action.payload.healthBoost,
              100
            ),
          },
        },
        message: `You had a wonderful date with ${action.payload.partner.name} and your relationship grew stronger!`,
      };
    case "BREAK_UP":
      const partnerName =
        state.player.relationship.partner?.name || "your partner";
      return {
        ...state,
        player: {
          ...state.player,
          happiness: Math.max(state.player.happiness - 15, 0), // Breaking up hurts
          relationship: {
            isDating: false,
            partner: null,
            dateCount: 0,
            happiness: 0,
            health: state.player.relationship?.health || 80, // Use existing value or default
          },
        },
        message: `You broke up with ${partnerName}. It's for the best, but it still hurts.`,
      };

    case "UPGRADE_APARTMENT":
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash - action.payload.upgradeFee,
          rental: {
            ...state.player.rental,
            lastPaidWeek: state.player.week, // Reset payment clock
            rentAmount: action.payload.rentAmount,
            rentDue: false, // Reset rent due status
          },
        },
        message: `You upgraded your apartment! New rent is $${action.payload.rentAmount} per month.`,
      };

    case "BUY_MEAL":
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash - action.payload.cost,
          energy: Math.min(state.player.energy + action.payload.energy, 100),
          happiness: Math.min(
            state.player.happiness + action.payload.happiness,
            100
          ),
        },
        message: `You enjoyed a ${action.payload.meal.name} for $${action.payload.cost}!`,
      };

    case "RENT_APARTMENT":
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash - action.payload.deposit,
          rental: {
            ...state.player.rental,
            hasApartment: true,
            lastPaidWeek: state.player.week,
            rentAmount: action.payload.rentAmount,
          },
        },
        message: `You rented an apartment for $${action.payload.rentAmount} per month with a $${action.payload.deposit} deposit.`,
      };

    case "PAY_RENT":
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash - state.player.rental.rentAmount,
          rental: {
            ...state.player.rental,
            lastPaidWeek: state.player.week,
            rentDue: false,
            missedPayments: 0,
          },
        },
        message: `You paid your rent of $${state.player.rental.rentAmount}.`,
      };

    case "CHECK_RENT_DUE":
      // Check if rent needs to be paid (every 4 weeks)
      const weeksSinceLastPayment = state.player.rental.lastPaidWeek
        ? state.player.week - state.player.rental.lastPaidWeek
        : 0;

      // If player has an apartment and hasn't paid in 4 or more weeks
      if (state.player.rental.hasApartment && weeksSinceLastPayment >= 4) {
        return {
          ...state,
          player: {
            ...state.player,
            rental: {
              ...state.player.rental,
              rentDue: true,
              missedPayments: state.player.rental.missedPayments + 1,
            },
            // Decrease happiness if rent is late
            happiness: Math.max(state.player.happiness - 15, 0),
          },
          message: "Your rent is due! Visit the Rental Office to pay.",
        };
      }
      return state;

    case "HYDRATE_STATE":
      // Replace the entire state with the saved state
      return {
        ...action.payload,
      };

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

    case "STUDY_SUBJECT":
      const { hours, subject } = action.payload;
      const baseGain = 2;
      const efficiency = 1 + (state.player.subjects[subject] || 0) / 100;
      const subjectGain = Math.floor(baseGain * hours * efficiency);
      const newSubjectLevel = Math.min(
        (state.player.subjects[subject] || 0) + subjectGain,
        100
      );

      // Update subjects
      const updatedSubjects = {
        ...state.player.subjects,
        [subject]: newSubjectLevel,
      };

      // Calculate education as the average of all subject levels
      const education = Math.floor(
        Object.values(updatedSubjects).reduce((sum, level) => sum + level, 0) /
          Object.keys(updatedSubjects).length
      );

      return {
        ...state,
        player: {
          ...state.player,
          subjects: updatedSubjects,
          education: education, // Update education stat
          energy: state.player.energy - hours * 2,
        },
        message: `You studied ${subject} for ${hours} hours and gained ${subjectGain} points!`,
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

    case "PURCHASE_HEALING_SERVICE":
      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash - action.payload.cost,
          relationship: {
            ...state.player.relationship,
            health: Math.min(
              state.player.relationship.health + action.payload.health,
              100
            ),
          },
          happiness: Math.min(
            state.player.happiness + action.payload.happiness,
            100
          ),
        },
        message: `You enjoyed a ${action.payload.service.name} for $${action.payload.cost}!`,
      };

    case "USE_TIME":
      // Skip time check if player is walking between locations
      if (state.isWalking) {
        console.log("Player is walking, skipping time check");
        return state;
      }

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

        // Initialize message variable
        let message = "";

        // Generate a random event for the week transition
        let randomEvent = null;
        if (Math.random() < 0.7) {
          randomEvent = getRandomEvent(updatedPlayer);

          // Apply event effects
          if (randomEvent && randomEvent.effects) {
            Object.entries(randomEvent.effects).forEach(([stat, change]) => {
              switch (stat) {
                case "cash":
                  updatedPlayer.cash = Math.max(0, updatedPlayer.cash + change);
                  break;
                case "happiness":
                  updatedPlayer.happiness = Math.max(
                    0,
                    Math.min(100, updatedPlayer.happiness + change)
                  );
                  break;
                case "energy":
                  updatedPlayer.energy = Math.max(
                    0,
                    Math.min(100, updatedPlayer.energy + change)
                  );
                  break;
                case "education":
                  updatedPlayer.education = Math.max(
                    0,
                    Math.min(100, updatedPlayer.education + change)
                  );
                  break;
                case "experience":
                  updatedPlayer.experience = Math.max(
                    0,
                    Math.min(100, updatedPlayer.experience + change)
                  );
                  break;
              }
            });
          }
        }

        // Check if rent is due - add null/undefined checks
        if (updatedPlayer.rental && updatedPlayer.rental.hasApartment) {
          const weeksSinceLastPayment = updatedPlayer.rental.lastPaidWeek
            ? updatedPlayer.week - updatedPlayer.rental.lastPaidWeek
            : 0;

          // If 4 weeks have passed since last payment
          if (weeksSinceLastPayment >= 4) {
            updatedPlayer.rental = {
              ...updatedPlayer.rental,
              rentDue: true,
              missedPayments: (updatedPlayer.rental.missedPayments || 0) + 1,
            };
            updatedPlayer.happiness = Math.max(updatedPlayer.happiness - 10, 0);
            message = `Week ${updatedPlayer.week} has begun! Your rent is due.`;
          }
        }

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

          // Make sure nextPlayer exists
          if (!nextPlayer) {
            console.error("Next player not found:", nextPlayerId);
            return state; // Return current state to avoid crashes
          }

          return {
            ...state,
            isWalking: false,
            players: updatedPlayers,
            currentPlayerId: nextPlayerId,
            player: nextPlayer, // Switch to next player
            currentScreen: "map",
            message:
              message ||
              `Player ${nextPlayerId}'s turn! Week ${nextPlayer.week} continues.`,
            lastRandomEvent: randomEvent,
            showRandomEvent: randomEvent !== null,
          };
        } else {
          // Single player mode - continue with same player, new week
          return {
            ...state,
            players: updatedPlayers,
            player: updatedPlayer,
            currentScreen: "map",
            message:
              message ||
              `Week ${updatedPlayer.week} has begun! You have a fresh 100 time units.`,
            lastRandomEvent: randomEvent,
            showRandomEvent: randomEvent !== null,
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

    // Add another case to dismiss the random event alert
    case "DISMISS_RANDOM_EVENT":
      return {
        ...state,
        showRandomEvent: false,
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
      let salary = state.player.job.salary;
      let garnishMessage = "";

      // Check if rent is overdue and apply garnishment
      if (state.player.rental.hasApartment && state.player.rental.rentDue) {
        // Calculate garnishment amount (e.g., 20% of salary)
        const garnishRate = 0.2;
        const garnishAmount = Math.floor(salary * garnishRate);

        // Reduce salary by garnishment amount
        salary -= garnishAmount;

        // Create garnishment message
        garnishMessage = `\nWages garnished: $${garnishAmount} due to overdue rent.`;
      }

      return {
        ...state,
        player: {
          ...state.player,
          cash: state.player.cash + salary,
          energy: state.player.energy - 15,
          experience: Math.min(state.player.experience + 2, 100),
        },
        message: `You worked and earned $${salary}!${garnishMessage}`,
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
      const { player } = state;
      const goals = player.goals; // Use player-specific goals
      const hasWinningJob =
        player.job && goals.winningJobs.includes(player.job.title);
      const hasLuxuryApartment =
        player.rental &&
        player.rental.hasApartment &&
        player.rental.rentAmount === 200;
      const hasGoodHealth = player.relationship.health >= 80;

      // Calculate education as the average of subject levels
      const subjectLevels = Object.values(player.subjects);
      const educationAverage = subjectLevels.length
        ? Math.floor(
            subjectLevels.reduce((sum, level) => sum + level, 0) /
              subjectLevels.length
          )
        : 0;
      const hasRequiredEducation = educationAverage >= goals.education;
      const hasRequiredSubjects = goals.winningJobs.some((jobTitle) => {
        const job = jobs.find((j) => j.title === jobTitle);
        return Object.entries(job.requiredSubjects).every(
          ([subject, level]) => (player.subjects[subject] || 0) >= level
        );
      });

      const achieved =
        player.cash >= goals.cash &&
        hasWinningJob &&
        hasLuxuryApartment &&
        hasGoodHealth &&
        hasRequiredEducation &&
        hasRequiredSubjects;

      const progressDetails = {
        cash: {
          current: player.cash,
          target: goals.cash,
          achieved: player.cash >= goals.cash,
        },
        job: {
          current: player.job?.title || "None",
          target: goals.winningJobs,
          achieved: hasWinningJob,
        },
        luxury: {
          current:
            player.rental?.rentAmount === 200
              ? "Luxury Apartment"
              : "Not Luxury",
          achieved: hasLuxuryApartment,
        },
        health: {
          current: player.relationship.health,
          target: 80,
          achieved: hasGoodHealth,
        },
        education: {
          current: educationAverage,
          target: goals.education,
          achieved: hasRequiredEducation,
        },
        subjects: {
          current: Object.entries(player.subjects).map(
            ([subject, level]) => `${subject}: ${level}`
          ),
          target: "Required subjects for winning job",
          achieved: hasRequiredSubjects,
        },
      };

      if (achieved) {
        return {
          ...state,
          gameWon: true,
          gameRunning: false,
          currentScreen: "gameOver",
          message:
            "🎉 Congratulations! You've won the game by achieving career success, luxury living, and excellent health! 🎉",
        };
      }

      return {
        ...state,
        message: "Here's your progress toward victory!",
        currentScreen: "goals",
        progressDetails,
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
      const initializedPlayers = action.payload.players.map((player) => ({
        ...initialState.player,
        id: player.id,
        name: player.name,
        avatar: player.avatar,
        goals: player.goals, // Use the goals provided by the player
        relationship: {
          ...initialState.player.relationship,
          health: 80,
        },
      }));

      if (initializedPlayers.length === 0) {
        initializedPlayers.push({ ...initialState.player });
      }

      return {
        ...state,
        isPlayerSelect: false,
        players: initializedPlayers,
        player: initializedPlayers[0],
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
