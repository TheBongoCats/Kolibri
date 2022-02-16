import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ callback, text, isBig, isTransparent, isRounded }) => (
  <button
    onClick={callback}
    type="button"
    className={`
      ${styles.button} ${isBig ? styles['button--big'] : ''} 
      ${isTransparent ? styles['button--transparent'] : ''} 
      ${isRounded ? styles['button--rounded'] : ''}`}
  >
    {text}
  </button>
);

export default Button;

Button.propTypes = {
  callback: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isBig: PropTypes.bool,
  isTransparent: PropTypes.bool,
  isRounded: PropTypes.bool,
};

Button.defaultProps = {
  isBig: false,
  isTransparent: false,
  isRounded: false,
};
