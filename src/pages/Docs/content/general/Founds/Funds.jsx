import styles from '../../content.module.scss';
import texts from './texts.json';
import { useI18nStateContext } from '../../../../../contexts/i18nContext';

const Funds = () => {
  const { lang } = useI18nStateContext();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{texts.title[lang]}</h2>
      <p className={styles.paragraph}>
        {texts.subTitle[lang]} <strong>{texts.developerSplit[lang]}</strong>.
      </p>
      <p className={styles.paragraph}>
        {texts.paragraphBefore[lang]}{' '}
        <strong>{texts.paragraphStrong[lang]}</strong>{' '}
        {texts.paragraphAfter[lang]} <code className={styles.code}>kUSD</code>
        {texts.paragraphGreater[lang]} <code className={styles.code}>XTZ</code>{' '}
        {texts.paragraphValue[lang]} <code className={styles.code}>Oven</code>{' '}
        {texts.paragraphConsiderate[lang]}{' '}
        <code className={styles.code}>Oven</code>{' '}
        {texts.paragraphAfterUnder[lang]}{' '}
        <strong>{texts.underwaterFirst[lang]}</strong>{' '}
        {texts.paragraphAfterAbove[lang]}
        <strong>{texts.underwaterSecond[lang]}</strong>{' '}
        <code className={styles.code}>Oven</code>
        {texts.paragraphLast[lang]}
      </p>
      <p className={styles.paragraph}>
        {lang === 'en' ? 'The' : ''}{' '}
        <strong>{texts.developerFund[lang]}</strong>{' '}
        {texts.secondParagraph[lang]}
      </p>
    </div>
  );
};

export default Funds;
