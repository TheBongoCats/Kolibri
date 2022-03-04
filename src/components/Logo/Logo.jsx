import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../images/Logo.webp';
import subLogo from '../../images/sub-logo.webp';
import styles from './Logo.module.scss';

const Logo = ({ isSubLogo }) => (
  <Link to="/" className={styles.logo__link}>
    <img
      className={`${isSubLogo ? `${styles['logo--sub-logo']}` : styles.logo}`}
      src={isSubLogo ? subLogo : logo}
      alt="Kolibri main page"
    />
  </Link>
);

export default Logo;

Logo.propTypes = {
  isSubLogo: PropTypes.bool,
};

Logo.defaultProps = {
  isSubLogo: false,
};
