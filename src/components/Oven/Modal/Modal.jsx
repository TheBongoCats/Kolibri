import { useEffect, useState } from 'react';
import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import {
  useOvenModalStateContext,
  useOvenModalDispatchContext,
} from '../../../contexts/modalContext';
import { mutateOvenData, mutateBigNumber } from '../../../utils';
import Button from '../../Button';
import CircularProgress from '../CircularProgress';
import ModalInfo from './ModalInfo';

import styled from './Modal.module.scss';

const MODAL_NAV_CONFIG = {
  borrow: {
    section: 'Borrow kUSD',
    unit: 'kUSD',
  },
  repay: {
    section: 'Repay kUSD',
    unit: 'kUSD',
  },
  withdraw: {
    section: 'Withdraw ꜩ',
    unit: 'ꜩ',
  },
  deposit: {
    section: 'Deposit ꜩ',
    unit: 'ꜩ',
  },
};

const Modal = () => {
  const { modalId, ovenData } = useOvenModalStateContext();
  const { handleCloseModal, setModalId } = useOvenModalDispatchContext();
  const { tezosPrice } = useKolibriStateContext();

  const [amount, setAmount] = useState('');
  const [newCollateralRatio, setNewCollateralRatio] = useState('');

  const closeEscape = (e) => {
    return e.key === 'Escape' ? handleCloseModal() : null;
  };
  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };
  const handleChangeSection = (id) => {
    setAmount('');
    setModalId(id);
  };

  useEffect(() => {
    document.addEventListener('keydown', closeEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeEscape);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const mutatedData = mutateOvenData(ovenData, tezosPrice);

  useEffect(() => {
    switch (modalId) {
      case 'borrow':
        setNewCollateralRatio(
          (
            ((+mutatedData.loan + +amount) / mutatedData.collateralValue) *
            200
          ).toFixed(2),
        );
        break;
      case 'repay':
        setNewCollateralRatio(
          (
            ((mutatedData.loan - amount) / mutatedData.collateralValue) *
            200
          ).toFixed(2),
        );
        break;
      case 'withdraw':
        setNewCollateralRatio(
          (
            (mutatedData.loan /
              mutateBigNumber(
                (mutatedData.balance - amount) * tezosPrice.price,
              )) *
            200
          ).toFixed(2),
        );
        break;
      case 'deposit':
        setNewCollateralRatio(
          +mutatedData.loan
            ? (
                (mutatedData.loan /
                  mutateBigNumber(
                    (+mutatedData.balance + +amount) * tezosPrice.price,
                  )) *
                200
              ).toFixed(2)
            : '0.00',
        );
        break;
      default:
    }
  }, [amount]);

  return (
    modalId && (
      <div className={styled.background} onClick={handleCloseModal} role="none">
        <div className={styled.modal}>
          <nav className={styled.modal__nav}>
            {Object.keys(MODAL_NAV_CONFIG).map((id) => {
              return modalId === id ? (
                <div
                  className={`${styled.modal__section} ${styled['modal__section--active']}`}
                >
                  {MODAL_NAV_CONFIG[id].section}
                </div>
              ) : (
                <div
                  className={styled.modal__section}
                  onClick={() => handleChangeSection(id)}
                  role="none"
                >
                  {MODAL_NAV_CONFIG[id].section}
                </div>
              );
            })}
          </nav>
          <div className={styled.modal__container}>
            <div className={styled.modal__info}>
              <div className={styled.modal__amount}>
                <span>Amount:</span>
                <input
                  type="text"
                  onChange={handleChange}
                  value={amount}
                  className={styled.modal__input}
                  style={{ width: `${(amount.length + 1) * 14}px` }}
                  placeholder="0"
                />
                <span className={styled.modal__unit}>
                  {MODAL_NAV_CONFIG[modalId].unit}
                </span>
              </div>
              <ModalInfo
                styled={styled}
                tezosPrice={tezosPrice}
                mutatedData={mutatedData}
                newCollateralRatio={newCollateralRatio}
                modalId={modalId}
              />
            </div>
            <div className={styled.modal__progress}>
              <CircularProgress percents={newCollateralRatio} />
            </div>
          </div>
          <Button text="Withdraw" isRounded isTransparent />
        </div>
      </div>
    )
  );
};

export default Modal;
