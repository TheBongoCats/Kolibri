import propTypes from 'prop-types';
import Oven from '../Oven';

import styled from './OvenList.module.scss';

const OvenList = ({ ovens }) => {
  return (
    <div className={styled['oven-list']}>
      {ovens.map((ovenData) => {
        return <Oven key={ovenData.ovenAddress} ovenData={ovenData} />;
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
