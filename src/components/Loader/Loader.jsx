import propTypes from 'prop-types';
import { useThemeState } from '../../contexts/themeContext';
import loaderWhite from '../../images/kolibri-loader.gif';
import loaderBlack from '../../images/kolibri-loader-black.gif';
import styled from './Loader.module.scss';

const Loader = ({ text }) => {
  const { theme } = useThemeState();
  return (
    <div className={styled.loader}>
      <img
        src={theme === 'light' ? loaderBlack : loaderWhite}
        alt="loader"
        className={styled.loader__img}
      />
      {text && <span>{text}</span>}
    </div>
  );
};

export default Loader;

Loader.propTypes = {
  text: propTypes.string,
};

Loader.defaultProps = {
  text: '',
};
