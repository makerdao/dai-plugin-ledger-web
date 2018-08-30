import LedgerSubProvider from './vendor/ledger-subprovider';
import Transport from '@ledgerhq/hw-transport-u2f';

const defaultDerivationPath = "44'/60'/0'/0/0";

export default function(maker) {
  maker.service('accounts', true).addAccountType('ledger', async settings => {
    const subprovider = LedgerSubProvider(() => Transport.create(), {
      // options: networkId, path, accountsLength, accountsOffset
      path: settings.path || defaultDerivationPath
    });

    const address = await new Promise((resolve, reject) =>
      subprovider.getAccounts((err, addresses) =>
        err ? reject(err) : resolve(addresses[0])));

    return { subprovider, address };
  });
}
