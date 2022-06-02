/* eslint-disable react/forbid-prop-types */
import { useKolibriStateContext } from '../../contexts/kolibriContext';
import { mutateOvenData } from '../../utils/helpers';
import texts from './texts.json';

import OvenNav from './OvenNav/OvenNav';
import Metric from './Metric/Metric';

import styled from './Oven.module.scss';
import CircularProgress from '../CircularProgress';
import Loader from '../Loader';
import { useI18nStateContext } from '../../contexts/i18nContext';
import { OvenDataType } from '../../utils/types';

const Oven = ({ ovenData }) => {
  const { lang } = useI18nStateContext();
  const { tezosPrice, loadingOven } = useKolibriStateContext();
  const { ovenOwner, ovenClient, ovenAddress, baker } = ovenData;
  const {
    liquidatablePrice,
    collateralRatio,
    collateralValue,
    balance,
    loan,
    stabilityFees,
    stabilityFeesFull,
  } = mutateOvenData(ovenData, tezosPrice);

  return (
    <div className={styled.oven}>
      {loadingOven === ovenAddress ? (
        <Loader text={texts.loader[lang]} />
      ) : (
        <>
          <a
            className={styled.oven__title}
            href={`https://tzkt.io/${ovenAddress}/operations/`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {ovenAddress}
          </a>
          <div className={styled.oven__flexbox}>
            <div className={styled.oven__info}>
              <Metric
                title={texts.metricBaker[lang]}
                value={baker}
                position="left"
                size="s"
              />
              {ovenClient ? (
                <Metric
                  title={texts.metricLiquidity[lang]}
                  value={liquidatablePrice}
                  showZeroValue
                  unit="$"
                  position="left"
                  size="s"
                />
              ) : (
                <Metric
                  title={texts.metricOwner[lang]}
                  value={ovenOwner}
                  position="left"
                  size="s"
                />
              )}
            </div>
            <div className={styled.oven__progress}>
              <CircularProgress percents={collateralRatio} />
            </div>
          </div>
          <div className={styled.oven__metrics}>
            <Metric
              title={texts.metricCollateral[lang]}
              value={collateralValue}
              unit=" USD"
              showZeroValue
            />
            <Metric
              title={texts.metricBalance[lang]}
              value={balance}
              unit=" ꜩ"
              showZeroValue
            />
            <Metric
              title={texts.metricLoan[lang]}
              value={loan}
              unit=" kUSD"
              showZeroValue
            />
            <Metric
              title={texts.metricStability[lang]}
              value={stabilityFees}
              unit=" kUSD"
              dataTitle={stabilityFeesFull}
              showZeroValue
            />
          </div>
          {ovenClient && <OvenNav ovenData={ovenData} />}
        </>
      )}
    </div>
  );
};

export default Oven;

Oven.propTypes = {
  ovenData: OvenDataType,
};

Oven.defaultProps = {
  ovenData: {},
};
