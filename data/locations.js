// Updated locations.js that actually uses mapX and mapY
export const locations = {
  rentoffice: {
    name: "Rental Office",
    description: "Manage your apartment rental and pay your rent here.",
    image: "/rent.jpg",
    mapX: 90,
    mapY: 13,
    actions: ["rentoffice"], // This should redirect to your RentalOffice component
  },
  apartment: {
    name: "Apartment",
    description: "Your humble abode",
    image:
      "https://img.freepik.com/free-photo/3d-electric-car-building_23-2148972401.jpg",
    mapX: 45, // % position on map
    mapY: 14, // % position on map
    actions: ["sleep", "checkGoals", "apartment"], // Add "apartment" action
  },
  university: {
    name: "University",
    description: "Increase your education",
    image:
      "https://img.freepik.com/free-photo/hercules-hall-surrounded-by-greenery-sunlight-daytime-munich-germany_181624-17876.jpg",
    mapX: 15,
    mapY: 15,
    actions: ["study"],
  },
  employmentOffice: {
    name: "Employment Office",
    description: "Find a job",
    image: "https://img.freepik.com/premium-photo/office-building_16442-13.jpg",
    mapX: 88,
    mapY: 65,
    actions: ["findJob"],
  },
  workplace: {
    name: "Workplace",
    description: "Earn money at your job",
    image:
      "https://img.freepik.com/premium-photo/midsection-businessman-using-laptop-table_1048944-3345650.jpg",
    mapX: 88,
    mapY: 40,
    actions: ["work", "workplace"],
  },
  mall: {
    name: "Shopping Mall",
    description: "Buy items to improve your life",
    image:
      "https://img.freepik.com/free-photo/cinematic-style-mall_23-2151551178.jpg",
    mapX: 15,
    mapY: 65,
    actions: ["shop"],
  },
  leisureCenter: {
    name: "Leisure Center",
    description: "Have fun and relax",
    image:
      "https://img.freepik.com/free-photo/view-backyard-garden-digital-art-style_23-2151488199.jpg",
    mapX: 20,
    mapY: 88,
    actions: ["leisure"],
  },
  bank: {
    name: "Python Bank",
    description: "Manage your finances and save for the future",
    image:
      "https://img.freepik.com/free-photo/view-3d-building-architecture-lawyer-s-day-celebration_23-2151023422.jpg",
    mapX: 88,
    mapY: 88,
    actions: ["bank"],
  },
  fastFood: {
    name: "Python Burgers",
    description: "Grab a quick bite to eat",
    image:
      "https://img.freepik.com/free-photo/delicious-burger-outdoors_23-2150902260.jpg",
    mapX: 15, // Updated position to fit better in your path
    mapY: 40, // Updated position to fit better in your path
    actions: ["fastFood"],
  },
  datingOffice: {
    name: "Dating Office",
    description: "Find your special someone",
    image:
      "https://img.freepik.com/free-photo/3d-heart-shape-city_23-2150965369.jpg?uid=R194451028&ga=GA1.1.1480099583.1741975489&semt=ais_hybrid&w=740",
    mapX: 69,
    mapY: 15,
    actions: ["datingOffice"],
  },

  healingCentre: {
    name: "Zen Healing Centre",
    description: "Boost your health and happiness",
    image:
      "https://img.freepik.com/free-photo/adult-holding-ball-light_23-2149711538.jpg?uid=R194451028&ga=GA1.1.1480099583.1741975489&semt=ais_hybrid&w=740",
    mapX: 57,
    mapY: 88,
    actions: ["healingCentre"],
  },
};
