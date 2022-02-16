import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

const NAVIGATION_CONFIG = [
  { path: '/', text: 'Home' },
  { path: '/all-ovens', text: 'All Ovens' },
];

const Navigation = () => (
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
    </ul>
  </nav>
);

export default Navigation;
