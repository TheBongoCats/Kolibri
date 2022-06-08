import CONSTANTS from '../../../utils/constants';
import { mutateBigNumber } from '../../../utils/helpers';

export const calcBorrowNewCollateralValue = (ovenMetrics, amount) =>
  mutateBigNumber(
    ((ovenMetrics.loan.full + +amount) / ovenMetrics.collateralValue.full) *
      200,
  );

export const calcRepayNewCollateralValue = (ovenMetrics, amount) =>
  mutateBigNumber(
    ((ovenMetrics.loan.full - amount) / ovenMetrics.collateralValue.full) * 200,
  );

export const calcWithdrawNewCollateralValue = (
  ovenMetrics,
  amount,
  tezosPrice,
) => {
  const collateralValue = mutateBigNumber(
    (ovenMetrics.balance.full - amount) * tezosPrice.price,
    CONSTANTS.MUTEZ_IN_TEZOS,
  );

  return mutateBigNumber((ovenMetrics.loan.full / collateralValue.full) * 200);
};

export const calcDepositNewCollateralValue = (
  ovenMetrics,
  amount,
  tezosPrice,
) => {
  const collateralValue = mutateBigNumber(
    (ovenMetrics.balance.full + +amount) * tezosPrice.price,
    CONSTANTS.MUTEZ_IN_TEZOS,
  );

  return mutateBigNumber((ovenMetrics.loan.full / collateralValue.full) * 200);
};

export const calcMaxBorrow = (ovenMetrics) =>
  mutateBigNumber(ovenMetrics.collateralValue.full / 2 - ovenMetrics.loan.full);

export const calcNewLiquidatable = (tezosPrice, newCollateralRatio) =>
  mutateBigNumber(tezosPrice.price * newCollateralRatio.full, 1e8);

export const calcMaxWithdraw = (ovenMetrics) =>
  mutateBigNumber(
    ovenMetrics.balance.full *
      (1 - (ovenMetrics.loan.full / ovenMetrics.collateralValue.full) * 2),
  );
