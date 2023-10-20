/**
 * List of all freeRun strings. These are a little annoying,
 * actually! Some of them are -really- context dependent.
 * But in the interest of being explicit I am trying to
 * make the code able to capture runs properly. It is
 * possible to use more than 1 free run in a turn, if you
 * use things like tattered scraps, also. This list
 * includes free-run banishers as well. This list does
 * NOT include bander/boots runs, which are a separate
 * can of worms relating to currFam.
 */
export const FREE_RUNS = [
  // BANISHERS THAT ARE RUNS ======
  { name: "SHOW THEM YOUR RING", type: "skill" }, // mafia middle finger ring
  { name: "BALEFUL HOWL", type: "skill" }, // PATH: dark gyffte
  { name: "PEEL OUT", type: "skill" }, // PATH: avatar of sneaky pete
  { name: "dirty stinkbomb", type: "item" }, // PATH: KOLHS
  { name: "deathchucks", type: "item" }, // PATH: KOLHS
  { name: "CREEPY GRIN", type: "skill" }, // 2007 vivala mask
  { name: "GIVE YOUR OPPONENT THE STINKEYE", type: "skill" }, // 2010 vivala mask
  { name: "SNOKEBOMB", type: "skill" }, // 2016 snojo
  { name: "KGB TRANQUILIZER DART", type: "skill" }, // 2017 KGB
  { name: "SPRING-LOADED FRONT BUMPER", type: "skill" }, // 2017 asdon-martin
  { name: "BREATHE OUT", type: "skill" }, // 2017 space jellyfish
  { name: "THROW LATTE ON OPPONENT", type: "skill" }, // 2018 latte lovers member card
  { name: "REFLEX HAMMER", type: "skill" }, // 2019 doctor bag
  { name: "divine champagne popper", type: "item" }, // 2008 libram of divine favors
  { name: "Winifred's whistle", type: "item" }, // 2012 blavious kloop
  { name: "Louder Than Bomb", type: "item" }, // 2013 smith's tome
  { name: "tennis ball", type: "item" }, // 2016 haunted doghouse
  { name: "human musk", type: "item" }, // 2019 red-nosd snapper
  { name: "B. L. A. R. T. SPRAY (WIDE)", type: "skill" }, // PATH: Wildfire
  { name: "FEEL HATRED", type: "skill" }, // 2021 emotion chip
  { name: "SHOW YOUR BORING FAMILIAR PICTURES", type: "skill" }, // 2021 familiar scrapbook
  { name: "BOWL A CURVEBALL", type: "skill" }, // 2022 cosmic bowling ball
  // PATH & IOTM FREE-RUNS =========
  { name: "ENSORCEL", type: "skill" }, // PATH: dark gyffte
  { name: "giant eraser", type: "item" }, // PATH: kolhs
  { name: "SUMMON MAYFLY SWARM", type: "skill" }, // 2008 mayfly bait necklace
  { name: "wumpus-hair bolo", type: "item" }, // 2009 sandworm agua de vida zone
  { name: "glob of Blank-Out", type: "item" }, // 2010 crimbo reward
  { name: "peppermint parasol", type: "item" }, // 2011 peppermint garden
  // LIMITED USE FREE-RUNS =========
  { name: "Mer-kin pinkslip", type: "item" }, // 100% freerun; mer-kin only
  { name: "cocktail napkin", type: "item" }, // 100% freerun; clingy pirate only
  { name: "bowl of scorpions", type: "item" }, // 100% freerun; drunk pygmy only
  { name: "T.U.R.D.S. Key", type: "item" }, // 100% freerun; ghosts only
  { name: "short writ of habeas corpus", type: "item" }, // 100% freerun; pygmys only
  { name: "windicle", type: "item" }, // 100% freerun; piraterealm only
  // ALL OTHER FREE-RUNS ===========
  { name: "fish-oil smoke bomb", type: "item" }, // 100% freerun; AT nemesis quest item
  { name: "green smoke bomb", type: "item" }, //  90% freerun; via green op soldier
  { name: "tattered scrap of paper", type: "item" }, //  50% freerun; via bookbat
  { name: "GOTO", type: "item" }, //  30% freerun; via BASIC elemental
] as const;
