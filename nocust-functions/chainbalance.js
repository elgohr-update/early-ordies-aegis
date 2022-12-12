const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const { nocust } = require('nocust-client');

const web3 = new Web3(
  new Web3.providers.HttpProvider('http://tartarus.spear.technology:7545')
);

const ALICE_PUB = "0x1a3AC58344c4945FD23e7FFdd333d78AF6BdC3E8";
const ALICE_PRIV = "1ffd04918d19225444b628edbcff1414af8010fa91bfb179aec43ac154124308";
const BOB_PUB = "0xE075CAdAa054aeF4F02C94a91979ED0ECf45b3A8";
const BOB_PRIV = "2dad0c5bf3cd0d5757f9e1d4e4e7c1057c39f8f7675ff9a5c2feceaa351af6b9";


const checkChainBalance = async () => {

  await nocust.init({
    contractAddress: '0x799FdefFcf058Da88E2e0bC8ce19412872E3e8D8',
    rpcUrl: 'http://tartarus.spear.technology:7545',
    operatorUrl: 'http://tartarus.spear.technology/'
  });

  await nocust.addPrivateKey(ALICE_PRIV);
  console.log("BOB's private key added");

  const balance = await nocust.getParentChainBalance(ALICE_PUB, '0x549BD80b7666e689b8f28FD554a66dC382E2388F');
  //const balance = await nocust.getParentChainBalance(ALICE_PUB);
  console.log(web3.utils.fromWei(balance.toString(10)));
};

checkChainBalance();