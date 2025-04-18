import { getRandomEvent } from "@/data/randomEvents";
import initialState from "./initialState";
import { jobs } from "@/data/jobs";

function gameReducer(state, action) {
  console.log("Action:", action.type, action.payload);
  console.log("State before:", state);

  const HANDLE_RANDOM_EVENT = "HANDLE_RANDOM_EVENT";

  switch (action.type) {
    case "HANDLE_RANDOM_EVENT":
      const event = action.payload.event;
      const playerAfterEvent = { ...state.player };
      Object.entries(event.effects).forEach(([stat, change]) => {
        switch (stat) {
          case "cash":
            playerAfterEvent.cash = Math.max(
              0,
              (playerAfterEvent.cash || 0) + change
            );
            break;
          case "happiness":
            playerAfterEvent.happiness = Math.max(
              0,
              Math.min(100, (playerAfterEvent.happiness || 0) + change)
            );
            break;
          case "energy":
            playerAfterEvent.energy = Math.max(
              0,
              Math.min(100, (playerAfterEvent.energy || 0) + change)
            );
            break;
          case "education":
            playerAfterEvent.education = Math.max(
              0,
              Math.min(100, (playerAfterEvent.education || 0) + change)
            );
            break;
          case "experience":
            playerAfterEvent.experience = Math.max(
              0,
              Math.min(100, (playerAfterEvent.experience || 0) + change)
            );
            break;
        }
      });
      const UpdatedPlayers = state.players.map((p) =>
        p.id === state.currentPlayerId ? playerAfterEvent : p
      );
      return {
        ...state,
        player: playerAfterEvent,
        players: UpdatedPlayers,
        lastRandomEvent: event,
        message: `${event.title}: ${event.description}`,
      };

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
            happiness: 30,
            health: state.player.relationship?.health || 80,
          },
        },
        message: `You've started dating ${action.payload.partner.name}!`,
      };

    case "GO_ON_DATE":
      return {
        ...state,
        player: {
          ...state.player,
          cash: (state.player.cash || 0) - action.payload.cost,
          happiness: Math.min(
            (state.player.happiness || 0) + action.payload.happinessBoost,
            100
          ),
          relationship: {
            ...state.player.relationship,
            dateCount: state.player.relationship.dateCount + 1,
            happiness: Math.min(
              (state.player.relationship.happiness || 0) + 15,
              100
            ),
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
          happiness: Math.max((state.player.happiness || 0) - 15, 0),
          relationship: {
            isDating: false,
            partner: null,
            dateCount: 0,
            happiness: 0,
            health: state.player.relationship?.health || 80,
          },
        },
        message: `You broke up with ${partnerName}. It's for the best, but it still hurts.`,
      };

    case "UPGRADE_APARTMENT":
      return {
        ...state,
        player: {
          ...state.player,
          cash: (state.player.cash || 0) - action.payload.upgradeFee,
          rental: {
            ...state.player.rental,
            lastPaidWeek: state.player.week,
            rentAmount: action.payload.rentAmount,
            rentDue: false,
          },
        },
        message: `You upgraded your apartment! New rent is $${action.payload.rentAmount} per month.`,
      };

    case "BUY_MEAL":
      return {
        ...state,
        player: {
          ...state.player,
          cash: (state.player.cash || 0) - action.payload.cost,
          energy: Math.min(
            (state.player.energy || 0) + action.payload.energy,
            100
          ),
          happiness: Math.min(
            (state.player.happiness || 0) + action.payload.happiness,
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
          cash: (state.player.cash || 0) - action.payload.deposit,
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
          cash: (state.player.cash || 0) - state.player.rental.rentAmount,
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
      const weeksSinceLastPayment = state.player.rental.lastPaidWeek
        ? state.player.week - state.player.rental.lastPaidWeek
        : 0;
      if (state.player.rental.hasApartment && weeksSinceLastPayment >= 4) {
        return {
          ...state,
          player: {
            ...state.player,
            rental: {
              ...state.player.rental,
              rentDue: true,
              missedPayments: (state.player.rental.missedPayments || 0) + 1,
            },
            happiness: Math.max((state.player.happiness || 0) - 15, 0),
          },
          message: "Your rent is due! Visit the Rental Office to pay.",
        };
      }
      return state;

    case "HYDRATE_STATE":
      return {
        ...action.payload,
        player: {
          ...action.payload.player,
          cash: action.payload.player.cash || 0, // Ensure cash is defined
        },
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
        player: {
          ...savedGame.player,
          cash: savedGame.player.cash || 0, // Ensure cash is defined
        },
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
      const updatedSubjects = {
        ...state.player.subjects,
        [subject]: newSubjectLevel,
      };
      const education = Math.floor(
        Object.values(updatedSubjects).reduce((sum, level) => sum + level, 0) /
          Object.keys(updatedSubjects).length
      );
      return {
        ...state,
        player: {
          ...state.player,
          subjects: updatedSubjects,
          education,
          energy: (state.player.energy || 0) - hours * 2,
        },
        message: `You studied ${subject} for ${hours} hours and gained ${subjectGain} points!`,
      };

    case "DO_LEISURE_ACTIVITY":
      return {
        ...state,
        player: {
          ...state.player,
          cash: (state.player.cash || 0) - action.payload.cost,
          happiness: Math.min(
            (state.player.happiness || 0) + action.payload.happiness,
            100
          ),
          energy: (state.player.energy || 0) - action.payload.energy,
        },
        message: `You enjoyed the activity and gained ${action.payload.happiness} happiness!`,
      };

    case "DEPOSIT_MONEY":
      return {
        ...state,
        player: {
          ...state.player,
          cash: (state.player.cash || 0) - action.payload.amount,
          bankAccount: {
            ...state.player.bankAccount,
            savings:
              (state.player.bankAccount.savings || 0) + action.payload.amount,
          },
        },
        message: `Deposited $${action.payload.amount} into your savings account.`,
      };

    case "WITHDRAW_MONEY":
      return {
        ...state,
        player: {
          ...state.player,
          cash: (state.player.cash || 0) + action.payload.amount,
          bankAccount: {
            ...state.player.bankAccount,
            savings:
              (state.player.bankAccount.savings || 0) - action.payload.amount,
          },
        },
        message: `Withdrew $${action.payload.amount} from your savings account.`,
      };

    case "CALCULATE_INTEREST":
      const interestRate = 0.05;
      const interest = Math.floor(
        (state.player.bankAccount.savings || 0) * interestRate
      );
      return {
        ...state,
        player: {
          ...state.player,
          bankAccount: {
            ...state.player.bankAccount,
            savings: (state.player.bankAccount.savings || 0) + interest,
            lastInterestDate: action.payload.date,
          },
        },
        message: `You earned $${interest} in interest!`,
      };

    case "BUY_SHARES":
      return {
        ...state,
        player: {
          ...state.player,
          cash: (state.player.cash || 0) - action.payload.cost,
          shares: action.payload.shares,
        },
        message: `You bought ${action.payload.amount} shares for $${action.payload.cost}.`,
      };

    case "SELL_SHARES":
      return {
        ...state,
        player: {
          ...state.player,
          cash: (state.player.cash || 0) + action.payload.value,
          shares: action.payload.shares,
        },
        message: `You sold ${action.payload.amount} shares for $${action.payload.value}.`,
      };

    case "UPDATE_SHARES":
      const currentShares = state.player.shares || [];
      const newShares = action.payload.shares
        .filter((share) => {
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
            change: share.change,
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
          cash: (state.player.cash || 0) - action.payload.cost,
          relationship: {
            ...state.player.relationship,
            health: Math.min(
              (state.player.relationship.health || 0) + action.payload.health,
              100
            ),
          },
          happiness: Math.min(
            (state.player.happiness || 0) + action.payload.happiness,
            100
          ),
        },
        message: `You enjoyed a ${action.payload.service.name} for $${action.payload.cost}!`,
      };

    case "USE_TIME":
      if (state.isWalking) {
        console.log("Player is walking, skipping time check");
        return state;
      }
      const newTimeLeft = (state.player.timeLeft || 0) - action.payload.amount;
      console.log("Processing USE_TIME:", {
        before: state.player.timeLeft,
        amount: action.payload.amount,
        after: newTimeLeft,
      });
      if (newTimeLeft <= 0) {
        const updatedPlayer = {
          ...state.player,
          week: (state.player.week || 0) + 1,
          timeLeft: 100,
          energy: Math.min((state.player.energy || 0) + 20, 100),
          happiness:
            (state.player.happiness || 0) > 50
              ? (state.player.happiness || 0) - 5
              : state.player.happiness || 0,
          cash: state.player.cash || 0, // Ensure cash is defined
        };
        let message = "";
        let randomEvent = null;
        if (Math.random() < 0.7) {
          randomEvent = getRandomEvent(updatedPlayer);
          if (randomEvent && randomEvent.effects) {
            Object.entries(randomEvent.effects).forEach(([stat, change]) => {
              switch (stat) {
                case "cash":
                  updatedPlayer.cash = Math.max(
                    0,
                    (updatedPlayer.cash || 0) + change
                  );
                  break;
                case "happiness":
                  updatedPlayer.happiness = Math.max(
                    0,
                    Math.min(100, (updatedPlayer.happiness || 0) + change)
                  );
                  break;
                case "energy":
                  updatedPlayer.energy = Math.max(
                    0,
                    Math.min(100, (updatedPlayer.energy || 0) + change)
                  );
                  break;
                case "education":
                  updatedPlayer.education = Math.max(
                    0,
                    Math.min(100, (updatedPlayer.education || 0) + change)
                  );
                  break;
                case "experience":
                  updatedPlayer.experience = Math.max(
                    0,
                    Math.min(100, (updatedPlayer.experience || 0) + change)
                  );
                  break;
              }
            });
          }
        }
        if (updatedPlayer.rental && updatedPlayer.rental.hasApartment) {
          const weeksSinceLastPayment = updatedPlayer.rental.lastPaidWeek
            ? updatedPlayer.week - updatedPlayer.rental.lastPaidWeek
            : 0;
          if (weeksSinceLastPayment >= 4) {
            updatedPlayer.rental = {
              ...updatedPlayer.rental,
              rentDue: true,
              missedPayments: (updatedPlayer.rental.missedPayments || 0) + 1,
            };
            updatedPlayer.happiness = Math.max(
              (updatedPlayer.happiness || 0) - 10,
              0
            );
            message = `Week ${updatedPlayer.week} has begun! Your rent is due.`;
          }
        }
        const updatedPlayers = state.players.map((p) =>
          p.id === state.currentPlayerId ? updatedPlayer : p
        );
        if (state.totalPlayers > 1) {
          const nextPlayerId =
            state.currentPlayerId === state.totalPlayers
              ? 1
              : state.currentPlayerId + 1;
          const nextPlayer = updatedPlayers.find((p) => p.id === nextPlayerId);
          if (!nextPlayer) {
            console.error("Next player not found:", nextPlayerId);
            return state;
          }
          return {
            ...state,
            isWalking: false,
            players: updatedPlayers,
            currentPlayerId: nextPlayerId,
            player: nextPlayer,
            currentScreen: "map",
            message:
              message ||
              `Player ${nextPlayerId}'s turn! Week ${nextPlayer.week} continues.`,
            lastRandomEvent: randomEvent,
            showRandomEvent: randomEvent !== null,
          };
        } else {
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
      const updatedPlayer = {
        ...state.player,
        timeLeft: newTimeLeft,
        cash: state.player.cash || 0, // Ensure cash is defined
      };
      const updatedPlayers = state.players.map((p) =>
        p.id === state.currentPlayerId ? updatedPlayer : p
      );
      return {
        ...state,
        player: updatedPlayer,
        players: updatedPlayers,
      };

    case "DISMISS_RANDOM_EVENT":
      return {
        ...state,
        showRandomEvent: false,
      };

    case "GAME_WON":
      return {
        ...state,
        gameWon: true,
        gameRunning: false,
        currentScreen: "gameOver",
        viewingStats: false,
        player: {
          ...state.player,
          cash: state.player.cash || 0, // Ensure cash is defined
        },
        message: "🎉 Congratulations! You've won the game! 🎉",
      };

    case "SLEEP":
      return {
        ...state,
        player: {
          ...state.player,
          energy: 100,
          cash: state.player.cash || 0, // Ensure cash is defined
        },
        message: "You slept and restored your energy!",
      };

    case "STUDY":
      return {
        ...state,
        player: {
          ...state.player,
          education: Math.min((state.player.education || 0) + 5, 100),
          energy: (state.player.energy || 0) - 10,
          cash: state.player.cash || 0, // Ensure cash is defined
        },
        message: "You studied and gained 5 education points!",
      };

    case "WORK":
      let salary = state.player.job?.salary || 0;
      let garnishMessage = "";
      if (state.player.rental.hasApartment && state.player.rental.rentDue) {
        const garnishRate = 0.2;
        const garnishAmount = Math.floor(salary * garnishRate);
        salary -= garnishAmount;
        garnishMessage = `\nWages garnished: $${garnishAmount} due to overdue rent.`;
      }
      return {
        ...state,
        player: {
          ...state.player,
          cash: (state.player.cash || 0) + salary,
          energy: (state.player.energy || 0) - 15,
          experience: Math.min((state.player.experience || 0) + 2, 100),
        },
        message: `You worked and earned $${salary}!${garnishMessage}`,
      };

    case "GET_JOB":
      return {
        ...state,
        player: {
          ...state.player,
          job: action.payload.job,
          cash: state.player.cash || 0, // Ensure cash is defined
        },
        currentScreen: "location",
        message: `Congratulations! You got the job as a ${action.payload.job.title}!`,
      };

    case "RELAX":
      return {
        ...state,
        player: {
          ...state.player,
          happiness: Math.min((state.player.happiness || 0) + 15, 100),
          energy: (state.player.energy || 0) - 5,
          cash: state.player.cash || 0, // Ensure cash is defined
        },
        message: "You relaxed and gained 15 happiness points!",
      };

    case "BUY_ITEM":
      const item = action.payload.item;
      return {
        ...state,
        player: {
          ...state.player,
          cash: (state.player.cash || 0) - item.price,
          possessions: [...(state.player.possessions || []), item.name],
          energy: item.energy
            ? Math.min((state.player.energy || 0) + item.energy, 100)
            : state.player.energy || 0,
          happiness: item.happiness
            ? Math.min((state.player.happiness || 0) + item.happiness, 100)
            : state.player.happiness || 0,
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
      const goals = player.goals;
      const hasWinningJob =
        player.job && goals.winningJobs.includes(player.job.title);
      const hasLuxuryApartment =
        player.rental &&
        player.rental.hasApartment &&
        player.rental.rentAmount === 200;
      const hasGoodHealth = (player.relationship.health || 0) >= 80;
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
        (player.cash || 0) >= goals.cash &&
        hasWinningJob &&
        hasLuxuryApartment &&
        hasGoodHealth &&
        hasRequiredEducation &&
        hasRequiredSubjects;
      const progressDetails = {
        cash: {
          current: player.cash || 0,
          target: goals.cash,
          achieved: (player.cash || 0) >= goals.cash,
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
          current: player.relationship.health || 0,
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
          player: {
            ...state.player,
            cash: state.player.cash || 0, // Ensure cash is defined
          },
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
        viewingStats: false,
        player: {
          ...initialState.player,
          cash: initialState.player.cash || 0, // Ensure cash is defined
        },
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
        goals: player.goals,
        relationship: {
          ...initialState.player.relationship,
          health: 80,
        },
        cash: initialState.player.cash || 0, // Ensure cash is defined
      }));
      if (initializedPlayers.length === 0) {
        initializedPlayers.push({
          ...initialState.player,
          cash: initialState.player.cash || 0, // Ensure cash is defined
        });
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
      const nextPlayer = state.players.find((p) => p.id === nextPlayerId);
      if (!nextPlayer) {
        console.error("Next player not found:", nextPlayerId);
        return state;
      }
      return {
        ...state,
        currentPlayerId: nextPlayerId,
        player: {
          ...nextPlayer,
          cash: nextPlayer.cash || 0, // Ensure cash is defined
        },
        message: `Player ${nextPlayerId}'s turn!`,
      };

    default:
      return state;
  }
}

export default gameReducer;
