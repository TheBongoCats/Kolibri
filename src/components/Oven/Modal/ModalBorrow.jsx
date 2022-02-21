/* eslint-disable react/prop-types */
import { mutateBigNumber } from '../../../utils';

const ModalBorrow = ({
  mutatedData,
  tezosPrice,
  styled,
  newCollateralRatio,
}) => {
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
};

export default ModalBorrow;
