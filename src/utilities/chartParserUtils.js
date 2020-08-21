
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
/**
 * @param {Array<Entries>} entriesList
 * @param {Function|String} [colorGenerator]
 * @return {[type]}
 */
export function createMeatTotalGainedData(entriesList, colorGenerator = 'lightblue') {
  const allChanges = [];

  entriesList.forEach((entry) => {
    const meatChange = entry.attributes.meatChange;
    const currentIdx = allChanges.length;

    // since we're tracking totals, the current is equal to previous + whatever change in current entry
    const prevIdx = currentIdx - 1;
    const prevChange = prevIdx > 0 ? allChanges[prevIdx] : 0;
    const currChange = prevChange + meatChange;

    // a new (non free combat) adventure is a new item in the list
    if (entry.isAdventure && !entry.isFreeCombat) {
      allChanges.push(currChange);
      return;
    }

    // if it is a free combat, just add whatever changes onto the previous item
    if (entry.isFreeCombat) {
      allChanges[prevIdx] = currChange;
      return;
    }

    if (!entry.isAdventure) {
      allChanges[prevIdx] = currChange;
      return;
    }
  });

  // console.log('allChanges', allChanges);
  // const colorList = typeof colorGenerator === 'string' ? colorGenerator : colorGenerator(allChanges.length);

  return {
    _size: allChanges.length,
    labels: allChanges.map((change, idx) => `${idx}`),
    datasets: [{
      label: 'Total Meat Gained',
      borderColor: '#b15c5c',
      borderWidth: 0.8,
      pointBackgroundColor: '#b15c5c',
      pointRadius: 0.5,
      data: allChanges,
    }]
  }
}
