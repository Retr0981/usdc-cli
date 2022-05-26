const ethers = require("ethers");
const provider = require("../utils/provider");
const wallet = require("../utils/wallet");
const { address, abi } = require("../utils/config");

const main = async () => {
  const account = wallet.connect(provider);
  const usdc = new ethers.Contract(address, abi, account);

  const usdcBalance = await usdc.balanceOf(account.address);
  try {
    console.log(`USDC Balance: ${ethers.utils.formatUnits(usdcBalance, 6)}`);
  } catch (e) {
    console.log(e);
  }
};
main();
