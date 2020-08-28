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
  },
  ASCENSION: {
    VALHALLA_COMPLETE: /welcome to valhalla.*?(freeing king ralph|freeing the king).*?/is,
    THWAITGOLD_COMPLETE: /welcome to valhalla.*?You acquire an item: Thwaitgold.*?/is,
    REGULAR_COMPLETE: /Beginning New Ascension.*?(freeing king ralph|freeing the king).*?/is,

    VALHALLA_TEXT: /welcome to valhalla/im,
    VALHALLA_GROUP: /^welcome to valhalla.*?ascend as.*?(\r\n|\n)/gmis,
    ASTRAL_SHOPPING_NAME: /(?<=buy.*)astral .*(?= for)/gmi,
    KARMA_TEXT: /(\d+(?= karma| banked karma)|(?<=balance = )\d+|(?<=balance is )\d+)/gmi,
    MOON_SIGN_NAME: /(?<=.*under the ).*(?= sign)/i,

    ASCENSION_DETAIL_GROUP: /^Ascension #\d+(.*(\r\n|\n)){3}/mi,
    ASCENSION_NUMBER: /(?<=Ascension #)\d+/,
    PATH_NAME: /(?<=Ascension #\d+:(\r\n|\n)(hardcore|softcore|normal|casual) ).*(?= (pastamancer|sauceror|accordion thief|disco bandit|seal clubber|turtle tamer))/gmi,
    DIFFICULTY_NAME: /(?<=Ascension #\d+:(\r\n|\n))(hardcore|softcore|normal|casual)/gmi,

    // VALHALLA: /welcome to valhalla/is,
    KING_FREED: /freeing king ralph.*?(?=(\s|))/i,
    THWAITGOLD: /You acquire an item: Thwaitgold.*/i,
    NAUGHTY_SORCERESS: /.*The Naughty Sorceress.*/i,
  },
  // -- iotm
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
  CAT_BURGLAR: {
    USELESS_HEIST_GROUP: /main\.php.*heist=1(\r\n|\n).*(1320\/2).*(\r\n|\n).*$/gi,
    HEISTED: /.*(choice 1320\/1).*/gi,
    NEVERMIND_LINE: /.*choice 1320\/2.*(\r\n|\n)/gi,
  },
  CONSPIRACY_ISLAND: {
    TEXT: /.*Conspiracy Island.*/gi,
    CONTROL_PANEL_LINE: /Took choice 986.*/gi,
    CONTROL_PANEL_RESULT: /(?<=Took choice 986.*: )/gi,
  },
  DECK_OF_EVERY_CARD: {
    TEXT: /Deck of Every Card/im,
  },
  DIABOLIC_PIZZA: {
    INGREDIENTS_LINE: /^pizza.*/m,
    INGREDIENTS_ONLY: /(?<=^pizza\s).*/m,
    EAT_LINE: /^eat\s\d+\sdiabolic pizza/m,
  },
  DISTANCE_WOODS_GETAWAY: {
    GAZING_LINE: /(^gazing).*/gi,
    USELESS_GAZING_LINE: /gazing at the stars.*/gmi,
  },
  FOURTH_OF_MAY_COSPLAY_SABER: {
    USE_THE_FORCE_TEXT: /.*casts USE THE FORCE.*/i,
    USE_THE_FORCE_CHOICE_LINE: /Took choice 1387.*/gi,
    UPGRADE_TEXT: /^encounter.*may the fourth cosplay saber.*$(\r\n|\n).*choice 1386\/\d.*$/gmi,
    UPGRADE_CHOICE: /(?<=^Took choice 1386.*: ).*/gmi,

    USELESS_UPGRADE_LINE: /^encounter.*may the fourth cosplay saber.*$(\r\n|\n)/mi,
  },
  FORTUNE_TELLER: {
    CONSULT_TEXT: /(.*choice 1278.*: ).*/gi,
  },
  GOD_LOBSTER: {
    COMBAT: /Encounter: the god lobster/i,
    BOON: /Encounter: Granted a Boon/i,
    GROUPING: /the God Lobster.*?Granted a Boon/gis,
    BOON_CHOICE_RESULT: /(?<=^took choice 1310.*: ).*/gmi,
  },
  HEWN_MOON_RUNE_SPOON: {
    TUNE_MOON_LINE: /^tuning moon.*/i,
    TUNE_MOON_RESULT: /(?<=^tuning moon to ).*/mi,
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
  MELODRAMEDARY: {
    SPIT_ON_SOMETHING_LINE: /(?<=^Round ).*spit on.*/gim,
    SPIT_ON_THEM_LINE: /(?<=^Round ).*spit on them.*/gim,
    SPIT_ON_ME_LINE: /(?<=^Round ).*spit on me.*/gim,
  },
  NEVERENDING_PARTY: {
    INTRO_CHOICE_GROUP: /.*neverending party.*(\r\n|\n).*took choice 1322.*(\r\n|\n).*(whichchoice=1322.*)?(\r\n|\n)/gim,
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
  RETROSPECS: {
    FOUND_ITEM: /(?<=You look behind you and notice an item you missed earlier.*?you acquire an item: ).*?$/mis,
  },
  SONGBOOM_BOOMBOX: {
    GROUPING: /^use.*songboom.*boombox(\r\n|\n).*soundtrack.*(\r\n|\n).*took choice.*(\r\n|\n){2,}setting soundtrack.*/gmi,
    RESULT: /(?<=^use.*songboom.*boombox(\r\n|\n).*soundtrack.*(\r\n|\n).*took choice 1312.*: ).*/gmi,
    SING_ALONG: /(?<=^round \d+:.*)(SING ALONG)/gmi,
  },
  SNOJO: {
    VISIT_CONTROL_LINE: /Visiting Snojo Control Console/gi,
  },
  VAMPYRIC_CLOAK: {
    SKILL_RESULT: /casts.*become a (wolf|cloud of mist|bat)*/gi,
  },
  VOTING_BOOTH: {
    GROUPING: /visiting the voting booth.*?daily loathing ballot/gis,
    DAILY_VOTE_TEXT: /Daily Loathing Ballot/i,

    VOTE_MONSTER_COMBAT: /(?<=^Encounter: )(government bureaucrat|terrible mutant|angry ghost|annoyed snake|slime blob)/gmi,
    VOTE_MONSTER_UNIQUE: /(?:^took choice 1331.*?Encounter: )(government bureaucrat|terrible mutant|angry ghost|annoyed snake|slime blob)/gmis,
  },
  // -- paths
  COMMUNITY_SERVICE: {
    CHOICE_LINE: /^Took choice 1089.*/gmi,
    CHOICE_RESULT: /(?<=^took choice 1089\/\d+: ).*(?= \(\d+ adventures.*)/gmi,
  },
  LOW_KEY_SUMMER: {
  },
  QUEST: {
    VISIT_TOOT: /tutorial.*action=toot/i,
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
    CLASS_NAME: /(?<=^class: ).*/mi,

    ADV_CHANGE_LINE: /.*(gain|lose).*\d*adventure.*/gi,
    ADV_GAINS: /(?<=gain )\d+(?= adventure)/gi,
    ADV_LOSSES: /(?<=lose )\d+(?= adventure)/gi,

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
    SWITCH_TO_LINE: /^familiar.*/gim,
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

    REPLACED_LINE: /^round.*becomes.*/gmi,
    REPLACED_NAME: /(?<=becomes ).*(?=!)/gi,

    USE_COMBAT_ITEM_LINE: /^round \d+:.*uses.*/gmi,
    USE_COMBAT_ITEM_NAME: /(?<=^round \d+:.*uses the ).*(?=!)/gmi,

    AFTER_BATTLE_RESULT: /(?<=^After battle: ).*/gmi,
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
  ITEMS: {
    ACQUIRED_ITEM_LINE: /(?!.*(effect|intrinsic).*)You acquire (\d+|an item:|).*( \(\d+\)|)/gmi,
    ACQUIRED_AN_ITEM_NAME: /(?!.*(effect|intrinsic).*)(?<=You acquire (\d+ |an item: )).*?(?=( \(|$))/mi,
    ACQUIRED_ITEM_NAME: /(?!.*(effect|intrinsic).*)(?<=You acquire ).*?(?=( \(|$))/mi,
    ACQUIRED_N_ITEM: /(?!.*(effect|intrinsic).*)(?<=(You acquire ))\d+(?= \w*)/mi,
    ACQUIRED_ITEM_N: /(?!.*(effect|intrinsic).*)(?<=(You acquire.*\())\d+(?=\))/mi,

    USE_ITEM_LINE: /^use \d+ .*/gmi,
    USE_ITEM_LINE_FIRST_ONLY: /^use \d+ .*/i,
    USE_ITEM_AMOUNT: /(?<=^use )\d+/gmi,
    USE_ITEM_TARGET: /(?<=^use \d+ ).*/gmi,

    ZAP_LINE: /^zap .*/gmi,
    ZAP_TARGET: /(?<=^zap ).*/gmi,

    MAKE_SOMETHING_LINE: /^(create|combine|craft|cook|mix|smith) .*\d+.*/gmi,
    COMBINE_LINE: /^combine .*/gmi,
    COOK_LINE: /^cook .*/gmi,
    CRAFT_LINE: /^craft .*/gmi,
    CREATE_LINE: /^create .*/gmi,
    MIX_LINE: /^mix .*/gmi,
    SMITH_LINE: /smith.*\d.*\+ \d.*/gmi,
    CRAFTING_USED_LINE: /^crafting used .*(\r\n|\n)/gmi,

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
  EFFECTS: {
    ACQUIRED_EFFECT_LINE: /.*acquire an (effect|intrinsic):.*/gmi,
    EFFECT_NAME: /(?<=acquire an (effect|intrinsic): ).*?(?=( \(|$))/mi,
    EFFECT_DURATION: /(?<=acquire an (effect|intrinsic): .*\()\d+(?=\))/mi,

    UNAFFECT_LINE: /^uneffect.*/gim,

    CAST_LINE: /^cast .*/gim,
    CAST_NAME: /(?<=^cast \d+ ).*/mi,
    CAST_AMOUNT: /(?<=^cast )\d+(?=.*)/mi,

    UNMATCHED_EFFECT: /(?<=^(\r\n|\n)).*acquire an (effect|intrinsic).*$(?!(\r\n|\n).)/gim,
  },
  // --
  // note: these only work in raw
  GROUP: {
    SAME_AFTER_BATTLE: /(^After battle:).*(\r\n|\n).*(\r\n|\n){2,}(?!\.)/gmi,
    PVP_ATTACK: /(^attack).*?pvp fight/gmis,

    MCLUSKY_FILE_AND_USE_BINDER: /.*acquire.*mcclusky file.*(\r\n|\n).*boring bind clip.*/mi,
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
    SNAPSHOT_DATE: /(?:January|February|March|April|May|June|July|August|September|OCtober|November|December).*(Jarlsuary|Frankuary|Starch|April|Martinus|Bill|Bor|Petember|Carlvember|Porktober|Boozember|Dougtember) \d+/gi,
    KOL_DATE: /(Jarlsuary|Frankuary|Starch|April|Martinus|Bill|Bor|Petember|Carlvember|Porktober|Boozember|Dougtember) \d+/gi,
    BEGIN_ASCENSION_SNAPSHOT: /((=-){22}=)(\r\n|\n)beginning new ascension(\s)*(\r\n|\n)((=-){22}=).*?((=-){22}=)/gmis,
    PLAYER_SNAPSHOT: /((=-){22}=)(\r\n|\n)( *)player snapshot(\r\n|\n)((=-){22}=).*?((=-){22}=)/gmis,
    WTF_SNAPSHOT_REPLACER_CAPTURE_GROUP: /(?:(?:=-){22}=)(?:\r\n|\n)(?: *)player snapshot(?:\r\n|\n)(?:(?:=-){22}=).*?((?:January|February|March|April|May|June|July|August|September|OCtober|November|December).*?(?=\r\n|\n)).*?(name:.*?class:.*?(?=\r\n|\n)).*?(?:(?:=-){22}=)/gmis,
  },
  // -- misc
  PREREMOVE: {
    ALWAYS_CATCHALL: /^(awesomemenu|backoffice|diary|familiar lock|friars blessing|main|mall|peevpee|play|put in display case|raffle|maximizer|museum|shower|upeffect|uneffect|outfit|custom outfit).*(\r\n|\n)/gmi,
    SINGLELINE_CATCHALL: /(?<=^(\r\n|\n))^(main|use|visiting|visit|Cast|choice|cobbsknob|concert|inspecting|eat|drink|chew|talking|tutorial).*(?!(\r\n|\n).)(\r\n|\n)/gim,
    NO_FOLLOWUP_CATCHALL: /^(use|visit|maximizer|Cast|choice).*(?!(\r\n|\n).)(\r\n|\n)/gim,
    SINGLELINE_ADVENTURE: /(?<=^(\r\n|\n))^(\[\d+\]).*(?!(\r\n|\n).)(\r\n|\n)/gim,

    RAFFLE_TEXT: /.*You acquire raffle ticket.*/gi,
    USELESS_LEAFLET_LINE: /(?!.*(plover|open chest|look in hole|take ring))^(leaflet|\(you see a).*(\r\n|\n)/gim,
    SWIMMING_POOL: /.*swimming pool.*(\r\n|\n)/gim,

    LOSE_EFFECT_LINE: /^you lose.*effect.*(\r\n|\n)/gim,
    FAMILIAR_WEIGHT_GAIN: /.*(familiar gains a pound).*(\r\n|\n)/gi,
    UNEQUIP: /^unequip.*(\r\n|\n)/gim,
    MCD_CHANGE: /^mcd.*(\r\n|\n)/gim,
    TELESCOPE: /^telescope.*(\r\n|\n)/gim,
  },
};

export default REGEX;
