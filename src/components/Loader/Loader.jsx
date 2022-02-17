import loader from '../../images/kolibri-loader.gif';
import styled from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styled.loader}>
      <img src={loader} alt="loader" className={styled.loader__img} />
      <span>Loading...</span>
    </div>
  );
};

export default Loader;
