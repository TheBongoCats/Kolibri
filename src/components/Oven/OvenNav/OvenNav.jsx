import propTypes from 'prop-types';
import { useOvenModalDispatchContext } from '../../../contexts/modalContext';
import Button from '../../Button';
import styled from './OvenNav.module.scss';

const NAV_CONFIG = [
  { text: 'Withdraw ꜩ', modalId: 'withdraw' },
  { text: 'Deposit ꜩ', modalId: 'deposit' },
  { text: 'Borrow kUSD', modalId: 'borrow' },
  { text: 'Repay kUSD', modalId: 'repay' },
];

const OvenNav = ({ ovenData, setLoading }) => {
  const { handleOpenModal } = useOvenModalDispatchContext();

  return (
    <ul className={styled['oven-nav']}>
      {NAV_CONFIG.map((button) => (
        <li key={button.text} className={styled['oven-nav__button']}>
          <Button
            callback={() =>
              handleOpenModal(button.modalId, ovenData, setLoading)
            }
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
  ovenData: propTypes.shape({
    baker: propTypes.string,
    balance: propTypes.oneOfType([propTypes.object, propTypes.string]),
    borrowedTokens: propTypes.oneOfType([propTypes.object, propTypes.string]),
    isLiquidated: propTypes.bool,
    outstandingTokens: propTypes.oneOfType([
      propTypes.object,
      propTypes.string,
    ]),
    ovenAddress: propTypes.string,
    ovenOwner: propTypes.string,
    stabilityFees: propTypes.oneOfType([propTypes.object, propTypes.string]),
    ovenClient: () => null,
  }).isRequired,
  setLoading: propTypes.func.isRequired,
};
