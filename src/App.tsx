import Test from './ATest';

type AppProps = {
  test?: string;
};

const App = ({ test }: AppProps) => (
  <div className="App">
    {test}
    <Test text="papa" />
  </div>
);

App.defaultProps = {
  test: 'john',
};

export default App;
