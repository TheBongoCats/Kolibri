import styles from '../../content.module.scss';
import texts from './texts.json';
import codeTexts from '../../codeTexts.json';
import { useI18nStateContext } from '../../../../../contexts/i18nContext';

const Intro = () => {
  const { lang } = useI18nStateContext();
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Kolibri</h2>
      <p className={styles.paragraph}>
        {texts.description[`${lang}`]}{' '}
        <code className={styles.code}>Ovens</code>
      </p>
      <h3 className={styles['sub-heading']}>{texts.overview[`${lang}`]}</h3>
      <p className={styles.paragraph}>
        {texts.overviewBefore[`${lang}`]}{' '}
        <code className={styles.code}>Oven</code>
        {texts.overviewAfter[`${lang}`]}{' '}
        <code className={styles.code}>kUSD</code>.
      </p>
      <p className={styles.paragraph}>{texts.functionTitle[`${lang}`]}</p>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <code className={styles.code}>Deposit</code>:{' '}
          {codeTexts.place[`${lang}`]} <code className={styles.code}>XTZ</code>{' '}
          {texts.depositAfter[`${lang}`]}{' '}
          <code className={styles.code}>Oven</code>
        </li>
        <li className={styles.list__item}>
          <code className={styles.code}>Remove</code>:{' '}
          {codeTexts.remove[`${lang}`]} <code className={styles.code}>XTZ</code>{' '}
          {texts.removeAfter[`${lang}`]}{' '}
          <code className={styles.code}>Oven</code>
        </li>
        <li className={styles.list__item}>
          <code className={styles.code}>Borrow</code>:{' '}
          {codeTexts.borrow[`${lang}`]}{' '}
          <code className={styles.code}>kUSD</code>{' '}
          {texts.borrowAfter[`${lang}`]}{' '}
          <code className={styles.code}>Oven</code>{' '}
          {texts.borrowUsing[`${lang}`]}{' '}
          <code className={styles.code}>XTZ</code>{' '}
          {texts.borrowCollateral[`${lang}`]}
        </li>
        <li className={styles.list__item}>
          <code className={styles.code}>Repay</code>:{' '}
          {codeTexts.repay[`${lang}`]} <code className={styles.code}>kUSD</code>{' '}
          {texts.repayAfter[`${lang}`]}{' '}
          <code className={styles.code}>Oven</code>.
        </li>
      </ul>
    </div>
  );
};

export default Intro;
