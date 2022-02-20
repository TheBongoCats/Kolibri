import { useState } from 'react';
import styled from './Modal.module.scss';

const Modal = () => {
  const [amount, setAmount] = useState('');

  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  // const handleWithdraw = () => {
  //   ovenClient.withdraw(amount);
  // };

  // const handleDeposit = () => {
  //   ovenClient.deposit(amount);
  // };

  // const handleBorrow = () => {
  //   ovenClient.borrow(amount);
  // };

  // const handleRepay = () => {
  //   ovenClient.repay(amount);
  // };

  return (
    <div className={styled.background}>
      <div className={styled.modal}>
        <nav className={styled.modal__nav}>
          <button type="button" className={styled.modal__section}>
            Borrow kUSD
          </button>
          <button type="button" className={styled.modal__section}>
            Repay kUSD
          </button>
          <button type="button" className={styled.modal__section}>
            Withdraw ꜩ
          </button>
          <button type="button" className={styled.modal__section}>
            Deposit ꜩ
          </button>
        </nav>
        <div className={styled.modal__amount}>
          <span>Amount:</span>
          <input type="text" onChange={handleChange} value={amount} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
