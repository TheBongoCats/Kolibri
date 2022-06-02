import { useEffect, useState } from 'react';
import propTypes from 'prop-types';

import {
  useKolibriStateContext,
  useKolibriDispatchContext,
} from '../../../contexts/kolibriContext';
import { useBeaconStateContext } from '../../../contexts/beaconContext';
import { useModalDispatchContext } from '../../../contexts/modalContext';
import { useI18nStateContext } from '../../../contexts/i18nContext';

import OvenModal from './OvenModal.component';

import CONSTANTS from '../../../utils/constants';
import { mutateOvenData, mutateBigNumber } from '../../../utils/helpers';
import { OvenDataType } from '../../../utils/types';
import textsAction from '../textsAction.json';

const OvenModalContainer = ({ ovenData, section }) => {
  const { tezosPrice, myTokens } = useKolibriStateContext();
  const { beaconBalance } = useBeaconStateContext();
  const { getDataFromAddress, setMyOvens, setLoadingOven, getKUSDTokens } =
    useKolibriDispatchContext();
  const { setComponent } = useModalDispatchContext();
  const { lang } = useI18nStateContext();

  const [newCollateralRatio, setNewCollateralRatio] = useState(0);
  const [modalId, setModalId] = useState(section);
  const [amount, setAmount] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const mutatedData = mutateOvenData(ovenData, tezosPrice);

  const ovenAction = async (callback) => {
    try {
      setIsDisabled(true);
      setLoadingOven(ovenData.ovenAddress);
      const transaction = await callback();
      setComponent(null);
      await transaction.confirmation();
      const newData = await getDataFromAddress(ovenData.ovenAddress);
      getKUSDTokens();
      setMyOvens((prevState) => {
        return prevState.map((oven) => {
          return oven.ovenAddress === newData.ovenAddress ? newData : oven;
        });
      });
      setLoadingOven(null);
    } catch (e) {
      setLoadingOven(null);
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
    ovenAction(() =>
      ovenData.ovenClient.borrow(amount * CONSTANTS.KOLIBRI_IN_TEZOS),
    );
  };

  const handleRepay = () => {
    ovenAction(() =>
      ovenData.ovenClient.repay(amount * CONSTANTS.KOLIBRI_IN_TEZOS),
    );
  };

  const handleWithdraw = () => {
    ovenAction(() =>
      ovenData.ovenClient.withdraw(amount * CONSTANTS.MUTEZ_IN_TEZOS),
    );
  };

  const handleDeposit = () => {
    ovenAction(() =>
      ovenData.ovenClient.deposit(amount * CONSTANTS.MUTEZ_IN_TEZOS),
    );
  };

  const MODAL_CONFIG = {
    borrow: {
      section: textsAction.borrow[lang],
      unit: 'kUSD',
      handleClick: handleBorrow,
      isDisabled: newCollateralRatio > 100 || amount <= 0,
    },
    repay: {
      section: textsAction.repay[lang],
      unit: 'kUSD',
      handleClick: handleRepay,
      isDisabled:
        amount > mutatedData.loan ||
        amount <= 0 ||
        amount > mutateBigNumber(myTokens, CONSTANTS.KOLIBRI_IN_TEZOS),
    },
    withdraw: {
      section: textsAction.withdraw[lang],
      unit: 'ꜩ',
      handleClick: handleWithdraw,
      isDisabled: newCollateralRatio >= 100 || amount <= 0,
    },
    deposit: {
      section: textsAction.deposit[lang],
      unit: 'ꜩ',
      handleClick: handleDeposit,
      isDisabled: amount > beaconBalance || amount <= 0,
    },
  };

  useEffect(() => {
    switch (modalId) {
      case 'borrow':
        setNewCollateralRatio(
          (
            ((mutatedData.loan + +amount) / mutatedData.collateralValue) *
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
          setNewCollateralRatio(0);
        }
        break;
      case 'withdraw':
        setNewCollateralRatio(
          (
            (mutatedData.loan /
              mutateBigNumber(
                (mutatedData.balance - amount) * tezosPrice.price,
                CONSTANTS.MUTEZ_IN_TEZOS,
              )) *
            200
          ).toFixed(2),
        );
        break;
      case 'deposit':
        setNewCollateralRatio(
          mutatedData.loan
            ? (
                (mutatedData.loan /
                  mutateBigNumber(
                    (mutatedData.balance + +amount) * tezosPrice.price,
                    CONSTANTS.MUTEZ_IN_TEZOS,
                  )) *
                200
              ).toFixed(2)
            : 0,
        );
        break;
      default:
    }
  }, [amount]);

  return (
    <OvenModal
      modalConfig={MODAL_CONFIG}
      modalId={modalId}
      ovenData={ovenData}
      amount={amount}
      mutatedData={mutatedData}
      newCollateralRatio={newCollateralRatio}
      isDisabled={isDisabled}
      handleChangeAmount={handleChangeAmount}
      handleChangeSection={handleChangeSection}
    />
  );
};

export default OvenModalContainer;

OvenModalContainer.propTypes = {
  ovenData: OvenDataType.isRequired,
  section: propTypes.string.isRequired,
};
