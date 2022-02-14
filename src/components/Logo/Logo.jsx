import { Link } from 'react-router-dom';
import kolibri from '../../images/kolibri.svg';
import styles from './Logo.module.scss';

const Logo = () => (
  <Link to="/" className={styles.wrapper}>
    <img className={styles.logo} src={kolibri} alt="Kolibri main page" />
    <span className={styles.logo__text}>Kolibri</span>
  </Link>
);

export default Logo;
