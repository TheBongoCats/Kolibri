import PropTypes from 'prop-types';
import styles from './Burger.module.scss';

const Burger = ({ isOpen, callback }) => {
  return (
    <button
      type="button"
      className={
        isOpen ? `${styles.burger} ${styles['burger--clicked']}` : styles.burger
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
