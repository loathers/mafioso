import React from 'react';

import ArchiveSVG from '../images/archive.svg';
import GreyGooIcon from '../images/GreyGoo-icon.svg';
import LKSicon from '../images/LKS-icon.svg';
import UROBOTicon from '../images/UROBOT-icon.svg';

// import combineClassnames from '../utilities/combineClassnames';

function getIcon(pathName) {
  switch (pathName) {
    case 'Standard':
      return ArchiveSVG;
    case 'You, Robot':
      return UROBOTicon;
    case 'Grey Goo':
      return GreyGooIcon;
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

  const icon = getIcon(pathName);

  return (
    <img src={icon} {...otherProps} />
  )
}
