# TweetWallet 

*IN DEVELOPMENT, TESTNET ONLY*

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

## UI/UX screenshots

<img src="https://github.com/toneloc/tweet-wallet/blob/master/createImage.png" alt="Create a new TweetWallet" width="528">

<img src="https://github.com/toneloc/tweet-wallet/blob/master/balancesImage.png" alt="Create a new TweetWallet" width="528">

<img src="https://github.com/toneloc/tweet-wallet/blob/master/claimImage.png" alt="Create a new TweetWallet" width="528">

## Getting Started

Install Truffle

```
npm install -g truffle
```

Install MetaMask Chrome browser extension - https://metamask.io/

```
git clone https://github.com/toneloc/tweet-wallet.git
```

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
truffle compile  // the word "truffle" being optional in truffle console
```

```
truffle migrate // the word "truffle" being optional in truffle console
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

### Running contract

Can deploy parent contract manually with web3.js or a tool like My Ether Wallet. Will be expenesive until further optimizations - 

```
var _username = /* var of type string here */ ;
var dieselprice.sol:tweetwalletContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"myid","type":"bytes32"},{"name":"result","type":"string"},{"name":"proof","type":"bytes"}],"name":"__callback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"address"}],"name":"toString","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_statusId","type":"string"}],"name":"claim","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_username","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"description","type":"string"}],"name":"newOraclizeQuery","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tweetInfo","type":"string"}],"name":"newTweetInfo","type":"event"}]);
var dieselprice.sol:tweetwallet = dieselprice.sol:tweetwalletContract.new(
   _username,
   {
     from: web3.eth.accounts[0], 
     data: '0x6060604052604051620024a8380380620024a88339810160405280805182019190505080600590805190602001906200003a92919062000042565b5050620000f1565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200008557805160ff1916838001178555620000b6565b82800160010185558215620000b6579182015b82811115620000b557825182559160200191906001019062000098565b5b509050620000c59190620000c9565b5090565b620000ee91905b80821115620000ea576000816000905550600101620000d0565b5090565b90565b6123a780620001016000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806327dc297e1461006757806338bbfa50146100d157806356ca623e1461017e578063f3fe12c914610230575b600080fd5b341561007257600080fd5b6100cf60048080356000191690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610282565b005b34156100dc57600080fd5b61017c60048080356000191690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610516565b005b341561018957600080fd5b6101b5600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061051b565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101f55780820151818401526020810190506101da565b50505050905090810190601f1680156102225780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610280600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610603565b005b61028a612294565b6102926122a8565b61029a6122a8565b6102a2612294565b6102aa612294565b6102b2612294565b6000806102bd610c96565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102f657600080fd5b7f45d01cf78b219e82e813897577c80fc0722a5fbee0f9bd388532a7c10a9570b3896040518080602001828103825283818151815260200191508051906020019080838360005b8381101561035857808201518184015260208101905061033d565b50505050905090810190601f1680156103855780820380516001836020036101000a031916815260200191505b509250505060405180910390a18897506067885111156103a457600080fd5b6103ad88610fac565b96506103ff6103f06040805190810160405280600181526020017f2c00000000000000000000000000000000000000000000000000000000000000815250610fac565b88610fda90919063ffffffff16565b955061040a86610ff4565b94506104153061051b565b935061042087610ff4565b925061042b83611052565b9150836040518082805190602001908083835b602083101515610463578051825260208201915060208101905060208303925061043e565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390206000191686604051808281526020019150506040518091039020600019161415156104ba57600080fd5b3073ffffffffffffffffffffffffffffffffffffffff163190508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050505050505050505050505050565b505050565b610523612294565b61052b6122c2565b6000601460405180591061053c5750595b9080825280601f01601f19166020018201604052509150600090505b60148110156105f9578060130360080260020a8473ffffffffffffffffffffffffffffffffffffffff1681151561058b57fe5b047f01000000000000000000000000000000000000000000000000000000000000000282828151811015156105bc57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508080600101915050610558565b8192505050919050565b61060b612294565b610613612294565b61061b6122c2565b6106236122c2565b61062b6122c2565b6106336122c2565b61063b612294565b6106436122c2565b60008061064e612294565b6040805190810160405280601481526020017f68747470733a2f2f747769747465722e636f6d2f0000000000000000000000008152509a50606060405190810160405280603381526020017f292e7870617468282f2f2a5b636f6e7461696e732840636c6173732c2027747781526020017f6565742d7465787427295d2f746578742829290000000000000000000000000081525099508a985060058054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561077e5780601f106107535761010080835404028352916020019161077e565b820191906000526020600020905b81548152906001019060200180831161076157829003601f168201915b505050505097508b96508995508551875189518b510101016040518059106107a35750595b9080825280601f01601f1916602001820160405250945084935060009250600091505b88518210156108795788828151811015156107dd57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f010000000000000000000000000000000000000000000000000000000000000002848480600101955081518110151561083c57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535081806001019250506107c6565b600091505b875182101561093157878281518110151561089557fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f01000000000000000000000000000000000000000000000000000000000000000284848060010195508151811015156108f457fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350818060010192505061087e565b600091505b86518210156109e957868281518110151561094d57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f01000000000000000000000000000000000000000000000000000000000000000284848060010195508151811015156109ac57fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053508180600101925050610936565b600091505b8551821015610aa1578582815181101515610a0557fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000028484806001019550815181101515610a6457fe5b9060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535081806001019250506109ee565b8390503073ffffffffffffffffffffffffffffffffffffffff1631610afa6040805190810160405280600381526020017f55524c000000000000000000000000000000000000000000000000000000000081525061136f565b1115610bb9577f46cb989ef9cef13e930e3b7f286225a086e716a90d63e0b7da85d310a9db0c9a6040518080602001828103825260488152602001807f4f7261636c697a6520717565727920776173206e6f742073656e742e20506c6581526020017f6173652061646420736f6d652045544820746f20636f7665722074686520717581526020017f657279206665652e00000000000000000000000000000000000000000000000081525060600191505060405180910390a1610c88565b7f46cb989ef9cef13e930e3b7f286225a086e716a90d63e0b7da85d310a9db0c9a6040518080602001828103825260278152602001807f4f7261636c697a652071756572792073656e742e20506c65617365207374616e81526020017f64206279202e2e0000000000000000000000000000000000000000000000000081525060400191505060405180910390a1610c866040805190810160405280600381526020017f55524c0000000000000000000000000000000000000000000000000000000000815250826116f7565b505b505050505050505050505050565b6000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480610d0657506000610d046000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611c39565b145b15610d1757610d156000611c44565b505b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338cc48316000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515610da457600080fd5b6102c65a03f11515610db557600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610efe576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338cc48316000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515610ea257600080fd5b6102c65a03f11515610eb357600080fd5b50505060405180519050600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c281d19e6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1515610f8c57600080fd5b6102c65a03f11515610f9d57600080fd5b50505060405180519050905090565b610fb46122a8565b600060208301905060408051908101604052808451815260200182815250915050919050565b610fe26122a8565b610fed8383836120d5565b5092915050565b610ffc612294565b611004612294565b600083600001516040518059106110185750595b9080825280601f01601f191660200182016040525091506020820190506110488185602001518660000151612173565b8192505050919050565b600061105c6122c2565b60008060008086945060009350600290505b602a8110156113625761010084029350848181518110151561108c57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027f010000000000000000000000000000000000000000000000000000000000000090049250846001820181518110151561110d57fe5b9060200101517f010000000000000000000000000000000000000000000000000000000000000090047f0100000000000000000000000000000000000000000000000000000000000000027f01000000000000000000000000000000000000000000000000000000000000009004915060618373ffffffffffffffffffffffffffffffffffffffff16101580156111bb575060668373ffffffffffffffffffffffffffffffffffffffff1611155b156111cb57605783039250611265565b60418373ffffffffffffffffffffffffffffffffffffffff1610158015611209575060468373ffffffffffffffffffffffffffffffffffffffff1611155b1561121957603783039250611264565b60308373ffffffffffffffffffffffffffffffffffffffff1610158015611257575060398373ffffffffffffffffffffffffffffffffffffffff1611155b15611263576030830392505b5b5b60618273ffffffffffffffffffffffffffffffffffffffff16101580156112a3575060668273ffffffffffffffffffffffffffffffffffffffff1611155b156112b35760578203915061134d565b60418273ffffffffffffffffffffffffffffffffffffffff16101580156112f1575060468273ffffffffffffffffffffffffffffffffffffffff1611155b156113015760378203915061134c565b60308273ffffffffffffffffffffffffffffffffffffffff161015801561133f575060398273ffffffffffffffffffffffffffffffffffffffff1611155b1561134b576030820391505b5b5b8160108402018401935060028101905061106e565b8395505050505050919050565b6000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614806113df575060006113dd6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611c39565b145b156113f0576113ee6000611c44565b505b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338cc48316000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561147d57600080fd5b6102c65a03f1151561148e57600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156115d7576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338cc48316000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561157b57600080fd5b6102c65a03f1151561158c57600080fd5b50505060405180519050600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663524f3889836000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561168a57808201518184015260208101905061166f565b50505050905090810190601f1680156116b75780820380516001836020036101000a031916815260200191505b5092505050602060405180830381600087803b15156116d557600080fd5b6102c65a03f115156116e657600080fd5b505050604051805190509050919050565b60008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480611769575060006117676000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16611c39565b145b1561177a576117786000611c44565b505b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338cc48316000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561180757600080fd5b6102c65a03f1151561181857600080fd5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611961576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338cc48316000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561190557600080fd5b6102c65a03f1151561191657600080fd5b50505060405180519050600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663524f3889856000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611a145780820151818401526020810190506119f9565b50505050905090810190601f168015611a415780820380516001836020036101000a031916815260200191505b5092505050602060405180830381600087803b1515611a5f57600080fd5b6102c65a03f11515611a7057600080fd5b50505060405180519050905062030d403a02670de0b6b3a764000001811115611a9f5760006001029150611c32565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663adf59f9982600087876000604051602001526040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808481526020018060200180602001838103835285818151815260200191508051906020019080838360005b83811015611b60578082015181840152602081019050611b45565b50505050905090810190601f168015611b8d5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b83811015611bc6578082015181840152602081019050611bab565b50505050905090810190601f168015611bf35780820380516001836020036101000a031916815260200191505b50955050505050506020604051808303818588803b1515611c1357600080fd5b6125ee5a03f11515611c2457600080fd5b505050506040518051905091505b5092915050565b6000813b9050919050565b600080611c64731d3b2638a7cc9f2cb3d298a3da7a90b67e5506ed611c39565b1115611d0557731d3b2638a7cc9f2cb3d298a3da7a90b67e5506ed6000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611cfc6040805190810160405280600b81526020017f6574685f6d61696e6e65740000000000000000000000000000000000000000008152506121be565b600190506120d0565b6000611d2473c03a2615d5efaf5f49f60b7bb6583eaec212fdf1611c39565b1115611dc55773c03a2615d5efaf5f49f60b7bb6583eaec212fdf16000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611dbc6040805190810160405280600c81526020017f6574685f726f707374656e3300000000000000000000000000000000000000008152506121be565b600190506120d0565b6000611de473b7a07bcf2ba2f2703b24c0691b5278999c59ac7e611c39565b1115611e855773b7a07bcf2ba2f2703b24c0691b5278999c59ac7e6000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611e7c6040805190810160405280600981526020017f6574685f6b6f76616e00000000000000000000000000000000000000000000008152506121be565b600190506120d0565b6000611ea473146500cfd35b22e4a392fe0adc06de1a1368ed48611c39565b1115611f455773146500cfd35b22e4a392fe0adc06de1a1368ed486000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611f3c6040805190810160405280600b81526020017f6574685f72696e6b6562790000000000000000000000000000000000000000008152506121be565b600190506120d0565b6000611f64736f485c8bf6fc43ea212e93bbf8ce046c7f1cb475611c39565b1115611fc757736f485c8bf6fc43ea212e93bbf8ce046c7f1cb4756000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600190506120d0565b6000611fe67320e12a1f859b3feae5fb2a0a32c18f5a65555bbf611c39565b1115612049577320e12a1f859b3feae5fb2a0a32c18f5a65555bbf6000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600190506120d0565b60006120687351efaf4c8b3c9afbd5ab9f4bbc82784ab6ef8faa611c39565b11156120cb577351efaf4c8b3c9afbd5ab9f4bbc82784ab6ef8faa6000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600190506120d0565b600090505b919050565b6120dd6122a8565b60006120fb85600001518660200151866000015187602001516121d8565b9050846020015183602001818152505084602001518103836000018181525050846000015185602001510181141561213d576000856000018181525050612168565b8360000151836000015101856000018181510391508181525050836000015181018560200181815250505b829150509392505050565b60005b60208210151561219b5782518452602084019350602083019250602082039150612176565b6001826020036101000a0390508019835116818551168181178652505050505050565b80600290805190602001906121d49291906122d6565b5050565b60008060008060008887111515612282576020871115156122395760018760200360080260020a031980875116888b038a018a96505b81838851161461222e5760018701965080600188031061220e578b8b0196505b505050839450612288565b8686209150879350600092505b8689038311151561228157868420905080600019168260001916141561226e57839450612288565b6001840193508280600101935050612246565b5b88880194505b50505050949350505050565b602060405190810160405280600081525090565b604080519081016040528060008152602001600081525090565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061231757805160ff1916838001178555612345565b82800160010185558215612345579182015b82811115612344578251825591602001919060010190612329565b5b5090506123529190612356565b5090565b61237891905b8082111561237457600081600090555060010161235c565b5090565b905600a165627a7a723058206869555b1256cd6524aa156464213a207a4b1a976d3a4d3b80bef8c8e2641f2e0029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
```

## Running the tests

Automated tests forthcoming.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Built With

* [Truffle](http://truffleframework.com/) - Truffle framework 
* [Metamask](https://metamask.io/) - Metamask
* [My Ether Wallet](https://www.myetherwallet.com/)
* [Oraclize Remix](http://dapps.oraclize.it/browser-solidity/#gist=9817193e5b05206847ed1fcd1d16bd1d&version=soljson-v0.4.19+commit.c4cbbb05.js)
