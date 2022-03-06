import styles from '../../content.module.scss';

const Intro = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Kolibri</h2>
      <p className={styles.paragraph}>
        Kolibri is an Tezos based stablecoin built on Collateralized Debt
        Positions (CDPs) known as <code className={styles.code}>Oven</code>s.
      </p>
      <h3 className={styles['sub-heading']}>Overview</h3>
      <p className={styles.paragraph}>
        Kolibri uses CDPs (referred to as an{' '}
        <code className={styles.code}>Oven</code>) to collateralize a soft
        pegged USD-stable value asset, <code className={styles.code}>kUSD</code>
        .
      </p>
      <p className={styles.paragraph}>Each Oven has four functions:</p>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <code className={styles.code}>Deposit</code>: Place{' '}
          <code className={styles.code}>XTZ</code> into the{' '}
          <code className={styles.code}>Oven</code>
        </li>
        <li className={styles.list__item}>
          <code className={styles.code}>Withdraw</code>: Remove{' '}
          <code className={styles.code}>XTZ</code> from the{' '}
          <code className={styles.code}>Oven</code>
        </li>
        <li className={styles.list__item}>
          <code className={styles.code}>Borrow</code>: Borrow{' '}
          <code className={styles.code}>kUSD</code> against the{' '}
          <code className={styles.code}>Oven</code> using{' '}
          <code className={styles.code}>XTZ</code> as collateral
        </li>
        <li className={styles.list__item}>
          <code className={styles.code}>Repay</code>: Repay{' '}
          <code className={styles.code}>kUSD</code> that was borrowed against
          the <code className={styles.code}>Oven</code>.
        </li>
      </ul>
    </div>
  );
};

export default Intro;
