import styles from '../../content.module.scss';
import { useI18nStateContext } from '../../../../../contexts/i18nContext';
import texts from './texts.json';

const SecurityAudit = () => {
  const { lang } = useI18nStateContext();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{texts.title[lang]}</h2>
      <h3 className={styles['sub-heading']}>{texts.subTitle[lang]}</h3>
      <p className={styles.paragraph}>
        {texts.firstParagraphBefore[lang]}{' '}
        <a
          href="https://leastauthority.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Least Authority
        </a>
        {texts.firstParagraph[lang]}
      </p>
      <a
        href="https://testnet.kolibri.finance/docs/security-report.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        {texts.button[lang]}
      </a>
      <h3 className={styles['sub-heading']}>{texts.timeline[lang]}</h3>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <strong>{texts.feb[lang]} 17, 2021</strong> {texts.listFirst[lang]}
        </li>
        <li className={styles.list__item}>
          <strong>{texts.jan[lang]} 28, 2021</strong> {texts.listSecond[lang]}
        </li>
        <li className={styles.list__item}>
          <strong>{texts.jan[lang]} 18, 2021</strong> {texts.listThird[lang]}
        </li>
        <li className={styles.list__item}>
          <strong>{texts.jan[lang]} 13, 2021</strong> {texts.listFourth[lang]}
        </li>
        <li className={styles.list__item}>
          <strong>{texts.dec[lang]} 18, 2020</strong> {texts.listFifth[lang]}
        </li>
      </ul>
    </div>
  );
};

export default SecurityAudit;
