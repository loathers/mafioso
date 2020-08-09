// import ENTRY_TYPE from 'constants/ENTRY_TYPE';
import {CATEGORY_ID} from 'constants/CATEGORIES';
import {DEFAULT_CATEGORIES_VISIBLE} from 'constants/DEFAULTS';

/**
 * visible
 * @type {Array}
 */
export const ENTRY_TYPE_FILTERS = [
  {
    label: 'Uncategorized',
    categoryId: CATEGORY_ID.UNCATEGORIZED,
    isHidden: true,
    isDisabled: false,
  },
  {
    label: 'Ascension Info',
    categoryId: CATEGORY_ID.ASCENSION_INFO,
    isHidden: false,
  },
  {
    label: 'Quests',
    categoryId: CATEGORY_ID.QUEST,
    isHidden: false,
  },
  {
    label: 'Combat',
    categoryId: CATEGORY_ID.COMBAT,
    isHidden: false,
  },
  {
    label: 'NonCombat',
    categoryId: CATEGORY_ID.NONCOMBAT,
    isHidden: false,
  },
  {
    label: 'ChoiceAdv',
    categoryId: CATEGORY_ID.CHOICEADV,
    isHidden: false,
  },
  {
    label: 'Diet',
    categoryId: CATEGORY_ID.DIET,
    isHidden: false,
  },
  {
    label: 'Pulls',
    categoryId: CATEGORY_ID.PULLS,
    isHidden: false,
  },
  {
    label: 'Use Item',
    categoryId: CATEGORY_ID.USE_ITEM,
    isHidden: false,
  },
  {
    label: 'Buffs/Effects',
    categoryId: CATEGORY_ID.EFFECTS,
    isHidden: false,
  },
  {
    label: 'Crafting',
    categoryId: CATEGORY_ID.CRAFTING,
    isHidden: false,
  },
  {
    label: 'Shopping',
    categoryId: CATEGORY_ID.TRANSACTIONS,
    isHidden: true,
  },
  {
    label: 'Other',
    categoryId: CATEGORY_ID.OTHER,
    isHidden: false,
  },
];
/**
 * @type {Array}
 */
export const ENTRY_TYPE_FILTERS_SETTINGS = ENTRY_TYPE_FILTERS.map((filterData) => {
  return {
    ...filterData,
    checked: DEFAULT_CATEGORIES_VISIBLE.includes(filterData.categoryId),
  }
});
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
        label: 'Leveled Up',
        attributeName: 'isLevelUp',
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
        label: 'Gained Adventure',
        attributeName: 'hasAdventureGains',
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