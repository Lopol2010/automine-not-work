const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {

    ethers.provider.send("evm_setAutomine", [false]);
    ethers.provider.send("evm_setIntervalMining", [0]);

    ethers.provider.send("evm_increaseTime", [60]);
    ethers.provider.send("evm_mine");

    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");

    ethers.provider.send("evm_increaseTime", [60]);
    ethers.provider.send("evm_mine");

  });
});
