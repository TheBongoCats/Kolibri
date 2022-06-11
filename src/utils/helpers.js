import BigNumber from 'bignumber.js';
import { estimateSwap } from '@quipuswap/sdk';
import { CONTRACTS } from '@hover-labs/kolibri-js';
import CONSTANTS from './constants';

export const mutateBigNumber = (number, div = 1, dp = 2) => {
  const value = BigNumber.isBigNumber(number) ? number : new BigNumber(number);
  const full = value > 0 ? value.div(div).toNumber() : 0;
  const decimal = full ? full.toFixed(dp) : '0.00';

  return {
    full,
    decimal,
  };
};

export const getPathColor = (percentage, theme) => {
  let color = theme === 'light' ? '#8c82f2' : '#307ff4';

  if (percentage >= 100) {
    color = '#ff5050';
  } else if (percentage >= 80) {
    color = '#FFCE50';
  }

  return color;
};

export const calculateOvenMetrics = (ovenData, tezosPrice) => {
  const { balance, outstandingTokens, stabilityFees, ...otherData } = ovenData;
  const balanceCalculated = mutateBigNumber(balance, CONSTANTS.MUTEZ_IN_TEZOS);
  const collateralValue = mutateBigNumber(
    balanceCalculated.full * tezosPrice.price,
    CONSTANTS.MUTEZ_IN_TEZOS,
  );
  const loan = mutateBigNumber(outstandingTokens, CONSTANTS.KOLIBRI_IN_TEZOS);
  const stabilityFeesCalculated = mutateBigNumber(
    stabilityFees,
    CONSTANTS.KOLIBRI_IN_TEZOS,
    6,
  );
  const collateralRatio = mutateBigNumber(
    (loan.full / collateralValue.full) * 200 || 0,
  );
  const liquidatablePrice = mutateBigNumber(
    tezosPrice.price * collateralRatio.full,
    1e8,
  );

  return {
    balance: balanceCalculated,
    collateralValue,
    loan,
    stabilityFees: stabilityFeesCalculated,
    collateralRatio,
    liquidatablePrice,
    ...otherData,
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
