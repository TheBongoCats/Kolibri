/* eslint-disable react/forbid-prop-types */

import propTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import CONSTANTS from '../utils/constants';

const OvenNav = ({ ovenClient }) => {
  const handleWithdraw = (amount) => {
    ovenClient.withdraw(amount);
  };

  const handleDeposit = (amount) => {
    ovenClient.deposit(amount);
  };

  const handleBorrow = (amount) => {
    ovenClient.borrow(amount);
  };

  const handleRepay = (amount) => {
    ovenClient.repay(amount);
  };

  return (
    <div>
      <button
        onClick={() =>
          handleWithdraw(new BigNumber(5 * CONSTANTS.MUTEZ_IN_TEZOS))
        }
        type="button"
      >
        withdraw
      </button>
      <button onClick={handleDeposit} type="button">
        handleDeposit
      </button>
      <button onClick={handleBorrow} type="button">
        handleBorrow
      </button>
      <button onClick={handleRepay} type="button">
        handleRepay
      </button>
    </div>
  );
};

export default OvenNav;

OvenNav.propTypes = {
  ovenClient: propTypes.object,
};

OvenNav.defaultProps = {
  ovenClient: {},
};
