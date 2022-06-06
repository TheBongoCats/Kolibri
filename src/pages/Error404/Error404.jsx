import { Link } from 'react-router-dom';
import styles from './Error404.module.scss';
import kolibri from '../../images/kolibri.svg';
import Button from '../../components/Button';

const Error404 = () => {
  return (
    <div className={styles.error404}>
      <div className={styles.error404__head}>
        <img src={kolibri} alt={kolibri} className={styles.error404__kolibri} />
        <span className={styles.error404__title}>Error 404</span>
        <span className={styles.error404__subtitle}>
          Ooops... page not found
        </span>
        <Link to="/">
          <Button callback={() => null} text="Go home" isTransparent isBig />
        </Link>
      </div>
    </div>
  );
};

export default Error404;
