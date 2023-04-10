

const HEIGHT_INCHES = 22;
const WIDTH_INCHES = 30;

const INCHES_TO_MM = 25.4;

export const MAP_HEIGHT = 900;
export const MAP_WIDTH = 1250;
export const mmToPixels = (input) => {
    if (typeof input === "string" && input.endsWith("mm")) {
      const inches = parseFloat(input.slice(0, -2));
      return ((MAP_WIDTH / (WIDTH_INCHES * INCHES_TO_MM)) * inches) + "px";
    }
    return input;
  };
export const inchesToPixels = (inches) => {
    return ((MAP_WIDTH / WIDTH_INCHES) * inches)  + "px";
};

export const stripMM = (inputString) => {
    return inputString.replace(/mm/g, '');
}