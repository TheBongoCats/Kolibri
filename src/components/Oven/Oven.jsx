/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import { useKolibriStateContext } from '../../contexts/kolibriContext';
import { mutateOvenData } from '../../utils';
import texts from './texts.json';

import OvenNav from './OvenNav/OvenNav';
import Metric from './Metric/Metric';

import styled from './Oven.module.scss';
import CircularProgress from './CircularProgress';
import Loader from '../Loader';
import { useI18nStateContext } from '../../contexts/i18nContext';

const Oven = ({ ovenData }) => {
  const { lang } = useI18nStateContext();
  const { tezosPrice, loadingOven } = useKolibriStateContext();

  const mutatedData = mutateOvenData(ovenData, tezosPrice);

  return (
    <div className={styled.oven}>
      {loadingOven === ovenData.ovenAddress ? (
        <Loader text={texts.loader[`${lang}`]} />
      ) : (
        <>
          <p className={styled.oven__title}>{ovenData.ovenAddress}</p>
          <div className={styled.oven__flexbox}>
            <div className={styled.oven__info}>
              <Metric
                title={texts.metricBaker[`${lang}`]}
                value={ovenData.baker}
                position="left"
                size="s"
              />
              {ovenData.ovenClient ? (
                <Metric
                  title={texts.metricLiquidity[`${lang}`]}
                  value={mutatedData.liquidatablePrice}
                  unit="$"
                  position="left"
                  size="s"
                />
              ) : (
                <Metric
                  title={texts.metricOwner[`${lang}`]}
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
              title={texts.metricCollateral[`${lang}`]}
              value={mutatedData.collateralValue}
              unit=" USD"
            />
            <Metric
              title={texts.metricBalance[`${lang}`]}
              value={mutatedData.balance}
              unit=" ꜩ"
            />
            <Metric
              title={texts.metricLoan[`${lang}`]}
              value={mutatedData.loan}
              unit=" kUSD"
            />
            <Metric
              title={texts.metricStability[`${lang}`]}
              value={mutatedData.stabilityFees}
              unit=" kUSD"
              dataTitle={mutatedData.stabilityFeesFull}
            />
          </div>
          {ovenData.ovenClient && <OvenNav ovenData={ovenData} />}
        </>
      )}
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
