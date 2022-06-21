/* eslint-disable react/forbid-prop-types */
import { useMemo } from 'react';
import { useMatch } from 'react-router-dom';
import propTypes from 'prop-types';

import texts from './texts.json';
import OvenNav from './OvenNav/OvenNav';
import Metric from './Metric/Metric';
import styles from './Oven.module.scss';
import CircularProgress from '../CircularProgress';
import Loader from '../Loader';
import { useI18nStateContext } from '../../contexts/i18nContext';
import { calculateOvenMetrics } from '../../utils/helpers';
import {
  useKolibriDispatchContext,
  useKolibriStateContext,
} from '../../contexts/kolibriContext';
import { useBeaconStateContext } from '../../contexts/beaconContext';

const Oven = ({ oven }) => {
  const { lang } = useI18nStateContext();
  const { tezosPrice } = useKolibriStateContext();
  const { handleAction, setAllOvens, getDataFromAddress } =
    useKolibriDispatchContext();
  const { beaconAddress } = useBeaconStateContext();
  const ovenData = useMemo(
    () => calculateOvenMetrics(oven, tezosPrice),
    [oven, tezosPrice],
  );
  const isMatch = useMatch('/');

  const {
    liquidatablePrice,
    collateralRatio,
    collateralValue,
    balance,
    loan,
    stabilityFees,
    ovenOwner,
    ovenAddress,
    baker,
    loading,
    isLiquidated,
  } = ovenData;
  const shouldShowLiquidate =
    collateralRatio.full > 110 && ovenOwner !== beaconAddress;

  const onLiquidate = async (callback) => {
    const transaction = await callback();
    setAllOvens((prevState) =>
      prevState.map((prevOven) =>
        prevOven.ovenAddress === ovenAddress
          ? {
              ...prevOven,
              loading: true,
            }
          : prevOven,
      ),
    );
    await transaction.confirmation();
    const newData = await getDataFromAddress(ovenAddress);
    setAllOvens((prevState) =>
      prevState.map((prevOven) =>
        prevOven.ovenAddress === newData.ovenAddress ? newData : prevOven,
      ),
    );
  };

  const handleClick = () => onLiquidate(handleAction(ovenAddress, 'liquidate'));

  return (
    <div className={styles.oven}>
      {isLiquidated && (
        <div className={styles.oven__isLiquidated}>Liquidated</div>
      )}
      {loading ? (
        <Loader text={`${texts.loader[lang]} ${ovenAddress}`} />
      ) : (
        <>
          <a
            className={styles.oven__title}
            href={`https://tzkt.io/${ovenAddress}/operations/`}
            target="_blank"
            rel="noreferrer noopener"
          >
            {ovenAddress}
          </a>
          <div className={styles.oven__flexbox}>
            <div className={styles.oven__info}>
              <Metric
                title={texts.metricBaker[lang]}
                value={baker}
                position="left"
                size="s"
              />
              {ovenOwner === beaconAddress ? (
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
            <div
              className={`${styles.oven__progress} ${
                shouldShowLiquidate && styles.oven__progressHover
              }`}
            >
              <CircularProgress collateralRatio={collateralRatio} />
              {shouldShowLiquidate && (
                <button
                  type="button"
                  className={styles.oven__liquidate}
                  onClick={handleClick}
                >
                  Liquidate
                </button>
              )}
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
          {ovenOwner === beaconAddress && isMatch && (
            <OvenNav ovenData={ovenData} />
          )}
        </>
      )}
    </div>
  );
};

export default Oven;

Oven.propTypes = {
  oven: propTypes.object,
};

Oven.defaultProps = {
  oven: {},
};
