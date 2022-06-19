/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';

import Button from '../../Button';
import CircularProgress from '../../CircularProgress';
import OvenModalInfo from './OvenModalInfo';
import { shouldDisableAction } from '../helpers';

import styles from './OvenModal.module.scss';

const OvenModal = ({
  modalConfig,
  modalId,
  amount,
  ovenData,
  newCollateralRatio,
  isDisabled,
  handleChangeSection,
  handleChangeAmount,
  tokens,
}) => (
  <div className={styles.modal}>
    <nav className={styles.modal__nav}>
      {Object.keys(modalConfig).map((id) => {
        return (
          <button
            className={`${styles.modal__section} ${
              modalId === id ? styles['modal__section--active'] : null
            }`}
            type="button"
            key={id}
            onClick={() => handleChangeSection(id)}
            disabled={shouldDisableAction(ovenData, id)}
          >
            {modalConfig[id].section}
          </button>
        );
      })}
    </nav>
    <div className={styles.modal__container}>
      <div className={styles.modal__info}>
        <div className={styles.modal__amount}>
          <span>Amount:</span>
          <input
            type="text"
            onChange={handleChangeAmount}
            value={amount}
            className={styles.modal__input}
            style={{ width: `${(amount.length + 1) * 14}px` }}
            placeholder="0"
          />
          <span className={styles.modal__unit}>
            {modalConfig[modalId].unit}
          </span>
        </div>
        <OvenModalInfo
          ovenData={ovenData}
          newCollateralRatio={newCollateralRatio}
          modalId={modalId}
          tokens={tokens}
        />
      </div>
      <div className={styles.modal__progress}>
        <CircularProgress percents={newCollateralRatio.decimal} />
      </div>
    </div>
    <Button
      text={modalConfig[modalId].section}
      isRounded
      isTransparent
      callback={modalConfig[modalId].handleClick}
      isDisabled={isDisabled || modalConfig[modalId].isDisabled}
    />
  </div>
);

export default OvenModal;

OvenModal.propTypes = {
  modalId: propTypes.string.isRequired,
  amount: propTypes.string.isRequired,
  ovenData: propTypes.object.isRequired,
  newCollateralRatio: propTypes.object.isRequired,
  isDisabled: propTypes.bool.isRequired,
  handleChangeSection: propTypes.func.isRequired,
  handleChangeAmount: propTypes.func.isRequired,
  tokens: propTypes.object.isRequired,
  modalConfig: propTypes.shape({
    section: propTypes.string,
    unit: propTypes.string,
    handleClick: propTypes.func,
    isDisabled: propTypes.bool,
  }).isRequired,
};
