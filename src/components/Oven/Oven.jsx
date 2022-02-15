/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import { useKolibriStateContext } from '../../contexts/kolibriContext';
import CONSTANTS from '../../utils/constants';
import OvenNav from '../OvenNav';
import styled from './Oven.module.scss';

const mutateNumber = (
  number,
  denominator = CONSTANTS.MUTEZ_IN_TEZOS,
  toFixed = 2,
) => (number / denominator).toFixed(toFixed);

const Oven = ({ ovenData }) => {
  const { tezosPrice } = useKolibriStateContext();

  const xtzInOven = mutateNumber(ovenData.balance, CONSTANTS.MUTEZ_IN_TEZOS);

  const collateralValue = mutateNumber(xtzInOven * tezosPrice.price);

  console.log(xtzInOven);
  console.log(collateralValue);

  return (
    <div className={styled.oven}>
      <div className={styled.oven__header}>
        {`ADDRESS: ${ovenData.ovenAddress} `}
        {ovenData.ovenClient && <OvenNav ovenClient={ovenData.ovenClient} />}
      </div>
      <div className={styled.oven__footer}>
        {`BAKER: ${ovenData.baker}`}
        {!ovenData.ovenClient && `OWNER: ${ovenData.ovenOwner}`}
        {`COLLATERAL VALUE: ${collateralValue}`}
        {`BALANCE: ${xtzInOven} `}
        {`BORROWED TOKENS: ${
          ovenData.borrowedTokens / CONSTANTS.MUTEZ_IN_TEZOS
        }`}
        {`Outstanding tokens: ${
          ovenData.outstandingTokens / CONSTANTS.MUTEZ_IN_TEZOS
        }`}

        {`STABILITY FEES: ${ovenData.borrowedTokens}`}
      </div>
    </div>
  );
};

export default Oven;

Oven.propTypes = {
  ovenData: propTypes.shape({
    baker: propTypes.string,
    balance: propTypes.object,
    borrowedTokens: propTypes.object,
    isLiquidated: propTypes.bool,
    outstandingTokens: propTypes.object,
    ovenAddress: propTypes.string,
    ovenOwner: propTypes.string,
    stabilityFees: propTypes.object,
    ovenClient: () => null,
  }),
};

Oven.defaultProps = {
  ovenData: {},
};
