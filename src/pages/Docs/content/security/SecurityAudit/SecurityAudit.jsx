import styles from '../../content.module.scss';

const SecurityAudit = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}> Security Audit</h2>
      <h3 className={styles['sub-heading']}>Status</h3>
      <p className={styles.paragraph}>
        The Kolibri project has been audited by{' '}
        <a
          href="https://leastauthority.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Least Authority
        </a>
        , and no contract code updates have taken place since the review was
        conducted. There were no major findings discovered that would put funds
        or the economic model at risk, but as with every security review
        it&apos;s only an indicator of security, not a guarantee.
      </p>
      <a
        href="https://testnet.kolibri.finance/docs/security-report.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        Read The Report
      </a>
      <h3 className={styles['sub-heading']}>Timeline</h3>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <strong>Feb 17, 2021</strong> We have received the report, and have no
          major issues to remedy!
        </li>
        <li className={styles.list__item}>
          <strong>Jan 28, 2021</strong> We had a check-in with the review team
          with no issues reported so far.
        </li>
        <li className={styles.list__item}>
          <strong>Jan 18, 2021</strong> The review has kicked off, and will
          complete in 3 weeks.
        </li>
        <li className={styles.list__item}>
          <strong>Jan 13, 2021</strong> We have a start date and rough timeline
          for the review - code review will start January 18 and end on February
          12. We&apos;ll have a report in-hand by February 17 and will work to
          remedy any issues that arise!
        </li>
        <li className={styles.list__item}>
          <strong>Dec 18, 2020</strong> WWe have a review in the
          information-gathering phase with a reputable firm. Updates will be
          posted here as things progress.
        </li>
      </ul>
    </div>
  );
};

export default SecurityAudit;
