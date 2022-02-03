import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <App test="test" />{' '}
  </StrictMode>,
  document.getElementById('root'),
);
