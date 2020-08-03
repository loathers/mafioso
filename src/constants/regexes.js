export const NEW_LINE_REGEX = /(\r\n|\n)/g;
export const DIVIDING_NEWLINE_REGEX = /$(\r\n|\n)\s*(\r\n|\n)/gm;
export const USELESS_PRE_NEWLINE = /^\s*/g;
export const PRELINE_SPACES = /^(\t| )*(?=.)/gm;
export const EXCESSIVE_NEW_LINES = /(?<=.+$(\r\n|\n)(\r\n|\n))(\r\n|\n)+/gm;
export const REGEX = {
  // -- important
  MAFIOSO: {
    LOG_COMMENTS: /^\/\/.*/gm,
  },
  ASCENSION: {
    REGULAR_COMPLETE: /welcome to valhalla.*?freeing king ralph.*?(\r\n|\n|$)/is,
    THWAITGOLD_COMPLETE: /welcome to valhalla.*?You acquire an item: Thwaitgold.*?(\r\n|\n|$)/is,

    VALHALLA_TEXT: /welcome to valhalla/im,
    VALHALLA_GROUP: /welcome to valhalla.*Ascension #\d+:.*?(\r\n|\n).*?(\r\n|\n).*?(\r\n|\n|$).*?/gmis,
    ASTRAL_SHOPPING_NAME: /(?<=buy ).*(?= for \d+)/gmi,
    MOON_SIGN_NAME: /(?<=.*under the ).*(?= sign)/i,

    ASCENSION_NUMBER: /(?<=Ascension #)\d+/,
    PATH_NAME: /(?<=Ascension #\d+:(\r\n|\n)(hardcore|softcore|casual) ).*(?= (pastamancer|sauceror|accordion thief|disco bandit|seal clubber|turtle tamer))/gmi,
    DIFFICULTY_NAME: /(?<=Ascension #\d+:(\r\n|\n))(hardcore|softcore|casual)/gmi,

    // VALHALLA: /welcome to valhalla/is,
    KING_FREED: /freeing king ralph.*?(?=(\s|))/is,
    THWAITGOLD: /You acquire an item: Thwaitgold.*/is,
  },
  // -- iotm
  BASTILLE_BATTALION: {
    TEXT: /Bastille Battalion/im,
  },
  BEACH_COMB: {
    COMB_SQUARE_LINE: /^Combing square.*/gmi,
    COMBING_LINE: /.*Combing.*/i,
    COMBING_ACTION: /Combing.*/i,
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
  },
  FORTUNE_TELLER: {
    CONSULT_TEXT: /(.*choice 1278.*: ).*/gi,
  },
  GOD_LOBSTER: {
    COMBAT: /Encounter: the god lobster/i,
    BOON: /Encounter: Granted a Boon/i,
    GROUPING: /the God Lobster.*?Granted a Boon/gis,
  },
  HEWN_MOON_RUNE_SPOON: {
  },
  IUNION_CROWN: {
    GAINED_EFFECT: /(?<=^The crown gains ).*/gmi,
    STONES_TEXT: /(?<=^After battle: ).*iunion stones.*(\r\n|\n)the crown.*/gmi,
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
  LATTE_LOVERS_MEMBERS_MUG: {
    FILLED_MUG_LINE: /filled your mug .*/gi,
    UNLOCKED_INGREDIENT_NAME: /(?<=unlocked ).*(?= for latte)/gi,

    THROW_LATTE_LINE: /.*Throw Latte on Opponent.*/gi,
    OFFER_LATTE_LINE: /.*Offer Latte to Opponent.*/gi,
    GULP_LATTE_LINE: /.*gulp latte.*/gi,
  },
  MELODRAMEDARY: {
    SPIT_ON_SOMETHING_LINE: /(?<=^Round ).*spit on.*/gim,
    SPIT_ON_THEM_LINE: /(?<=^Round ).*spit on them.*/gim,
    SPIT_ON_ME_LINE: /(?<=^Round ).*spit on me.*/gim,
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
    SKILL_USE_LINE: /.*(lecture on|deliver your thesis).*/gi,
    AFTER_COMBAT_TEXT: /^After battle:.*(WHEEEEEE|DANCE OF THE UNIVERSE|DANCING OF SCIENCE|dumps some excess electricity|receive a jolt from the battery|quantum-shifts you to a nearby universe).*/gmi,
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
  },
  // -- common
  LINE: {
    LOCATION: /\[\d*\].*/g,
    ENCOUNTER: /Encounter:.*/g,

    MCD_CHANGE: /^mcd.*/gim,
    TELESCOPE: /^telescope.*/gim,
    EQUIP: /^equip.*/gim,
    UNEQUIP: /^unequip.*/gim,
    HAGNK_PULL: /^pull: .*/gim,
    DIET_GAIN_LINE: /^you gain.*(fullness|drunkenness|spleen).*/gmi,

    TALKING: /^talking to.*/gim,
    VISITING: /^visiting.*/gim,
    CLAN_VISIT: /^visiting.*in.*clan.*/gim,
    SWIMMING_POOL: /.*swimming pool.*/gim,
  },

  VALUE: {
    TURN_NUM: /(?!\[)\d*(?=\])/, // look for `[1]`, ignore url hashes with `[]blah[]`
    LOCATION_NAME: /(?<=\]\s).*/,
    SHOP_LOCATION_NAME: /(?<=each from\s).*/,
    ENCOUNTER_NAME: /(?<=Encounter:\s).*/,
    NONCOMBAT_NAME: /(?<=\[\d+\]\s)(.*)(?!Encounter:)/,
    VISIT_LOCATION_NAME: /(?<=^visiting ).*(?=( in))*/im,
    VISIT_ENCOUNTER_NAME: /(?<=^visiting( the| )).*?(?=( in|(\r\n|\n)))/im,

    SPELL_CAST_AMOUNTS: /(?<=^cast )\d+/gm,
    SPELL_CAST_NAMES: /(?<=^cast \d+ ).*/gm,
  },
  // -- character
  CHARACTER: {
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
    SWITCH_TO_RESULT: /(?<=^familiar ).*/gim,

    EQUIP_FAMILIAR_RESULT: /(?<=equip familiar ).*/gi,

    FAMILIAR_WEIGHT_GAIN: /.*(gains a pound).*/gi,
  },
  // -- combat
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
    
    REPLACED_LINE: /^round.*becomes.*/gmi,
    REPLACED_NAME: /(?<=becomes ).*(?=!)/gi,

    USE_COMBAT_ITEM_LINE: /^round \d+:.*uses.*/gmi,
    USE_COMBAT_ITEM_NAME: /(?<=^round \d+:.*uses the ).*(?=!)/gmi,

    AFTER_BATTLE_RESULT: /(?<=^After battle: ).*/gmi,
  },
  // -- meat and trades
  TRANSACTIONS: {
    ACQUIRED_SOMETHING: /.*acquire.*/gi, // this affects items and effects
    MEAT_CHANGED_LINE: /.*(gain|lose|spent).*meat.*/gmi,
    SHOPPING: /.*buy.*for.*from.*/gmi,
    MEAT_SPENT: /.*spent.*meat.*/gi,

    MEAT_GAIN_AMOUNT: /(?<=You gain )(\d*,*)*(?=\s+meat)/gi,
    MEAT_LOSS_AMOUNT: /(?<=You lose )(\d*,*)*(?=\s+meat)/gi,
    
    BUY_ITEM_AMOUNT: /(?<=buy\s)\d+/gi,
    BUY_ITEM_COST: /(?<=for\s)\d+(?=\seach)/gi,
    
    AUTOSELL: /^autosell:.*/gmi,
    SELL_ITEM_AMOUNT: /(?<=^autosell: )\d+/gmi,
    SELL_ITEM_TARGET: /(?<=^autosell: \d+ ).*/gmi,
  },
  // -- items
  ITEMS: {
    ACQUIRED_ITEM_LINE: /(?!.*(effect|intrinsic).*)You acquire (\d+|an item:|).*( \(\d+\)|)/gmi,
    // ACQUIRED_ITEM_NAME: /(?!.*(effect|intrinsic).*)(?<=You acquire (\d+ |an item: )).*?(?=( \(|$))/mi,
    ACQUIRED_ITEM_NAME: /(?!.*(effect|intrinsic).*)(?<=You acquire ).*?(?=( \(|$))/mi,
    ACQUIRED_N_ITEM: /(?!.*(effect|intrinsic).*)(?<=(You acquire ))\d+(?= \w*)/mi,
    ACQUIRED_ITEM_N: /(?!.*(effect|intrinsic).*)(?<=(You acquire.*\())\d+(?=\))/mi,

    MAKE_SOMETHING_LINE: /(create|combine|craft|cook|mix).*\d+.*/gmi,
    COMBINE_LINE: /combine.*\d+.*/gmi,
    COOK_LINE: /cook.*\d+.*/gmi,
    CRAFT_LINE: /craft.*\d+.*/gmi,
    CREATE_LINE: /create.*\d+.*/gmi,
    MIX_LINE: /mix.*\d+.*/gmi,

    CONSUMPTION_LINE: /^(eat|drink|chew) \d+ .*/gi,
    CONSUMPTION_AMOUNT: /(?<=^(eat|drink|chew)\s)\d+(?=\s)/gi,
    CONSUMPTION_TARGET: /(?<=^(eat|drink|chew)\s\d+\s).*/gi,
    CONSUMPTION_COST: /(?<=^you gain )\d+ (fullness|drunkenness|spleen)/gmi,

    EAT_AMOUNT: /(?<=^eat\s)\d+(?=\s)/gi,
    EAT_TARGET: /(?<=^eat\s\d+\s).*/gi,
    DRINK_AMOUNT: /(?<=^drink\s)\d+(?=\s)/gi,
    DRINK_TARGET: /(?<=^drink\s\d+\s).*/gi,
    CHEW_AMOUNT: /(?<=^chew\s)\d+(?=\s)/gi,
    CHEW_TARGET: /(?<=^chew\s\d+\s).*/gi,

    EQUIP_PLAYER_TARGETS: /(?<=equip (?!familiar).* ).*/gi,
    UNEQUIP_PLAYER_TARGETS: /(?<=unequip (?!familiar).* ).*/gi,
    CUSTOM_OUTFIT_LINE: /^custom outfit.*/gmi, 

    HAGNK_PULL_LINE: /^pull: \d* .*/gmi,
    HAGNK_PULL_NAME: /(?<=^pull: \d* ).*/gmi,
    HAGNK_PULL_AMOUNTS: /(?<=^pull: )\d*/gmi,

    CLOSET_PUT_TARGETS: /(?<=^add to closet: ).*/gi,
    CLOSET_TAKE_TARGETS: /(?<=^take from closet: ).*/gi,
  },
  // -- effects
  EFFECTS: {
    ACQUIRED_EFFECT_LINE: /.*acquire an (effect|intrinsic):.*/gmi,
    EFFECT_NAME: /(?<=acquire an (effect|intrinsic): ).*?(?=( \(|$))/mi,
    EFFECT_DURATION: /(?<=acquire an (effect|intrinsic): .*\()\d+(?=\))/mi,

    UNAFFECT_LINE: /^uneffect.*/gim,
    LOSE_EFFECT_LINE: /^you lose.*effect.*/gim,

    CAST_LINE: /^cast .*/gim,
    CAST_NAME: /(?<=^cast \d+ ).*/mi,
    CAST_AMOUNT: /(?<=^cast )\d+(?=.*)/mi,

    UNMATCHED_EFFECT: /(?<=^(\r\n|\n)).*acquire an (effect|intrinsic).*$(?!(\r\n|\n).)/gim,
  },
  // -- 
  // note: these only work in raw
  GROUP: {
    ASCENSION_SNAPSHOT: /^(Ascension)/m,

    MOON_SNAPSHOT: /(> moon).*?(?=\s\s> status)/gmis,
    STATUS_SNAPSHOT: /(> status).*?(?=\s\s> equipment)/gmis,
    EQUIPMENT_SNAPSHOT: /(> equipment).*?(?=\s\s> skills)/gmis,
    SKILLS_SNAPSHOT: /(> skills).*?(?=\s\s> effects)/gmis,
    EFFECTS_SNAPSHOT: /(> effects).*?(?=\s\s> modifiers)/gmis,
    MODIFIERS_SNAPSHOT: /(> modifiers).*?(?=(\r\n|\n){3,})/gmis,

    SAME_AFTER_BATTLE: /(^After battle:).*(\r\n|\n).*(\r\n|\n){2,}(?!\.)/gmi,
    PVP_ATTACK: /(^attack).*?pvp fight/gmis,
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
  SNAPSHOT_CHECK: {
    CHARACTER_NAME: /(?<=^name: ).*/mi,
    CONTAIN_MOON: /(> moon)/i,
    CONTAIN_STATUS: /(> status)/i,
    CONTAIN_EQUIPMENT: /(> equipment)/i,
    CONTAIN_SKILLS: /(> skills)/i,
    CONTAIN_EFFECTS: /(> effects)/i,
    CONTAIN_MODIFIERS: /(> modifiers)/i,

    KOL_DATE: /(?<=- )(Jarlsuary|Frankuary|Starch|April|Martinus|Bill|Bor|Petember|Carlvember|Porktober|Boozember|Dougtember) \d+/gi,
  },
  // -- misc
  PREREMOVE: {
    ALWAYS_CATCHALL: /^(main|mall|peevpee|play|raffle|maximizer|upeffect|uneffect|custom outfit).*(\r\n|\n)/gmi,
    SINGLELINE_CATCHALL: /^(\r\n|\n)^(main|use|talking|tutorial|visiting|visit|took choice|Cast|choice|concert|eat|drink|chew).*(?!(\r\n|\n).)(\r\n|\n)/gim,
    NO_FOLLOWUP_CATCHALL: /^(use|visit|took choice|maximizer|Cast|choice).*(?!(\r\n|\n).)(\r\n|\n)/gim,

    LOG_BORDER: /(=-)+=+(\r\n|\n)/g,
    RAFFLE_TEXT: /You acquire raffle ticket/gi,
    USELESS_BREAKFAST_LINE: /^main.*checkbfast.*(\r\n|\n)/gim,
    USELESS_LEAFLET_LINE: /^leaflet.*(?!plover)(\r\n|\n)/gim,
  },
};

export default REGEX;