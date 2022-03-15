import PropTypes from 'prop-types';
import styles from './Burger.module.scss';

const Burger = ({ isOpen, callback }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={styles.wrapper} onClick={callback}>
      <button
        type="button"
        className={
          isOpen
            ? `${styles.burger} ${styles['burger--clicked']}`
            : styles.burger
        }
        aria-label="Open"
        onClick={callback}
      />
    </div>
  );
};

export default Burger;

Burger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
};
