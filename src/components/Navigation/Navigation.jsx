/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Navigation.module.scss';
import { homeNav, allOvensNav, docsNav } from './texts.json';
import { useI18nStateContext } from '../../contexts/i18nContext';
import I18n from '../I18n';
import { useThemeState } from '../../contexts/themeContext';
import { ReactComponent as Sun } from '../../images/sun.svg';
import { ReactComponent as Moon } from '../../images/moon.svg';
import UserData from '../UserData';
import { useBeaconStateContext } from '../../contexts/beaconContext';

const Navigation = ({ isAside }) => {
  const { lang } = useI18nStateContext();
  const { theme, handleSetTheme } = useThemeState();
  const { isLogin } = useBeaconStateContext();
  const toggleTheme = () =>
    theme === 'light' ? handleSetTheme('dark') : handleSetTheme('light');

  const NAVIGATION_CONFIG = [
    { path: '/', text: homeNav[`${lang}`] },
    { path: '/all-ovens', text: allOvensNav[`${lang}`] },
    { path: '/docs/intro', text: docsNav[`${lang}`] },
  ];

  if (isAside) {
    return (
      <nav className={`${styles['aside-nav']}`}>
        <ul className={styles['aside-nav__list']}>
          {NAVIGATION_CONFIG.map((navItem) => {
            const { path, text } = navItem;
            return (
              <li key={path}>
                <Link to={path}>{text}</Link>
              </li>
            );
          })}
          <li>
            <I18n />
          </li>
          <li onClick={toggleTheme}>
            {theme === 'light' ? (
              <Sun className={styles.navigation__sun} />
            ) : (
              <Moon />
            )}
          </li>
          {isLogin && (
            <li>
              <UserData />
            </li>
          )}
        </ul>
      </nav>
    );
  }

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        {NAVIGATION_CONFIG.map((navItem) => {
          const { path, text } = navItem;
          return (
            <li key={path} className={styles.navigation__item}>
              <Link to={path}>{text}</Link>
            </li>
          );
        })}
        <li className={styles.navigation__item}>
          <I18n />
        </li>
        <li className={styles.navigation__item}>
          {theme === 'light' ? (
            <Sun onClick={toggleTheme} />
          ) : (
            <Moon onClick={toggleTheme} />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

Navigation.propTypes = {
  isAside: PropTypes.bool,
};

Navigation.defaultProps = {
  isAside: false,
};
