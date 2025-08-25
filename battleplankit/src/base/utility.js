

const HEIGHT_INCHES = 44;
const WIDTH_INCHES = 60;

const INCHES_TO_MM = 25.4;

export const MAP_HEIGHT = 900;
export const MAP_WIDTH = 1250;
// axis: 'width' or 'height'
export const mmToPixels = (input, axis = 'width') => {
    let mm = input;
    if (typeof input === "string" && input.endsWith("mm")) {
      mm = parseFloat(input.slice(0, -2));
    }
    const pxPerMm = axis === 'height'
      ? MAP_HEIGHT / (HEIGHT_INCHES * INCHES_TO_MM)
      : MAP_WIDTH / (WIDTH_INCHES * INCHES_TO_MM);
    return mm * pxPerMm;
};
export const inchesToPixels = (inches, axis = 'width') => {
    const pxPerInch = axis === 'height'
      ? MAP_HEIGHT / HEIGHT_INCHES
      : MAP_WIDTH / WIDTH_INCHES;
    return inches * pxPerInch;
};

export const stripMM = (inputString) => {
    return inputString.replace(/mm/g, '');
}

export const parseDimensions = (dimensions) => {
    const regex = /^(\d+)x(\d+)mm$/;
    const match = dimensions.match(regex);
    if (match) {
      return {
        width: mmToPixels(match[1], 'width'),
        height: mmToPixels(match[2], 'height'),
      };
    }
    throw new Error("Invalid dimensions format");
};