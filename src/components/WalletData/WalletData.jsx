import {
  useBeaconStateContext,
  useBeaconDispatchContext,
} from '../../contexts/beaconContext';

const WalletData = () => {
  const { beaconAddress, beaconNet, beaconBalance } = useBeaconStateContext();
  const { disconnectWallet } = useBeaconDispatchContext();

  return (
    <div>
      <div>{beaconAddress}</div>
      <div>{beaconNet}</div>
      <div>{beaconBalance}</div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={disconnectWallet}>Kusd</div>
    </div>
  );
};

export default WalletData;
