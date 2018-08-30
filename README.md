# dai-plugin-ledger-web
A [Dai.js](daijs) plugin for using Ledger in a browser environment.

### Example usage

```js
import LedgerPlugin from '@makerdao/dai-plugin-ledger-web';
import Maker from '@makerdao/dai';

// this will trigger the Trezor popup immediately
const maker = Maker.create('http', {
  plugins: [LedgerPlugin],
  accounts: {
    // derivation path can be omitted; the default value is shown
    myLedger1: { type: 'ledger', path: "44'/60'/0'/0/0" }
  }
});

// this will not resolve until the Ledger user interaction is complete
await maker.authenticate();

// or you can defer user interaction until later
await maker.addAccount('myLedger2', { type: 'ledger' };
```

### Try the demo app

You can find an example of this plugin being used in an app at [this repo](https://github.com/makerdao/integration-examples/tree/master/accounts).
