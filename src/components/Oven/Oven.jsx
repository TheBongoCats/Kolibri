/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import { useKolibriStateContext } from '../../contexts/kolibriContext';
import { mutateOvenData } from '../../utils';

import OvenNav from './OvenNav/OvenNav';
import Metric from './Metric/Metric';

import styled from './Oven.module.scss';
import CircularProgress from './CircularProgress';

const Oven = ({ ovenData }) => {
  const { tezosPrice } = useKolibriStateContext();

  const mutatedData = mutateOvenData(ovenData, tezosPrice);

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
              value={mutatedData.liquidatablePrice}
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
          <CircularProgress percents={mutatedData.collateralRatio} />
        </div>
      </div>
      <div className={styled.oven__metrics}>
        <Metric
          title="Collateral value: "
          value={mutatedData.collateralValue}
          unit="USD"
        />
        <Metric title="Balance:" value={mutatedData.balance} unit=" ꜩ" />
        <Metric title="Loan:" value={mutatedData.loan} unit=" kUSD" />
        <Metric
          title="Stability fees:"
          value={mutatedData.stabilityFees}
          unit=" kUSD"
          dataTitle={mutatedData.stabilityFeesFull}
        />
      </div>
      {ovenData.ovenClient && <OvenNav ovenData={ovenData} />}
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
