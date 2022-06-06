import propTypes from 'prop-types';
import { useModalDispatchContext } from '../../../contexts/modalContext';
import Button from '../../Button';
import OvenModal from '../OvenModal/OvenModal.container';
import styles from './OvenNav.module.scss';
import texts from '../texts.json';
import { useI18nStateContext } from '../../../contexts/i18nContext';

const OvenNav = ({ ovenData }) => {
  const { lang } = useI18nStateContext();
  const { handleOpenModal } = useModalDispatchContext();

  const NAV_CONFIG = [
    { text: texts.withdraw[lang], modalId: 'withdraw' },
    { text: texts.deposit[lang], modalId: 'deposit' },
    { text: texts.borrow[lang], modalId: 'borrow' },
    { text: texts.repay[lang], modalId: 'repay' },
  ];

  const onButtonClick = (button) =>
    handleOpenModal(<OvenModal ovenData={ovenData} section={button.modalId} />);

  return (
    <ul className={styles['oven-nav']}>
      {NAV_CONFIG.map((button) => (
        <li key={button.text} className={styles['oven-nav__button']}>
          {+ovenData.balance === 0 && button.modalId !== 'deposit' ? (
            <Button text={button.text} isRounded isTransparent isDisabled />
          ) : (
            <Button
              callback={() => onButtonClick(button)}
              text={button.text}
              isRounded
              isTransparent
            />
          )}
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
};
