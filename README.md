# dai-plugin-ledger-web
A [Dai.js][daijs] plugin for using Ledger in a browser environment.

### Example usage

```js
import LedgerPlugin from '@makerdao/dai-plugin-ledger-web';
import Maker from '@makerdao/dai';

const maker = Maker.create('http', {
  plugins: [LedgerPlugin],
  accounts: {
    myLedger1: { type: 'ledger' }
  }
});

// this will not resolve until the Ledger account is set up
await maker.authenticate();

// or you can defer setting the account up until later
await maker.addAccount('myLedger2', { type: 'ledger' };
```

#### Options

* `accountsLength`: Set this to the number of accounts to fetch. Must also set `choose`; see below. (Default: 1)
* `path`: Set this to the derivation path to use. (Default: "44'/60'/0'/0/0")
* `legacy`: Set this to use the old Ledger address derivation method. [More info][paths]

#### Listing multiple accounts

```js
await maker.addAccount('myLedger', {
  type: 'ledger',
  accountsLength: 10,
  choose: (addresses, callback) => {
    // show the list of addresses in your UI and have the user pick one; then
    // call the callback with the chosen address. `addAccount` will not resolve
    // until the callback is called. if you pass an error object as the first
    // argument, `addAccount` will throw it.
    setTimeout(() => callback(null, addresses[7]), 20000);
  }
});
```

### Try the demo app

You can find an example of this plugin being used in an app [here][accounts].

[daijs]: https://github.com/makerdao/dai.js
[accounts]: https://github.com/makerdao/integration-examples/tree/master/accounts
[paths]: https://github.com/MyCryptoHQ/MyCrypto/issues/2070
