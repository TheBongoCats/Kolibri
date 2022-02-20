import Button from '../../Button';

import styled from './OvenNav.module.scss';

const OvenNav = () => {
  const test = () => console.log('test');

  const NAV_CONFIG = [
    { text: 'Withdraw ꜩ', callback: test },
    { text: 'Deposit ꜩ', callback: test },
    { text: 'Borrow kUSD', callback: test },
    { text: 'Repay kUSD', callback: test },
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
