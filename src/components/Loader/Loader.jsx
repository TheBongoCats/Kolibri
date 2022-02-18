import propTypes from 'prop-types';
import loader from '../../images/kolibri-loader.gif';
import styled from './Loader.module.scss';

const Loader = ({ text }) => {
  return (
    <div className={styled.loader}>
      <img src={loader} alt="loader" className={styled.loader__img} />
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
