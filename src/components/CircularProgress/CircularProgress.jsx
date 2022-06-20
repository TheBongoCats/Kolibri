/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useThemeState } from '../../contexts/themeContext';
import { getPathColor } from '../../utils/helpers';

const CircularProgress = ({ collateralRatio }) => {
  const { theme } = useThemeState();
  const pathColor = getPathColor(collateralRatio.decimal, theme);

  return (
    <CircularProgressbar
      value={collateralRatio.full}
      text={`${collateralRatio.decimal}%`}
      styles={buildStyles({
        pathColor,
        textColor: theme === 'light' ? '#313131' : '#fff',
      })}
    />
  );
};

export default CircularProgress;

CircularProgress.propTypes = {
  collateralRatio: propTypes.object.isRequired,
};
