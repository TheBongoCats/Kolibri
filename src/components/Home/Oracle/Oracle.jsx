import { useEffect, useState } from 'react';
import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import { isDesktop, mutateBigNumber } from '../../../utils';
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
import { ReactComponent as Bell } from '../../../images/bell.svg';

const Oracle = () => {
  const { lang } = useI18nStateContext();
  const { tezosPrice } = useKolibriStateContext();
  const { handleSetNotify } = usePushDispatchContext();
  const { notifyOracle } = usePushStateContext();

  const [minutes, setMinutes] = useState(0);

  const desktop = isDesktop();

  const price = mutateBigNumber(tezosPrice?.price);
  const time = tezosPrice?.time;

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
    setMinutes(mutateBigNumber(Date.now() - time, CONSTANTS.MS_PER_MINUTE, 0));
  }, [tezosPrice]);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setMinutes(
        mutateBigNumber(Date.now() - time, CONSTANTS.MS_PER_MINUTE, 0),
      );
    }, 60000);

    return () => clearInterval(timeoutId);
  }, [minutes]);

  return (
    <div className={styled.oracle}>
      <div className={styled.oracle__title}>
        {latest[`${lang}`]} <b>XTZ/USD Oracle</b> {priceText[`${lang}`]}
        {tezosPrice ? (
          <span className={styled.oracle__price}> ${price}</span>
        ) : (
          <Loader />
        )}
      </div>
      <div className={styled.oracle__updated}>
        {oracleUpdate[`${lang}`]} {+minutes ? lastUpdate() : <Loader />}
        {desktop && (
          <button
            onClick={handleSetNotify}
            type="button"
            className={styled.oracle__button}
          >
            {notifyOracle ? (
              <Bell
                className={`${styled.oracle__bell} ${styled['oracle__bell--filled']}`}
              />
            ) : (
              <Bell className={styled.oracle__bell} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Oracle;
