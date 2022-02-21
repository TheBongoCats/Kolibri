import propTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { getPathColor } from '../../utils';

const CircularProgress = ({ percents }) => {
  const pathColor = getPathColor(percents);

  return (
    <CircularProgressbar
      value={percents}
      text={`${percents}%`}
      styles={buildStyles({
        pathColor,
      })}
    />
  );
};

export default CircularProgress;

CircularProgress.propTypes = {
  percents: propTypes.string.isRequired,
};
