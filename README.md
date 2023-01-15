# Aegis

A secure, scalable, and non-custodial Ethereum L2 powered by the Reserve RToken platform.

Aegis is a mythical shield in Greek mythology that protected Zeus and Athena in battle. In a similar fashion, the Aegis L2 is designed to protect users and their funds while they are conducting finance and commerce in an increasingly adversarial environment.

Features:
- [Unbounded Scalability](https://docs.liquidity.network/costs) compared to rollups
- Instant transaction finality
- Low fees paid with AUSD stablecoin
- Supports ETH and any other ERC-20 token
- Enables a [TEX (Trustless Exchange)](https://github.com/spear-protocol/nocust-tex-frontend)

We envision a world where no one is unbanked and where anyone can participate in the global financial system that is fast, cheap and transparent while keeping custody of their money. To achieve our vision, we shall combine two powerful and synergistic technologies: the [Reserve protocol](https://reserve.org/en/protocol/) and the [NOCUST commit-chain](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/commit-chains/).


# Demo

For a quick and easy demo, we have created two instances that you can use on the following URLs:

Demo Instance #1: http://aegis-demo-one.spear.technology/

Demo Instance #2: http://aegis-demo-two.spear.technology/

Available Accounts: https://github.com/spear-protocol/aegis/blob/main/aegis-demo/available-accounts.txt

</br>

https://user-images.githubusercontent.com/111804246/212467794-0920e5ff-3006-44e1-87a1-f9ee914ff213.mp4

<div align="center">
  <h6>Aegis Demo Part 1</h6>
</div>
</br>


https://user-images.githubusercontent.com/111804246/212467825-d89b9f02-cc6b-4d0f-ba7e-347242e3e4b8.mp4

<div align="center">
  <h6>Aegis Demo Part 2</h6>
</div>


Aegis Hub: http://aegis-hub.spear.technology/audit/

Ganache Blockchain: 

| Variable | Value |
|--------------|------------------------------------------------------|
| Network Name | Aegis Ganache |
| RPC URL | http://ganache.spear.technology:7545 |
| Chain ID | 1337 |
| Symbol | ETH |

</br>
More info: https://github.com/spear-protocol/aegis/tree/main/aegis-demo
</br>

# System Design

Aegis has two main components:

1. Aegis USD (AUSD) stablecoin - an RToken that is designed to protect the funds of normal users who we envisage to be regular everyday people through collateral diversity and collateral default insurance. The fees for transacting on Aegis will be paid using AUSD.

2. Aegis Commit-chain - A chain of commits to the NOCUST smart contracts on Ethereum by centralized but trustless operators running the Aegis Hub server. The operators facilitate gas-less transactions off-chain without taking custody of user funds. 


## Reserve x NOCUST

Reserve's RTokens unleashes the potential of the NOCUST concept by improving the project tokenomics and wrapping DeFi into RTokens circumventing the need for an L2 EVM. This provides a better user experience through fast and cheap transactions and by preserving composability on L1. 

Project Overview: https://docs.google.com/presentation/d/1SbtcPyLduc81ADMjvGpHKU23flVJVWTYemeeXz8Eiuo/


## NOCUST Pros and Cons

Benefits:
1. Non-custodial L1 Security 
2. [Unbounded Scalability](https://docs.liquidity.network/costs)
3. Superior User Experience

Drawbacks:
1. [Weak Tokenomics](https://blog.liquidity.network/2020/07/12/hub-operator-program/)
2. Lack of EVM Compatability

NOCUST academic paper: https://eprint.iacr.org/2018/642.pdf

TEX academic paper: https://eprint.iacr.org/2019/265

</br>

# Aegis USD (AUSD)

<p align="center">
   <img src="https://user-images.githubusercontent.com/111804246/212468050-586315d1-14f6-49fd-ad1c-475d803065e4.JPG" width=80% height=80%>
</p>

<p align="center">
   <img src="https://user-images.githubusercontent.com/111804246/212467317-4d57e197-d810-4fea-a27b-6bef3ef1eb86.JPG" width=80% height=80%>
</p>


# Aegis Commit-chain

Based on the [NOCUST commit-chain](https://docs.liquidity.network/background) technology developed by Liquidity Network. It is tightly integrated with the Aegis USD that serves as its native token to solve the drawbacks of the original NOCUST implementation. 

<p align="center">
   <img src="https://i.imgur.com/9ekBVjB.png" width=60% height=60%>
</p>

An Aegis Hub is a server that is run by an operator to interact with the Aegis commit-chain. It is a fork of the [NOCUST Hub server](https://github.com/liquidity-network/nocust-hub).


# Aegis Hub Installation

This will guide you through how to deploy and operate an Aegis Hub server.


## Deployment
Clone the repo 
```
git clone https://github.com/spear-protocol/aegis-hub.git
```

### Development hub 
This will create a local POA blockchain running with Parity, deploy the contracts, and start a NOCUST hub. 
```
./run.sh
```

### Production hub
This is to operate a hub on public an already existing Blockchain (Goerli, Kovan, ETH mainnet, etc..). This will require to have a nocust smart-contract manually deployed, See https://github.com/spear-protocol/aegis-hub/just-deploy/. You will need to create an `.env` file at the root of the repo with at least the following variables:
```
HUB_OWNER_ACCOUNT_ADDRESS=0xXXXXXX
HUB_OWNER_ACCOUNT_KEY=XXXXXXXX
HUB_AEGIS_CONTRACT_ADDRESS=0xXXXXXXXX
HUB_AEGIS_CONTRACT_CONFIRMATIONS=20
SLA_TOKEN_ADDRESS=0xXXXXXXXX
HUB_ETHEREUM_NODE_URL=YYYYYYY
```

- `HUB_OWNER_ACCOUNT_ADDRESS` NOCUST hub Operator address with `0x` 
- `HUB_OWNER_ACCOUNT_KEY` Private key of the operator without `0x` !! Very sensitve !!
- `HUB_AEGIS_CONTRACT_ADDRESS` NOCUST contract address
- `HUB_AEIG_CONTRACT_CONFIRMATIONS` amount of blocks, used for confirmation of deposits, withdrawals, etc.. 
- `HUB_ETHEREUM_NODE_URL` Http(s) RPC endpoint URL (i.g Alchemy)
- `HUB_ETHEREUM_NETWORK_IS_POA` if in local developement you are using POA-networks (Like Goerli), then this flag should be set as `True`. For ETH mainnet use `False`

To run the production hub, simply do:
```
./run.sh prod
```

### Contract deployment
`deploy_contract.sh` will ask you about node url, owner address and private key. After that it will create docker container for deployment and return to you address of deployed contract. This address you should put into .env file.

### Optional notification
- `NOTIFICATION_HOOK_URL` should be slack notification url, if you want to use notification system
- `SERVER_NAME` if you have a several servers, but same notification slack channel, please set this variable


More info: https://github.com/spear-protocol/aegis/blob/main/aegis-hub/

</br>


# Disclaimer

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
