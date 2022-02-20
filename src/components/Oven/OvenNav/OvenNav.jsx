/* eslint-disable react/forbid-prop-types */

import propTypes from 'prop-types';
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

  const NAV_CONFIG = [
    { text: 'Withdraw ꜩ', callback: handleWithdraw },
    { text: 'Deposit ꜩ', callback: handleDeposit },
    { text: 'Borrow kUSD', callback: handleBorrow },
    { text: 'Repay kUSD', callback: handleRepay },
  ];

  return (
    <ul className={styled['oven-nav']}>
      {NAV_CONFIG.map((button) => (
        <li key={button.text}>
          <Button
            callback={button.callback}
            text={button.text}
            isRounded
            isTransparent
          />
        </li>
      ))}
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
