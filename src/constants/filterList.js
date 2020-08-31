// import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import {CATEGORY_ID} from 'constants/CATEGORIES';

/**
 * visible
 * @type {Array}
 */
export const ENTRY_TYPE_FILTERS = [
  {
    label: 'Mafioso Data',
    categories: [CATEGORY_ID.MAFIOSO],
    isHidden: true,
    isDisabled: false,
    checked: false,
  },
  {
    label: 'Uncategorized',
    categories: [CATEGORY_ID.UNCATEGORIZED],
    isHidden: true,
    isDisabled: false,
    checked: false,
  },
  {
    label: 'Ascension/Quest Info',
    categories: [CATEGORY_ID.ASCENSION_INFO, CATEGORY_ID.QUEST],
    isHidden: false,
    checked: true,
  },
  {
    label: 'Combats',
    categories: [CATEGORY_ID.COMBAT],
    isHidden: false,
    checked: true,
  },
  {
    label: 'NonCombats',
    categories: [CATEGORY_ID.NONCOMBAT],
    isHidden: false,
    checked: true,
  },
  {
    label: 'Options',
    categories: [CATEGORY_ID.OPTIONS],
    isHidden: false,
    checked: true,
  },
  {
    label: 'Pulls/Diet',
    categories: [CATEGORY_ID.PULLS, CATEGORY_ID.DIET],
    isHidden: false,
    checked: true,
  },
  {
    label: 'Effects/Items',
    categories: [CATEGORY_ID.EFFECTS, CATEGORY_ID.USE_ITEM],
    isHidden: false,
    checked: false,
  },
  {
    label: 'Crafting/Shopping',
    categories: [CATEGORY_ID.CRAFTING, CATEGORY_ID.TRANSACTIONS],
    isHidden: false,
    checked: false,
  },
  {
    label: 'Other',
    categories: [CATEGORY_ID.FAMILIARS, CATEGORY_ID.EQUIPMENT, CATEGORY_ID.VISIT, CATEGORY_ID.OTHER],
    isHidden: false,
    checked: false,
  },
];
/**
 * @type {Array}
 */
export const DEFAULT_CATEGORIES_VISIBLE = ENTRY_TYPE_FILTERS.reduce((visibleCategories, filterData) => {
  if (filterData.checked) {
    return visibleCategories.concat(filterData.categories);
  }

  return visibleCategories;
}, []);
/**
 * [ATTRIBUTE_FILTERS description]
 * @type {Array}
 */
export const ATTRIBUTE_FILTERS = [
  {
    label: 'None',
    attributeName: 'none',
    isHidden: true,
    checked: false,
  },
  {
    label: 'Evergreen Info',
    optionGroup: [
      {
        label: 'Annotated',
        attributeName: 'hasAnnotations',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Path-specific',
        attributeName: 'isPathSpecific',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Took a Choice',
        attributeName: 'hasChoiceProgression',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Semirares',
        attributeName: 'isSemirare',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Clovers',
        attributeName: 'isClover',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Free Fights',
        attributeName: 'isFreeCombat',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Forced Adventure',
        attributeName: 'isForcedAdventure',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
    ]
  },
  {
    label: 'Resource Usage',
    optionGroup: [
      {
        label: 'Summoned',
        attributeName: 'isSummoned',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Banished',
        attributeName: 'isBanished',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Copied',
        attributeName: 'isCopied',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Disintegrated',
        attributeName: 'isDisintegrated',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Replaced',
        attributeName: 'isReplaced',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Instakilled',
        attributeName: 'hasInstakill',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Sniffed',
        attributeName: 'isAttracted',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Run Away (attempts)',
        attributeName: 'hasRunaway',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
    ]
  },
  {
    label: '2020 Items of the Month',
    optionGroup: [
      {
        label: 'Melodramedary Spat',
        attributeName: 'hasMelodramedary',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Iunion Crown',
        attributeName: 'hasIunionCrown',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Retrospection',
        attributeName: 'hasRetrospecs',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
    ]
  },
  {
    label: '2019 Items of the Month',
    optionGroup: [
      {
        label: 'Diabolic Pizza',
        attributeName: 'isDiabolicPizza',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Pill Keeper Uses',
        attributeName: 'isPillKeeper',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Professor Lectures',
        attributeName: 'hasPocketProfessor',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Used the Force',
        attributeName: 'isEndedByUseTheForce',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Vampyric Cloake',
        attributeName: 'hasVampyricCloake',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Lil\' Doctor Skills',
        attributeName: 'hasDoctorsBag',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
    ],
  },
  {
    label: '2018 Items of the Month',
    optionGroup: [
      {
        label: 'Latte Lovin\' Uses',
        attributeName: 'hasLatteLoversMug',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Latte Ingredient Unlock',
        attributeName: 'hasLatteIngredientUnlock',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Cat Heisted',
        attributeName: 'isHeist',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Voting Monster',
        attributeName: 'isVoting',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
    ]
  },
  {
    label: '2017 Items of the Month',
    optionGroup: [
      {
        label: 'Genie Wishes',
        attributeName: 'isGenieWish',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
    ]
  },
  {
    label: 'Fun Filters',
    optionGroup: [
      {
        label: 'IOTM',
        attributeName: 'isIOTM',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Successful Stealing',
        attributeName: 'hasSuccessfulSteal',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Gained Adventure',
        attributeName: 'hasAdventureGainsNotFromDiet',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Leveled Up',
        attributeName: 'isLevelUp',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Victories',
        attributeName: 'isVictory',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: 'Beaten Up',
        attributeName: 'isDeath',
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
    ]
  },
];
