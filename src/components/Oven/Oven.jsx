/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import CONSTANTS from '../../utils/constants';
import OvenNav from '../OvenNav';
import styled from './Oven.module.scss';

const Oven = ({ ovenData }) => {
  return (
    <div className={styled.oven}>
      <div className={styled.oven__header}>
        {`ADDRESS: ${ovenData.ovenAddress} `}
        {ovenData.ovenClient && <OvenNav ovenClient={ovenData.ovenClient} />}
      </div>
      <div className={styled.oven__footer}>
        {`BAKER: ${ovenData.baker} `}
        {`BALANCE: ${ovenData.balance / CONSTANTS.MUTEZ_IN_TEZOS} `}
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
