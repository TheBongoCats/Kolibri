import { useKolibriStateContext } from '../../contexts/kolibriContext';
import { calculateOvenMetrics } from '../../utils/helpers';
import texts from './texts.json';

import OvenNav from './OvenNav/OvenNav';
import Metric from './Metric/Metric';

import styles from './Oven.module.scss';
import CircularProgress from '../CircularProgress';
import Loader from '../Loader';
import { useI18nStateContext } from '../../contexts/i18nContext';
import { OvenDataType } from '../../utils/types';

const Oven = ({ ovenData }) => {
  const { lang } = useI18nStateContext();
  const { tezosPrice } = useKolibriStateContext();
  const { ovenOwner, ovenClient, ovenAddress, baker } = ovenData;
  const ovenMetrics = calculateOvenMetrics(ovenData, tezosPrice);
  const {
    liquidatablePrice,
    collateralRatio,
    collateralValue,
    balance,
    loan,
    stabilityFees,
  } = ovenMetrics;

  return (
    <div className={styles.oven}>
      <a
        className={styles.oven__title}
        href={`https://tzkt.io/${ovenAddress}/operations/`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {ovenAddress}
      </a>
      {ovenData.loading ? (
        <Loader text={texts.loader[lang]} />
      ) : (
        <>
          <div className={styles.oven__flexbox}>
            <div className={styles.oven__info}>
              <Metric
                title={texts.metricBaker[lang]}
                value={baker}
                position="left"
                size="s"
              />
              {ovenClient ? (
                <Metric
                  title={texts.metricLiquidity[lang]}
                  value={liquidatablePrice.decimal}
                  dataTitle={liquidatablePrice.full}
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
            <div className={styles.oven__progress}>
              <CircularProgress percents={collateralRatio.decimal} />
            </div>
          </div>
          <div className={styles.oven__metrics}>
            <Metric
              title={texts.metricCollateral[lang]}
              value={collateralValue.decimal}
              dataTitle={collateralValue.full}
              unit=" USD"
              showZeroValue
            />
            <Metric
              title={texts.metricBalance[lang]}
              value={balance.decimal}
              dataTitle={balance.full < 1 ? balance.full : null}
              unit=" ꜩ"
              showZeroValue
            />
            <Metric
              title={texts.metricLoan[lang]}
              value={loan.decimal}
              dataTitle={loan.full}
              unit=" kUSD"
              showZeroValue
            />
            <Metric
              title={texts.metricStability[lang]}
              value={stabilityFees.decimal}
              dataTitle={stabilityFees.full}
              unit=" kUSD"
              showZeroValue
            />
          </div>
          {ovenClient && (
            <OvenNav ovenData={ovenData} ovenMetrics={ovenMetrics} />
          )}
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
