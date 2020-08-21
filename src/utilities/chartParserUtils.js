
/**
 * @param {Array<Entries>} entriesList
 * @param {Function|String} [colorGenerator]
 * @return {[type]}
 */
export function createLocationData(entriesList, colorGenerator = 'lightblue') {
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

  const keys = Object.keys(locationMap);
  const values = keys.map((locationName) => locationMap[locationName]);
  const colorList = typeof colorGenerator === 'string' ? colorGenerator : colorGenerator(keys.length);

  return {
    _size: keys.length,
    labels: keys,
    datasets: [{
      backgroundColor: colorList,
      data: values,
    }]
  }
}
/**
 * @param {Array<Entries>} entriesList
 * @param {Function|String} [colorGenerator]
 * @return {[type]}
 */
export function createFamiliarData(entriesList, colorGenerator = 'lightblue') {
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
  const colorList = typeof colorGenerator === 'string' ? colorGenerator : colorGenerator(keys.length);

  return {
    _size: keys.length,
    labels: keys,
    datasets: [{
      backgroundColor: colorList,
      data: values,
    }]
  }
}
