import propTypes from 'prop-types';
import { mutatedDataType } from '../../../utils/types';

import Button from '../../Button';
import CircularProgress from '../../CircularProgress';
import OvenModalInfo from './OvenModalInfo';

import styled from './OvenModal.module.scss';

const OvenModal = ({
  modalConfig,
  modalId,
  amount,
  mutatedData,
  newCollateralRatio,
  isDisabled,
  handleChangeSection,
  handleChangeAmount,
}) => (
  <div className={styled.modal}>
    <nav className={styled.modal__nav}>
      {Object.keys(modalConfig).map((id) => {
        return (
          <button
            className={`${styled.modal__section} ${
              modalId === id ? styled['modal__section--active'] : null
            }`}
            type="button"
            key={id}
            onClick={() => handleChangeSection(id)}
            disabled={modalId === id || mutatedData.balance === 0}
          >
            {modalConfig[id].section}
          </button>
        );
      })}
    </nav>
    <div className={styled.modal__container}>
      <div className={styled.modal__info}>
        <div className={styled.modal__amount}>
          <span>Amount:</span>
          <input
            type="text"
            onChange={handleChangeAmount}
            value={amount}
            className={styled.modal__input}
            style={{ width: `${(amount.length + 1) * 14}px` }}
            placeholder="0"
          />
          <span className={styled.modal__unit}>
            {modalConfig[modalId].unit}
          </span>
        </div>
        <OvenModalInfo
          mutatedData={mutatedData}
          newCollateralRatio={newCollateralRatio}
          modalId={modalId}
        />
      </div>
      <div className={styled.modal__progress}>
        <CircularProgress percents={newCollateralRatio} />
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
  mutatedData: mutatedDataType.isRequired,
  newCollateralRatio: propTypes.number.isRequired,
  isDisabled: propTypes.bool.isRequired,
  handleChangeSection: propTypes.func.isRequired,
  handleChangeAmount: propTypes.func.isRequired,
  modalConfig: propTypes.shape({
    section: propTypes.string,
    unit: propTypes.string,
    handleClick: propTypes.func,
    isDisabled: propTypes.bool,
  }).isRequired,
};
