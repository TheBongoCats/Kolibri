import { useState } from 'react';
import Test from './ATest';

type AppProps = {
  test?: string;
};

const App = ({ test }: AppProps) => {
  const [tester, setTester] = useState('is');

  const change = () => setTester((prevState) => `${prevState} of`);

  return (
    <button type="button" className="App" onClick={change} name={tester}>
      <Test text="papa" />
      {test}
    </button>
  );
};

App.defaultProps = {
  test: 'john',
};

export default App;
