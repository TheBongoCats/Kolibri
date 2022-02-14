import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ callback, text }) => (
  <button onClick={callback} type="button" className={styles.button}>
    {text}
  </button>
);

export default Button;

Button.propTypes = {
  callback: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
