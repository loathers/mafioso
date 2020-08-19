import tinygradient from 'tinygradient';

/**
 *
 */
export function createColorList(fadeFraction, gradientColors) {
  const gradient = tinygradient(gradientColors);
  const colorList = gradient.rgb(fadeFraction).map(tinycolor => tinycolor.toHexString());
  return colorList;
}