import { expect } from "chai";
import { ethers } from "hardhat";
import { PVMERC20Votes } from "../typechain-types/contracts/PVMERC20Votes";
import { Signer } from "ethers";

describe("PVMERC20Votes", function () {
    let token: PVMERC20Votes;
    let owner: Signer;
    let wallet1: Signer;
    let wallet2: Signer;

    const name = "TestToken";
    const symbol = "TST";
    const initialSupply = ethers.parseEther("10000");
    const name2 = "TestToken"; // EIP712 domain name
    const version = "1.0.0"; // EIP712 version

    before(async function () {
        [owner, wallet1] = await ethers.getSigners();
        wallet2 = ethers.Wallet.createRandom(ethers.getDefaultProvider());

        const ERC20VotesFactory = await ethers.getContractFactory("PVMERC20Votes");
        token = await ERC20VotesFactory.deploy(name, symbol, initialSupply, name2, version);
        await token.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the correct name and symbol", async function () {
            expect(await token.name()).to.equal(name);
            expect(await token.symbol()).to.equal(symbol);
        });

        it("Should assign the total supply to the owner", async function () {
            const ownerBalance = await token.balanceOf(await owner.getAddress());
            expect(await token.totalSupply()).to.equal(ownerBalance);
            expect(ownerBalance).to.equal(initialSupply);
        });
    });
}); 