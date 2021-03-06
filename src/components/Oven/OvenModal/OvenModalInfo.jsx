/* eslint-disable react/forbid-prop-types */
/* eslint-disable consistent-return */
import propTypes from 'prop-types';

import { useBeaconStateContext } from '../../../contexts/beaconContext';
import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import { useI18nStateContext } from '../../../contexts/i18nContext';
import { mutateBigNumber } from '../../../utils/helpers';

import texts from './textsOvenModalInfo.json';
import styles from './OvenModal.module.scss';
import {
  calcMaxBorrow,
  calcMaxWithdraw,
  calcNewLiquidatable,
} from '../helpers';

const OvenModalInfo = ({ ovenData, newCollateralRatio, modalId, tokens }) => {
  const { tezosPrice } = useKolibriStateContext();
  const { beaconBalance } = useBeaconStateContext();

  const balance = mutateBigNumber(beaconBalance);
  const maxBorrow = calcMaxBorrow(ovenData);
  const newLiquidatable = calcNewLiquidatable(tezosPrice, newCollateralRatio);
  const maxWithdraw = calcMaxWithdraw(ovenData);

  const renderSwitch = () => {
    const { lang } = useI18nStateContext();

    switch (modalId) {
      case 'borrow':
        return (
          <div>
            <p>
              {`${texts.borrowed[lang]}`} {ovenData.loan.decimal} kUSD
            </p>
            <p>
              {texts.maxBorrowed[lang]} {maxBorrow.decimal} kUSD
            </p>
            <p>
              {texts.currentCollateral[lang]} {ovenData.collateralRatio.decimal}
              %
            </p>
            <p>
              {texts.newCollateral[lang]} {newCollateralRatio.decimal}%
            </p>
            <p>
              {texts.liquidatable[lang]}
              {newLiquidatable.decimal}
            </p>
          </div>
        );
      case 'repay':
        return (
          <div>
            <p>
              {texts.borrowed[lang]} {ovenData.loan.decimal} kUSD
            </p>
            <p>
              {texts.walletHolding[lang]} {tokens.decimal} kUSD
            </p>
            <p>
              {texts.maxPayback[lang]} {ovenData.loan.decimal} kUSD
            </p>
            <p>
              {texts.currentCollateral[lang]} {ovenData.collateralRatio.decimal}
              %
            </p>
            <p>
              {texts.newCollateral[lang]} {newCollateralRatio.decimal}%
            </p>
            <p>
              {texts.liquidatable[lang]}
              {newLiquidatable.decimal}
            </p>
          </div>
        );
      case 'withdraw':
        return (
          <div>
            <p>
              {texts.ovenCollateral[lang]} {ovenData.balance.decimal} ???
            </p>
            <p>
              {texts.maxWithdraw[lang]} {maxWithdraw.decimal} ???
            </p>
            <p>
              {texts.currentCollateral[lang]} {ovenData.collateralRatio.decimal}
              %
            </p>
            <p>
              {texts.newCollateral[lang]} {newCollateralRatio.decimal}%
            </p>
          </div>
        );
      case 'deposit':
        return (
          <div>
            <p>
              {texts.ovenCollateral[lang]} {ovenData.balance.decimal} ???
            </p>
            <p>
              {texts.walletHolding[lang]} {balance.decimal} ???
            </p>
            <p>
              {texts.maxDeposit[lang]} {balance.decimal} ???
            </p>
            <p>
              {texts.currentCollateral[lang]} {ovenData.collateralRatio.decimal}
              %
            </p>
            <p>
              {texts.newCollateral[lang]} {newCollateralRatio.decimal}%
            </p>
          </div>
        );
      default:
        break;
    }
  };
  return <div className={styles.modal__info}>{renderSwitch()}</div>;
};

export default OvenModalInfo;

OvenModalInfo.propTypes = {
  ovenData: propTypes.object.isRequired,
  newCollateralRatio: propTypes.object.isRequired,
  modalId: propTypes.string.isRequired,
  tokens: propTypes.object.isRequired,
};
