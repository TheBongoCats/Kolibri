import CONSTANTS from '../../utils/constants';
import { mutateBigNumber } from '../../utils/helpers';

export const shouldDisableAction = (ovenData, modalId) =>
  (ovenData.balance.full === 0 && modalId !== 'deposit') ||
  (ovenData.loan.full === 0 && modalId === 'repay');

export const calcBorrowNewCollateralValue = (ovenData, amount) =>
  mutateBigNumber(
    ((ovenData.loan.full + +amount) / ovenData.collateralValue.full) * 200,
  );

export const calcRepayNewCollateralValue = (ovenData, amount) =>
  mutateBigNumber(
    ((ovenData.loan.full - amount) / ovenData.collateralValue.full) * 200,
  );

export const calcWithdrawNewCollateralValue = (
  ovenData,
  amount,
  tezosPrice,
) => {
  const collateralValue = mutateBigNumber(
    (ovenData.balance.full - amount) * tezosPrice.price,
    CONSTANTS.MUTEZ_IN_TEZOS,
  );

  return collateralValue.full
    ? mutateBigNumber((ovenData.loan.full / collateralValue.full) * 200)
    : { full: 0, decimal: '0.00' };
};

export const calcDepositNewCollateralValue = (ovenData, amount, tezosPrice) => {
  const collateralValue = mutateBigNumber(
    (ovenData.balance.full + +amount) * tezosPrice.price,
    CONSTANTS.MUTEZ_IN_TEZOS,
  );

  return mutateBigNumber((ovenData.loan.full / collateralValue.full) * 200);
};

export const calcMaxBorrow = (ovenData) =>
  mutateBigNumber(ovenData.collateralValue.full / 2 - ovenData.loan.full);

export const calcNewLiquidatable = (tezosPrice, newCollateralRatio) =>
  mutateBigNumber(tezosPrice.price * newCollateralRatio.full, 1e8);

export const calcMaxWithdraw = (ovenData) =>
  mutateBigNumber(
    ovenData.balance.full *
      (1 - (ovenData.loan.full / ovenData.collateralValue.full) * 2),
  );
