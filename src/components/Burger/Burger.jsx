import PropTypes from 'prop-types';
import styles from '../Header/Header.module.scss';

const Burger = ({ isOpen, callback }) => {
  return (
    <button
      type="button"
      className={
        isOpen
          ? `${styles.header__burger} ${styles['header__burger--clicked']}`
          : styles.header__burger
      }
      onClick={callback}
      aria-label="Open"
    />
  );
};

export default Burger;

Burger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
};
