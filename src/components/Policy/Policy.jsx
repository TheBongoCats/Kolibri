import { ukraine, terms, policy } from './texts.json';
import styles from './Policy.module.scss';
import { useI18nStateContext } from '../../contexts/i18nContext';

const Policy = () => {
  const { lang } = useI18nStateContext();

  return (
    <div className={styles.policy}>
      <p>{ukraine[lang]}</p>
      <p>
        Inspired by:{' '}
        <a
          href="https://hover.engineering"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.policy__links}
        >
          Hover Labs
        </a>
      </p>
      <div>
        <a
          href="https://testnet.kolibri.finance/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.policy__links}
        >
          {terms[lang]}
        </a>{' '}
        <span className={styles.policy__links}>|</span>{' '}
        <a
          href="https://testnet.kolibri.finance/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.policy__links}
        >
          {policy[lang]}
        </a>
      </div>
    </div>
  );
};

export default Policy;
