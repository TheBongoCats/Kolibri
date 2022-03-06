import styles from '../../content.module.scss';

const Funds = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Developer and Stability Funds</h2>
      <p className={styles.paragraph}>
        Accrued stability and liquidation fees are deposited in two funds. The
        split is determined by the <strong>developer fund split</strong>.
      </p>
      <p className={styles.paragraph}>
        The role of the <strong>stability fund</strong> is to be a liquidator of
        last resort. If the price of the outstanding{' '}
        <code className={styles.code}>kUSD</code> is greater than the{' '}
        <code className={styles.code}>XTZ</code> value locked in the Ovens then
        a rational economic actor would not liquidate, and the{' '}
        <code className={styles.code}>Oven</code> is then considered underwater.
        This event should not occur since it is unlikely that{' '}
        <code className={styles.code}>Oven</code> values would go from
        undercollateralized to <strong>underwater</strong> fast enough that
        rational actors would not liquidate. However, in some sort of systemic
        black swan event, the stability fund acts as a powerful counter-balance
        and can liquidate <strong>underwater</strong>{' '}
        <code className={styles.code}>Oven</code>s to restore collateralization
        (and thus stability) to the system.
      </p>
      <p className={styles.paragraph}>
        The <strong>developer fund</strong> is a discretionary fund used to fund
        future developments to Kolibri. Distributions are determined via a
        planned governance mechanism.
      </p>
    </div>
  );
};

export default Funds;
