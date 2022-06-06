import styles from './Peg.module.scss';
import { useKolibriStateContext } from '../../../contexts/kolibriContext';
import Loader from '../../Loader';

const Peg = () => {
  const { kUSDPrice } = useKolibriStateContext();

  const percents = ((kUSDPrice - 1) * 100).toFixed(1);
  const remainder = 50 + (50 * percents) / 100;

  return kUSDPrice ? (
    <div className={styles.peg}>
      <p
        className={styles.peg__title}
        data-title="* according to Quipuswap rate"
      >
        <span>
          kUSD price <b>${kUSDPrice}</b>
        </span>
        /
        <span>
          kUSD {+kUSDPrice > 1 ? 'overbought' : 'oversold'} by{' '}
          <b>{percents}%</b>
        </span>
      </p>
      <div
        className={styles.peg__progress}
        style={
          percents > 0
            ? {
                backgroundImage: `linear-gradient(to right, transparent 50%, #ff5050 50% ${remainder}%, transparent ${remainder}% )`,
              }
            : {
                backgroundImage: `linear-gradient(to right, transparent ${remainder}%, #ff5050 ${remainder}% 50%, transparent 50% )`,
              }
        }
      >
        <div className={styles.peg__separator} />
        <div className={styles.peg__separator} />
        <div className={styles.peg__separator} />
        <div className={styles.peg__separator} />
        <div className={styles.peg__separator} />
        <div className={styles.peg__separator} />
        <div className={styles.peg__separator} />
        <div className={styles.peg__separator} />
        <div className={styles.peg__separator} />
        <div className={styles.peg__separator} />
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Peg;
