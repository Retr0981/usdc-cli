const ethers = require("ethers");

const mnemonic =
  "luxury put word hurdle acid senior city avoid december leisure note awesome";
const wallet = ethers.Wallet.fromMnemonic(mnemonic);

console.log(`Mnemonic: ${wallet.mnemonic.phrase}`);
console.log(`Address: ${wallet.address}`);
module.exports = wallet;
