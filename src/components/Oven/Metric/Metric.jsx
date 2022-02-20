import propTypes from 'prop-types';
import Loader from '../../Loader';
import styled from './Metric.module.scss';

const Metric = ({ title, value, unit, dataTitle, position, size }) => {
  return (
    <div className={`${styled.metric} ${styled[`metric--pos--${position}`]}`}>
      <p
        className={`${styled.metric__title} ${
          styled[`metric__title--s--${size}`]
        }`}
      >
        {title}
      </p>
      {value ? (
        <p
          className={`${styled.metric__value} ${
            styled[`metric__value--s--${size}`]
          }`}
          data-title={dataTitle || null}
        >
          {value}
          {unit}
        </p>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Metric;

Metric.propTypes = {
  title: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  unit: propTypes.string,
  dataTitle: propTypes.string,
  position: propTypes.oneOf(['center', 'left']),
  size: propTypes.oneOf(['s', 'm', 'l']),
};

Metric.defaultProps = {
  value: '',
  unit: '',
  dataTitle: '',
  position: 'center',
  size: 'm',
};
