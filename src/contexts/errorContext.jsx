import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useModalDispatchContext } from './modalContext';
import Errors from '../components/Errors';

const ErrorStateContext = createContext('');
ErrorStateContext.displayName = 'Error Context';

const useErrorState = () => {
  const context = useContext(ErrorStateContext);

  if (!context) {
    throw new Error('ErrorStateContext must be used within a ErrorProvider');
  }

  return context;
};

const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const { handleOpenModal } = useModalDispatchContext();

  const addError = (error) => {
    setErrors((prevState) => {
      return [...prevState, error];
    });
  };

  const emptyErrors = () => {
    setErrors([]);
  };

  useEffect(() => {
    if (errors.length > 0) {
      handleOpenModal(<Errors errors={errors} handleUnmount={emptyErrors} />);
    }
  }, [errors.length]);

  const stateValue = useMemo(
    () => ({
      addError,
    }),
    [addError],
  );

  return (
    <ErrorStateContext.Provider value={stateValue}>
      {children}
    </ErrorStateContext.Provider>
  );
};

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { useErrorState, ErrorProvider };
