import LedgerSubProvider, { setChosenAddress } from './vendor/ledger-subprovider';
import Transport from '@ledgerhq/hw-transport-u2f';

const legacyDerivationPath = "44'/60'/0'/0/0";
const defaultDerivationPath = "44'/60'/0'";

export default function(maker) {
  maker.service('accounts', true).addAccountType('ledger', async settings => {
    const subprovider = LedgerSubProvider(() => Transport.create(), {
      // options: networkId, path, accountsLength, accountsOffset
      accountsOffset: settings.accountsOffset || 0,
      accountsLength: settings.accountsLength || 1,
      networkId: maker.service('web3').networkId(),
      path:
        settings.path ||
        (settings.legacy ? legacyDerivationPath : defaultDerivationPath)
    });

    let address;

    if (settings.accountsLength && settings.accountsLength > 1) {
      if (!settings.choose) {
        throw new Error(
          'If accountsLength > 1, "choose" must be defined in account options.'
        );
      }

      const addresses = await new Promise((resolve, reject) =>
        subprovider.getAccounts((err, addresses) =>
          err ? reject(err) : resolve(addresses)
        )
      );

      address = await new Promise((resolve, reject) => {
        const callback = (err, address) =>
          err ? reject(err) : resolve(address);

        // this chooser function allows the app using the plugin to display the
        // list of addresses to a human user and let them make a choice.
        settings.choose(
          Object.keys(addresses).map(k => addresses[k]),
          callback
        );
      });
      setChosenAddress(address);
    } else {
      address = await new Promise((resolve, reject) =>
        subprovider.getAccounts((err, addresses) =>
          err ? reject(err) : resolve(addresses[0])
        )
      );
    }

    return { subprovider, address };
  });
}
