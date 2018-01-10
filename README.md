# TweetWallet 

*IN DEVELOPMENT, TESTNET ONLY*

## Table of Contents
  - [Overview and Motivation](#overview-and-motivation)
  - [Basic Steps](#basic-steps)
  - [UI-UX screenshots](#ui-ux-screenshots)
  - [Getting Started - run locally](#getting-started)

## Overview and Motivation

TweetWallet gives ownership of contract-controlled ether to the proven owners of Twitter accounts. 

The motivation is to improve the state of private key management. Private key management is very painful for users, but key management by individuals is essential for decentralized P2P money. It will be difficult to improve upon security and convenience of identity-management already offered by tech giants, with conveniences such as 2-factor auth, machine-trained fraud detection techniques, human judgment, etc. 

Therefore, a middle ground between personal ownership of keys and state-of-the-art security and ease of use will be useful. A potential solution is to offload key management to (1) smart contracts and (2) the regular-old security experts at the tech giants. The proposed solution in this repo uses Ethereum smart contracts relying on oraclize.it to do HTTP requests to prove ownership of online Twitter accounts.

Previous implementations of social media controlled crypto, such as at ChangeTip (aqui-hired by AirBnB in 2016) were good ideas, but in pratice were centralized. Transactions and verification was not on-chain, but in ChangeTip's databases. This implementation is slighlty more decentralized but still relies on an oracle

Numerous technical challenges remain. First, online (social media) accounts are often trusted third parties. This can be partially solved by using several accounts for verification, other websites hosted in different places, and requiring the accrual of a minimum multisignature threshold of approvals. A second concern is that Oraclize.it is also, to a very large extent, a trusted third party. However, Oraclize is used in several largescale distributed applications already. Perhaps new technologies will come along which can serve as a sort of lottery-based oracle service, diminishing the canonical role of any one oracle. The problem of oracles will not go away soon. Thirdly, SSL / TLS is very difficult to understand, and the concept of TLS Notary is still young. Finally, technical implementation challenges remain significant and Ethereum smart contract tools remain elementary. Oraclize's and another strings library were used. Parsing tools can go haywire and regular expression rendered useless upon site redesigns. 

The bootstrap front end and jQuery communicate with Ethereum network via web3.js calls. 

## Basic Steps

1. Create a TweetWallet by submitting a username to Etherem blockchain. New TweetWallets are instances of the "TweetWallet" contract (see "contracts" folder) and are generated using the factory pattern.
2. Endow TweetWallet, essentially a bounty on proven ownership of a Twitter account, by sending ether to the contract address
3. To claim, follow these steps:
   1. Publish a public tweet following this precise pattern "$addressOfContractToClaim,$addressToSendFundsTo"
      - e.g. "0xFdA6118f7496eC899C31839dB12C66aA5e556003,0x627306090abab3a6e1400e9345bc60c78a8bef57"
   2. Trigger claim() method on TweetWallet instance you are claiming, submmitting the status of the tweet above.
      - e.g. Status will look something like "948272796251914720"
      - Contract will concatenate URL, Oraclize will query URL and return, contract will parse Tweet and pay out

## UI-UX screenshots

<img src="https://github.com/toneloc/tweet-wallet/blob/master/createImage.png" alt="Create a new TweetWallet" width="528">

<img src="https://github.com/toneloc/tweet-wallet/blob/master/balancesImage.png" alt="Create a new TweetWallet" width="528">

<img src="https://github.com/toneloc/tweet-wallet/blob/master/claimImage.png" alt="Create a new TweetWallet" width="528">

## Getting Started

Install Truffle

```
npm install -g truffle
```

Install MetaMask Chrome browser extension - https://metamask.io/

Clone this repo:

```
git clone https://github.com/toneloc/tweet-wallet.git
```

Install Node packages:

```
npm install
```

In one terminal tab:

```
truffle develop
```

This will start a local ethereum blockchain, most likley on port 9545, or else 8545. 

In same terminal:

```
truffle compile  // The word "truffle" being optional in truffle console
```

Then:

```
truffle migrate // The word "truffle" being optional in truffle console
```

In a second terminal:

```
truffle develop --log
```

This will tail local blockchain activity. 

In a third:

```
npm run dev
```

Browser should open at localhost port 3000.

Attach Metamask to localhost port 9545. Can claim local testnet accounts preloaded with Ether by importing following DEN seed words into MetaMask

```
candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

Play around with UI. Can generate new contracts and send ether. Oraclize will not work locally, must either mock receipt of funds or deploy to Ropsten to test with Oraclize. Can use Oraclize's [Remix IDE](dapps.oraclize.it/browser-solidity/#gist=9817193e5b05206847ed1fcd1d16bd1d&version=soljson-v0.4.19+commit.c4cbbb05.js). 

# Testnet deployment

Also can deploy with Ropsten. For this, you must have the Go Ethereum client installed and have an account with testnet ether. Sync with test net with: 

```
geth --testnet --fast --rpc --rpcapi eth,net,web3,personal
```

It may take up to 24 hours to synch with testnet. then

Edit truffle.js file to below to add to Ropsten - 

```
module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        ropsten:  {
            network_id: 3,
            host: "localhost",
            port:  8545,
            gas:   4100000
        }
    },
    rpc: {
        host: 'localhost',
        post:8080
    }
};
```

Deploy with below command:

```
truffle migrate --network ropsten
```

Instance of deployed parent contract can be found on Ropsten at [0x10d900A873739e0537e0dB8Da34a6F82BFCe4682](https://ropsten.etherscan.io/address/0x10d900a873739e0537e0db8da34a6f82bfce4682).

## Running the tests

Automated tests forthcoming.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Built With

* [Truffle](http://truffleframework.com/) - Truffle framework 
* [Metamask](https://metamask.io/) - Metamask
* [My Ether Wallet](https://www.myetherwallet.com/)
* [Oraclize Remix](http://dapps.oraclize.it/browser-solidity/#gist=9817193e5b05206847ed1fcd1d16bd1d&version=soljson-v0.4.19+commit.c4cbbb05.js)
