/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import {
  useKolibriStateContext,
  useKolibriDispatchContext,
} from '../../../contexts/kolibriContext';
import { useBeaconStateContext } from '../../../contexts/beaconContext';
import { useModalDispatchContext } from '../../../contexts/modalContext';

import Button from '../../Button';
import CircularProgress from '../CircularProgress';
import OvenModalInfo from './OvenModalInfo';

import styled from './OvenModal.module.scss';
import textsAction from '../textsAction.json';
import CONSTANTS from '../../../utils/constants';
import { mutateOvenData, mutateBigNumber } from '../../../utils';
import { useI18nStateContext } from '../../../contexts/i18nContext';

const OvenModal = ({ ovenData, section }) => {
  const { tezosPrice, myTokens } = useKolibriStateContext();
  const { beaconBalance } = useBeaconStateContext();
  const { getDataFromAddress, setMyOvens, setLoadingOven } =
    useKolibriDispatchContext();
  const { setComponent } = useModalDispatchContext();
  const { lang } = useI18nStateContext();

  const [newCollateralRatio, setNewCollateralRatio] = useState('');
  const [modalId, setModalId] = useState(section);
  const [amount, setAmount] = useState('');
  const [disabled, setDisabled] = useState(false);

  const mutatedData = mutateOvenData(ovenData, tezosPrice);

  const ovenAction = async (callback) => {
    try {
      setDisabled(true);
      setLoadingOven(ovenData.ovenAddress);
      const transaction = await callback();
      setComponent(null);
      await transaction.confirmation();

      const newData = await getDataFromAddress(ovenData.ovenAddress);

      setMyOvens((prevState) => {
        return prevState.map((oven) => {
          return oven.ovenAddress === newData.ovenAddress ? newData : oven;
        });
      });

      setLoadingOven('');
    } catch (e) {
      setLoadingOven('');
      setComponent(null);
    }
  };

  const handleChangeAmount = (e) => {
    const re = /^[0-9]*\.?[0-9]*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const handleChangeSection = (id) => {
    setAmount('');
    setModalId(id);
  };

  const handleBorrow = () => {
    if (newCollateralRatio <= 100 && newCollateralRatio > 0) {
      ovenAction(() => ovenData.ovenClient.borrow(amount * 1e18));
    }
  };

  const handleRepay = () => {
    if (
      newCollateralRatio <= 100 &&
      newCollateralRatio > 0 &&
      amount <= myTokens
    ) {
      ovenAction(() => ovenData.ovenClient.repay(amount * 1e18));
    }
  };

  const handleWithdraw = () => {
    if (newCollateralRatio <= 100 && newCollateralRatio > 0) {
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

  const MODAL_CONFIG = {
    borrow: {
      section: `${textsAction.borrow[`${lang}`]}`,
      unit: 'kUSD',
      handleClick: handleBorrow,
    },
    repay: {
      section: `${textsAction.repay[`${lang}`]}`,
      unit: 'kUSD',
      handleClick: handleRepay,
    },
    withdraw: {
      section: `${textsAction.withdraw[`${lang}`]}`,
      unit: 'ꜩ',
      handleClick: handleWithdraw,
    },
    deposit: {
      section: `${textsAction.deposit[`${lang}`]}`,
      unit: 'ꜩ',
      handleClick: handleDeposit,
    },
  };

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
        if (mutatedData.loan - amount > 0) {
          setNewCollateralRatio(
            (
              ((mutatedData.loan - amount) / mutatedData.collateralValue) *
              200
            ).toFixed(2),
          );
        } else {
          setNewCollateralRatio('0.00');
        }
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

  useEffect(() => {
    if (newCollateralRatio > 100 || newCollateralRatio < 0 || amount <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [newCollateralRatio]);

  return (
    <div className={styled.modal}>
      <nav className={styled.modal__nav}>
        {Object.keys(MODAL_CONFIG).map((id) => {
          return modalId === id ? (
            <div
              className={`${styled.modal__section} ${styled['modal__section--active']}`}
              key={id}
            >
              {MODAL_CONFIG[id].section}
            </div>
          ) : +ovenData.balance === 0 ? (
            <div className={styled.modal__section} role="none" key={id}>
              {MODAL_CONFIG[id].section}
            </div>
          ) : (
            <div
              className={styled.modal__section}
              onClick={() => handleChangeSection(id)}
              role="none"
              key={id}
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
              onChange={handleChangeAmount}
              value={amount}
              className={styled.modal__input}
              style={{ width: `${(amount.length + 1) * 14}px` }}
              placeholder="0"
            />
            <span className={styled.modal__unit}>
              {MODAL_CONFIG[modalId].unit}
            </span>
          </div>
          <OvenModalInfo
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
        isDisabled={disabled}
      />
    </div>
  );
};

export default OvenModal;

OvenModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ovenData: propTypes.object.isRequired,
  section: propTypes.string.isRequired,
};
