// data/randomEvents.js

// Categories help organize events by their general effect
const EVENT_CATEGORIES = {
  FINANCIAL_POSITIVE: "financial_positive",
  FINANCIAL_NEGATIVE: "financial_negative",
  HEALTH: "health",
  HAPPINESS: "happiness",
  MIXED: "mixed",
  NEUTRAL: "neutral",
};

// Collection of possible random events that can occur between weeks
export const randomEvents = [
  {
    id: "found_money",
    category: EVENT_CATEGORIES.FINANCIAL_POSITIVE,
    title: "Found Money!",
    description: "You found $50 on the street!",
    effects: {
      cash: 50,
    },
    probability: 10, // Higher numbers = more likely
  },
  // Add to your existing `randomEvents` array:

  {
    id: "lost_keys",
    category: EVENT_CATEGORIES.FINANCIAL_NEGATIVE,
    title: "Lost Your Keys",
    description: "You had to replace your house keys and locks. Not cheap!",
    effects: {
      cash: -90,
      happiness: -5,
    },
    probability: 6,
  },
  {
    id: "gym_progress",
    category: EVENT_CATEGORIES.HEALTH,
    title: "Gym Progress!",
    description: "You've been consistent with your workouts and feel stronger.",
    effects: {
      energy: 10,
      happiness: 5,
    },
    probability: 7,
  },
  {
    id: "won_contest",
    category: EVENT_CATEGORIES.FINANCIAL_POSITIVE,
    title: "Won a Contest!",
    description: "You entered a random contest and surprisingly won $125!",
    effects: {
      cash: 125,
      happiness: 10,
    },
    probability: 4,
  },
  {
    id: "overslept_work",
    category: EVENT_CATEGORIES.MIXED,
    title: "Overslept for Work",
    description: "You slept in and missed an important meeting.",
    effects: {
      happiness: -5,
      energy: 20,
    },
    condition: (player) => player.job !== null,
    probability: 6,
  },
  {
    id: "new_hobby",
    category: EVENT_CATEGORIES.HAPPINESS,
    title: "Discovered a New Hobby",
    description: "You tried painting for the first time and loved it.",
    effects: {
      happiness: 12,
      energy: -5,
    },
    probability: 9,
  },
  {
    id: "burnt_dinner",
    category: EVENT_CATEGORIES.NEUTRAL,
    title: "Burnt Your Dinner",
    description:
      "Tried cooking something new. Let's just say... it didn’t work.",
    effects: {
      happiness: -3,
    },
    probability: 8,
  },
  {
    id: "random_tip",
    category: EVENT_CATEGORIES.FINANCIAL_POSITIVE,
    title: "Generous Tip",
    description: "A stranger tipped you $40 for a kind gesture.",
    effects: {
      cash: 40,
      happiness: 5,
    },
    probability: 9,
  },
  {
    id: "bike_flat",
    category: EVENT_CATEGORIES.FINANCIAL_NEGATIVE,
    title: "Flat Tire",
    description: "Your bike got a flat and needed a quick repair.",
    effects: {
      cash: -30,
      energy: -5,
    },
    probability: 8,
  },
  {
    id: "early_payment",
    category: EVENT_CATEGORIES.FINANCIAL_POSITIVE,
    title: "Early Payment",
    description: "You received an early payment for freelance work.",
    effects: {
      cash: 85,
      happiness: 5,
    },
    condition: (player) => player.job === "freelancer",
    probability: 5,
  },
  {
    id: "too_much_coffee",
    category: EVENT_CATEGORIES.MIXED,
    title: "Too Much Coffee",
    description: "You drank way too much coffee... jittery but focused.",
    effects: {
      energy: -10,
      education: 3,
    },
    probability: 7,
  },

  {
    id: "tax_refund",
    category: EVENT_CATEGORIES.FINANCIAL_POSITIVE,
    title: "Tax Refund",
    description: "You received a tax refund of $100!",
    effects: {
      cash: 100,
    },
    probability: 5,
  },
  {
    id: "relatives_gift",
    category: EVENT_CATEGORIES.FINANCIAL_POSITIVE,
    title: "Gift from Relatives",
    description: "Your relatives sent you $75 as a gift!",
    effects: {
      cash: 75,
      happiness: 5,
    },
    probability: 7,
  },
  {
    id: "won_lottery",
    category: EVENT_CATEGORIES.FINANCIAL_POSITIVE,
    title: "Small Lottery Win",
    description: "You won $200 in a small lottery!",
    effects: {
      cash: 200,
      happiness: 10,
    },
    probability: 3,
  },
  {
    id: "stolen_wallet",
    category: EVENT_CATEGORIES.FINANCIAL_NEGATIVE,
    title: "Wallet Stolen",
    description: "Your wallet was stolen with $60 inside.",
    effects: {
      cash: -60,
      happiness: -10,
    },
    probability: 7,
  },
  {
    id: "car_repair",
    category: EVENT_CATEGORIES.FINANCIAL_NEGATIVE,
    title: "Unexpected Car Repair",
    description: "Your car needed repairs costing $120.",
    effects: {
      cash: -120,
      happiness: -5,
    },
    probability: 8,
  },
  {
    id: "broke_phone",
    category: EVENT_CATEGORIES.FINANCIAL_NEGATIVE,
    title: "Broken Phone",
    description: "You dropped and broke your phone. Repairs cost $80.",
    effects: {
      cash: -80,
      happiness: -5,
    },
    probability: 6,
  },
  {
    id: "doctor_visit",
    category: EVENT_CATEGORIES.HEALTH,
    title: "Doctor Visit",
    description: "You had to visit the doctor. The bill came to $70.",
    effects: {
      cash: -70,
      energy: -10,
    },
    probability: 8,
  },
  {
    id: "found_old_savings",
    category: EVENT_CATEGORIES.FINANCIAL_POSITIVE,
    title: "Found Old Savings",
    description: "You discovered an old savings account with $60 in it!",
    effects: {
      cash: 60,
      happiness: 4,
    },
    probability: 6,
  },
  {
    id: "missed_bus",
    category: EVENT_CATEGORIES.MIXED,
    title: "Missed the Bus",
    description: "You missed the bus and had to walk. Tiring but refreshing.",
    effects: {
      energy: -10,
      happiness: 2,
    },
    probability: 9,
  },
  {
    id: "free_subscription",
    category: EVENT_CATEGORIES.FINANCIAL_POSITIVE,
    title: "Free Subscription",
    description: "You won a free 3-month subscription to your favorite app!",
    effects: {
      happiness: 8,
      cash: 10,
    },
    probability: 5,
  },
  {
    id: "bad_sleep",
    category: EVENT_CATEGORIES.HEALTH,
    title: "Poor Sleep",
    description: "You tossed and turned all night and feel drained.",
    effects: {
      energy: -20,
    },
    probability: 8,
  },
  {
    id: "volunteer_event",
    category: EVENT_CATEGORIES.NEUTRAL,
    title: "Volunteered at a Shelter",
    description: "You helped out at a local shelter. Felt good, but tiring.",
    effects: {
      energy: -10,
      happiness: 10,
    },
    probability: 7,
  },
  {
    id: "overcooked_lunch",
    category: EVENT_CATEGORIES.NEUTRAL,
    title: "Overcooked Lunch",
    description: "You forgot about your lunch on the stove. Oops.",
    effects: {
      cash: -15,
    },
    probability: 7,
  },
  {
    id: "work_praise",
    category: EVENT_CATEGORIES.HAPPINESS,
    title: "Praised at Work",
    description: "Your boss complimented your work. You feel proud!",
    effects: {
      happiness: 12,
    },
    condition: (player) => player.job !== null,
    probability: 6,
  },
  {
    id: "short_vacation",
    category: EVENT_CATEGORIES.HAPPINESS,
    title: "Weekend Getaway",
    description: "You took a short vacation and feel refreshed.",
    effects: {
      happiness: 20,
      energy: 15,
      cash: -100,
    },
    probability: 4,
  },
  {
    id: "random_checkup",
    category: EVENT_CATEGORIES.HEALTH,
    title: "Health Check-Up",
    description: "You had a surprise check-up. Everything looks good!",
    effects: {
      cash: -40,
      energy: -5,
      happiness: 3,
    },
    probability: 7,
  },
  {
    id: "impulse_buy",
    category: EVENT_CATEGORIES.FINANCIAL_NEGATIVE,
    title: "Impulse Shopping",
    description: "You couldn't resist and bought something expensive online.",
    effects: {
      cash: -70,
      happiness: 6,
    },
    probability: 6,
  },

  {
    id: "caught_cold",
    category: EVENT_CATEGORIES.HEALTH,
    title: "Caught a Cold",
    description: "You caught a cold over the weekend. You feel a bit tired.",
    effects: {
      energy: -15,
    },
    probability: 10,
  },
  {
    id: "free_dinner",
    category: EVENT_CATEGORIES.HAPPINESS,
    title: "Free Dinner",
    description: "A friend treated you to dinner at a nice restaurant!",
    effects: {
      happiness: 15,
    },
    probability: 10,
  },
  {
    id: "great_weekend",
    category: EVENT_CATEGORIES.HAPPINESS,
    title: "Great Weekend!",
    description: "You had an amazing weekend relaxing and having fun!",
    effects: {
      happiness: 20,
      energy: 10,
    },
    probability: 9,
  },
  {
    id: "met_friend",
    category: EVENT_CATEGORIES.HAPPINESS,
    title: "Met an Old Friend",
    description: "You bumped into an old friend and had a great conversation.",
    effects: {
      happiness: 10,
    },
    probability: 10,
  },
  {
    id: "productive_weekend",
    category: EVENT_CATEGORIES.MIXED,
    title: "Productive Weekend",
    description: "You spent the weekend studying and learning new skills.",
    effects: {
      education: 5,
      energy: -10,
      happiness: 5,
    },
    probability: 8,
  },
  {
    id: "party_hangover",
    category: EVENT_CATEGORIES.MIXED,
    title: "Party Hangover",
    description: "You went to an amazing party but now you're exhausted.",
    effects: {
      happiness: 15,
      energy: -25,
    },
    probability: 7,
  },
  {
    id: "helped_neighbor",
    category: EVENT_CATEGORIES.NEUTRAL,
    title: "Helped a Neighbor",
    description:
      "You helped a neighbor move some furniture. Tiring but satisfying.",
    effects: {
      energy: -10,
      happiness: 10,
    },
    probability: 8,
  },
  {
    id: "power_outage",
    category: EVENT_CATEGORIES.NEUTRAL,
    title: "Power Outage",
    description: "A power outage meant a quiet evening with no electricity.",
    effects: {
      energy: 5,
      happiness: -5,
    },
    probability: 6,
  },
  {
    id: "job_bonus",
    category: EVENT_CATEGORIES.FINANCIAL_POSITIVE,
    title: "Job Bonus",
    description: "You received a small bonus from your job!",
    effects: {
      cash: 150,
      happiness: 10,
    },
    condition: (player) => player.job !== null,
    probability: 6,
  },
  {
    id: "networking_event",
    category: EVENT_CATEGORIES.MIXED,
    title: "Networking Event",
    description: "You attended a networking event that could help your career.",
    effects: {
      experience: 3,
      energy: -15,
    },
    condition: (player) => player.job !== null,
    probability: 7,
  },
];

// Helper function to select a random event
export function getRandomEvent(player) {
  // Filter events that have conditions and check if they apply to the player
  const eligibleEvents = randomEvents.filter((event) => {
    // If the event has a condition function, evaluate it
    if (event.condition) {
      return event.condition(player);
    }
    return true; // Events with no conditions are always eligible
  });

  // Create a weighted probability based on the probability values
  const totalProbability = eligibleEvents.reduce(
    (sum, event) => sum + event.probability,
    0
  );
  let randomValue = Math.random() * totalProbability;

  // Select an event based on the random value and probability weights
  for (const event of eligibleEvents) {
    randomValue -= event.probability;
    if (randomValue <= 0) {
      return event;
    }
  }

  // Fallback to a random eligible event if something goes wrong with probabilities
  return eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
}
