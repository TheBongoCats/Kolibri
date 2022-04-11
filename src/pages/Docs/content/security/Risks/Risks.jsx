import styles from '../../content.module.scss';
import { useI18nStateContext } from '../../../../../contexts/i18nContext';
import texts from './texts.json';

const Risks = () => {
  const { lang } = useI18nStateContext();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Kolibri Risks</h2>
      <p className={styles.paragraph}>{texts.firstParagraph[lang]}</p>
      <p className={styles.paragraph}>{texts.secondParagraph[lang]}</p>
      <p className={styles.paragraph}>
        {texts.thirdParagraph[lang]}{' '}
        <a
          href="https://twitter.com/hovereng"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          twitter
        </a>
        {texts.thirdParagraphAfter[lang]}{' '}
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
      <h2 className={styles['sub-heading']}>{texts.subTitle[lang]}</h2>
      <p className={styles.paragraph}>
        {texts.fourthParagraphBefore[lang]}{' '}
        <a
          href="https://news.tezoscommons.org/tezos-blockchains-fast-pace-of-evolution-delivers-new-features-with-edo-upgrade-fec6a62a4b8b"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {texts.protocol[lang]}
        </a>
        {texts.fourthParagraph[lang]}
      </p>
      <p className={styles.paragraph}>{texts.fifthParagraph[lang]}</p>
      <p className={styles.paragraph}>
        {texts.sixthParagraphBefore[lang]}{' '}
        <a
          href="https://forum.tezosagora.org/t/baking-accounts-proposal-contains-unexpected-breaking-changes/2844"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {texts.sixthParagraphLink[lang]}
        </a>
        {texts.sixthParagraph[lang]}
      </p>
    </div>
  );
};

export default Risks;
