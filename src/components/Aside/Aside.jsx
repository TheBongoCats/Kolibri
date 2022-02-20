import PropTypes from 'prop-types';
import styles from './Aside.module.scss';
import Navigation from '../Navigation';

const Aside = ({ isOpen, handleIsOpen }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <aside
      onClick={handleIsOpen}
      className={
        isOpen ? `${styles['aside--opened']} ${styles.aside}` : styles.aside
      }
    >
      <div
        className={
          isOpen
            ? `${styles['aside__wrapper--opened']} ${styles.aside__wrapper}`
            : styles.aside__wrapper
        }
      >
        <Navigation isAside />
      </div>
    </aside>
  );
};

Aside.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleIsOpen: PropTypes.func.isRequired,
};

export default Aside;
