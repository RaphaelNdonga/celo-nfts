const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Trader testing suite: ", function () {
    this.timeout(50000);
    let NFTTraderFactory;
    let NFTTrader;
    let myNFTFactory;
    let myNFT;
    let deployer;

    this.beforeEach(async function () {
        NFTTraderFactory = await hre.ethers.getContractFactory("NFTTrader");
        [deployer] = await hre.ethers.getSigners();
        NFTTrader = await NFTTraderFactory.deploy();
        NFTTrader.deployed();
        myNFTFactory = await hre.ethers.getContractFactory("MyNFT");
        myNFT = await myNFTFactory.deploy();
        await myNFT.deployed();
        await myNFT.safeMint(deployer.address, "https://google.com");
    });

    it("Should receive an NFT", async () => {
        let txn = await myNFT.transferFrom(deployer.address, NFTTrader.address, 0);
        await txn.wait();
        let nftOwner = await myNFT.ownerOf(0)
        expect(nftOwner).to.equal(NFTTrader.address);
    });
})