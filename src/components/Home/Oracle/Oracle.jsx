import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import { mutateBigNumber } from '../../../utils';
import CONSTANTS from '../../../utils/constants';
import Loader from '../../Loader';

import styled from './Oracle.module.scss';

const Oracle = () => {
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
      case minutes >= 30:
        return (
          <span
            className={`${styled.oracle__time} ${styled['oracle__time--s--error']}`}
          >
            {minutes} minutes ago
          </span>
        );
      case minutes > 60:
        return (
          <span
            className={`${styled.oracle__time} ${styled['oracle__time--s--error']}`}
          >
            An hour ago
          </span>
        );
      default:
        return (
          <span
            className={`${styled.oracle__time} ${styled['oracle__time--s--ok']}`}
          >
            {minutes} minutes ago
          </span>
        );
    }
  };

  return (
    <div className={styled.oracle}>
      <div className={styled.oracle__title}>
        Lates <b>XTZ/USD Oracle</b> Price:
        {tezosPrice ? (
          <span className={styled.oracle__price}> ${price}</span>
        ) : (
          <Loader />
        )}
      </div>
      <div className={styled.oracle__updated}>
        Oracle last updated: {lastUpdateTime ? lastUpdate() : <Loader />}
      </div>
    </div>
  );
};

export default Oracle;
