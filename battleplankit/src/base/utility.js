

const HEIGHT_INCHES = 22;
const WIDTH_INCHES = 30;

const INCHES_TO_MM = 25.4;

export const MAP_HEIGHT = 900;
export const MAP_WIDTH = 1250;
export const mmToPixels = (inches) => {
    return (MAP_WIDTH / (WIDTH_INCHES * INCHES_TO_MM)) * inches;
};
export const inchesToPixels = (inches) => {
    return (MAP_WIDTH / WIDTH_INCHES) * inches;
};