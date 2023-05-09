const { ethers } = require("hardhat");

const main = async () => {
  //const [owner, randomPerson] = await ethers.getSigners();
  const domainContractFactory = await ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("fdairy");
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  //console.log("Contract deployed by:", owner.address);
  let txn = await domainContract.register("Rahul", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain Rahul.fdairy");

  txn = await domainContract.setRecord("Rahul", "CTO of fdairy");
  await txn.wait();
  console.log("Set record for Rahul.fdairy");
  const address = await domainContract.getAddress("Rahul");
  console.log("Owner of domain Rahul:", address);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
