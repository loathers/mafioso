import {createColorList} from 'utilities/colorUtils';

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

  const colorList = createColorList(locationKeys.length, ['rgb(237, 144, 238)', 'rgb(124, 158, 255)', 'rgb(139, 124, 255)']);

  return {
    labels: locationKeys,
    datasets: [{
      backgroundColor: colorList,
      data: locationValues,
    }]
  }
}
/**
 * @param {Array<Entries>} entriesList
 * @return {[type]}
 */
export function createFamiliarData(entriesList) {
  const familiarMap = {};

  entriesList.forEach((entry) => {
    if (!entry.hasFamiliarUsed) {
      return;
    }

    const {familiarUsed} = entry.attributes;
    if (familiarUsed === null || familiarUsed === undefined) {
      return;
    }

    if (familiarMap[familiarUsed] === undefined) {
      familiarMap[familiarUsed] = 1;
    } else {
      familiarMap[familiarUsed] += 1;
    }
  });

  const keys = Object.keys(familiarMap);
  const values = keys.map((familiarUsed) => familiarMap[familiarUsed]);

  const colorList = createColorList(keys.length, ['rgb(237, 144, 238)', 'rgb(124, 158, 255)', 'rgb(139, 124, 255)']);

  return {
    labels: keys,
    datasets: [{
      backgroundColor: colorList,
      data: values,
    }]
  }
}
