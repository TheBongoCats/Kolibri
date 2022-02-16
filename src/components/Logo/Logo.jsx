import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../images/Logo.svg';
import subLogo from '../../images/sub-logo.svg';
import styles from './Logo.module.scss';

const Logo = ({ isSubLogo }) => (
  <Link to="/">
    <img
      className={`${styles.logo} ${
        isSubLogo ? `${styles['logo--sub-logo']}` : ''
      }`}
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
