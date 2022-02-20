/* eslint-disable import/prefer-default-export */
import CONSTANTS from './constants';

export const mutateBigNumber = (
  number,
  denominator = CONSTANTS.MUTEZ_IN_TEZOS,
  toFixed = 2,
) => (number / denominator).toFixed(toFixed);

export const getTrailColor = (percentage) => {
  let color = '#307ff4';

  if (percentage >= 100) {
    color = '#ff5050';
  } else if (percentage >= 80) {
    color = '#FFCE50';
  }

  return color;
};
