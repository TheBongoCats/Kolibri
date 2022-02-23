import { useState } from 'react';
import styles from './UserData.module.scss';
import { useBeaconStateContext } from '../../contexts/beaconContext';
import { useKolibriStateContext } from '../../contexts/kolibriContext';

const UserData = () => {
  const [isShown, setIsShown] = useState(true);
  const { beaconBalance, beaconNet, beaconAddress } = useBeaconStateContext();
  const { myTokens } = useKolibriStateContext();
  const address = beaconAddress && [...beaconAddress];
  if (address) {
    address.splice(8, 22, '...');
  }
  return (
    <div className={styles['user-data']}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
      <div role="button" onClick={() => setIsShown(!isShown)}>
        {isShown ? 'Hide' : 'Show'}
      </div>
      <div
        className={
          isShown
            ? `${styles['user-data__wrapper']} ${styles['user-data__wrapper--shown']}`
            : styles['user-data__wrapper']
        }
      >
        <div className={styles['user-data__address']}>{address}</div>
        <div className={styles['user-data__network-wrapper']}>
          <span className={styles['user-data__network']}>Network: </span>
          <span className={styles['user-data__network-type']}>
            {' '}
            {beaconNet && beaconNet.toUpperCase()}
          </span>
        </div>
      </div>
      <div
        className={
          isShown
            ? `${styles['user-data__wrapper']} ${styles['user-data__wrapper--shown']}`
            : styles['user-data__wrapper']
        }
      >
        <div className={styles['user-data__token']}>
          <span className={styles['user-data__currency']}>kUSD Holdings</span>
          <span className={styles['user-data__amount']}>
            {myTokens ? (myTokens / 1e18).toFixed(2) : '0.00'} kUSD
          </span>
        </div>
        <div className={styles['user-data__token']}>
          <span className={styles['user-data__currency']}>Tezos Holdings</span>
          <span className={styles['user-data__amount']}>
            {beaconBalance && beaconBalance.toFixed(2)} ꜩ
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserData;
