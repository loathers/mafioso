import React from 'react';

import {ReactComponent as ArchiveSVG} from 'images/archive.svg';
import {ReactComponent as LKSicon} from 'images/LKS-icon.svg';

// import combineClassnames from 'utilities/combineClassnames';

function getIconComponent(pathName) {
  switch (pathName) {
    case 'Standard':
      return ArchiveSVG;
    case 'Low Key Summer':
      return LKSicon;
    case 'Path of the Plumber':
      return ArchiveSVG;
    case 'Kingdom of Exploathing':
      return ArchiveSVG;
    case 'Two Crazy Random Summer':
      return ArchiveSVG;
    case 'Dark Gyffte':
      return ArchiveSVG;
    case 'Disguises Delimit':
      return ArchiveSVG;
    case 'G-Lover':
      return ArchiveSVG;
    case 'Pocket Familiars':
      return ArchiveSVG;
    case 'Live. Ascend. Repeat.':
      return ArchiveSVG;
    case 'Gelatinous Noob':
      return ArchiveSVG;
    case 'Nuclear Autumn':
      return ArchiveSVG;
    case 'The Source':
      return ArchiveSVG;
    case 'Avatar of West of Loathing':
      return ArchiveSVG;
    case 'Community Service':
      return ArchiveSVG;
    case 'One Crazy Random Summer':
      return ArchiveSVG;
    case 'Actually Ed the Undying':
      return ArchiveSVG;
    case 'Picky':
      return ArchiveSVG;
    case 'Heavy Rains':
      return ArchiveSVG;
    case 'Slow and Steady&S':
      return ArchiveSVG;
    case 'Avatar of Sneaky Pete':
      return ArchiveSVG;
    case 'Class Act I Class For Pigs':
      return ArchiveSVG;
    case 'KOLHS':
      return ArchiveSVG;
    case 'BIG!':
      return ArchiveSVG;
    case 'Avatar of Jarlsberg':
      return ArchiveSVG;
    case 'Class Act':
      return ArchiveSVG;
    case 'Zombie Slayer':
      return ArchiveSVG;
    case 'Bugbear Invasion':
      return ArchiveSVG;
    case 'Avatar of Boris':
      return ArchiveSVG;
    case 'Trendy':
      return ArchiveSVG;
    case 'Way of the Surprising Fist':
      return ArchiveSVG;
    case 'Bees Hate You':
      return ArchiveSVG;
    case 'Oxygenarian':
      return ArchiveSVG;
    case 'Boozetafarian':
      return ArchiveSVG;
    case 'Teetotaler':
      return ArchiveSVG;
    default:
      return ArchiveSVG;
  }
}

/**  @returns {React.Component} */
export default function ChallengePathIcon(props) {
  const {
    pathName,
    ...otherProps
  } = props;

  const IconComponent = getIconComponent(pathName);

  return (
    <IconComponent {...otherProps} />
  )
}
