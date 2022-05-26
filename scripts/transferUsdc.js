const ethers = require("ethers");
const provider = require("../utils/provider");
const wallet = require("../utils/wallet");
const { address, abi } = require("../utils/config");

const main = async (args) => {
  const account = wallet.connect(provider);
  const usdc = new ethers.Contract(address, abi, account);

  let recepient, value;
  try {
    recepient = ethers.utils.getAddress(args[0]);
  } catch {
    console.error(`Invalid Address ${args[0]}`);
    process.exit(1);
  }

  try {
    value = ethers.utils.parseUnits(args[1], 6);
    if (value.isNegative()) {
      throw new Error();
    }
  } catch {
    console.error(`Invalid amount${args[1]}`);
    process.exit(1);
  }

  const balance = await usdc.balanceOf(account.address);
  if (balance.lt(value)) {
    const valueFormatted = ethers.utils.formatUnits(value, 6);
    const balanceFormatted = ethers.utils.formatUnits(balance, 6);
    console.error(
      `Insufficient balance to send ${valueFormatted} (you have ${balanceFormatted})`
    );
    process.exit(1);
  }
  const tx = await usdc.transfer(recepient, value, { gasPrice: 20e9 });
  try {
    console.log(`Transaction Hash: ${tx.hash}`);
  } catch (e) {
    console.log(e);
  }
  const receipt = await tx.wait();
  try {
    console.log(
      `Transaction confirmed in block number: ${receipt.blockNumber}`
    );
    console.log(`Gas used: ${receipt.gasUsed.toString()}`);
  } catch (e) {
    console.log(e);
  }
};

main(process.argv.slice(2));
