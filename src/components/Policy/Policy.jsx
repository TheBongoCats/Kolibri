import styles from './Policy.module.scss';

// const POLICY_CONFIG = [
//   { text: 'Hover Labs', href: 'https://hover.engineering' },
//   {
//     text: 'Terms Of Service',
//     href: 'https://testnet.kolibri.finance/terms-of-service',
//   },
//   {
//     text: 'Privacy Policy',
//     href: 'https://testnet.kolibri.finance/privacy-policy',
//   },
// ];

const Policy = () => (
  <div className={styles.policy}>
    <div>
      Built by the nerds at :{' '}
      <a
        href="https://hover.engineering"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.policy__links}
      >
        Hover Labs
      </a>
    </div>
    <div>
      <a
        href="https://testnet.kolibri.finance/terms-of-service"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.policy__links}
      >
        Terms Of Service
      </a>
      |
      <a
        href="https://testnet.kolibri.finance/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.policy__links}
      >
        Privacy Policy
      </a>
    </div>
    {/* <span className={styles.policy__links}> */}
    {/*  {POLICY_CONFIG.map((link) => { */}
    {/*    const { text, href } = link; */}
    {/*    return ( */}
    {/*      <a href={href} key={href}> */}
    {/*        {text} */}
    {/*      </a> */}
    {/*    ); */}
    {/*  })} */}
    {/* </span> */}
  </div>
);

export default Policy;
