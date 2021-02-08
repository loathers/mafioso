export const DIFFICULTY_FILTER_ID = {
  ANY: 'DIFFICULTY_FILTER_ID.ANY',
  HARDCORE: 'DIFFICULTY_FILTER_ID.HARDCORE',
  SOFTCORE: 'DIFFICULTY_FILTER_ID.SOFTCORE',
  CASUAL: 'DIFFICULTY_FILTER_ID.CASUAL',
};

export const DIFFICULTY_FILTERS = [
  {
    label: 'Any',
    id: 'DIFFICULTY_FILTER_ID.ANY',
    isHidden: false,
    isDisabled: false,
    checked: true,
  },
  {
    label: 'Hardcore',
    id: 'DIFFICULTY_FILTER_ID.HARDCORE',
    isHidden: false,
    isDisabled: false,
    checked: false,
  },
  {
    label: 'Softcore',
    id: 'DIFFICULTY_FILTER_ID.SOFTCORE',
    isHidden: false,
    isDisabled: false,
    checked: false,
  },
  {
    label: 'Casual',
    id: 'DIFFICULTY_FILTER_ID.CASUAL',
    isHidden: false,
    isDisabled: false,
    checked: false,
  },
];

export const PATH_FILTERS = [
  {
    label: 'Any',
    isHidden: true,
    checked: false,
  },
  {
    label: 'No Path',
    isHidden: false,
    checked: false,
  },
  {
    label: 'Challenge Paths',
    optionGroup: [
      {
        label: 'Grey Goo',
        isHidden: false,
        checked: false,
      },
      {
        label: 'Low Key Summer',
        isHidden: false,
        checked: false,
      },
      {
        label: 'Path of the Plumber',
        isHidden: false,
        checked: false,
      },
      {
        label: 'Kingdom of Exploathing',
        isHidden: false,
        checked: false,
      },
      {
        label: 'Two Crazy Random Summer',
        isHidden: false,
        checked: false,
      },
      {
        label: 'Dark Gyffte',
        isHidden: false,
        checked: false,
      },
      {
        label: 'Disguises Delimit',
        isHidden: false,
        checked: false,
      },
      {
        label: 'G-Lover',
        isHidden: false,
        checked: false,
      },
      {
        label: 'Pocket Familiars',
        isHidden: false,
        checked: false,
      },
    ],
  },
  {
    label: 'Evergreen Paths',
    optionGroup: [
      {
        label: 'Bad Moon',
        isHidden: false,
        checked: false,
      },
      {
        label: 'Oxygenarian',
        isHidden: false,
        checked: false,
      },
      {
        label: 'Boozetafarian',
        isHidden: false,
        checked: false,
      },
      {
        label: 'Teetotaler',
        isHidden: false,
        checked: false,
      },
    ],
  },
]
