/* eslint-disable react/forbid-prop-types */

import propTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import CONSTANTS from '../../../utils/constants';
import Button from '../../Button';

import styled from './OvenNav.module.scss';

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
    <ul className={styled['oven-nav']}>
      <li>
        <Button
          callback={() =>
            handleWithdraw(new BigNumber(5 * CONSTANTS.MUTEZ_IN_TEZOS))
          }
          text="Withdraw ꜩ"
          isRounded
          isTransparent
        />
      </li>
      <li>
        <Button
          callback={() =>
            handleDeposit(new BigNumber(5 * CONSTANTS.MUTEZ_IN_TEZOS))
          }
          text="Deposit ꜩ"
          isRounded
          isTransparent
        />
      </li>
      <li>
        <Button
          callback={() =>
            handleBorrow(new BigNumber(5 * CONSTANTS.MUTEZ_IN_TEZOS))
          }
          text="Borrow kUSD"
          isRounded
          isTransparent
        />
      </li>
      <li>
        <Button
          callback={() =>
            handleRepay(new BigNumber(5 * CONSTANTS.MUTEZ_IN_TEZOS))
          }
          text="Repay kUSD"
          isRounded
          isTransparent
        />
      </li>
    </ul>
  );
};

export default OvenNav;

OvenNav.propTypes = {
  ovenClient: propTypes.object,
};

OvenNav.defaultProps = {
  ovenClient: {},
};
