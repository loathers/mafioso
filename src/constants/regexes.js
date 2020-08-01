export const NEW_LINE_REGEX = /(\r\n|\n)/g;
export const PRE_LINE_EMPTY_SPACE = /^\s*/g;
export const POST_LINE_EMPTY_SPACE = /(\r\n|\n)*(?!.)/gs;
export const EMPTY_LINES_REGEX = /(\r\n|\n){2,}/g;
export const BACK_NEW_LINE_REGEX = /(?<!.\s)^(\r\n|\n)/gm;
export const REGEX = {
  // -- important
  ASCENSION: {
    REGULAR_COMPLETE: /welcome to valhalla.*?freeing king ralph.*?(\r\n|\n|$)/is,
    THWAITGOLD_COMPLETE: /welcome to valhalla.*?You acquire an item: Thwaitgold.*?(\r\n|\n|$)/is,

    VALHALLA_TEXT: /welcome to valhalla/im,
    VALHALLA_GROUP: /welcome to valhalla.*Ascension #\d+:.*?(\r\n|\n).*?(\r\n|\n).*?(\r\n|\n|$).*?/gmis,
    ASTRAL_SHOPPING_NAME: /(?<=buy ).*(?= for \d+)/gmi,

    ASCENSION_NUMBER: /(?<=Ascension #)\d+/,
    PATH_NAME: /(?<=Ascension #\d+:(\r\n|\n)(hardcore|softcore|casual) ).*(?= (pastamancer|sauceror|accordion thief|disco bandit|seal clubber|turtle tamer))/gmi,
    DIFFICULTY_NAME: /(?<=Ascension #\d+:(\r\n|\n))(hardcore|softcore|casual)/gmi,

    // VALHALLA: /welcome to valhalla/is,
    // KING_FREED: /freeing king ralph.*?(?=(\s|))/is,
    // THWAITGOLD: /You acquire an item: Thwaitgold.*/is,
    // ASCEND_PHP: /ascend.php.*/is,
  },
  // -- iotm
  BASTILLE_BATALLION: {
    TEXT: /Bastille Battalion/im,
  },
  BEACH_COMB: {
    USELESS_VISIT: /main.*comb.*/gi,

    COMBING_LINE: /.*Combing.*/i,
    COMBING_ACTION: /Combing.*/i,
  },
  BOXING_DAYCARE: {
    // GROUPING: /visiting the boxing daycare.*?(enter the boxing daycare|Boxing Daydream|Boxing Day Spa)/gis,
    VISIT: /visiting the boxing daycare.*/gi,
    NONCOMBAT: /^encounter:.*(enter the boxing daycare|Boxing Daydream|Boxing Day Spa).*/gim,
  },
  DECK_OF_EVERY_CARD: {
    TEXT: /Deck of Every Card/im,
    USELESS_USE: /.*deck of every card.*(\r\n|\n)(?!.)/gim,
    USELESS_PLAY: /^play.*/gim,
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
    USE_THE_FORCE_TEXT: /.*(USE THE FORCE).*/i,
    USE_THE_FORCE_CHOICE_LINE: /Took choice 1387.*/gi,
  },
  GOD_LOBSTER: {
    USELESS_VISIT: /main.*fightgodlobster.*/gi,

    COMBAT: /Encounter: the god lobster/i,
    BOON: /Encounter: Granted a Boon/i,
    GROUPING: /the God Lobster.*?Granted a Boon/gis,
  },
  HEWN_MOON_RUNE_SPOON: {
    USELESS_USE: /^use.*(hewn moon-rune spoon)/gmi,
  },
  IUNION_CROWN: {
    GAINED_EFFECT: /(?<=^The crown gains ).*/gmi,
    STONES_TEXT: /(?<=^After battle: ).*iunion stones.*(\r\n|\n)the crown.*/gmi,
  },
  JANUARYS_GARBAGE_TOTE: {
    USE_FOLDABLE: /^use \d January's garbage tote/mi,
    USE_RESULT: /(?<=use \d January's garbage tote).*?acquire.*?:.*?(deceased crimbo tree|broken champagne bottle|tinsel tights|wad of used tape|makeshift garbage shirt)/gis,
    EQUIP_RESULT: /(?<=equip \w+ ).*?(deceased crimbo tree|broken champagne bottle|tinsel tights|wad of used tape|makeshift garbage shirt)/gi,
  },
  LATTE_LOVERS_MEMBERS_MUG: {
    FILLED_MUG_LINE: /filled your mug .*/gi,
    UNLOCKED_INGREDIENT_NAME: /(?<=unlocked ).*(?= for latte)/gi,

    THROW_LATTE_LINE: /.*Throw Latte on Opponent.*/gi,
    OFFER_LATTE_LINE: /.*Offer Latte to Opponent.*/gi,
    GULP_LATTE_LINE: /.*gulp latte.*/gi,

    USELESS_USE: /main.php\?latte=1.*(\r\n|\n)(?!.)/gi,
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

    USELESS_USE: /main.php\?eowkeeper=1.*/gi,
    NEVERMIND_LINE: /.*choice 1395\/9.*(\r\n|\n).*choice=1395.*option=9/gi,
  },
  PIRATEREALM: {
    // ENTRY_GROUPING: /^\[.*?piraterealm.*?(\r\n|\n){2,}/gmis,
    LOCATION: /(?<=^\[.*\] ).*piraterealm.*/gmi,
  },
  POCKET_PROFESSOR: {
    SKILL_USE_LINE: /.*(lecture on|deliver your thesis).*/gi,
  },
  SONGBOOM_BOOMBOX: {
    GROUPING: /^use.*?songboom.*?setting soundtrack.*/gmis,
    RESULT: /(?<=^use.*?songboom.*?setting soundtrack to ).*/gmis,
    SING_ALONG: /(?<=^round\s\d:.*)(SING ALONG)/gmi,
  },
  VOTING_BOOTH: {
    GROUPING: /visiting the voting booth.*?daily loathing ballot/gis,
  },

  // -- common
  LINE: {
    USELESS_USE: /^use.*(\r\n|\n)(?!.)/gmi,
    LOCATION: /\[\d*\].*/g,
    ENCOUNTER: /Encounter:.*/g,
    USELESS_VISIT: /visit.*(\r\n|\n)(?!.)/gim,

    MCD_CHANGE: /^mcd.*/gim,
    TELESCOPE: /^telescope.*/gim,
    EQUIP: /^equip.*/gim,
    UNEQUIP: /^unequip.*/gim,
    HAGNK_PULL: /^pull: .*/gim,

    FAMILIAR: /^familiar.*/gim,
    FAMILIAR_WEIGHT_GAIN: /.*(gains a pound).*/gi,

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
  // -- combat
  COMBAT: {
    FREE_COMBAT: /.*combat.*did not cost.*/i,

    INITIATIVE_LINE: /Round.*(loses initiative|wins initiative).*/i,
    WIN_INIT: /Round.*(wins initiative).*/i,
    LOSE_INIT: /Round.*(loses initiative).*/i,
    VICTORY_LINE: /(?<=\s).*wins the fight.*/i,

    ACTION_ROUND: /^(?!.*(executes a macro| lose | gain |initiative| wins |becomes).*)round.*!/gmi,
    COMBAT_ROUND_LINE: /^round\s\d:.*/gmi,
    COMBAT_ROUND_NUM: /(?<=Round\s)\d+(?=:)/gmi,

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

    CONSUMPTION_AMOUNT: /(?<=^(eat|drink|chew)\s)\d+(?=\s)/gi,
    CONSUMPTION_TARGET: /(?<=^(eat|drink|chew)\s\d+\s).*/gi,
    EAT_AMOUNT: /(?<=^eat\s)\d+(?=\s)/gi,
    EAT_TARGET: /(?<=^eat\s\d+\s).*/gi,
    DRINK_AMOUNT: /(?<=^drink\s)\d+(?=\s)/gi,
    DRINK_TARGET: /(?<=^drink\s\d+\s).*/gi,
    CHEW_AMOUNT: /(?<=^chew\s)\d+(?=\s)/gi,
    CHEW_TARGET: /(?<=^chew\s\d+\s).*/gi,

    EQUIP_TARGETS: /(?<=equip .*?\s).*/g,
    UNEQUIP_TARGETS: /(?<=unequip .*?\s).*/g,

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

    CAST_LINE: /cast .*/gim,
    CAST_NAME: /(?<=cast \d+ ).*/mi,
    CAST_AMOUNT: /(?<=cast )\d+(?=.*)/mi,
    USELESS_CAST_LINE: /cast.*(\r\n|\n)(?!.)/gim,

    USELESS_REUP_LINE: /^upeffect.*/gim,
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

    SAME_AFTER_BATTLE: /(^After battle:).*(\r\n|\n).*(\r\n|\n){2,}\w(?!\[)/gmi,
    PVP_ATTACK: /(^attack).*?pvp fight/gmis,
  },
  // -- kolmafia snapshot
  FILE: {
    MAFIA_SESSION_DATE: /(?<=_)\d*/,
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
  MISC: {
    LOG_BORDER: /(=-)+=+(\r\n|\n)/g,
    STACK_TRACE: /^stack trace:(\r\n|\n){1,}(\s\sat.*(\r\n|\n|$))*/gmi,
    CLI_PRINT: /^> .*(\r\n|\n|$)/gmi,
    SEND_A_KMAIL: /send a kmail.*(\r\n|\n|$)/gi,
    COMBAT_MACRO: /.*executes a macro.*(\r\n|\n|$)/gi,
    MAFIA_MAXIMIZER: /^(Maximizer:|maximize ).*(\r\n|\n|$)/gmi,
    EMPTY_CHECKPOINT: /Created an empty checkpoint.*(\r\n|\n|$)/gi,
    MALL_LINE: /^mall\.php.*/gim,
    PVP_LINE: /^peevpee\.php.*/gim,
    ANY_PHP_LINE: /^.*\.php.*/gim,
    USELESS_BREAKFAST_LINE: /^main.*checkbfast.*/gim,
    USELESS_LEAFLET_LINE: /^leaflet.*(?!plover)/gim,
    // sometimes
    MAFIA_CHOICE_URL: /.*.php.*(\r\n|\n|$)/g,
  },
};

export default REGEX;