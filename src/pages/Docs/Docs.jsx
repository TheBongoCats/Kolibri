import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Docs.module.scss';

const titleConfig = [
  {
    title: 'general',
    subTitle: [
      { text: 'Intro', path: '/docs/intro' },
      { text: 'Funds', path: '/docs/funds' },
    ],
  },
  {
    title: 'SECURITY',
    subTitle: [
      { text: 'Risks', path: '/docs/risks' },
      { text: 'Security Audit', path: '/docs/security-audit' },
    ],
  },
];

const Docs = ({ children }) => {
  return (
    <div className={styles.docs}>
      <div className={styles.docs__wrapper}>
        <h1 className={styles.docs__heading}>Documentation</h1>
        <div className={styles.docs__data}>
          <ul className={styles.docs__list}>
            {titleConfig.map((titleItem) => {
              const { title, subTitle } = titleItem;

              return (
                <li key={title}>
                  <div
                    className={
                      title === 'general'
                        ? `${styles.docs__item} ${styles['docs__item--first']}`
                        : styles.docs__item
                    }
                  >
                    {title}
                  </div>
                  <ul>
                    {subTitle.map((subTitleItem) => {
                      const { text, path } = subTitleItem;

                      return (
                        <li
                          key={text}
                          className={`${styles['docs__sub-item']}`}
                        >
                          <Link to={path}>{text}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
          <div className={styles.docs__content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Docs;

Docs.propTypes = {
  children: PropTypes.node.isRequired,
};
