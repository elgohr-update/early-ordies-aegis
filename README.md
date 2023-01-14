# Aegis

A secure, scalable, and non-custodial Ethereum L2 powered by the Reserve RToken platform.

Aegis is a mythical shield in Greek mythology that protected Zeus and Athena in battle. In a similar fashion, the Aegis L2 is designed to protect users and their funds while they are conducting finance and commerce in an increasingly adversarial environment.

Features:
- [Unbounded Scalability](https://docs.liquidity.network/costs) compared to rollups
- Instant transaction finality
- Low fees paid with AUSD stablecoin
- Can support ETH and any other ERC-20 token
- Enables a [TEX](https://eprint.iacr.org/2019/265) (Trustless Exchange)

We envision a world where no one is unbanked and where anyone can participate in the global financial system that is fast, cheap and transparent while keeping custody of their money. To achieve our vision, we shall combine two powerful and synergistic technologies: the [Reserve protocol](https://reserve.org/en/protocol/) and the [NOCUST commit-chain](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/commit-chains/).


# Demo

For a quick and easy demo, we have created two instances that you can use on the following URLs:

Demo Instance #1: http://aegis-demo-one.spear.technology/

Demo Instance #2: http://aegis-demo-two.spear.technology/


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

More info: https://github.com/spear-protocol/aegis/tree/main/aegis-demo


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
1. Weak Tokenomics
2. Lack of EVM Compatability

NOCUST whitepaper: https://eprint.iacr.org/2018/642.pdf


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


# Aegis NOCUST Hub

This will guide you through the server's code.

For detailed endpoint documentation deploy a local development operator using nocust-ensemble and check [Local API documentation](http://localhost:8123/swagger).


# Deployment
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
- 

# Server Architechture
The server spans 6 different processes, each has it's own function:
1. [Server](#server)
2. [Scheduler](#beats)
3. [Accounting](#accounting)
4. [Audit](#audit)
5. [Chain](#chain)
6. [Verifier](#verifier)

## Server <a name="server"></a>
+ Started using `runserver.sh`
+ Handles HTTP & Websocket connections
+ Handles synchronous business logic
    - initial swap validation & confirmation found in [swapper](#swapper)
    - transfer validation & confirmation found in [transactor](#transactor)
    - admission validation found in [admission](#admission)

## Scheduler <a name="beats"></a>
+ Started using `celerybeat.sh`
+ Handle periodic task scheduling
    - schedule found in [operator API's celery config file](#operator_api)

## Accounting <a name="accounting"></a>
+ Started using `celeryworker_accounting.sh`
+ Handle off-chain ledger accounting, off-chain confirmation and integrity checks
    - admission confirmation found in [admission tasks](#admission)
    - slash bad withdrawals found in [contractor tasks](#contractor)
    - multi-eon swap confirmation found in [swapper tasks](#swapper)
    - swap matching found in [swapper matcher](#swapper)
    - create checkpoint found in [ledger tasks](#ledger)


## Audit <a name="audit"></a>
+ Started using `celeryworker_audit.sh`
+ Handle sending out websocket notifications found in [auditor tasks](#auditor) and [synchronizer tasks](#synchronizer)
+ Handle automatic terms of service update found in [tos tasks](#tos)


## Chain <a name="chain"></a>
+ Started using `celeryworker_chain.sh`
+ Handle parsing blocks and other tasks requiring parallelism found in [contractor tasks](#contractor)


## Verifier <a name="verifier"></a>
+ Started using `celeryworker_verifier.sh`
+ Handle tasks involving communication with the smart contract found in [contractor tasks](#contractor)
    - synchornize contract state
    - respond to challenges
    - confirm withdrawals
    - write queued transactions to the blockchain


# Module List
The server is broken down to 12 functions, logic is grouped into the following 12 modules:
1. [Operator API](#operator_api)
2. [Admission](#admission)
3. [Analytics](#analytics)
4. [Auditor](#auditor)
5. [Contractor](#contractor)
6. [Heartbeat](#heartbeat)
7. [Ledger](#ledger)
8. [Leveller](#leveller)
9. [Swapper](#swapper)
10. [Synchronizer](#synchronizer)
11. [Terms of Service](#tos)
12. [Transactor](#transactor)


## Operator_api <a name="operator_api"></a>
Main Django app module, contains all common server configurations and utilities.
+ periodic-task schedule
+ alert mail client configuration
+ logging configuration
+ all app settings (controlled by environmental variables)
+ base mutex data model
+ base merkle-tree data structures
+ crypto utilities
+ merkle tree hash cache
+ custom swagger schema generation configurations
+ optional performance profiling endpoints
+ auto-generated swagger docs
+ NOCUST simulations (simulate all NOCUST client events & operator processes) 

| Name | Description |
|------|-------------|
| BulkManager | utility model used to batch database updates |
| CleanModel | utility model used to wrap other models with https://docs.djangoproject.com/en/2.2/ref/models/instances/#django.db.models.Model.full_clean |
| ErrorCode | utility model containing all validation error code constants |
| ReadWriteLock | utility model to wrap other models with a redis based parallel read, single write lock |
| MutexModel | utility model to wrap other models with a redis based mutex |
| MockModel | utility model used to mock arbitrary data models defined at runtime |

## Admission <a name="admission"></a>
All registration endpoints and registration confirmation background tasks.

## Analytics <a name="analytics"></a>
Endpoints returning multiple usage metrics eg. transactions, deposits, withdrawals etc.. (you can learn more about this by checking the swagger documentation).

## Auditor <a name="auditor"></a>
Contains endpoints used to audit the off-chain ledger, as well as all user-facing data serializers.
+ user-facing data serializers
+ endpoints to fetch off-chain ledger data

## Contractor <a name="contractor"></a>
Contains abstraction layers around the NOCUST smart-contract and everything related to syncing state with the blockchain.
+ smart-contract ABI
+ smart-contract python interface
+ smart-contract event interpreters
+ smart-contract transaction models (including retries)
+ block state parsing

### Models
| Name | Description |
|------|-------------|
| ChallengeEntry | on-chain ledger challenge record |
| ContractLedgerState | on-chain ledger state for every token including number of withdrawals, deposits and total balance |
| ContractParameters | on-chain ledger parameters including genesis block, blocks per eon and challenge cost |
| ContractState | on-chain ledger state snapshot per block, keeps track of whether a checkpoint was submitted or missed, in addition to the number of live challenges  |
| EthereumTransactionAttempt | on-chain ethereum transaction submission attempt |
| EthereumTransaction | on-chain ethereym transaction to be submitted |


## Heartbeat <a name="heartbeat"></a>
Bundles together tasks that run periodically, the tasks themselves are defined in other modules.

## Ledger <a name="ledger"></a>
Contains off-chain ledger models and all the logic required to construct the off-chain ledger (still has some deprecated logic related to active transfers).
+ off-chain ledger data models
+ off-chain ledger database integrity constraints
+ off-chain ledger wallet state construction logic (wallet-transfer context)

### Models
| Name | Description |
|------|-------------|
| ActiveState | off-chain wallet's active state including monotonically increasing spend and gained amounts in addition to the active transaction set hash |
| Blacklist | wallets forbidden from admitting to the ledger |
| BlockchainTransaction | base model used in Deposit, WithdrawalRequest and Withdrawal models |
| Deposit | on-chain deposit |
| WithdrawalRequest | on-chain withdrawal request |
| Withdrawal | on-chain confirmed withdrawal |
| Challenge | on-chain challenge includes a flag to indicate whether this challenge was rebuted |
| ExclusiveBalanceAllotment | off-chain wallet's allocated balance, including latest merkle proof data, active state, left and righ balance offsets |
| Matching | off-chain order-pair matching information, including time when the matching happened and the filled amounts of both orders |
| MinimumAvailableBalance | off-chain commitment made by the wallet's owner to not withdraw more than a specific minimum available amount |
| RootCommitment | off-chain ledger's merkle root |
| Signature | off-chain wallet signature |
| TokenCommitment | off-chain token tree commitment |
| TokenPair | trading pair whitelist |
| Token | token model, including address and name |
| Transaction | base transaction model used in Transfer |
| Transfer | off-chain transfer & swap model (single table inheritance), including busines logic to read and change transaction's state as well as some data caching fields |
| Wallet | off-chain wallet model, including some business logic to generate and validate signatures |

## Leveller <a name="leveller"></a>
Endpoints used to subscribe to the operator's service level agreement.

### Models
| Name | Description |
|------|-------------|
| Agreement | service level agreement subscription |

## Swapper <a name="swapper"></a>
Endpoints used to make, match and manage swaps.
+ swap endpoints
+ swap matching algorithm
+ multi-eon swap support logic

## Synchronizer <a name="synchronizer"></a>
Websockets notification implementation and docs.

## TOS <a name="tos"></a>
Endpoints used to sign the operator's terms of service, handles updates to the terms of service automatically.

### Models
| Name | Description |
|------|-------------|
| TOSConfig | terms of service configuration, including terms of service and privacy policy digests, a new record is added automatically whenever the terms of service is updated |
| TOSSignature | specific wallet's signature of a given terms of service config |


## Transactor <a name="transactor"></a>
Endpoints used to make transactions.


# Disclaimer

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
