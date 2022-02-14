import styles from './Policy.module.scss';

const POLICY_CONFIG = [
  { text: 'Hover Labs', href: 'https://hover.engineering' },
  {
    text: 'Terms Of Service',
    href: 'https://testnet.kolibri.finance/terms-of-service',
  },
  {
    text: 'Privacy Policy',
    href: 'https://testnet.kolibri.finance/privacy-policy',
  },
];

const Policy = () => (
  <div className={styles.policy}>
    <span>Built by the nerds at : </span>
    <span className={styles.policy__links}>
      {POLICY_CONFIG.map((link) => {
        const { text, href } = link;
        return (
          <a href={href} key={href}>
            {text}
          </a>
        );
      })}
    </span>
  </div>
);

export default Policy;
