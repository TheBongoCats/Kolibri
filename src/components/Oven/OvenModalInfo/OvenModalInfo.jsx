/* eslint-disable react/prop-types */
import { useBeaconStateContext } from '../../../contexts/beaconContext';
import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import { mutateBigNumber } from '../../../utils';
import texts from '../OvenModal/textsOvenModalInfo.json';
import { useI18nStateContext } from '../../../contexts/i18nContext';

const OvenModalInfo = ({
  mutatedData,
  styled,
  newCollateralRatio,
  modalId,
}) => {
  const { tezosPrice, myTokens } = useKolibriStateContext();
  const { beaconBalance } = useBeaconStateContext();

  const tokens = mutateBigNumber(myTokens, 1e18);

  // eslint-disable-next-line consistent-return
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
  return <div className={styled.modal__info}>{renderSwitch()}</div>;
};

export default OvenModalInfo;
