/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import { useModalDispatchContext } from '../../../contexts/modalContext';
import Button from '../../Button';
import OvenModal from '../OvenModal/OvenModal.container';
import styles from './OvenNav.module.scss';
import texts from '../texts.json';
import { useI18nStateContext } from '../../../contexts/i18nContext';
import { shouldDisableAction } from '../../../utils/helpers';

const OvenNav = ({ ovenData, ovenMetrics }) => {
  const { lang } = useI18nStateContext();
  const { handleOpenModal } = useModalDispatchContext();

  const NAV_CONFIG = [
    { text: texts.withdraw[lang], modalId: 'withdraw' },
    { text: texts.deposit[lang], modalId: 'deposit' },
    { text: texts.borrow[lang], modalId: 'borrow' },
    { text: texts.repay[lang], modalId: 'repay' },
  ];

  const onButtonClick = (button) =>
    handleOpenModal(
      <OvenModal
        ovenData={ovenData}
        section={button.modalId}
        ovenMetrics={ovenMetrics}
      />,
    );

  return (
    <ul className={styles['oven-nav']}>
      {NAV_CONFIG.map((button) => (
        <li key={button.text} className={styles['oven-nav__button']}>
          {shouldDisableAction(ovenMetrics, button.modalId) ? (
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
  ovenData: propTypes.object.isRequired,
  ovenMetrics: propTypes.object.isRequired,
};
