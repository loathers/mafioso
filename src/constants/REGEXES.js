export const NEW_LINE_REGEX = /(\r\n|\n)/g;
export const DIVIDING_NEWLINE_REGEX = /$(\r\n|\n)\s*(\r\n|\n)/gm;
export const USELESS_PRE_NEWLINE = /^\s*/g;
export const PRELINE_SPACES = /^(\t| )+(?=.)/gm;
export const EXCESSIVE_NEW_LINES = /(?<=.+$(\r\n|\n)(\r\n|\n))(\r\n|\n)+/gm;
export const REGEX = {
  // -- important
  MAFIOSO: {
    LOG_COMMENTS: /(^\/\/.*)+/gm,
    LOG_COMMENTS_NEWLINE: /(^\/\/.*(\r\n|\n))+(?=\/\/)*/gm,
    LOG_COMMENTS_ONLY: /(^\/\/.*$)+(?!(\r\n|\n).)/gm,

    GENERATED_BLOCK: /<mafioso>.*<\/mafioso>/gs,
    GENERATED_BLOCK_START: /<mafioso-start>.*<\/mafioso-start>/gs,
    STANDARD_BLOCK: /(?<=Standard: ).*/gm,
  },
  ASCENSION: {
    VALHALLA_COMPLETE: /(Beginning New Ascension|welcome to valhalla).*?(freeing king ralph|freeing the king).*?/is,
    REGULAR_COMPLETE: /Beginning New Ascension.*?(freeing king ralph|freeing the king).*?/is,
    THWAITGOLD_COMPLETE: /(Beginning New Ascension|welcome to valhalla).*?You acquire an item: Thwaitgold.*?/is,
    SCOTCH_LOG_ASCENSION: /(%%%%%%%%% START OF DAY #1).*?(freeing king ralph|freeing the king|FREEING THE DING DANG KING).*?/is,

    VALHALLA_TEXT: /welcome to valhalla/im,
    VALHALLA_GROUP: /^welcome to valhalla.*?ascend as.*?(\r\n|\n)/gmis,
    ASTRAL_SHOPPING_NAME: /(?<=buy.*)astral .*(?= for)/gmi,
    KARMA_TEXT: /((?<= )\d+(?= karma| banked karma)|(?<=balance = )\d+|(?<=balance is )\d+)/gmi,
    MOON_SIGN_NAME: /(?<=.*under the ).*(?= sign)/i,

    ASCENSION_DETAIL_GROUP: /(?<=Ascension #\d+:(?:\r\n|\n))(hardcore|softcore|normal|casual) (.*) (pastamancer|sauceror|accordion thief|disco bandit|seal clubber|turtle tamer|zombie Master|plumber|avatar of boris|avatar of jarlsberg|avatar of sneaky pete|ed the undying|gelatinous noob|plumber|vampyre|cow puncher|beanslinger|snake oiler)/i,
    ASCENSION_NUMBER: /(?<=Ascension #)\d+/,
    BAD_MOON_DETAILS: /(?<=Ascension #(.+(\r\n|\n))+)Bad Moon/,
    ED_THE_UNDYING_DETAILS: /(?<=Ascension #\d+:(?:\r\n|\n))(hardcore|softcore|normal|casual) (Actually Ed the Undying)/i,

    // VALHALLA: /welcome to valhalla/is,
    KING_FREED: /(freeing king ralph|freeing the ding dang king).*?(?=(\s|))/i,
    THWAITGOLD: /You acquire an item: Thwaitgold.*/i,
    NAUGHTY_SORCERESS: /.*The Naughty Sorceress.*/i,
  },
  // -- iotm
  APRIL_SHOWER: {
    GET_EFFECT_LINE: /^(?<=shower .*(\r\n|\n)).*/gim,
  },
  ASDON_MARTIN: {
    CONVERTING_LINE: /^converting.*/gim,
  },
  BASTILLE_BATTALION: {
    TEXT: /Bastille Battalion/im,
  },
  BEACH_COMB: {
    COMBING_LINE: /.*Combing.*/i,
    COMBING_ACTION: /Combing.*/i,
    WANDERING_LINE: /.*wandering to a random section of the beach.*/gi,
    COMB_THE_BEACH_LINE: /.*comb the beach.*/gi,

    COMB_SQUARE_LINE: /^Combing square.*(\r\n|\n)/gmi,
  },
  BIRD_A_DAY: {
    USE_LINE: /^use.*bird-a-day calendar.*/gmi,
    CAST_LINE: /^cast.*(Seek out a Bird|Visit your favorite bird).*/gmi,
    ANY_RESULT: /(?<=^(cast .*\d+ |you learned.*: ).*).*/gmi,
  },
  BOXING_DAYCARE: {
    VISIT_TEXT: /visiting the boxing daycare.*/gi,
    NONCOMBAT: /^encounter:.*(enter the boxing daycare|Boxing Daydream|Boxing Day Spa).*/gim,
  },
  BOX_OF_GHOSTS: {
    CAROLS_EFFECT_TEXT: /(?<=Round.*(\r\n|\n)you acquire an effect: )(Do You Crush What I Crush?|Holiday Yoked|Let It Snow\/Boil\/Stink\/Frighten\/Grease|All I Want For Crimbo Is Stuff|Crimbo Wrapping)/gi,
    COMMERCE_BUY_TEXT: /(?<=After Battle. "(Great job buying that|Hey, you bought a|Nice, you bought a|Oh, good, you got a) ).*?(?=!)/gi,
  },
  CARGO_CULTIST_SHORTS: {
    INSPECTING_POCKETS_LINE: /^Inspecting Cargo Cultist Shorts.*/gmi,
    PICK_POCKET_LINE: /^picking pocket \d+/gmi,
    PICK_POCKET_NUMBER: /(?<=^picking pocket )\d+/gmi,
    PICK_POCKET_RESULT: /(?<=^Inspecting Cargo Cultist Shorts(\r\n|\n)picking pocket \d+(\r\n|\n)you acquire an item: ).*/gmi,
  },
  CAT_BURGLAR: {
    USELESS_HEIST_GROUP: /main\.php.*heist=1(\r\n|\n).*(1320\/2).*(\r\n|\n).*$/gi,
    HEISTED: /.*(choice 1320\/1).*/gi,
    NEVERMIND_LINE: /.*choice 1320\/2.*(\r\n|\n)/gi,
  },
  CHATEAU_MANTEGNA: {
    REST_TEXT: /rest in your bed in the chateau/gi,
    CHECK_DESK_TEXT: /Collecting.*(continental juice bar|fancy stationery set|Swiss piggy bank)/gi,
    PAINTING_ENCOUNTER: /(?<=\[\d+\] Chateau Painting.*?(Encounter: )).*?$/gmis,
  },
  COMPREHENSIVE_CARTOGRAPHY: {
    MAP_THE_MONSTER_COMBAT: /(?<=\[\d+\] ).*(\r\n|\n)Took choice 1435.*/gi,
  },
  CONSPIRACY_ISLAND: {
    TEXT: /.*Conspiracy Island.*/gi,
    CONTROL_PANEL_LINE: /Took choice 986.*/gi,
    CONTROL_PANEL_RESULT: /(?<=Took choice 986.*: )/gi,
  },
  DECK_OF_EVERY_CARD: {
    TEXT: /Deck of Every Card/im,
  },
  DETECTIVE_SCHOOL: {
    VISITING_TEXT: /visiting the 11th precinct headquarters(.*(\r\n|\n))+took choice 1193.*/gim,
    INVESTIGATION_TEXT: /(^wham.php.*(\r\n|\n))+.*/gim,

    TRADING_COPDOLLARS_LINE: /trading \d+ cop dollars .* \d+ .*/gim,
  },
  DIABOLIC_PIZZA: {
    INGREDIENTS_LINE: /^pizza.*/m,
    INGREDIENTS_ONLY: /(?<=^pizza\s).*/m,
    EAT_LINE: /^eat\s\d+\sdiabolic pizza/m,
  },
  DISTANCE_WOODS_GETAWAY: {
    GAZING_LINE: /(^gazing).*/gi,
    USELESS_GAZING_LINE: /gazing at the stars.*/gmi,
    REST_TEXT: /Rest in your campaway tent/gmi,
  },
  EMOTION_CHIP: {
    NONCOMBAT_SKILL: /casts.*Feel (Lonely|Disappointed|Excitement|Nervous|Peaceful).*/gi,
    COMBAT_SKILL: /casts.*Feel (Envy|Hatred|Nostalgic|Pride|Superior).*/gi,
  },
  FAX_MACHINE: {
    PHOTOCOPY_ENCOUNTER_TEXT: /(?<=\[\d+\] )photocopied monster/gi,
  },
  FLOUNDRY: {
    ACQUIRED_ITEM_RESULT: /(?<=clan_viplounge.php.*preaction=buyfloundryitem.*(\r\n|\n)you acquire an item: ).*/gi,
  },
  FOURTH_OF_MAY_COSPLAY_SABER: {
    UPGRADE_TEXT: /^encounter.*may the fourth cosplay saber.*$(\r\n|\n).*choice 1386\/\d.*$/gmi,
    UPGRADE_CHOICE: /(?<=^Took choice 1386.*: ).*/gmi,

    USE_THE_FORCE_TEXT: /.*casts USE THE FORCE.*/i,
    USE_THE_FORCE_CHOICE_LINE: /Took choice 1387.*/gi,
    USE_THE_FORCE_CHOICE_FRIENDS: /Took choice 1387.*You will go find two friends and meet me here.*/gi,

    USELESS_UPGRADE_LINE: /^encounter.*may the fourth cosplay saber.*$(\r\n|\n)/mi,
  },
  FORTUNE_TELLER: {
    CONSULT_TEXT: /(.*choice 1278.*: ).*/gi,
  },
  GENIE_BOTTLE: {
    WISH_FIGHT_ENCOUNTER_TEXT: /(?<=\[\d+\] )genie summoned monster/gi,
    WISH_EFFECT_TARGET: /(?<=took choice 1267(.*(\r\n|\n))+you acquire an effect: ).*(?= \()/gmi,
  },
  GOD_LOBSTER: {
    COMBAT: /Encounter: the god lobster/i,
    BOON: /Encounter: Granted a Boon/i,
    GROUPING: /the God Lobster.*?Granted a Boon/gis,
    BOON_CHOICE_RESULT: /(?<=^took choice 1310.*: ).*/gmi,
  },
  HEWN_MOON_RUNE_SPOON: {
    TUNE_MOON_LINE: /tuning moon.*/i,
    TUNE_MOON_RESULT: /(?<=tuning moon to ).*/mi,
  },
  IUNION_CROWN: {
    GAINED_EFFECT: /(?<=^The crown gains ).*/gmi,
    STONES_TEXT: /(?<=^After battle: ).*iunion stones.*(\r\n|\n)the crown.*/gmi,
    AFTER_BATTLE_LINEBREAK_GROUP: /^after battle.*(\r\n|\n).*crown gains.*(\r\n|\n){2,}.*after battle.*/gmi,
  },
  JANUARYS_GARBAGE_TOTE: {
    USE_FOLDABLE: /^use \d January's garbage tote/mi,
    CHOICE_NAME: /(?<=^Took choice 1275.*: ).*/gmi,
    USE_RESULT: /(?<=use \d January's garbage tote).*?acquire.*?:.*?(deceased crimbo tree|broken champagne bottle|tinsel tights|wad of used tape|makeshift garbage shirt)/gis,
    EQUIP_RESULT: /(?<=equip \w+ ).*?(deceased crimbo tree|broken champagne bottle|tinsel tights|wad of used tape|makeshift garbage shirt)/gi,
  },
  KRAMCO_SAUSAGEOMATIC: {
    COMBAT: /^encounter: sausage goblin/mi,
    EQUIP: /^equip.*kramco sausage.*/gmi,
    GRIND: /grind/gi,
    EAT_MAGICAL_SAUSAGE: /^eat \d+ magical sausage/gmi,
  },
  KREMLINS_GREATEST_BRIEFCASE: {
    FIDDLING: /^place.*kgb.*/gim,
  },
  LATTE_LOVERS_MEMBERS_MUG: {
    UNLOCKED_INGREDIENT_NAME: /(?<=unlocked ).*(?= for latte)/gi,

    THROW_LATTE_LINE: /.*Throw Latte on Opponent.*/gi,
    OFFER_LATTE_LINE: /.*Offer Latte to Opponent.*/gi,
    GULP_LATTE_LINE: /.*gulp latte.*/gi,

    FILLED_MUG_LINE: /filled your mug .*/gi,
    FILLED_MUG_INGREDIENTS: /(?<=filled your mug with ).*(?=.)/gi,
    FILLED_MUG_INGREDIENTS_CAPTURE_GROUP: /(?<=^filled your mug with )(.*)(?: and )(.*)(?: latte with )(.*)(?:.)/gmi,
    DO_NOTHING_CHOICE: /^took choice.*1329.*don't get a fill-up/gmi,
  },
  LIL_DOCTORS_BAG: {
    USED_SKILL_LINE: /casts.*(Otoscope|Reflex Hammer|Chest X-Ray).*/gi,
  },
  LTNT_TELEGRAM: {
    GET_BOOTS_TEXT: /place.php.*whichplace=town_right.*action=townright_ltt.*(\r\n|\n)you acquire an item: your cowboy boots.*/gi,
  },
  MADAME_ZATARA_FORTUNE_TELLER: {
    CONSULTED_EFFECTED_NAME: /(?<=took choice 1278.*consult with zatara(\r\n|\n).*(\r\n|\n)+You acquire an effect: ).*(?= \()/gmi,
  },
  MELODRAMEDARY: {
    SPIT_ON_SOMETHING_LINE: /(?<=^Round ).*spit on.*/gim,
    SPIT_ON_THEM_LINE: /(?<=^Round ).*spit on them.*/gim,
    SPIT_ON_ME_LINE: /(?<=^Round ).*spit on me.*/gim,
  },
  METEOR_LORE: {
    CAST_MICROMETEORITE: /casts.*Micrometeorite/i,
    CAST_MACROMETEORITE: /casts.*Macrometeorite/i,
    CAST_METEORSHOWER: /casts.*Meteor Shower/i,
    ACQUIRE_METEOR_ITEM: /(?<=after battle: .*(\r\n|\n)You acquire an item: )(meteoreo|meadeorite|Meteorite-Ade|metal meteoroid|cute meteoroid)/gi,
  },
  NEVERENDING_PARTY: {
    INTRO_CHOICE_GROUP: /.*neverending party.*(\r\n|\n).*took choice 1322.*(\r\n|\n).*(whichchoice=1322.*)?(\r\n|\n)/gim,
  },
  OLYMPIC_SIZED_SWIMMING_POOL: {
    POOL_USE_RESULT: /(?<=^swimming pool.*(\r\n|\n)you acquire an effect: ).*(?=\()/gmi,
  },
  PILL_KEEPER: {
    CHOICE_LINE: /Took choice 1395.*/gi,
    CHOICE_RESULT: /(?<=choice 1395\/\d+: ).*/gi,
    EXPLODINALL: /(?<=choice 1395\/\d+: ).*Explodinall/gi,
    EXTENDICILLIN: /(?<=choice 1395\/\d+: ).*Extendicillin/gi,
    SNEAKISOL: /(?<=choice 1395\/\d+: ).*Sneakisol/gi,
    RAINBOWOLIN: /(?<=choice 1395\/\d+: ).*Rainbowolin/gi,
    HULKIEN: /(?<=choice 1395\/\d+: ).*Hulkien/gi,
    FIDOXENE: /(?<=choice 1395\/\d+: ).*Fidoxene/gi,
    SURPRISE: /(?<=choice 1395\/\d+: ).*Surprise/gi,
    TELECYBIN: /(?<=choice 1395\/\d+: ).*Telecybin/gi,

    NEVERMIND_LINE: /.*choice 1395\/9.*(\r\n|\n).*(choice=1395.*option=9|(\r\n|\n))/gi,
  },
  PIRATEREALM: {
    // ENTRY_GROUPING: /^\[.*?piraterealm.*?(\r\n|\n){2,}/gmis,
    LOCATION: /(?<=^\[.*\] ).*piraterealm.*/gmi,
  },
  POCKET_PROFESSOR: {
    LECTURE_USE_LINE: /.*(lecture on).*/gi,
    SKILL_USE_LINE: /.*(lecture on|deliver your thesis).*/gi,
    AFTER_COMBAT_TEXT: /^After battle:.*(WHEEEEEE|DANCE OF THE UNIVERSE|DANCING OF SCIENCE|dumps some excess electricity|receive a jolt from the battery|quantum-shifts you to a nearby universe).*(\r\n|\n)/gmi,
  },
  POOL_TABLE: {
    PLAY_POOL_CHOICE: /(?<=pool )(aggressive|strategic|stylish)/gi,
    PLAY_POOL_EFFECT: /(?<=pool (aggressive|strategic|stylish)(\r\n|\n).*: ).*/gi,
  },
  POTTED_POWER_PLANT: {
    GET_BATTERY: /(?<=(?:use 1 potted power plant(\r?\n))?(took choice 1448.*(\r?\n))?(.*whichchoice=1448.*(\r?\n))you acquire an item: )battery .*/gmi,
    COMBINE_BATTERIES: /(?:combine \d+ )(battery .*)(?: \+ \d+ )(battery .*)(?=(?:\r?\n)you acquire .*)/gmi,
    UNTINKER_BATTERIES: /^untinker \d+ battery \(.*/gmi,
    USE_BATTERY: /^use \d+ battery \(.*\)/gmi,
  },
  REAGNIMATED_GNOME: {
    ADV_TRIGGERED_TEXT: /.*(scrubs the mildew out|bundles your recycling for you|teaches you how to power-nap|sharpens all your pencils|folds all your clean laundry|shows you how to shave a full minute|organizes your sock drawer|hauls all of your scrap lumber|does all that tedious campsite cleaning).*/gmi,
  },
  RETROSPECS: {
    FOUND_ITEM: /(?<=You look behind you and notice an item you missed earlier.*?you acquire an item: ).*?$/mis,
  },
  RIFTLET: {
    ADV_TRIGGERED_TEXT: /.*shimmers briefly, and you feel it getting earlier.*/gmi,
  },
  SNOJO: {
    VISIT_CONTROL_LINE: /Visiting Snojo Control Console/gi,
    SNOWMAN_COMBAT: /.*The X-32-F Combat Training Snowman.*/gi,
  },
  SONGBOOM_BOOMBOX: {
    GROUPING: /^use.*songboom.*boombox(\r\n|\n).*soundtrack.*(\r\n|\n).*took choice.*(\r\n|\n){2,}setting soundtrack.*/gmi,
    RESULT: /(?<=^use.*songboom.*boombox(\r\n|\n).*soundtrack.*(\r\n|\n).*took choice 1312.*: ).*/gmi,
    SING_ALONG: /(?<=^round \d+:.*)(SING ALONG)/gmi,
  },
  SOURCE_TERMINAL: {
    CAST_PORTSCAN: /.*casts.*Portscan.*/gmi,
    PORTSCAN_FOR_SOURCE_AGENT: /.*You scan nearby ports until you locate a Source Agent.*send him a GIF.*/gmi,
    PORTSCAN_FOR_GOVERNMENT_AGENT: /You scan nearby ports but don't find anything interesting.*you hear sirens in the distance/gmi,
    GOVERNMENT_AGENT_ENCOUNTER: /Encounter: Government Agent.*/gmi,
  },
  SPACE_JELLYFISH: {
    EXTRACT_JELLY_SKILL: /casts.*extract jelly.*/gi,

    CHEW_JELLY_AMOUNT: /(?<=chew )\d+(?= (hot|cold|sleaze|spooky|stench) jelly)/gi,
    CHEW_JELLY_TARGET: /(?<=chew \d+ )(hot|cold|sleaze|spooky|stench) jelly/gi,
    ACQUIRED_STENCH_JELLIED_EFFECT: /you acquire an effect: stench jellied/gi,
  },
  SPINMASTER_LATHE: {
    LATHE_MAKE_GROUPING: /visiting your spinmaster.*((\r\n|\n)You acquire an item: flimsy hardwood scraps)?(\r\n|\n){2,}trading.*(\r\n|\n)you acquire an item: .*/gmi,
    BASIC_LATHE_MAKE_RESULT: /(?<=visiting your spinmaster.*((\r\n|\n)You acquire an item: flimsy hardwood scraps)?(\r\n|\n)+trading.*(\r\n|\n)you acquire an item: ).*/gmi,
  },
  SQUAMOUS_GIBBERED: {
    ADV_TRIGGERED_TEXT: /.*mutters dark secrets under his breath, and you feel time slow down.*/gmi,
  },
  VAMPYRIC_CLOAK: {
    SKILL_RESULT: /casts.*become a (wolf|cloud of mist|bat).*/gi,
  },
  VOTING_BOOTH: {
    GROUPING: /visiting the voting booth.*?daily loathing ballot/gis,
    DAILY_VOTE_TEXT: /Daily Loathing Ballot/i,

    VOTE_MONSTER_COMBAT: /(?<=^Encounter: )(government bureaucrat|terrible mutant|angry ghost|annoyed snake|slime blob)/gmi,
    VOTE_MONSTER_UNIQUE: /(?:^took choice 1331.*?Encounter: )(government bureaucrat|terrible mutant|angry ghost|annoyed snake|slime blob)/gmis,
  },
  WILD_HARE: {
    ADV_TRIGGERED_TEXT: /.*pulls an oversized pocketwatch out of his waistcoat and winds it.*/gmi,
  },
  WITCHESS: {
    COMBAT_ENCOUNTER_TARGET: /(?<=took choice 1182.*play against the witchess pieces.*(\r\n|\n)Encounter: ).*/gmi,
    DAILY_CHALLENGE_BUFF: /(?<=took choice 1183.*Daily Challenge(.*(\r\n|\n))*.*)Puzzle Champ.*/gmi,
  },
  XO_SKELETON: {
    XO_COMBAT_SKILL: /.*casts.*HUGS AND KISSES/gmi,
    SUCCESSFUL_XO_STEAL_ITEM: /(?<=.*casts.*HUGS AND KISSES.*(\r\n|\n)You acquire an item: ).*/gmi,
  },
  GENERIC_GARDEN: {
    GARDEN_HARVEST_RESULT: /(?<=^harvesting your garden.*(\r\n|\n)you acquire an item: ).*/gmi,
  },
  // -- unique
  HORSERY: {
    HORSE_CHOICE: /(?<=^Visiting the horsery(?:\r\n|\n)took choice 1266.*(?:\r\n|\n)choice.php.*(?:\r\n|\n)chose the )(.*)/gmi,
  },
  NUMBEROLOGY: {
    CAST_RESULT: /(?<=^cast \d+ .*(\r\n|\n).*?numberology )\d+/gmi,
  },
  POTTED_TEA_TREE: {
    ACTION_LINE: /^teatree.*/gmi,
    ACTION_NAME: /(?<=^teatree ).*/gmi,
    SHAKE_ACTION: /^teatree shake.*/gmi,
    SHAKE_RESULTS: /(?<=^teatree.*you acquire an item: ).*?$/gmis,
  },
  SUBSCRIPTION_COCOA_DISPENSER: {
    USE_GROUPING: /use 1 subscription cocoa dispenser(?:\r\n|\n)(?:you acquire an item: (.*)(?:\r\n|\n))+/gmi,
  },
  SWEET_SYNTHESIS: {
    CAST_PREGROUP: /(?<=^cast \d+ sweet synthesis.*(\r\n|\n)Encounter: Sweet Synthesis)(\r\n|\n)+synthesize.*/gmi,
    SYNTHESIZE_CANDY: /(?<=synthesize \d )(.*)(?:, )(.*)/gmi,
    SYNTHESIZE_CANDY_A: /(?<=synthesize \d )(.*)(?=, .*)/gmi,
    SYNTHESIZE_CANDY_B: /(?<=synthesize \d .*, )(.*)/gmi,
  },
  // -- paths
  COMMUNITY_SERVICE: {
    CHOICE_LINE: /^Took choice 1089.*/gmi,
    CHOICE_RESULT: /(?<=^took choice 1089\/\d+: ).*(?= \(\d+ adventures.*)/gmi,

    SPLITTABLE_CHOICE_LINES: /(?<=.)(\r\n|\n)(?=Took choice 1089\/\d+)/gmi,

    FINAL_SERVICE_CHOICE: /(?<=^took choice 1089\/30: ).*You acquire an item: Thwaitgold/gmis,
  },
  DISGUISES_DELIMIT: {
    SWAP_MASK: /(?<=^Round.*casts ).*SWAP MASK.*(?=!)/mi,
  },
  GREY_GOO: {
    SPECIAL_GOO_MONSTER: /(?<=Encounter:\s).*(goo clown|grey gooblin|goo bat|foot of stalk|go+g|goo bone|good grid|a massive prism of grey goo).*/mi,
    PLAINS_GOO_MONSTER: /(?<=Encounter:\s).*grey goo (orb|torus|triangle|hexagon|square|cross|heart|hourglass|octagon|squiggle|star).*/mi,
  },
  LOW_KEY_SUMMER: {
  },
  THE_SOURCE: {
    SOURCE_AGENT_ENCOUNTER: /A sunglasses-clad man in a flawless black suit stands before you/gi,
  },
  QUEST: {
    VISIT_TOOT: /tutorial.*action=toot.*/i,
    OPEN_TOOT_LETTER: /use \d+ letter from king ralph.*/i,
    TALK_CRACKPOT_MYSTIC_LINE: /^talking.*crackpot mystic.*(\r\n|\n)/i,
    DAILY_DUNGEON_LOCATION: /The Daily Dungeon/i,
    TAVERN_CELLAR_LOCATION: /The Typical Tavern Cellar/i,

    TALK_LADY_SPOOKYRAVEN_LINE: /^talking.*Lady Spookyraven.*(\r\n|\n)/i,

    ICY_PEAK_ASCEND_TEXT: /^Ascending the Mist-Shrouded Peak.*/gi,
    STAFF_AND_DESERT_GROUP: /(combine.*(ancient amulet|eye of ed|headpiece of ed|staff of fats|staff of ed).*(amulet|eye of ed|headpiece of ed|staff of fats|staff of ed)$(\r\n|\n).*acquire.*staff of ed.*$(\r\n|\n){2}){2}.*desertbeach.*db_pyramid1.*/gmi,
    OPEN_DESERT_PYRAMID: /place.*desertbeach.*db_pyramid1/mi,
    USELESS_DESERT_PYRAMID: /(?<!.*(staff of ed|ancient amulet|eye of ed).*(\r\n|\n))(\r\n|\n).*desertbeach.*db_pyramid1.*/gmi,
    TOWER_BOOTH_TEXT: /^tower: contest booth.*/gmi,
    TOWER_CEREMONY_TEXT: /^tower: Closing Ceremony.*/gmi,
    HEDGE_MAZE_TEXT: /.*The Hedge Maze*/gmi,
    TOWER_DOOR_TEXT: /.*Tower Door:*/gmi,

    COMBINE_WAND_GROUP: /(^combine.*(metallic A|ruby W|lowercase n|heavy d|WA|ND).*(\r\n|\n).*(\r\n|\n){1,2}){2}/mi,
    MAKE_MCCLUSKY_FILE: /^use.*boring binder clip.*(\r\n|\n).*McClusky file \(complete\)/mi,

    ED_THE_UNDYING_BOSS: /^Encounter: Ed the Undying/mi,
  },
  YOU_ROBOT: {
    CHRONOLITH: /(?<=^activating the chronolith(\r?\n)You gain )\d+/gmi,
  },
  // -- common
  LINE: {
    FIRST_LINE: /^.*(\r\n|\n)/,
    SECOND_LINE: /(?<=^.*(\r\n|\n)).*/,

    LOCATION: /\[\d*\].*/g,
    ENCOUNTER: /Encounter:.*/g,
    GENERIC_TOOK_CHOICE: /^took choice.*/gmi,

    EQUIP: /^equip.*/gim,
    HAGNK_PULL: /^pull: .*/gim,
    DIET_GAIN_LINE: /^you gain.*(fullness|drunkenness|spleen).*/gmi,

    TALKING: /^talking to.*/gim,
    VISITING: /^visiting.*/gim,
    CLAN_VISIT: /^visiting.*in.*clan.*/gim,
    LEAFLET: /^leaflet.*/gim,
    MIND_CONTROL_DEVICE_LINE: /.*(Canadian Mind Control Device|Took choice 769).*(\r\n|\n)/gim,

    DOC_GALATIK_SHOP_OR_USE: /(^buy.*doc Galaktik's|^use.*doc Galaktik's)/i,

    MAFIA_THUMB_RING_ACTIVATION: /your weighty thumb ring walloped/i,

    NIGHTSTAND_CHOICE_ENCOUNTER: /(?<=Encounter: )One.*Nightstand/i,
  },
  VALUE: {
    TURN_NUM: /(?!\[)\d+(?=\])/, // look for `[1]`, ignore url hashes with `[]blah[]`
    LOCATION_NAME: /(?<=\]\s).*/,
    SHOP_LOCATION_NAME: /(?<=each from\s).*/,
    ENCOUNTER_NAME: /(?<=Encounter:\s).*/,
    NONCOMBAT_NAME: /(?<=\[\d+\]\s)(.*)(?!(Encounter:))/,
    VISIT_LOCATION_NAME: /(?<=^visiting ).*(?=( in))*/im,
    VISIT_ENCOUNTER_NAME: /(?<=^visiting( the| )).*?(?=( in|(\r\n|\n)))/im,
    TOOK_CHOICE_RESULT: /(?!.*(secret choice|get quest|unknown))(?<=^took choice.*: ).+/gmi,

    SPELL_CAST_AMOUNTS: /(?<=^cast )\d+/gm,
    SPELL_CAST_NAMES: /(?<=^cast \d+ ).*/gm,
  },
  // -- character
  CHARACTER: {
    CHARACTER_NAME: /(?<=^name: ).*/mi,
    CHARACTER_NAME_FROM_COMBAT: /(?<=^Round \d: ).*(?= casts)/mi,
    CLASS_NAME: /(?<=^class: ).*/mi,

    ADV_CHANGE_LINE: /.*you (gain|lose).*\d*adventure.*/gi,
    ADV_GAINS: /(?<=you gain )\d+(?= adventure)/gi,
    ADV_LOSSES: /(?<=you lose )\d+(?= adventure)/gi,

    HP_CHANGE: /.*(gain|lose).*\d*hit point.*/gi,
    HP_GAINS: /(?<=gain\s)\d+(?=\shit point)/gi,
    HP_LOSSES: /(?<=lose\s)\d+(?=\shit point)/gi,

    MP_CHANGE: /.*(gain|lose).*\d*(muscularity|mana|mojo) point.*/gi,
    MP_GAINS: /(?<=gain\s)\d+(?=\s(muscularity|mana|mojo) point)/gi,
    MP_LOSSES: /(?<=lose\s)\d+(?=\s(muscularity|mana|mojo) point)/gi,

    MUS_EXP_CHANGE: /.*gain.*\d*(Beefiness|Fortitude|Muscleboundness|Strengthliness|Strongness).*/gi,
    MUS_EXP_GAINS: /(?<=gain\s)\d+(?=\s(Beefiness|Fortitude|Muscleboundness|Strengthliness|Strongness))/gi,
    MUS_EXP_LOSSES: /(?<=lose\s)\d+(?=\s(Beefiness|Fortitude|Muscleboundness|Strengthliness|Strongness))/gi,
    MUS_GAINS: /.*you gain.*\d*muscle.*point.*/gi,

    MYST_EXP_CHANGE: /.*gain.*\d*(Enchantedness|Magicalness|Mysteriousness|Wizardliness).*/gi,
    MYST_EXP_GAINS: /(?<=gain\s)\d+(?=\s(Enchantedness|Magicalness|Mysteriousness|Wizardliness))/gi,
    MYST_EXP_LOSSES: /(?<=lose\s)\d+(?=\s(Enchantedness|Magicalness|Mysteriousness|Wizardliness))/gi,
    MYST_GAINS: /.*you gain.*\d*mysticality.*point.*/gi,

    MOX_EXP_CHANGE: /.*gain.*\d*(Cheek|Chutzpah|Roguishness|Sarcasm|Smarm).*/gi,
    MOX_EXP_GAINS: /(?<=gain\s)\d+(?=\s(Cheek|Chutzpah|Roguishness|Sarcasm|Smarm))/gi,
    MOX_EXP_LOSSES: /(?<=lose\s)\d+(?=\s(Cheek|Chutzpah|Roguishness|Sarcasm|Smarm))/gi,
    MOX_GAINS: /.*you gain.*\d*moxie.*point.*/gi,

    LEVEL_GAIN: /^You gain .* level.*\s+/gmi,
    SUBSTAT_GAINS: /.*gain.*\d*(muscle|mysticality|moxie).*point.*/gi,
  },
  FAMILIAR: {
    SWITCH_TO_LINE: /^familiar .*/gim,
    SWITCH_TO_RESULT: /(?<=^familiar ).*(?= \()/gim,

    EQUIP_FAMILIAR_RESULT: /(?<=equip familiar ).*/gi,
  },
  COMBAT: {
    FREE_COMBAT: /.*combat.*did not cost.*/i,

    INITIATIVE_LINE: /Round.*(loses initiative|wins initiative).*/i,
    WIN_INIT: /Round.*(wins initiative).*/i,
    LOSE_INIT: /Round.*(loses initiative).*/i,
    VICTORY_LINE: /(?<=\s).*wins the fight.*/i,

    ACTION_ROUND: /^(?!.*(executes a macro| lose | gain |initiative| wins |becomes).*)round.*!/gmi,
    COMBAT_ROUND_LINE: /^round \d+:.*/gmi,
    COMBAT_ROUND_NUM: /(?<=^Round )\d+(?=:)/gmi,

    ATTACK: /(?<=^Round.*\s)attacks(?=!)/gi,
    SKILL_NAME: /(?<=^Round.*casts\s).*(?=!)/gmi,
    TRY_TO_STEAL: /(?<=^Round .*)tries to steal.*(?=!)/gmi,
    SUCCESSFUL_STEAL_ITEM: /(?<=.*tries to steal.*(\r\n|\n)You acquire an item: ).*/gmi,

    REPLACED_LINE: /^round.*becomes.*/gmi,
    REPLACED_NAME: /(?<=becomes ).*(?=!)/gi,

    USE_COMBAT_ITEM_LINE: /^round \d+:.*uses.*/gmi,
    USE_COMBAT_ITEM_NAME: /(?<=^round \d+:.*uses the ).*(?=!)/gmi,

    AFTER_BATTLE_RESULT: /(?<=^After battle: ).*/gmi,
  },
  ITEMS: {
    ACQUIRED_ITEM_LINE: /(?!.*(effect|intrinsic).*)You acquire (\d+|an item:|).*( \(\d+\)|)/gmi,
    ACQUIRED_AN_ITEM_NAME: /(?!.*(effect|intrinsic).*)(?<=You acquire (\d+ |an item: )).*?(?=( \(\d+\)|$))/mi,
    ACQUIRED_ITEM_NAME: /(?!.*(effect|intrinsic).*)(?<=You acquire ).*?(?=( \(\d+\)|$))/mi,
    ACQUIRED_N_ITEM: /(?!.*(effect|intrinsic).*)(?<=(You acquire ))\d+(?= \w*)/mi,
    ACQUIRED_ITEM_N: /(?!.*(effect|intrinsic).*)(?<=(You acquire.*\())\d+(?=\))/mi,

    UNKNOWN_ACQUIRED_ITEM: /(?!.*(effect|intrinsic).*)^((you acquire an item.*|you acquire .*\(\d+\))(\r\n|\n)*)+/gi,

    USE_ITEM_LINE: /^use \d+ .*/gmi,
    USE_ITEM_LINE_FIRST_ONLY: /^use \d+ .*/i,
    USE_ITEM_AMOUNT: /(?<=^use )\d+/gmi,
    USE_ITEM_TARGET: /(?<=^use \d+ ).*/gmi,

    ZAP_LINE: /^zap .*/gmi,
    ZAP_TARGET: /(?<=^zap ).*/gmi,
    ZAP_RESULT: /(?!.*(effect|intrinsic).*)(?<=You acquire (\d+ |an item: )).*?(?=( \(|$))/mi,

    MAKE_SOMETHING_LINE: /(create|combine|craft|cook|mix|smith) .*\d+.*/gmi,
    COOK_LINE: /cook.*\d.*/gmi,
    CRAFT_LINE: /craft.*\d.*/gmi,
    CREATE_LINE: /create.*\d.*/gmi,
    MIX_LINE: /mix.*\d.*/gmi,
    SMITH_LINE: /smith.*\d.*/gmi,
    TRADE_LINE: /(trade|trading).*\d.*/gmi,
    CRAFTING_USED_LINE: /crafting used .*(\r\n|\n)/gmi,

    COMBINE_LINE: /combine.*\d.*/gmi,
    COMBINE_FIRST_ITEM: /(?<=combine \d+ ).*?(?= \+.*)/gmi,
    COMBINE_SECOND_ITEM: /(?<=combine \d+ .*? \+ \d+ ).*?(?= \+.*)/gmi,
    USELESS_COMBINE: /^combine .*(\r?\n){2,}/gmi,

    UNTINKER_LINE: /^untinker .*/gmi,
    UNTINKER_TARGET: /^untinker \d+ .*/gmi,

    CONSUMPTION_LINE: /^(eat|drink|chew) \d+ .*/gi,
    CONSUMPTION_AMOUNT: /(?<=^(eat|drink|chew)\s)\d+(?=\s)/gi,
    CONSUMPTION_TARGET: /(?<=^(eat|drink|chew)\s\d+\s).*/gi,
    CONSUMPTION_COST: /(?<=^you gain )\d+ (fullness|drunkenness|spleen)/gmi,

    EAT_AMOUNT: /(?<=^eat )\d+(?= )/gi,
    EAT_TARGET: /(?<=^eat \d+ ).*/gi,
    DRINK_AMOUNT: /(?<=^drink )\d+(?= )/gi,
    DRINK_TARGET: /(?<=^drink \d+ ).*/gi,
    CHEW_AMOUNT: /(?<=^chew )\d+(?= )/gi,
    CHEW_TARGET: /(?<=^chew \d+ ).*/gi,

    EQUIP_PLAYER_TARGETS: /(?<=equip (?!familiar).* ).*/gi,
    UNEQUIP_PLAYER_TARGETS: /(?<=unequip (?!familiar).* ).*/gi,
    CUSTOM_OUTFIT_LINE: /^custom outfit.*/gmi,

    HAGNK_PULL_LINE: /^pull: \d* .*/gmi,
    HAGNK_PULL_NAME: /(?<=^pull: \d* ).*/gmi,
    HAGNK_PULL_AMOUNTS: /(?<=^pull: )\d*/gmi,

    CLOSET_PUT_TARGETS: /(?<=^add to closet: ).*/gi,
    CLOSET_TAKE_TARGETS: /(?<=^take from closet: ).*/gi,

    USE_CHEWING_GUM_LINE: /^use \d+ chewing gum on a string.*(\r\n|\n)/gmi,
  },
  CLAN: {
  },
  GUILD: {
    LEARN_SKILL_TARGET: /(?<=guild.php.*buyskill.*(\r\n|\n)you learned a new skill: ).*/gmi,
  },
  LOCATION: {
    CAKE_SHAPED_ARENA_LINE: /\[\d+\] cake-shaped arena(\r?\n)/gmi,
    CAKE_SHAPED_ARENA_FAMILIAR: /(?<=\[\d+\] cake-shaped arena(\r?\n)familiar: .* the \d+ lb\. ).*/gmi,
    CAKE_SHAPED_ARENA_CONTEST: /(?<=\[\d+\] cake-shaped arena(.*(\r?\n))+?contest: ).*/gmi,
  },
  TRANSACTIONS: {
    ACQUIRED_SOMETHING: /.*acquire.*/gi, // this affects items and effects
    MEAT_CHANGED_LINE: /.*(gain|lose|spent).*meat.*/gmi,
    BUY_AND_ACQUIRE: /buy.*(\r\n|\n)you acquire.*/gmi,
    SHOPPING: /.*buy.*for.*from.*/gmi,
    MEAT_SPENT: /.*spent.*meat.*/gi,

    TRADING_LINE: /^(trading|trade).*/gmi,

    MEAT_GAIN_AMOUNT: /(?<=You gain )(\d*,*)*(?= meat)/gi,
    MEAT_LOSS_AMOUNT: /(?<=You lose )(\d*,*)*(?= meat)/gi,

    BUY_ITEM_AMOUNT: /(?<=buy\s)(\d+,*\d*)+/gi,
    BUY_ITEM_COST: /(?<=for\s)(\d+,*\d*)+(?=\seach)/gi,

    AUTOSELL: /^autosell:.*/gmi,
    SELL_ITEM_AMOUNT: /(?<=^autosell: )(\d*,*)*/gmi,
    SELL_ITEM_TARGET: /(?<=^autosell: (\d*,*)* ).*/gmi,
  },
  EFFECTS: {
    ACQUIRED_EFFECT_LINE: /.*acquire an (effect|intrinsic):.*/gmi,
    EFFECT_NAME: /(?<=acquire an (effect|intrinsic): ).*?(?=( \(|$))/mi,
    EFFECT_DURATION: /(?<=acquire an (effect|intrinsic): .*\()\d+(?=\))/mi,

    UNAFFECT_LINE: /^uneffect.*/gim,

    CAST_LINE: /^cast .*/gim,
    CAST_NAME: /(?<=^cast \d+ ).*/mi,
    CAST_AMOUNT: /(?<=^cast )\d+(?=.*)/mi,

    UNMATCHED_EFFECT: /(?<=^(\r\n|\n)).*acquire an (effect|intrinsic).*$(?!(\r\n|\n).)/gim,

    TELESCOPE: /^(?<=telescope .*(\r\n|\n)).*/gim,
  },
  // --
  // note: these only work in raw
  GROUP: {
    SAME_AFTER_BATTLE: /(^After battle:).*(\r\n|\n).*(\r\n|\n){2,}(?!\.)/gmi,
    PVP_ATTACK: /(^attack).*?pvp fight/gmis,

    MCLUSKY_FILE_AND_USE_BINDER: /.*acquire.*mcclusky file.*(\r\n|\n).*boring binder clip.*/mi,
  },
  // -- kolmafia
  KOLMAFIA: {
    SESSION_DATE: /(?<=_)\d*/,
    STACK_TRACE: /^stack trace:(\r\n|\n){1,}(\s\sat.*(\r\n|\n|$))*/gmi,
    CLI_PRINT: /^> .*(\r\n|\n|$)/gmi,
    COMBAT_MACRO: /.*executes a macro.*(\r\n|\n|$)/gi,
    EMPTY_CHECKPOINT: /Created an empty checkpoint.*(\r\n|\n|$)/gi,
    SEND_A_KMAIL: /send a kmail.*(\r\n|\n|$)/gi,
    MAXIMIZER: /^(Maximizer:|maximize ).*(\r\n|\n|$)/gmi,
    CHOICE_PHP_LINE: /^choice\.php.*/gmi,
  },
  SNAPSHOT: {
    REAL_DATE: /(January|February|March|April|May|June|July|August|September|October|November|December) .*(?= -)/gi,
    SNAPSHOT_DATE: /(?:January|February|March|April|May|June|July|August|September|October|November|December) .*(Jarlsuary|Frankuary|Frankruary|Starch|April|Martinus|Bill|Bor|Petember|Carlvember|Porktober|Boozember|Dougtember) \d+/gi,
    SCOTCH_LOG_DATE: /(?<=START OF DAY #)\d+/gi,
    KOL_DATE: /(Jarlsuary|Frankuary|Frankruary|Starch|April|Martinus|Bill|Bor|Petember|Carlvember|Porktober|Boozember|Dougtember) \d+/gi,
    BEGIN_ASCENSION_SNAPSHOT: /((=-){22}=)(\r\n|\n)beginning new ascension(\s)*(\r\n|\n)((=-){22}=).*?((=-){22}=)/gmis,
    PLAYER_SNAPSHOT: /((=-){22}=)(\r\n|\n)( *)player snapshot(\r\n|\n)((=-){22}=).*?((=-){22}=)/gmis,
    WTF_SNAPSHOT_REPLACER_CAPTURE_GROUP: /(?:(?:=-){22}=)(?:\r\n|\n)(?: *)player snapshot(?:\r\n|\n)(?:(?:=-){22}=).*?((?:January|February|March|April|May|June|July|August|September|OCtober|November|December).*?(?=\r\n|\n)).*?(name:.*?class:.*?(?=\r\n|\n)).*?(?:(?:=-){22}=)/gmis,
  },
  // -- misc
  PREREMOVE: {
    ALWAYS_CATCHALL: /^(\*\*\*|awesomemenu|backoffice|diary|familiar lock|friars blessing|main|mall|peevpee|play|preference|put in display case|raffle|maximize|maximizer|museum|upeffect|uneffect|outfit|custom outfit|unexpected error|keep your eyes open for|adjusted combat|.*is now accessible|Unknown last adventure).*(\r?\n)/gmi,
    SINGLELINE_CATCHALL: /(?<=^(\r\n|\n))^(main|use|visiting|visit|Cast|choice|cobbsknob|concert|inspecting|eat|drink|chew|shop|shower|swimming pool|talking|telescope|tutorial).*(?!(\r\n|\n).)(\r\n|\n)/gim,
    NO_FOLLOWUP_CATCHALL: /^(use|visit|maximizer|Cast|choice).*(?!(\r\n|\n).)(\r\n|\n)/gim,
    SINGLELINE_ADVENTURE: /(?<=^(\r\n|\n))^(\[\d+\]).*(?!(\r\n|\n).)(\r\n|\n)/gim,

    RAFFLE_TEXT: /.*You acquire raffle ticket.*/gi,
    USELESS_LEAFLET_LINE: /(?!.*(plugh|plover|open chest|look in hole|take ring))^(leaflet|\(you see a).*(\r\n|\n)/gim,
    UNKNOWN_ITEM_GROUPING: /--------------------(.*(\r\n|\n))+?--------------------/gm,
    UNKNOWN_USE_LINE: /.*but kolmafia thought it was.*(\r\n|\n)/gmi,
    PVP_REMOVE: /^(attack a |you challenged).*/gmi,

    LOSE_EFFECT_LINE: /^you lose.*effect.*(\r\n|\n)/gim,
    FAMILIAR_WEIGHT_GAIN: /.*(familiar gains a pound).*(\r\n|\n)/gi,
    UNEQUIP: /^unequip.*(\r\n|\n)/gim,
    MCD_CHANGE: /^mcd.*(\r\n|\n)/gim,

    UNKNOWN_SERVICE_LINE: /^Took choice 1089\/\d+: unknown.*(\r\n|\n)/gim,
  },
  PRESPLIT: {
    UNRELATED_AFTER_COMBAT: /(?<=Encounter:(.+(\r\n|\n))+(round \d+.*|Your familiar.*|You gain.*|You lose.*|After Battle:.*|you acquire.*|the nuns.*|.*hippies.*defeated.*|.*frat.*defeated.*|the crown gains.*|unlocked.*for latte.*)(?:\r\n|\n))(?!(round \d+.*|This combat.*|Your familiar.*|You gain.*|You lose.*|After Battle:.*|you acquire.*|the nuns.*|.*hippies defeated.*|.*frats defeated.*|the crown gains.*|unlocked.*for latte.*|encounter: using the force.*))/gmi,
    UNRELATED_AFTER_FREECOMBAT: /(?<=This combat did not cost a turn.*(\r\n|\n))(?!(\r\n|\n|.*hippies defeated.*|.*frats defeated.*))/gmi,
  },
};

export default REGEX;
