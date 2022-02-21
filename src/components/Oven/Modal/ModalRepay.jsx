/* eslint-disable react/prop-types */
import { mutateBigNumber } from '../../../utils';

const ModalRepay = ({
  mutatedData,
  tezosPrice,
  styled,
  newCollateralRatio,
}) => {
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
};

export default ModalRepay;
