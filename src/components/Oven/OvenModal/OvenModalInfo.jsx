/* eslint-disable react/prop-types */
import { useBeaconStateContext } from '../../../contexts/beaconContext';
import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import { mutateBigNumber } from '../../../utils';

const OvenModalInfo = ({
  mutatedData,
  styled,
  newCollateralRatio,
  modalId,
}) => {
  const { tezosPrice, myTokens } = useKolibriStateContext();
  const { beaconBalance } = useBeaconStateContext();

  const tokens = mutateBigNumber(myTokens, 1e18);

  // eslint-disable-next-line consistent-return
  const renderSwitch = () => {
    switch (modalId) {
      case 'borrow':
        return (
          <>
            <p>Borrowed kUSD: {mutatedData.loan} kUSD</p>
            <p>
              Max borrow amount KUSD:{' '}
              {(mutatedData.collateralValue / 2 - mutatedData.loan).toFixed(2)}{' '}
              kUSD
            </p>
            <p>
              Current collateral utilization: {mutatedData.collateralRatio}%
            </p>
            <p>New collateral utilization: {newCollateralRatio}%</p>
            <p>
              Oven liquidatable when XTZ price is: $
              {mutateBigNumber(tezosPrice.price * newCollateralRatio, 1e8)}
            </p>
          </>
        );
      case 'repay':
        return (
          <>
            <p>Borrowed kUSD: {mutatedData.loan} kUSD</p>
            <p>Wallet holdings: {tokens} kUSD</p>
            <p>Max payback amount: {mutatedData.loan} kUSD</p>
            <p>
              Current collateral utilization: {mutatedData.collateralRatio}%
            </p>
            <p>New collateral utilization: {newCollateralRatio}%</p>
            <p>
              Oven liquidatable when XTZ price is: $
              {mutateBigNumber(tezosPrice.price * newCollateralRatio, 1e8)}
            </p>
          </>
        );
      case 'withdraw':
        return (
          <>
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
          </>
        );
      case 'deposit':
        return (
          <>
            <p>Oven collateral: {mutatedData.balance}</p>
            <p>Wallet holdings: {beaconBalance.toFixed(2)}</p>
            <p>Max deposit: {beaconBalance.toFixed(2)}</p>
            <p>Current collateral utilization: {mutatedData.collateralRatio}</p>
            <p>New collateral utilization: {newCollateralRatio}</p>
          </>
        );
      default:
        break;
    }
  };
  return <div className={styled.modal__info}>{renderSwitch()}</div>;
};

export default OvenModalInfo;
