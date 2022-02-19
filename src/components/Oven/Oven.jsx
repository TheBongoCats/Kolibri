/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useKolibriStateContext } from '../../contexts/kolibriContext';
import { mutateBigNumber } from '../../utils';

import OvenNav from '../OvenNav';
import styled from './Oven.module.scss';

const Oven = ({ ovenData }) => {
  const { tezosPrice } = useKolibriStateContext();

  const balance = mutateBigNumber(ovenData.balance);
  const collateralValue = mutateBigNumber(balance * tezosPrice.price);
  const loan = mutateBigNumber(ovenData.outstandingTokens, 1e18);
  const stabilityFees = mutateBigNumber(ovenData.stabilityFees, 1e18, 6);
  const stabilityFeesFull = mutateBigNumber(ovenData.stabilityFees, 1e18, 12);
  const collateralizationRatio = +loan
    ? ((loan / collateralValue) * 200).toFixed(2)
    : '0.00';
  const liquidatablePrice = mutateBigNumber(
    tezosPrice.price * collateralizationRatio,
    1e8,
  );

  return (
    <div className={styled.oven}>
      <p className={`${styled.oven__title} ${styled['oven__title--s--l']}`}>
        {ovenData.ovenAddress}
      </p>
      <div className={styled.oven__flexbox}>
        <div className={styled.oven__info}>
          <div>
            <p
              className={`${styled.oven__title} ${styled['oven__title--s--s']}`}
            >
              DELEGATED BAKER:
            </p>
            <p
              className={`${styled.oven__value} ${styled['oven__value--s--s']}`}
            >
              {ovenData.baker}
            </p>
          </div>
          {ovenData.ovenClient ? (
            <p
              className={`${styled.oven__title} ${styled['oven__title--s--s']}`}
            >
              LIQUDATABLE WHEN XTZ: <span>${liquidatablePrice}</span>
            </p>
          ) : (
            <div>
              <p
                className={`${styled.oven__title} ${styled['oven__title--s--s']}`}
              >
                OWNER:
              </p>
              <p
                className={`${styled.oven__value} ${styled['oven__value--s--s']}`}
              >
                {ovenData.ovenOwner}
              </p>
            </div>
          )}
        </div>
        <div className={styled.oven__progress}>
          <CircularProgressbar
            value={collateralizationRatio}
            text={`${collateralizationRatio}%`}
          />
        </div>
      </div>
      <div className={styled.oven__metrics}>
        <div className={styled.oven__metric}>
          <p className={`${styled.oven__title} ${styled['oven__title--s--m']}`}>
            COLLATERAL VALUE:
          </p>
          <p className={`${styled.oven__value} ${styled['oven__value--s--l']}`}>
            {collateralValue} USD
          </p>
        </div>
        <div className={styled.oven__metric}>
          <p className={`${styled.oven__title} ${styled['oven__title--s--m']}`}>
            BALANCE:
          </p>
          <p className={`${styled.oven__value} ${styled['oven__value--s--l']}`}>
            {balance} ꜩ
          </p>
        </div>
        <div className={styled.oven__metric}>
          <p className={`${styled.oven__title} ${styled['oven__title--s--m']}`}>
            LOAN:
          </p>
          <p className={`${styled.oven__value} ${styled['oven__value--s--l']}`}>
            {loan} kUSD
          </p>
        </div>
        <div className={styled.oven__metric}>
          <p className={`${styled.oven__title} ${styled['oven__title--s--m']}`}>
            STABILITY FEES:
          </p>
          <p
            className={`${styled.oven__value} ${styled['oven__value--s--l']}`}
            data-title={stabilityFeesFull}
          >
            {stabilityFees} kUSD
          </p>
        </div>
        {ovenData.ovenClient && <OvenNav ovenClient={ovenData.ovenClient} />}
      </div>
    </div>
  );
};

export default Oven;

Oven.propTypes = {
  ovenData: propTypes.shape({
    baker: propTypes.string,
    balance: propTypes.string,
    borrowedTokens: propTypes.string,
    isLiquidated: propTypes.bool,
    outstandingTokens: propTypes.string,
    ovenAddress: propTypes.string,
    ovenOwner: propTypes.string,
    stabilityFees: propTypes.string,
    ovenClient: () => null,
  }),
};

Oven.defaultProps = {
  ovenData: {},
};
