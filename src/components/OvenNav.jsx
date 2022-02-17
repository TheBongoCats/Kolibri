/* eslint-disable react/forbid-prop-types */

import propTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import CONSTANTS from '../utils/constants';
import Button from './Button';

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
    <>
      <Button
        callback={() =>
          handleWithdraw(new BigNumber(5 * CONSTANTS.MUTEZ_IN_TEZOS))
        }
        text="Withdraw"
        isRounded
      />
      <Button
        callback={() =>
          handleDeposit(new BigNumber(5 * CONSTANTS.MUTEZ_IN_TEZOS))
        }
        text="Deposit"
        isRounded
      />
      <Button
        callback={() =>
          handleBorrow(new BigNumber(5 * CONSTANTS.MUTEZ_IN_TEZOS))
        }
        text="Borrow"
        isRounded
      />
      <Button
        callback={() =>
          handleRepay(new BigNumber(5 * CONSTANTS.MUTEZ_IN_TEZOS))
        }
        text="Repay"
        isRounded
      />
    </>
  );
};

export default OvenNav;

OvenNav.propTypes = {
  ovenClient: propTypes.object,
};

OvenNav.defaultProps = {
  ovenClient: {},
};
