import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as ReactLogo } from '../../images/kolibri.svg';
import styles from './Logo.module.scss';

const Logo = ({ isSubLogo, isBig }) => {
  if (isBig) {
    return <ReactLogo className={styles['logo-big']} alt="Kolibri" />;
  }

  return (
    <Link to="/" className={styles.logo__link}>
      <ReactLogo
        className={
          isSubLogo ? `${styles['logo--sub-logo']} ${styles.logo}` : styles.logo
        }
        alt="Kolibri"
      />
    </Link>
  );
};

export default Logo;

Logo.propTypes = {
  isSubLogo: PropTypes.bool,
  isBig: PropTypes.bool,
};

Logo.defaultProps = {
  isSubLogo: false,
  isBig: false,
};
