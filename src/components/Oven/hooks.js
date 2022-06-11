import { useEffect, useState } from 'react';
import {
  calcBorrowNewCollateralValue,
  calcRepayNewCollateralValue,
  calcWithdrawNewCollateralValue,
  calcDepositNewCollateralValue,
} from './helpers';

const useNewCollateralRatio = (modalId, ovenData, amount, tezosPrice) => {
  const [newCollateralRatio, setNewCollateralRatio] = useState({
    full: 0,
    decimal: '0.00',
  });

  useEffect(() => {
    setNewCollateralRatio(() => {
      switch (modalId) {
        case 'borrow':
          return calcBorrowNewCollateralValue(ovenData, amount);
        case 'repay':
          return calcRepayNewCollateralValue(ovenData, amount);
        case 'withdraw':
          return calcWithdrawNewCollateralValue(ovenData, amount, tezosPrice);
        case 'deposit':
          return calcDepositNewCollateralValue(ovenData, amount, tezosPrice);
        default:
          return { full: 0, decimal: '0.00' };
      }
    });
  }, [amount, modalId]);

  return newCollateralRatio;
};

export default useNewCollateralRatio;
