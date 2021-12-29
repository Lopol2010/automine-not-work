const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {

    ethers.provider.send("evm_setAutomine", [false]);
    ethers.provider.send("evm_setIntervalMining", [0]);


    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");

    ethers.provider.send("evm_increaseTime", [60]);
    ethers.provider.send("evm_mine");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    ethers.provider.send("evm_increaseTime", [60]);
    ethers.provider.send("evm_mine");
    // wait until the transaction is mined
    await setGreetingTx.wait();

    setGreetingTx1 = await greeter.setGreeting("1Hola, mundo!");
    setGreetingTx2 = await greeter.setGreeting("2Hola, mundo!");
    setGreetingTx3 = await greeter.setGreeting("3Hola, mundo!");

    ethers.provider.send("evm_increaseTime", [60]);
    ethers.provider.send("evm_mine");

    g1 = await setGreetingTx1.wait();
    g2 = await setGreetingTx2.wait();
    g3 = await setGreetingTx3.wait();

    // console.log(setGreetingTx1, setGreetingTx2, setGreetingTx3)
    console.log(g1, g2,g3)

  });
});
