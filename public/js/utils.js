/**
 * It returns a random integer between the min and max values.
 * @param min - The minimum number you want to generate.
 * @param max - The maximum number you want to generate.
 * @returns A function that returns a random number between min and max.
 */
const getRandonInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * It takes a number and returns a string with the number and the string "px" appended to it.
 * @param value - The value to convert to a pixel value.
 * @returns A string with the value of the argument and the string 'px' appended to it.
 */
const toPX = (value) => {
  return `${value}px`;
};

/**
 * It returns an object with the top, bottom, left, and right positions of the object passed to it.
 * @param object - The object you want to get the position of.
 * @returns An object with the top, bottom, left, and right properties.
 */
function checkPos(object) {
  return {
    top: parseInt(window.getComputedStyle(object).top),
    bottom: parseInt(window.getComputedStyle(object).bottom),
    left: parseInt(window.getComputedStyle(object).left),
    right: parseInt(window.getComputedStyle(object).right),
  };
}
