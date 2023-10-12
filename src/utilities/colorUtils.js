import tinygradient from "tinygradient";

/**
 * @param {Number} steps
 * @param {Array<Color>} colors
 * @returns {Array<Color>}
 */
export function createColorList(steps, colors) {
  if (steps < colors.length) {
    return colors;
  }

  const gradient = tinygradient(colors);
  const colorList = gradient
    .rgb(steps)
    .map((tinycolor) => tinycolor.toHexString());
  return colorList;
}
/**
 * @param {Number} steps
 * @returns {Array<Color>}
 */
export function createColorList_purplePastel(steps) {
  return createColorList(steps, [
    "rgb(237, 144, 238)",
    "rgb(124, 158, 255)",
    "rgb(139, 124, 255)",
  ]);
}
