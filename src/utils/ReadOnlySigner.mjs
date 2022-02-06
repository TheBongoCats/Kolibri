export class ReadOnlySigner {
  async publicKey() {
    return this.pk;
  }

  async publicKeyHash() {
    return this.pkh;
  }

  // eslint-disable-next-line class-methods-use-this
  async sign() {
    throw new Error('Cannot sign');
  }

  // eslint-disable-next-line class-methods-use-this
  async secretKey() {
    throw new Error('Secret key cannot be exposed');
  }
}

export default ReadOnlySigner;
