import ENTITY_TYPE from 'constants/ENTITY_TYPE';

/**
 * @typedef {Entity} Banisher
 */
export const BANISHERS_MAP = {
  'Louder than Bomb': {
    matcher: /(uses|casts).*Louder Than Bomb/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Harolds\'s Bell': {
    matcher: /(uses|casts).*Harold's bell/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Tryptophan Dart': {
    matcher: /(uses|casts).*tryptophan dart/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Human Musk': {
    matcher: /(uses|casts).*human musk/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Reflex Hammer': {
    matcher: /(uses|casts).*Reflex Hammer/i,
    entityType: ENTITY_TYPE.EQUIPMENT,
  },
  'Cosplayer Saber Banish': {
    matcher: /I am not the adventurer you are looking for/i,
    entityType: ENTITY_TYPE.EQUIPMENT,
  },
  'Batter Up': {
    matcher: /(uses|casts).*Batter Up/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Mafia Middle Finger Ring': {
    matcher: /(uses|casts).*SHOW THEM YOUR RING/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Latte Banish': {
    matcher: /(uses|casts).*THROW LATTE ON OPPONENT/i,
    entityType: ENTITY_TYPE.EQUIPMENT,
  },
  'Baleful Howl': {
    matcher: /(uses|casts).*BALEFUL HOWL/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Ultra Smash': {
    matcher: /(uses|casts).*ULTRA SMASH/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Banishing Shout': {
    matcher: /(uses|casts).*BANISHING SHOUT/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Peel Out': {
    matcher: /(uses|casts).*PEEL OUT/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Walk away from Explosion': {
    matcher: /(uses|casts).*WALK AWAY FROM EXPLOSION/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Smoke Grenade': {
    matcher: /(uses|casts).*smoke grenade/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Curse of Vacation': {
    matcher: /(uses|casts).*CURSE OF VACATION/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Beancannon': {
    matcher: /(uses|casts).*BEANCANNON/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Howl of the Alpha': {
    matcher: /(uses|casts).*HOWL OF THE ALPHA/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Thunder Clap': {
    matcher: /(uses|casts).*THUNDER CLAP/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Class Monkey': {
    matcher: /(uses|casts).*classy monkey/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Dirty Stinkbomb': {
    matcher: /(uses|casts).*dirty stinkbomb/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Deathchucks': {
    matcher: /(uses|casts).*deathchucks/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Creepy Grin': {
    matcher: /(uses|casts).*creepy grin/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Give your opponent the Stinkeye': {
    matcher: /(uses|casts).*Give your opponent the Stinkeye/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Talk about Politics': {
    matcher: /(uses|casts).*Talk about Politics/i,
    entityType: ENTITY_TYPE.EQUIPMENT,
  },
  'Licorice Rope': {
    matcher: /(uses|casts).*LICORICE ROPE/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Snokebomb': {
    matcher: /(uses|casts).*SNOKEBOMB/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'KGB Tranquilizer Dart': {
    matcher: /(uses|casts).*KGB TRANQUILIZER DART/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Spring-Loaded Front Bumpber': {
    matcher: /(uses|casts).*SPRING-LOADED FRONT BUMPER/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Breathe Out': {
    matcher: /(uses|casts).*BREATHE OUT/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
  'Champagne Popper': {
    matcher: /(uses|casts).*divine champagne popper/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Crystal Skull': {
    matcher: /(uses|casts).*crystal skill/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Winifred\'s Whistle': {
    matcher: /(uses|casts).*Winifred's whistle/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Ice House': {
    matcher: /(uses|casts).*ice house/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Tennis Ball': {
    matcher: /(uses|casts).*tennis ball/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Daily Affirmation: Be a Mind Master': {
    matcher: /(uses|casts).*Daily Affirmation: Be a Mind Master/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Spooky Music Box Mechanism': {
    matcher: /(uses|casts|).*spooky music box mechanism/i,
    entityType: ENTITY_TYPE.COMBAT_ITEM,
  },
  'Feel Hatred': {
    matcher: /casts.*Feel Hatred/i,
    entityType: ENTITY_TYPE.COMBAT_SKILL,
  },
}

export const BANISHERS = Object.keys(BANISHERS_MAP);
