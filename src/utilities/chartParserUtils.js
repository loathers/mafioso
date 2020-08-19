import {colorGradient} from 'utilities/colorUtils';
/**
 * @param {Array<Entries>} entriesList
 * @return {[type]}
 */
export function createLocationData(entriesList) {
  const locationMap = {};

  entriesList.forEach((entry) => {
    const {locationName} = entry.attributes;
    if (locationName === null || locationName === undefined) {
      return;
    }

    if (!entry.isCombatEncounter && !entry.isNoncombatEncounter) {
      return;
    }

    if (locationMap[locationName] === undefined) {
      locationMap[locationName] = 1;
    } else {
      locationMap[locationName] += 1;
    }
  });

  const locationKeys = Object.keys(locationMap);
  const locationValues = locationKeys.map((locationName) => locationMap[locationName]);

  const colorA = {red: 237, green: 144, blue: 238 };
  const colorB = {red: 124, green: 158, blue: 255 };
  const colorC = {red: 139, green: 124, blue: 255 };
  const colorList = locationKeys.map((a, idx) => {
    const percent = (idx + 1) / locationKeys.length;
    return colorGradient(percent, colorA, colorB, colorC);
  });

  return {
    labels: locationKeys,
    datasets: [{
      backgroundColor: colorList,
      data: locationValues,
    }]
  }
}
