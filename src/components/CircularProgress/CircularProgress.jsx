import propTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useThemeState } from '../../contexts/themeContext';
import { getPathColor } from '../../utils/helpers';

const CircularProgress = ({ percents }) => {
  const { theme } = useThemeState();
  const pathColor = getPathColor(percents, theme);

  return (
    <CircularProgressbar
      value={percents}
      text={`${percents}%`}
      styles={buildStyles({
        pathColor,
        textColor: theme === 'light' ? '#313131' : '#fff',
      })}
    />
  );
};

export default CircularProgress;

CircularProgress.propTypes = {
  percents: propTypes.string.isRequired,
};
