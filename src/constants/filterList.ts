// import ENTRY_TYPE from './ENTRY_TYPE';
import { CATEGORY_ID } from "./CATEGORIES";

export type Option = {
  label: string;
  categories?: string[];
  isHidden?: boolean;
  isDisabled?: boolean;
  checked?: boolean;
  title?: string;
  attributeName?: string;
  attributeValue?: any;
};

export type Filter = {
  id?: string;
  optionGroup?: Option[];
} & Option;

export const ENTRY_TYPE_FILTERS: Filter[] = [
  {
    label: "Mafioso Data",
    categories: [CATEGORY_ID.MAFIOSO],
    isHidden: true,
    isDisabled: false,
    checked: false,
    title: "Entries Mafioso generated.",
  },
  {
    label: "Uncategorized",
    categories: [CATEGORY_ID.UNCATEGORIZED],
    isHidden: true,
    isDisabled: false,
    checked: false,
    title: "Entries Mafioso does not recognize.",
  },
  {
    label: "Ascension/Quest Info",
    categories: [CATEGORY_ID.ASCENSION_INFO, CATEGORY_ID.QUEST],
    isHidden: false,
    checked: true,
    title: "Show Ascension or Quest non-combats.",
  },
  {
    label: "Combats",
    categories: [CATEGORY_ID.COMBAT],
    isHidden: false,
    checked: true,
    title: "Show Combat Entries",
  },
  {
    label: "NonCombats",
    categories: [CATEGORY_ID.NONCOMBAT],
    isHidden: false,
    checked: true,
    title: "Show NonCombats Entries",
  },
  {
    label: "Options",
    categories: [CATEGORY_ID.OPTIONS],
    isHidden: false,
    checked: true,
    title: "Show Entries where a choice that is limited daily is made.",
  },
  {
    label: "Pulls/Diet",
    categories: [CATEGORY_ID.PULLS, CATEGORY_ID.DIET],
    isHidden: false,
    checked: true,
    title: "Show eating, drinking, or chewing.",
  },
  {
    label: "Effects/Items",
    categories: [CATEGORY_ID.EFFECTS, CATEGORY_ID.USE_ITEM],
    isHidden: false,
    checked: false,
    title: "Show spell casts, buffs, potion usage, and more.",
  },
  {
    label: "Crafting/Shopping",
    categories: [CATEGORY_ID.CRAFTING, CATEGORY_ID.TRANSACTIONS],
    isHidden: false,
    checked: false,
    title: "Show cooking, mixing, etc and buying from NPC shops.",
  },
  {
    label: "Other",
    categories: [
      CATEGORY_ID.FAMILIARS,
      CATEGORY_ID.EQUIPMENT,
      CATEGORY_ID.VISIT,
      CATEGORY_ID.OTHER,
    ],
    isHidden: false,
    checked: false,
    title:
      "Show familiar switching, equipment equipping, item acquiring, and other hard to categorize entries.",
  },
];

export const DEFAULT_CATEGORIES_VISIBLE = ENTRY_TYPE_FILTERS.reduce(
  (visibleCategories, filterData) => {
    if (filterData.checked) {
      return visibleCategories.concat(filterData.categories ?? []);
    }

    return visibleCategories;
  },
  [] as string[],
);

export const ATTRIBUTE_FILTERS: Filter[] = [
  {
    label: "None",
    attributeName: "none",
    isHidden: true,
    checked: false,
    title: "Do not filter any attributes.",
  },
  {
    label: "Evergreen Info",
    optionGroup: [
      {
        label: "Annotated",
        attributeName: "hasAnnotations",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Entries where a comment or note was made.",
      },
      {
        label: "Path-specific",
        attributeName: "isPathSpecific",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Something unique to the ascension path.",
      },
      {
        label: "Took a Choice",
        attributeName: "hasChoiceProgression",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Any adventure that has a choice.",
      },
      {
        label: "Semirares",
        attributeName: "isSemirare",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Adventure is considered Semirare.",
      },
      {
        label: "Clovers",
        attributeName: "isClover",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Adventure that is a triggered by a Ten-Leaf Clover.",
      },
      {
        label: "Free Fights",
        attributeName: "isFreeCombat",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Combat that did not take a turn.",
      },
      {
        label: "Forced Adventure",
        attributeName: "isForcedAdventure",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Anything that was made to guarantee happen.",
      },
    ],
  },
  {
    label: "Resource Usage",
    optionGroup: [
      {
        label: "Summoned",
        attributeName: "isSummoned",
        attributeValue: true,
        isHidden: true,
        checked: false,
        title:
          "A monster that was summoned ie. Genie Wish, Fax, or Chateau Painting.",
      },
      {
        label: "Banished",
        attributeName: "isBanished",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Combats where a banishing effect was used.",
      },
      {
        label: "Copied",
        attributeName: "isCopied",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Combats where a copy, duplicate, lecture, etc effect was used.",
      },
      {
        label: "Disintegrated",
        attributeName: "isDisintegrated",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title:
          "Combats either a Yellow Ray or Envy effect was used. (Does not guarantee monster was insta-killed)",
      },
      {
        label: "Replaced",
        attributeName: "isReplaced",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title:
          "Combats where a monster was swapped or transformed into another such as Macrometeorite, Cleesh, or tangle of rat tails.",
      },
      {
        label: "Instakilled",
        attributeName: "hasInstakill",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title:
          "Combats where an instant kill effect was used. Does not necessarily mean it worked.",
      },
      {
        label: "Sniffed",
        attributeName: "isAttracted",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title:
          "Combats where a monster was Olfacted or an effect where more of em was put in the queue was used.",
      },
      {
        label: "Run Away (attempts)",
        attributeName: "hasRunaway",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Combats where there was an attempt to run away.",
      },
    ],
  },
  {
    label: "2021 Items of the Month",
    optionGroup: [
      {
        label: "Emotion Chip",
        attributeName: "isEmotionChip",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title:
          "Entries where there were some Emotionally Chipped feelings going on.",
      },
      {
        label: "Potted Power Plant",
        attributeName: "isPottedPowerPlant",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Entries using the Potted Power Plant and it's batteries.",
      },
    ],
  },
  {
    label: "2020 Items of the Month",
    optionGroup: [
      {
        label: "Box of Ghosts",
        attributeName: "hasBoxOfGhosts",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title:
          "Entries where Ghost of Carols gave an effect or Commerce saw you bought an item.",
      },
      {
        label: "Melodramedary Spat",
        attributeName: "hasMelodramedary",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Entries where you were Spat on or asked to Spit.",
      },
      {
        label: "Comprehensive Cartographing",
        attributeName: "isCartography",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title:
          "Entries where there was a special Cartographic adventure or Map the Monsters was used.",
      },
      {
        label: "Iunion Crown",
        attributeName: "hasIunionCrown",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Entries where the Iunion Crown gained a stone.",
      },
      {
        label: "Retrospection",
        attributeName: "hasRetrospecs",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Entries where the Retrospecs triggered!",
      },
    ],
  },
  {
    label: "2019 Items of the Month",
    optionGroup: [
      {
        label: "Diabolic Pizza",
        attributeName: "isDiabolicPizza",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Entries where a Diabolic Pizza was made or eaten.",
      },
      {
        label: "Pill Keeper Uses",
        attributeName: "isPillKeeper",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Entries that was probably the result of a Pill Keeper use.",
      },
      {
        label: "Professor Lectures",
        attributeName: "hasPocketProfessor",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Entries where Pocket Professor used one of his skills.",
      },
      {
        label: "Used the Force",
        attributeName: "isEndedByUseTheForce",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Entries where the Saber was used.",
      },
      {
        label: "Vampyric Cloake",
        attributeName: "hasVampyricCloake",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Entries where a Cloak skill was used.",
      },
      {
        label: "Lil' Doctor Skills",
        attributeName: "hasDoctorsBag",
        attributeValue: true,
        isHidden: false,
        checked: false,
        title: "Entries where a Doctor Bag skill was used.",
      },
    ],
  },
  {
    label: "2018 Items of the Month",
    optionGroup: [
      {
        label: "Latte Lovin' Uses",
        attributeName: "hasLatteLoversMug",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: "Latte Ingredient Unlock",
        attributeName: "hasLatteIngredientUnlock",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: "Cat Heisted",
        attributeName: "isHeist",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: "Voting Monster",
        attributeName: "isVoting",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
    ],
  },
  {
    label: "2017 Items of the Month",
    optionGroup: [
      {
        label: "Genie Wishes",
        attributeName: "isGenieWish",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: "Meteor Lore",
        attributeName: "hasMeteorLore",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
    ],
  },
  {
    label: "Fun Filters",
    optionGroup: [
      {
        label: "IOTM",
        attributeName: "isIOTM",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: "Successful Stealing",
        attributeName: "hasSuccessfulSteal",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: "Gained Adventure",
        attributeName: "hasAdventureGainsNotFromDiet",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: "Leveled Up",
        attributeName: "isLevelUp",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: "Victories",
        attributeName: "isVictory",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
      {
        label: "Beaten Up",
        attributeName: "isDeath",
        attributeValue: true,
        isHidden: false,
        checked: false,
      },
    ],
  },
];
