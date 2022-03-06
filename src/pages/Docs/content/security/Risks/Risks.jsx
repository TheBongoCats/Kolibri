import styles from '../../content.module.scss';

const Risks = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Kolibri Risks</h2>
      <p className={styles.paragraph}>
        All smart contracts deployed (as with all software) run the risk of
        software bugs, some of which can compromise the overall security of a
        system. When systems have administrative controls there is also the risk
        of malicious actors abusing those controls for nefarious purposes.
      </p>
      <p className={styles.paragraph}>
        Kolibri is no different, and has a number of risks associated with it.
        We’ve tried to keep things as simple as possible, had a security review
        done by a reputable company, and written extensive tests (unit +
        integration) to gain confidence that Kolibri operates as we expect it
        to, but with security there is no guarantee that it’s 100% safe to use.
      </p>
      <p className={styles.paragraph}>
        Below we outline some of the risks that exist in the system. It’s an
        ever-growing document and likely not 100% inclusive of every risk within
        the system. If you think something is missing please ping us on{' '}
        <a
          href="https://twitter.com/hovereng"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          twitter
        </a>
        or come join our{' '}
        <a
          href="https://discord.com/invite/pCKVNTw6Pf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          discord
        </a>
        !
      </p>
      <h2 className={styles['sub-heading']}>Protocol-level Risks</h2>
      <p className={styles.paragraph}>
        Tezos is an{' '}
        <a
          href="https://news.tezoscommons.org/tezos-blockchains-fast-pace-of-evolution-delivers-new-features-with-edo-upgrade-fec6a62a4b8b"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          ever-evolving protocol
        </a>
        , which brings its own risks with it. Writing a fault tolerant and
        secure blockchain is no simple task, and where there is complexity there
        is defects.
      </p>
      <p className={styles.paragraph}>
        With these upgrades, the protocol can do or change literally anything
        about how the system operates. This is a feature not a bug, but if the
        protocol designers break assumptions it may lead to a loss of security
        for the system (imagine a scenario where the address of the current
        caller suddenly can be set arbitrarily somehow, that’d break our
        authorization checks immediately).
      </p>
      <p className={styles.paragraph}>
        Likewise, there have been real scenarios where the Nomadic Labs protocol
        development team has uncovered{' '}
        <a
          href="https://forum.tezosagora.org/t/baking-accounts-proposal-contains-unexpected-breaking-changes/2844"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          unexpected things with new features
        </a>
        which would break parts of Kolibri. We try to be in constant contact
        with them to hedge against this risk, but if things like this baking
        account feature that has these unexpected consequences were to get
        elected and go live, it would cause issues in the system.
      </p>
    </div>
  );
};

export default Risks;
