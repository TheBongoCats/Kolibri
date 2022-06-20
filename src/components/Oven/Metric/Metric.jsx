/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import Loader from '../../Loader';
import styles from './Metric.module.scss';

const Metric = ({
  title,
  value,
  unit,
  dataTitle,
  position,
  size,
  isLoading,
}) => {
  return (
    <div className={`${styles.metric} ${styles[`metric--pos--${position}`]}`}>
      <p
        className={`${styles.metric__title} ${
          styles[`metric__title--s--${size}`]
        }`}
      >
        {title}
      </p>
      {isLoading ? (
        <Loader />
      ) : (
        <p
          className={`${styles.metric__value} ${
            styles[`metric__value--s--${size}`]
          }`}
          data-title={dataTitle || null}
        >
          {value}
          {unit}
        </p>
      )}
    </div>
  );
};

export default Metric;

Metric.propTypes = {
  title: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  unit: propTypes.string,
  dataTitle: propTypes.number,
  position: propTypes.oneOf(['center', 'left']),
  size: propTypes.oneOf(['s', 'm', 'l']),
  isLoading: propTypes.bool,
};

Metric.defaultProps = {
  value: '',
  unit: '',
  dataTitle: null,
  position: 'center',
  size: 'm',
  isLoading: false,
};
