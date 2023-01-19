const { expect } = require("chai")
//const { inputToConfig } = require("@ethereum-waffle/compiler");
//const { ethers } = require("hardhat");
//const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");


const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("ETHDaddy", () => {
  let ETHDaddy;
  let ethdaddy;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function (){
    ETHDaddy = await ethers.getContractFactory("ETHDaddy");
    [owner, addr1, addr2] = await ethers.getSigners();
    ethdaddy = await ETHDaddy.deploy("Karan","KAS",10);
    const transaction = await ethdaddy.connect(owner).list("ethMommy",212);
    await transaction.wait();
  });

  describe("Check check guys!",function(){
    it("Should have the name", async function(){
        expect(await ethdaddy.name()).to.equal("Karan");
    });

    it("Should have the symbol", async function(){
      expect(await ethdaddy.symbol()).to.equal("KAS");
  });

    it("Should see the owner account",async function(){
      expect(await ethdaddy.owner()).to.equal(owner.address);
    });
  });

  describe("Check the max supply!",function(){
    it("Chal jaaye yaar bas",async function(){
      expect(await ethdaddy.maxSupply()).to.equal(10);
    })
  })

  // describe("list an item",function(){
  //   it("Should be listed", async function(){
  //     // const transaction = await ethdaddy.connect(owner).list("ethMommy",212);
  //     // await transaction.wait();
  //     expect(await ethdaddy.getDomainByToken(0).cost).to.equal(212);
  //   })
  // })
})
