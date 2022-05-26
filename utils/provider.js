const ethers = require("ethers");

//@dev This connects to the ethereum public test network
const provider = ethers.getDefaultProvider("ropsten", {
  infura: "https://ropsten.infura.io/v3/5baf4bd0367645d7b65d819cce0ea26c",
});
module.exports = provider;
