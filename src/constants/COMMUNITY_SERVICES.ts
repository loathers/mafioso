const COMMUNITY_SERVICES_MAP = {
  "Took choice 1089/1: Perform Service": "Donate Blood",
  "Took choice 1089/2: Perform Service": "Feed The Children (But Not Too Much)",
  "Took choice 1089/3: Perform Service": "Build Playground Mazes",
  "Took choice 1089/4: Perform Service": "Feed Conspirators",
  "Took choice 1089/5: Perform Service": "Breed More Collies",
  "Took choice 1089/6: Perform Service": "Reduce Gazelle Population",
  "Took choice 1089/7: Perform Service": "Make Sausage",
  "Took choice 1089/8: Perform Service": "Be a Living Statue",
  "Took choice 1089/9: Perform Service": "Make Margaritas",
  "Took choice 1089/10: Perform Service": "Clean Steam Tunnels",
  "Took choice 1089/11: Perform Service": "Coil Wire",
};

export const COMMUNITY_SERVICES = Object.entries(COMMUNITY_SERVICES_MAP).map(
  ([matcher, label]) => ({ matcher, label }),
);
