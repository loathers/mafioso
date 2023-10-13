import tinygradient from "tinygradient";

export function createColorList(steps: number, colors: string[]) {
  if (steps < colors.length) {
    return colors;
  }

  const gradient = tinygradient(colors);
  const colorList = gradient
    .rgb(steps)
    .map((tinycolor) => tinycolor.toHexString());
  return colorList;
}

export function createColorList_purplePastel(steps: number) {
  return createColorList(steps, [
    "rgb(237, 144, 238)",
    "rgb(124, 158, 255)",
    "rgb(139, 124, 255)",
  ]);
}
