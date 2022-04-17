/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import styles from './UserData.module.scss';
import { useBeaconStateContext } from '../../contexts/beaconContext';
import { useKolibriStateContext } from '../../contexts/kolibriContext';
import { ReactComponent as Eye } from '../../images/eye.svg';
import { mutateBigNumber } from '../../utils';

const UserData = () => {
  const [isShown, setIsShown] = useState(true);
  const { beaconBalance, beaconNet, beaconAddress } = useBeaconStateContext();
  const { myTokens } = useKolibriStateContext();
  const address =
    beaconAddress &&
    `${beaconAddress.slice(0, 8)}...${beaconAddress.slice(-8)}`;

  return (
    <div className={styles['user-data']}>
      <div className={`${styles['user-data__wrapper']}`}>
        {isShown ? (
          <>
            <div
              role="button"
              aria-label="close"
              onClick={() => setIsShown(false)}
              className={styles['user-data__button']}
            />
            <span className={styles['user-data__address']}>{address}</span>
            <div className={`${styles['user-data__wrapper']}`}>
              <div>
                <span className={styles['user-data__currency']}>
                  kUSD Holdings
                </span>
                <span className={styles['user-data__amount']}>
                  {myTokens ? mutateBigNumber(myTokens, 1e18) : '0.00'} kUSD
                </span>
              </div>
              <div>
                <span className={styles['user-data__currency']}>
                  Tezos Holdings
                </span>
                <span className={styles['user-data__amount']}>
                  {beaconBalance && beaconBalance.toFixed(2)} ꜩ
                </span>
              </div>
            </div>
            <div className={styles['user-data__network']}>
              <span>Network: </span>
              <span>{beaconNet && beaconNet.toUpperCase()}</span>
            </div>
          </>
        ) : (
          <Eye
            className={styles['user-data__eye']}
            onClick={() => setIsShown(true)}
          />
        )}
      </div>
    </div>
  );
};

export default UserData;
