import { Signer } from '@taquito/taquito';

// eslint-disable-next-line import/prefer-default-export
export class ReadOnlySigner implements Signer {
  constructor(private pkh: string, private pk: string) {}

  async publicKey() {
    return this.pk;
  }

  async publicKeyHash() {
    return this.pkh;
  }

  // eslint-disable-next-line class-methods-use-this
  async sign(): Promise<{
    bytes: string;
    sig: string;
    prefixSig: string;
    sbytes: string;
  }> {
    throw new Error('Cannot sign');
  }

  // eslint-disable-next-line class-methods-use-this
  async secretKey(): Promise<string> {
    throw new Error('Secret key cannot be exposed');
  }
}
