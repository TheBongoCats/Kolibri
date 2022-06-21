/* eslint-disable react/forbid-prop-types */
import { useState } from 'react';
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
import { mutateBigNumber } from '../../../utils/helpers';
import texts from '../texts.json';
import useNewCollateralRatio from '../hooks';
import { calcMaxWithdraw } from '../helpers';

const OvenModalContainer = ({ ovenData, section }) => {
  const { tezosPrice, myTokens } = useKolibriStateContext();
  const { getDataFromAddress, setMyOvens, getKUSDTokens, handleAction } =
    useKolibriDispatchContext();
  const { beaconBalance } = useBeaconStateContext();
  const { setComponent } = useModalDispatchContext();
  const { lang } = useI18nStateContext();

  const [modalId, setModalId] = useState(section);
  const [amount, setAmount] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const newCollateralRatio = useNewCollateralRatio(
    modalId,
    ovenData,
    amount,
    tezosPrice,
  );

  const amountKolibriInTezos = amount * CONSTANTS.KOLIBRI_IN_TEZOS;
  const amountMutezInTezos = amount * CONSTANTS.MUTEZ_IN_TEZOS;
  const maxWithdraw = calcMaxWithdraw(ovenData).full;
  const tokens = mutateBigNumber(myTokens, CONSTANTS.KOLIBRI_IN_TEZOS);
  const isAmountZero = amount <= 0;
  const isCollateralValueExcess = newCollateralRatio.full > 100;

  const ovenAction = async (callback) => {
    try {
      setIsDisabled(true);
      const transaction = await callback();
      setMyOvens((prevState) =>
        prevState.map((oven) =>
          oven.ovenAddress === ovenData.ovenAddress
            ? {
                ...oven,
                loading: true,
              }
            : oven,
        ),
      );
      setComponent(null);
      await transaction.confirmation();
      const newData = await getDataFromAddress(ovenData.ovenAddress);
      getKUSDTokens();
      setMyOvens((prevState) =>
        prevState.map((oven) =>
          oven.ovenAddress === newData.ovenAddress ? newData : oven,
        ),
      );
    } catch (e) {
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
    ovenAction(
      handleAction(ovenData.ovenAddress, 'borrow', amountKolibriInTezos),
    );
  };

  const handleRepay = () => {
    ovenAction(
      handleAction(ovenData.ovenAddress, 'repay', amountKolibriInTezos),
    );
  };

  const handleWithdraw = () => {
    ovenAction(
      handleAction(ovenData.ovenAddress, 'withdraw', amountMutezInTezos),
    );
  };

  const handleDeposit = () => {
    ovenAction(
      handleAction(ovenData.ovenAddress, 'deposit', amountMutezInTezos),
    );
  };

  const MODAL_CONFIG = {
    borrow: {
      section: texts.borrow[lang],
      unit: 'kUSD',
      handleClick: handleBorrow,
      isDisabled: isCollateralValueExcess || isAmountZero,
    },
    repay: {
      section: texts.repay[lang],
      unit: 'kUSD',
      handleClick: handleRepay,
      isDisabled:
        amount > ovenData.loan.full || amount > tokens.full || isAmountZero,
    },
    withdraw: {
      section: texts.withdraw[lang],
      unit: 'ꜩ',
      handleClick: handleWithdraw,
      isDisabled: amount > maxWithdraw || isAmountZero,
    },
    deposit: {
      section: texts.deposit[lang],
      unit: 'ꜩ',
      handleClick: handleDeposit,
      isDisabled: amount > beaconBalance || isAmountZero,
    },
  };

  return (
    <OvenModal
      modalConfig={MODAL_CONFIG}
      modalId={modalId}
      ovenData={ovenData}
      amount={amount}
      newCollateralRatio={newCollateralRatio}
      isDisabled={isDisabled}
      tokens={tokens}
      handleChangeAmount={handleChangeAmount}
      handleChangeSection={handleChangeSection}
    />
  );
};

export default OvenModalContainer;

OvenModalContainer.propTypes = {
  ovenData: propTypes.object.isRequired,
  section: propTypes.string.isRequired,
};
