const getRandonInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const toPX = (value) => {
  return `${value}px`;
};

function checkPos(object) {
  return {
    top: parseInt(window.getComputedStyle(object).top),
    bottom: parseInt(window.getComputedStyle(object).bottom),
    left: parseInt(window.getComputedStyle(object).left),
    right: parseInt(window.getComputedStyle(object).right),
  };
}
