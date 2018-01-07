var TweetWallet = artifacts.require("TweetWallet");
var TweetWalletParent = artifacts.require("TweetWalletParent");

module.exports = function(deployer) {
  deployer.deploy(TweetWallet);
  deployer.deploy(TweetWalletParent);
};