import { useEffect, useState } from 'react';
import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import { mutateBigNumber } from '../../../utils';
import CONSTANTS from '../../../utils/constants';
import Loader from '../../Loader';
import {
  latest,
  priceText,
  oracleUpdate,
  minutesUpdate,
  hoursUpdate,
} from './text.json';

import styled from './Oracle.module.scss';
import { useI18nStateContext } from '../../../contexts/i18nContext';
import {
  usePushDispatchContext,
  usePushStateContext,
} from '../../../contexts/pushContext';

const Oracle = () => {
  const { lang } = useI18nStateContext();
  const { tezosPrice } = useKolibriStateContext();
  const { handleSetNotify } = usePushDispatchContext();
  const { notifyOracle } = usePushStateContext();

  const [minutes, setMinutes] = useState(0);

  const price = mutateBigNumber(tezosPrice?.price);
  const lastUpdateTime = tezosPrice?.time;

  const lastUpdate = () => {
    switch (true) {
      case minutes > 60:
        return (
          <span
            className={`${styled.oracle__time} ${styled['oracle__time--s--error']}`}
          >
            {hoursUpdate[`${lang}`]}
          </span>
        );
      case minutes >= 30:
        return (
          <span
            className={`${styled.oracle__time} ${styled['oracle__time--s--error']}`}
          >
            {minutes} {minutesUpdate[`${lang}`]}
          </span>
        );
      default:
        return (
          <span
            className={`${styled.oracle__time} ${styled['oracle__time--s--ok']}`}
          >
            {minutes} {minutesUpdate[`${lang}`]}
          </span>
        );
    }
  };

  useEffect(() => {
    setMinutes(
      mutateBigNumber(Date.now() - lastUpdateTime, CONSTANTS.MS_PER_MINUTE, 0),
    );
  }, [tezosPrice]);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setMinutes(
        mutateBigNumber(
          Date.now() - lastUpdateTime,
          CONSTANTS.MS_PER_MINUTE,
          0,
        ),
      );
    }, 30000);

    return () => clearInterval(timeoutId);
  }, [minutes]);

  return (
    <div className={styled.oracle}>
      <div className={styled.oracle__title}>
        {latest[`${lang}`]} <b>XTZ/USD Oracle</b> {priceText[`${lang}`]}
        {tezosPrice ? (
          <>
            <span className={styled.oracle__price}> ${price}</span>
            <button type="button" onClick={handleSetNotify}>
              {notifyOracle ? 'cancel' : 'notify'}
            </button>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <div className={styled.oracle__updated}>
        {oracleUpdate[`${lang}`]} {+minutes ? lastUpdate() : <Loader />}
      </div>
    </div>
  );
};

export default Oracle;
