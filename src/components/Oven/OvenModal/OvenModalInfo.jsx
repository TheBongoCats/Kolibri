/* eslint-disable consistent-return */
import propTypes from 'prop-types';

import { useBeaconStateContext } from '../../../contexts/beaconContext';
import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import { useI18nStateContext } from '../../../contexts/i18nContext';

import { mutateBigNumber } from '../../../utils/helpers';
import { mutatedDataType } from '../../../utils/types';
import CONSTANTS from '../../../utils/constants';

import texts from './textsOvenModalInfo.json';
import styles from './OvenModal.module.scss';

const OvenModalInfo = ({ mutatedData, newCollateralRatio, modalId }) => {
  const { tezosPrice, myTokens } = useKolibriStateContext();
  const { beaconBalance } = useBeaconStateContext();

  const tokens = mutateBigNumber(myTokens, CONSTANTS.KOLIBRI_IN_TEZOS);

  const renderSwitch = () => {
    const { lang } = useI18nStateContext();

    switch (modalId) {
      case 'borrow':
        return (
          <div>
            <p>
              {`${texts.borrowed[lang]}`} {mutatedData.loan} kUSD
            </p>
            <p>
              {texts.maxBorrowed[lang]}{' '}
              {(mutatedData.collateralValue / 2 - mutatedData.loan).toFixed(2)}{' '}
              kUSD
            </p>
            <p>
              {texts.currentCollateral[lang]} {mutatedData.collateralRatio}%
            </p>
            <p>
              {texts.newCollateral[lang]} {newCollateralRatio}%
            </p>
            <p>
              {texts.liquidatable[lang]}
              {mutateBigNumber(tezosPrice.price * newCollateralRatio, 1e8)}
            </p>
          </div>
        );
      case 'repay':
        return (
          <div>
            <p>
              {texts.borrowed[lang]} {mutatedData.loan} kUSD
            </p>
            <p>
              {texts.walletHolding[lang]} {tokens} kUSD
            </p>
            <p>
              {texts.maxPayback[lang]} {mutatedData.loan} kUSD
            </p>
            <p>
              {texts.currentCollateral[lang]} {mutatedData.collateralRatio}%
            </p>
            <p>
              {texts.newCollateral[lang]} {newCollateralRatio}%
            </p>
            <p>
              {texts.liquidatable[lang]}
              {mutateBigNumber(tezosPrice.price * newCollateralRatio, 1e8)}
            </p>
          </div>
        );
      case 'withdraw':
        return (
          <div>
            <p>
              {texts.ovenCollateral[lang]} {mutatedData.balance} ꜩ
            </p>
            <p>
              {texts.maxWithdraw[lang]}{' '}
              {(
                mutatedData.balance *
                (1 - (mutatedData.loan / mutatedData.collateralValue) * 2)
              ).toFixed(2)}{' '}
              ꜩ
            </p>
            <p>
              {texts.currentCollateral[lang]} {mutatedData.collateralRatio}%
            </p>
            <p>
              {texts.newCollateral[lang]} {newCollateralRatio}%
            </p>
          </div>
        );
      case 'deposit':
        return (
          <div>
            <p>
              {texts.ovenCollateral[lang]} {mutatedData.balance} ꜩ
            </p>
            <p>
              {texts.walletHolding[lang]} {beaconBalance.toFixed(2)} ꜩ
            </p>
            <p>
              {texts.maxDeposit[lang]} {beaconBalance.toFixed(2)} ꜩ
            </p>
            <p>
              {texts.currentCollateral[lang]} {mutatedData.collateralRatio}%
            </p>
            <p>
              {texts.newCollateral[lang]} {newCollateralRatio}%
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
  mutatedData: mutatedDataType.isRequired,
  newCollateralRatio: propTypes.number.isRequired,
  modalId: propTypes.string.isRequired,
};
