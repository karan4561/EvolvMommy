const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  console.log("The owner of the contract is: ", (deployer.address));
  const NAME = "ETH Daddy"
  const SYMBOL = "ETHD"

  // Deploy contract
  const ETHDaddy = await ethers.getContractFactory("ETHDaddy")
  const ethDaddy = await ETHDaddy.deploy(NAME, SYMBOL)
  await ethDaddy.deployed();

  console.log(`Deployed Domain Contract at: ${ethDaddy.address}\n`)

  // List 6 domains
  const names = ["AAA.evolv.art", "nike.evolv.art", "3up.evolv.art", "cobalt.evolv.art", "oxygen.evolv.art", "carbon.evolv.art"]
  const costs = [tokens(10), tokens(25), tokens(15), tokens(2.5), tokens(3), tokens(1)]

  for (var i = 0; i < 6; i++) {
    const transaction = await ethDaddy.connect(deployer).list(names[i], costs[i])
    await transaction.wait()

    console.log(`Listed Domain ${i + 1}: ${names[i]}`)
  }

  //console.log("/n The owner of the contract is:", {ethDaddy.owner()});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});