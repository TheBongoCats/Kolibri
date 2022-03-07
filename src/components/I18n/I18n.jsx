import PropTypes from 'prop-types';
import { useI18nDispatchContext } from '../../contexts/i18nContext';
import styled from './I18n.module.scss';

const i18nConfig = [
  { value: 'en', text: 'EN' },
  { value: 'ru', text: 'RU' },
];

const I18n = ({ isAside }) => {
  const { handleSetLang } = useI18nDispatchContext();

  return (
    <select
      onChange={(e) => {
        handleSetLang(e.target.value);
      }}
      defaultValue={localStorage.lang || 'en'}
      className={
        isAside ? `${styled.i18n} ${styled['i18n--aside']}` : styled.i18n
      }
    >
      {i18nConfig.map((item) => {
        const { value, text } = item;

        return (
          <option key={text} value={value}>
            {text}
          </option>
        );
      })}
    </select>
  );
};

export default I18n;

I18n.propTypes = {
  isAside: PropTypes.bool,
};

I18n.defaultProps = {
  isAside: false,
};
