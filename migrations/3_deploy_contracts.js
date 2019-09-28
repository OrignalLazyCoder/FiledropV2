var IPFS = artifacts.require("./IPFS.sol");

module.exports = function(deployer) {
  deployer.deploy(IPFS);
};
