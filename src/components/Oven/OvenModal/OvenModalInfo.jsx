/* eslint-disable react/forbid-prop-types */
/* eslint-disable consistent-return */
import propTypes from 'prop-types';

import { useBeaconStateContext } from '../../../contexts/beaconContext';
import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import { useI18nStateContext } from '../../../contexts/i18nContext';
import { mutateBigNumber } from '../../../utils/helpers';

import texts from './textsOvenModalInfo.json';
import styles from './OvenModal.module.scss';
import { calcMaxBorrow, calcMaxWithdraw, calcNewLiquidatable } from './helpers';

const OvenModalInfo = ({
  ovenMetrics,
  newCollateralRatio,
  modalId,
  tokens,
}) => {
  const { tezosPrice } = useKolibriStateContext();
  const { beaconBalance } = useBeaconStateContext();

  const balance = mutateBigNumber(beaconBalance);
  const maxBorrow = calcMaxBorrow(ovenMetrics);
  const newLiquidatable = calcNewLiquidatable(tezosPrice, newCollateralRatio);
  const maxWithdraw = calcMaxWithdraw(ovenMetrics);

  const renderSwitch = () => {
    const { lang } = useI18nStateContext();

    switch (modalId) {
      case 'borrow':
        return (
          <div>
            <p>
              {`${texts.borrowed[lang]}`} {ovenMetrics.loan.decimal} kUSD
            </p>
            <p>
              {texts.maxBorrowed[lang]} {maxBorrow.decimal} kUSD
            </p>
            <p>
              {texts.currentCollateral[lang]}{' '}
              {ovenMetrics.collateralRatio.decimal}%
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
              {texts.borrowed[lang]} {ovenMetrics.loan.decimal} kUSD
            </p>
            <p>
              {texts.walletHolding[lang]} {tokens.decimal} kUSD
            </p>
            <p>
              {texts.maxPayback[lang]} {ovenMetrics.loan.decimal} kUSD
            </p>
            <p>
              {texts.currentCollateral[lang]}{' '}
              {ovenMetrics.collateralRatio.decimal}%
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
              {texts.ovenCollateral[lang]} {ovenMetrics.balance.decimal} ꜩ
            </p>
            <p>
              {texts.maxWithdraw[lang]} {maxWithdraw.decimal} ꜩ
            </p>
            <p>
              {texts.currentCollateral[lang]}{' '}
              {ovenMetrics.collateralRatio.decimal}%
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
              {texts.ovenCollateral[lang]} {ovenMetrics.balance.decimal} ꜩ
            </p>
            <p>
              {texts.walletHolding[lang]} {balance.decimal} ꜩ
            </p>
            <p>
              {texts.maxDeposit[lang]} {balance.decimal} ꜩ
            </p>
            <p>
              {texts.currentCollateral[lang]}{' '}
              {ovenMetrics.collateralRatio.decimal}%
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
  ovenMetrics: propTypes.object.isRequired,
  newCollateralRatio: propTypes.object.isRequired,
  modalId: propTypes.string.isRequired,
  tokens: propTypes.object.isRequired,
};
