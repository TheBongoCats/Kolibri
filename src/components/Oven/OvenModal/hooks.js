import { useEffect, useState } from 'react';
import {
  calcBorrowNewCollateralValue,
  calcRepayNewCollateralValue,
  calcWithdrawNewCollateralValue,
  calcDepositNewCollateralValue,
} from './helpers';

const useNewCollateralRatio = (modalId, ovenMetrics, amount, tezosPrice) => {
  const [newCollateralRatio, setNewCollateralRatio] = useState({
    full: 0,
    decimal: '0.00',
  });

  useEffect(() => {
    setNewCollateralRatio(() => {
      switch (modalId) {
        case 'borrow':
          return calcBorrowNewCollateralValue(ovenMetrics, amount);
        case 'repay':
          return calcRepayNewCollateralValue(ovenMetrics, amount);
        case 'withdraw':
          return calcWithdrawNewCollateralValue(
            ovenMetrics,
            amount,
            tezosPrice,
          );
        case 'deposit':
          return calcDepositNewCollateralValue(ovenMetrics, amount, tezosPrice);
        default:
          return { full: 0, decimal: '0.00' };
      }
    });
  }, [amount, modalId]);

  return newCollateralRatio;
};

export default useNewCollateralRatio;
