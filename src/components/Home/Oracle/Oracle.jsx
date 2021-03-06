import { useEffect, useState } from 'react';
import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import { isDesktop, mutateBigNumber } from '../../../utils/helpers';
import CONSTANTS from '../../../utils/constants';
import Loader from '../../Loader';
import {
  latest,
  priceText,
  oracleUpdate,
  minutesUpdate,
  hoursUpdate,
} from './text.json';

import styles from './Oracle.module.scss';
import { useI18nStateContext } from '../../../contexts/i18nContext';
import {
  usePushDispatchContext,
  usePushStateContext,
} from '../../../contexts/pushContext';
import { ReactComponent as Bell } from '../../../images/bell.svg';

const Oracle = () => {
  const { lang } = useI18nStateContext();
  const { tezosPrice } = useKolibriStateContext();
  const { handleSetNotify } = usePushDispatchContext();
  const { notifyOracle } = usePushStateContext();
  const [minutes, setMinutes] = useState(0);

  const desktop = isDesktop();
  const price = mutateBigNumber(tezosPrice?.price, CONSTANTS.MUTEZ_IN_TEZOS);
  const time = tezosPrice?.time;

  const lastUpdate = () => {
    switch (true) {
      case minutes > 60:
        return (
          <span
            className={`${styles.oracle__time} ${styles['oracle__time--s--error']}`}
          >
            {hoursUpdate[lang]}
          </span>
        );
      case minutes >= 30:
        return (
          <span
            className={`${styles.oracle__time} ${styles['oracle__time--s--error']}`}
          >
            {minutes} {minutesUpdate[lang]}
          </span>
        );
      default:
        return (
          <span
            className={`${styles.oracle__time} ${styles['oracle__time--s--ok']}`}
          >
            {minutes} {minutesUpdate[lang]}
          </span>
        );
    }
  };

  useEffect(() => {
    const newMinutes = mutateBigNumber(
      Date.now() - time,
      CONSTANTS.MS_PER_MINUTE,
      0,
    );
    setMinutes(newMinutes.decimal);
  }, [tezosPrice]);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      const newMinutes = mutateBigNumber(
        Date.now() - time,
        CONSTANTS.MS_PER_MINUTE,
        0,
      );
      setMinutes(newMinutes.decimal);
    }, 60000);

    return () => clearInterval(timeoutId);
  }, [minutes]);

  return tezosPrice.price ? (
    <div className={styles.oracle}>
      <div className={styles.oracle__title}>
        {latest[lang]} <b>XTZ/USD Oracle</b> {priceText[lang]}
        <span className={styles.oracle__price} data-title={price.full}>
          {' '}
          ${price.decimal}
        </span>
      </div>
      <div className={styles.oracle__updated}>
        {oracleUpdate[lang]} {minutes ? lastUpdate() : <Loader />}
        {desktop && (
          <button
            onClick={handleSetNotify}
            type="button"
            className={styles.oracle__button}
          >
            {notifyOracle ? (
              <Bell
                className={`${styles.oracle__bell} ${styles['oracle__bell--filled']}`}
              />
            ) : (
              <Bell className={styles.oracle__bell} />
            )}
          </button>
        )}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Oracle;
