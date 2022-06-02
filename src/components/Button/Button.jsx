import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({
  callback,
  text,
  isBig,
  isTransparent,
  isRounded,
  isDisabled,
}) => (
  <button
    onClick={callback}
    type="button"
    disabled={isDisabled}
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
  callback: PropTypes.func,
  text: PropTypes.string.isRequired,
  isBig: PropTypes.bool,
  isTransparent: PropTypes.bool,
  isRounded: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  callback: () => null,
  isBig: false,
  isTransparent: false,
  isRounded: false,
  isDisabled: false,
};
