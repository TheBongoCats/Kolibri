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
import CONSTANTS from '../../../utils/constants';
import { useBeaconStateContext } from '../../../contexts/beaconContext';

const Modal = () => {
  const { modalId, ovenData } = useOvenModalStateContext();
  const { handleCloseModal, setModalId, ovenAction } =
    useOvenModalDispatchContext();
  const { tezosPrice, myTokens } = useKolibriStateContext();
  const { beaconBalance } = useBeaconStateContext();

  const [amount, setAmount] = useState('');
  const [newCollateralRatio, setNewCollateralRatio] = useState('');

  const closeEscape = (e) => {
    return e.key === 'Escape' ? setModalId('') : null;
  };
  const handleChange = (e) => {
    const re = /[+-]?([0-9]*[.])?[0-9]+/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };
  const handleChangeSection = (id) => {
    setAmount('');
    setModalId(id);
  };

  const handleBorrow = () => {
    if (newCollateralRatio <= 100 && newCollateralRatio >= 0) {
      ovenAction(() => ovenData.ovenClient.borrow(amount * 1e18));
    }
  };

  const handleRepay = () => {
    if (
      newCollateralRatio <= 100 &&
      newCollateralRatio >= 0 &&
      amount <= myTokens
    ) {
      ovenAction(() => ovenData.ovenClient.repay(amount * 1e18));
    }
  };

  const handleWithdraw = () => {
    if (newCollateralRatio <= 100 && newCollateralRatio >= 0) {
      ovenAction(() =>
        ovenData.ovenClient.withdraw(amount * CONSTANTS.MUTEZ_IN_TEZOS),
      );
    }
  };

  const handleDeposit = () => {
    if (amount <= beaconBalance) {
      ovenAction(() =>
        ovenData.ovenClient.deposit(amount * CONSTANTS.MUTEZ_IN_TEZOS),
      );
    }
  };

  const mutatedData = mutateOvenData(ovenData, tezosPrice);

  const MODAL_CONFIG = {
    borrow: {
      section: 'Borrow kUSD',
      unit: 'kUSD',
      handleClick: handleBorrow,
    },
    repay: {
      section: 'Repay kUSD',
      unit: 'kUSD',
      handleClick: handleRepay,
    },
    withdraw: {
      section: 'Withdraw ꜩ',
      unit: 'ꜩ',
      handleClick: handleWithdraw,
    },
    deposit: {
      section: 'Deposit ꜩ',
      unit: 'ꜩ',
      handleClick: handleDeposit,
    },
  };
  useEffect(() => {
    document.addEventListener('keydown', closeEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeEscape);
      document.body.style.overflow = 'unset';
    };
  }, []);

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
            {Object.keys(MODAL_CONFIG).map((id) => {
              return modalId === id ? (
                <div
                  className={`${styled.modal__section} ${styled['modal__section--active']}`}
                >
                  {MODAL_CONFIG[id].section}
                </div>
              ) : (
                <div
                  className={styled.modal__section}
                  onClick={() => handleChangeSection(id)}
                  role="none"
                >
                  {MODAL_CONFIG[id].section}
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
                  {MODAL_CONFIG[modalId].unit}
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

          <Button
            text={MODAL_CONFIG[modalId].section}
            isRounded
            isTransparent
            callback={MODAL_CONFIG[modalId].handleClick}
          />
        </div>
      </div>
    )
  );
};

export default Modal;
