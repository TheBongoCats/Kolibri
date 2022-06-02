import BigNumber from 'bignumber.js';
import { estimateSwap } from '@quipuswap/sdk';
import { CONTRACTS } from '@hover-labs/kolibri-js';
import CONSTANTS from './constants';

export const mutateBigNumber = (number, div = 1, dp = 2) =>
  new BigNumber(number).div(div).dp(dp).toNumber();

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
  const balance = mutateBigNumber(ovenData.balance, CONSTANTS.MUTEZ_IN_TEZOS);
  const collateralValue = mutateBigNumber(
    balance * tezosPrice.price,
    CONSTANTS.MUTEZ_IN_TEZOS,
  );
  const loan = mutateBigNumber(
    ovenData.outstandingTokens,
    CONSTANTS.KOLIBRI_IN_TEZOS,
  );
  const stabilityFees = mutateBigNumber(
    ovenData.stabilityFees,
    CONSTANTS.KOLIBRI_IN_TEZOS,
    6,
  );
  const stabilityFeesFull = mutateBigNumber(
    ovenData.stabilityFees,
    CONSTANTS.KOLIBRI_IN_TEZOS,
    12,
  );
  const collateralRatio = mutateBigNumber(
    (loan / collateralValue) * 200 || 0,
    1,
  );
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
  };
};

export const isDesktop = () => {
  const ua = navigator.userAgent;
  return !/(tablet|ipad|playbook|silk)|(android(?!.*mobi))|Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
    ua,
  );
};

export const getRateForSwap = async (tezos) => {
  const from = 'tez';
  const to = { contract: CONTRACTS.MAIN.TOKEN };
  const amount = {
    inputValue: 1,
  };
  const factories = {
    fa1_2Factory: CONTRACTS.MAIN.DEXES.QUIPUSWAP.FA1_2_FACTORY,
    fa2Factory: CONTRACTS.MAIN.DEXES.QUIPUSWAP.FA2_FACTORY,
  };

  try {
    const estimatedOutputValue = await estimateSwap(
      tezos,
      factories,
      from,
      to,
      amount,
    );

    return estimatedOutputValue;
  } catch (e) {
    return 0;
  }
};
