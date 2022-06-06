import propTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './Errors.module.scss';

const Errors = ({ errors, handleUnmount }) => {
  useEffect(() => {
    return () => handleUnmount();
  }, []);
  return (
    <div className={styles.errors}>
      {errors.map((error) => (
        <p className={styles.errors__item} key={error}>
          {error}
        </p>
      ))}
    </div>
  );
};

export default Errors;

Errors.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errors: propTypes.array.isRequired,
  handleUnmount: propTypes.func.isRequired,
};
