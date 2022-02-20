/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useKolibriStateContext } from '../../contexts/kolibriContext';
import { mutateBigNumber, getTrailColor } from '../../utils';

import OvenNav from './OvenNav/OvenNav';
import Metric from './Metric/Metric';

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

  const pathColor = getTrailColor(collateralizationRatio);

  return (
    <div className={styled.oven}>
      <p className={styled.oven__title}>{ovenData.ovenAddress}</p>
      <div className={styled.oven__flexbox}>
        <div className={styled.oven__info}>
          <Metric
            title="Delegated baker:"
            value={ovenData.baker}
            position="left"
            size="s"
          />

          {ovenData.ovenClient ? (
            <Metric
              title="Liquidatable when xtz:"
              value={liquidatablePrice}
              unit="$"
              position="left"
              size="s"
            />
          ) : (
            <Metric
              title="Owner:"
              value={ovenData.ovenOwner}
              position="left"
              size="s"
            />
          )}
        </div>
        <div className={styled.oven__progress}>
          <CircularProgressbar
            value={collateralizationRatio}
            text={`${collateralizationRatio}%`}
            styles={buildStyles({
              pathColor,
            })}
          />
        </div>
      </div>
      <div className={styled.oven__metrics}>
        <Metric title="Collateral value:" value={collateralValue} unit="USD" />
        <Metric title="Balance:" value={balance} unit=" ꜩ" />

        <Metric title="Loan:" value={loan} unit=" kUSD" />

        <Metric
          title="Stability fees:"
          value={stabilityFees}
          unit=" kUSD"
          dataTitle={stabilityFeesFull}
        />
      </div>
      {ovenData.ovenClient && <OvenNav ovenClient={ovenData.ovenClient} />}
    </div>
  );
};

export default Oven;

Oven.propTypes = {
  ovenData: propTypes.shape({
    baker: propTypes.string,
    balance: propTypes.oneOfType([propTypes.object, propTypes.string]),
    borrowedTokens: propTypes.oneOfType([propTypes.object, propTypes.string]),
    isLiquidated: propTypes.bool,
    outstandingTokens: propTypes.oneOfType([
      propTypes.object,
      propTypes.string,
    ]),
    ovenAddress: propTypes.string,
    ovenOwner: propTypes.string,
    stabilityFees: propTypes.oneOfType([propTypes.object, propTypes.string]),
    ovenClient: () => null,
  }),
};

Oven.defaultProps = {
  ovenData: {},
};
