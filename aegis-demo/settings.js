const HUB_CONTRACT_ADDRESS = "0xc88e399816D1BB6aC0fC64E1FBFcfB98cB7E98B2";
const HUB_API_URL = "http://aegis-hub.spear.technology/";
const RPC_URL = "http://ganache.spear.technology:7545/";
const AUSD_ADDRESS = "0xd1eb6c695d573C2Ae32289f9941AbbbD58BcdD25";

const nocust = getNocust();
const web3 = new Web3();
const gasPriceVal = 20;

var FROM_PUB = "";
var TO_PUB = "";

const DEFAULT_PUB = "0xc9D4cE26e48Faf1b2ff963c7127036920A331dC8";
const DEFAULT_PRIV = "e200ff85ba59416e795b9f76b919d933022a5bb5e8ca8cd9c744285624a497fc";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {
    await nocust.init({
        contractAddress: HUB_CONTRACT_ADDRESS,
        operatorUrl: HUB_API_URL,
        rpcUrl: RPC_URL
    });
}

init();
