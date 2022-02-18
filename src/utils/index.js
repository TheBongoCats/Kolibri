/* eslint-disable import/prefer-default-export */
import CONSTANTS from './constants';

export const mutateBigNumber = (
  number,
  denominator = CONSTANTS.MUTEZ_IN_TEZOS,
  toFixed = 2,
) => (number / denominator).toFixed(toFixed);
