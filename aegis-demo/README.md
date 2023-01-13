# Aegis Browser Demo

Super simple one-click browser wallets, transferring coins over a Aegis NOCUST hub with an AUSD ERC20 token.

# Online Demo
For a quick and easy demo, we have created two instances that you can use on the following URLs:
http://aegis-demo-one.spear.technology/
http://aegis-demo-two.spear.technology/

# Offline Demo
To run the demo yourself offline, simply download this folder and open the index.html file on your browser. 

# Available accounts
We have provided 100 accounts for the Ganache blockchain running on http://ganache.spear.technology that can be found on this file:
https://github.com/spear-protocol/aegis/blob/main/aegis-demo/available-accounts.txt

## How is bundle.js generated?

Bundle.js is a browser friendly compilation of all dependencies required to use nocust-client

1) A dummy npm project with index.js 
  ```
  const Web3 = require('web3') 
  const BigNumber = require('bignumber.js')
  const { NocustManager } = require('nocust-client')

  window.getWeb3 = function(){
      return Web3;
  };

  window.getBigNumber = function(){
    return BigNumber;
  };

  window.getNocustManager = function(){
    return NocustManager;
  };
  ```

2) package.json including dependencies below:
  "bignumber.js": "9.1.0",
  "nocust-cline.js": "4.0.0-alpha.5",
  "web3": "1.8.0"

3) then dependencies are bundled using browserify
  ```
  browserify index.js -o bundle.js
  ```
