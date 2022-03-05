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

const Oracle = () => {
  const { lang } = useI18nStateContext();
  const { tezosPrice } = useKolibriStateContext();

  const price = mutateBigNumber(tezosPrice?.price);
  const lastUpdateTime = tezosPrice?.time;
  const lastUpdate = () => {
    const minutes = mutateBigNumber(
      Date.now() - lastUpdateTime,
      CONSTANTS.MS_PER_MINUTE,
      0,
    );

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
        {oracleUpdate[`${lang}`]} {lastUpdateTime ? lastUpdate() : <Loader />}
      </div>
    </div>
  );
};

export default Oracle;
