import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Docs.module.scss';
import Burger from '../../components/Burger';

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
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const location = useLocation();

  // for testing
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  // for testing end

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className={styles.docs}>
      <div className={styles.docs__wrapper}>
        <div className={styles.docs__header}>
          <h1 className={styles.docs__heading}>Documentation</h1>
          {width <= 700 && (
            <Burger callback={() => setIsOpen(!isOpen)} isOpen={isOpen} />
          )}
        </div>
        <div className={styles.docs__data}>
          {isOpen && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              className={styles.docs__background}
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
          <ul
            className={
              isOpen
                ? `${styles.docs__list} ${styles['docs__list--is-open']}`
                : styles.docs__list
            }
          >
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
                          <Link to={path} className={styles.docs__link}>
                            {text}
                          </Link>
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
