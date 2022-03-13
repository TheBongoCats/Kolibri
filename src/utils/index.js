/* eslint-disable import/prefer-default-export */
import CONSTANTS from './constants';

export const mutateBigNumber = (
  number,
  denominator = CONSTANTS.MUTEZ_IN_TEZOS,
  toFixed = 2,
) => (number / denominator).toFixed(toFixed);

export const getPathColor = (percentage, theme) => {
  let color = theme === 'light' ? '#8c82f2' : '#307ff4';

  if (percentage >= 100) {
    color = '#ff5050';
  } else if (percentage >= 80) {
    color = '#FFCE50';
  }

  return color;
};

export const mutateOvenData = (ovenData, tezosPrice) => {
  const balance = mutateBigNumber(ovenData.balance);
  const collateralValue = mutateBigNumber(balance * tezosPrice.price);
  const loan = mutateBigNumber(ovenData.outstandingTokens, 1e18);
  const stabilityFees = mutateBigNumber(ovenData.stabilityFees, 1e18, 6);
  const stabilityFeesFull = mutateBigNumber(ovenData.stabilityFees, 1e18, 12);
  const collateralRatio = +loan
    ? ((loan / collateralValue) * 200).toFixed(2)
    : '0.00';
  const liquidatablePrice = mutateBigNumber(
    tezosPrice.price * collateralRatio,
    1e8,
  );

  return {
    balance,
    collateralValue,
    loan,
    stabilityFees,
    stabilityFeesFull,
    collateralRatio,
    liquidatablePrice,
    ovenClient: ovenData.ovenClient,
  };
};

export const isDesktop = () => {
  const ua = navigator.userAgent;
  if (
    /(tablet|ipad|playbook|silk)|(android(?!.*mobi))|Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
      ua,
    )
  ) {
    return false;
  }

  return true;
};
