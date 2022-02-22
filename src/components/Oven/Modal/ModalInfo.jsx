/* eslint-disable react/prop-types */
import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import { mutateBigNumber } from '../../../utils';

const ModalInfo = ({ mutatedData, styled, newCollateralRatio, modalId }) => {
  const { tezosPrice } = useKolibriStateContext();

  // eslint-disable-next-line consistent-return
  const renderSwitch = () => {
    switch (modalId) {
      case 'borrow':
        return (
          <div className={styled.modal__info}>
            <p>Borrowed kUSD: {mutatedData.loan}</p>
            <p>
              Max borrow amount KUSD:{' '}
              {(mutatedData.collateralValue / 2 - mutatedData.loan).toFixed(2)}
            </p>
            <p>Current collateral utilization: {mutatedData.collateralRatio}</p>
            <p>New collateral utilization: {newCollateralRatio}</p>
            <p>
              Oven liquidatable when XTZ price is:{' '}
              {mutateBigNumber(tezosPrice.price * newCollateralRatio, 1e8)}
            </p>
          </div>
        );
      case 'repay':
        return (
          <div className={styled.modal__info}>
            <p>Borrowed kUSD: {mutatedData.loan}</p>
            <p>Wallet holdings: 228</p>
            <p>Max payback amount: {mutatedData.loan}</p>
            <p>Current collateral utilization: {mutatedData.collateralRatio}</p>
            <p>New collateral utilization: {newCollateralRatio}</p>
            <p>
              Oven liquidatable when XTZ price is:{' '}
              {mutateBigNumber(tezosPrice.price * newCollateralRatio, 1e8)}
            </p>
          </div>
        );
      case 'withdraw':
        return (
          <div className={styled.modal__info}>
            <p>Oven collateral: {mutatedData.balance}</p>
            <p>
              Max withdraw amount:{' '}
              {(
                mutatedData.balance *
                (1 - (mutatedData.loan / mutatedData.collateralValue) * 2)
              ).toFixed(2)}
            </p>
            <p>Current collateral utilization: {mutatedData.collateralRatio}</p>
            <p>New collateral utilization: {newCollateralRatio}</p>
          </div>
        );
      case 'deposit':
        return (
          <div className={styled.modal__info}>
            <p>Oven collateral: {mutatedData.balance}</p>
            <p>Wallet holdings: 228</p>
            <p>Max deposit: 228</p>
            <p>Current collateral utilization: {mutatedData.collateralRatio}</p>
            <p>New collateral utilization: {newCollateralRatio}</p>
          </div>
        );
      default:
        break;
    }
  };
  return <div className={styled.modal__info}>{renderSwitch()}</div>;
};

export default ModalInfo;
