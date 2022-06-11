import propTypes from 'prop-types';
import Oven from '../Oven';

import styles from './OvenList.module.scss';

const OvenList = ({ ovens }) => {
  return (
    <div className={styles['oven-list']}>
      {ovens.map((oven) => {
        return <Oven key={oven.ovenAddress} oven={oven} />;
      })}
    </div>
  );
};

export default OvenList;

OvenList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ovens: propTypes.array,
};

OvenList.defaultProps = {
  ovens: [],
};
