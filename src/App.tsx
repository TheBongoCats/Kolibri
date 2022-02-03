import { useState } from 'react';
import Test from './ATest';
import { connectWallet, DAppConnection } from './contexts/walletContext';

type AppProps = {
  test?: string;
};

const MUTEZ_IN_TEZOS = 1000000;

const App = ({ test }: AppProps) => {
  const [connection, setConnection] = useState<DAppConnection>();
  const [tester, setTester] = useState('is');

  const change = () => setTester((prevState) => `${prevState} of`);

  const disconnectWallet = () => {
    setConnection(undefined);
  };

  const handleConnectionClick = async () => {
    try {
      setConnection(await connectWallet(true, 'hangzhounet'));
    } catch (e) {
      throw new Error('error');
    }
  };

  return (
    <>
      <button type="button" className="App" onClick={change} name={tester}>
        <Test text="papa" />
        {test}
      </button>
      <button
        onClick={connection ? disconnectWallet : handleConnectionClick}
        type="button"
      >
        {connection ? 'Disconnect wallet' : 'Connect wallet'}
      </button>
      {connection && (
        <div>
          <div>{`account adress: ${connection.pkh}`}</div>
          <div>{`Account balance: ${
            connection.balance / MUTEZ_IN_TEZOS
          } ꜩ`}</div>
        </div>
      )}
    </>
  );
};

App.defaultProps = {
  test: 'john',
};

export default App;
