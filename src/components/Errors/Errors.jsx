import propTypes from 'prop-types';
import { useEffect } from 'react';
import styled from './Errors.module.scss';

const Errors = ({ errors, handleUnmount }) => {
  useEffect(() => {
    return () => handleUnmount();
  }, []);
  return (
    <div className={styled.errors}>
      {errors.map((error) => (
        <p className={styled.errors__item} key={error}>
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
