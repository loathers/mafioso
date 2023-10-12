/**
 * @param {Array<Entries>} entriesList
 * @param {Function|String} [colorGenerator]
 * @return {[type]}
 */
export function createLocationData(entriesList, colorGenerator = "lightblue") {
  const locationMap = {};

  entriesList.forEach((entry) => {
    const { locationName } = entry.attributes;
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
  const colorList =
    typeof colorGenerator === "string"
      ? colorGenerator
      : colorGenerator(keys.length);

  return {
    _type: "horizontalBar",
    _size: keys.length,
    labels: keys,
    datasets: [
      {
        backgroundColor: colorList,
        data: values,
      },
    ],
  };
}
/**
 * @param {Array<Entries>} entriesList
 * @param {Function|String} [colorGenerator]
 * @return {[type]}
 */
export function createFamiliarData(entriesList, colorGenerator = "lightblue") {
  const familiarMap = {};

  entriesList.forEach((entry) => {
    if (!entry.hasFamiliarUsed) {
      return;
    }

    const { familiarUsed } = entry.attributes;
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
  const colorList =
    typeof colorGenerator === "string"
      ? colorGenerator
      : colorGenerator(keys.length);

  return {
    _type: "bar",
    _size: keys.length,
    labels: keys,
    datasets: [
      {
        backgroundColor: colorList,
        data: values,
      },
    ],
  };
}
/**
 * @param {Array<Entries>} entriesList
 * @param {Function|String} [colorGenerator]
 * @return {[type]}
 */
export function createMeatTotalGainedData(entriesList) {
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
  // const colorList = allChanges.map((change) => change >= 0 ? 'rgb(177, 92, 92, 0.4)' : 'rgb(84, 204, 126, 0.4)');

  return {
    _type: "lineTotal",
    _size: allChanges.length,
    labels: allChanges.map((change, idx) => `${idx}`),
    datasets: [
      {
        label: "Total Meat Gained",
        borderColor: "#b15c5c",
        borderWidth: 0.8,
        // borderColor: colorList,
        pointBackgroundColor: "#b15c5c",
        pointRadius: 0.5,
        data: allChanges,
      },
    ],
  };
}
/**
 * @param {Array<Entries>} entriesList
 * @param {String} attribute
 * @param {Object} [options]
 * @return {Object}
 */
export function createAttributeTimeline(entriesList, attribute, options = {}) {
  const { isUsingTotals = false } = options;
  const timelineList = [];

  entriesList.forEach((entry) => {
    const isAttributeTrue = Boolean(entry.findAttribute(attribute));
    const attributeValue = isAttributeTrue ? 1 : 0;
    const currentIdx = timelineList.length;

    // the current is equal to previous + whatever change in current entry
    const prevIdx = currentIdx - 1;
    const prevValue = prevIdx > 0 ? timelineList[prevIdx] : 0;

    // combine to track totals or individually?
    const currValue = isUsingTotals
      ? prevValue + attributeValue
      : attributeValue;

    // a new (non free combat) adventure is a new item in the list
    if (entry.isAdventure && !entry.isFreeCombat) {
      timelineList.push(currValue);
      return;
    }

    // if it is a free combat, just add whatever changes onto the previous item
    if (entry.isFreeCombat || !entry.isAdventure) {
      timelineList[prevIdx] = currValue;
      return;
    }
  });

  return {
    _type: "bar",
    _size: timelineList.length,
    labels: timelineList.map((change, idx) => `${idx}`),
    datasets: [
      {
        label: attribute,
        // borderColor: 'lightblue',
        // borderWidth: 0.8,
        backgroundColor: "lightblue",
        pointRadius: 0.5,
        data: timelineList,
      },
    ],
  };
}
/**
 * @param {Array<Entries>} entriesList
 * @param {String} attribute
 * @param {Object} [options]
 * @return {Object}
 */
export function createMinChangeTimeline(entriesList, attribute, options = {}) {
  const { isUsingTotals = false } = options;
  const timelineList = [];

  entriesList.forEach((entry) => {
    const attributeValue = entry.attributes.you_robot[attribute];
    const currentIdx = timelineList.length;

    // the current is equal to previous + whatever change in current entry
    const prevIdx = currentIdx - 1;
    const prevValue = prevIdx > 0 ? timelineList[prevIdx] : 0;

    // combine to track totals or individually?
    const currValue = isUsingTotals
      ? prevValue + attributeValue
      : attributeValue;
    console.log("currValue", currValue, attributeValue);

    // a new (non free combat) adventure is a new item in the list
    if (entry.isAdventure && !entry.isFreeCombat) {
      timelineList.push(currValue);
      return;
    }
  });

  return {
    _type: "lineTotalMin",
    _size: timelineList.length,
    labels: timelineList.map((change, idx) => `${idx}`),
    scales: {
      min: 0,
      max: 100,
    },
    datasets: [
      {
        label: "Total",
        borderColor: "#b15c5c",
        borderWidth: 0.8,
        // borderColor: colorList,
        pointBackgroundColor: "#b15c5c",
        pointRadius: 0.5,
        data: timelineList,
      },
    ],
  };
}
