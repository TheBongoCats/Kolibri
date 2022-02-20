import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { homeNav, allOvensNav } from './texts.json';
import { useI18nStateContext } from '../../contexts/i18nContext';
import I18n from '../I18n';

const Navigation = () => {
  const { lang } = useI18nStateContext();

  const NAVIGATION_CONFIG = [
    { path: '/', text: homeNav[`${lang}`] },
    { path: '/all-ovens', text: allOvensNav[`${lang}`] },
  ];

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
      </ul>
    </nav>
  );
};

export default Navigation;
