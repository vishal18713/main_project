const { ethers } = require("hardhat");
const { JsonRpcProvider } = require("@ethersproject/providers");

async function main() {
    const provider = new JsonRpcProvider("http://localhost:8545");

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);
    
    const baseURI = "https://apricot-adorable-buzzard-685.mypinata.cloud/ipfs/QmafYVRMa9aWj2QZACYeUfbDXttryS5SydazdijXcNVfms/";
    const MyNFTCollectionFactory = await ethers.getContractFactory("MyNFTCollection");
    const MyNFTCollection = await MyNFTCollectionFactory.deploy(baseURI);
    await MyNFTCollection.deployed();
    
    console.log("Contract deployed at address:", MyNFTCollection.address);
    saveFrontendFiles(MyNFTCollection , "MyNFTCollection");

    const betamount = ethers.utils.parseEther("0.1");
    const BGMI = await ethers.getContractFactory("BET");
    const BET = await BGMI.deploy(betamount);
    await BET.deployed();

    console.log("Contract deployed at address:", BET.address);
    saveFrontendFiles(BET, "BET");

    const MinesBetAmount = ethers.utils.parseEther("0.1");
    const Mines = await ethers.getContractFactory("Mines");
    const MINES = await Mines.deploy(MinesBetAmount);
    await MINES.deployed();

    console.log("Contract deployed at address:", MINES.address);
    saveFrontendFiles(MINES, "Mines");

    const initialEntryfee = ethers.utils.parseEther("0.1");
    const Lottery = await ethers.getContractFactory("SimpleLottery");
    const SimpleLottery = await Lottery.deploy(initialEntryfee);
    await SimpleLottery.deployed();
  
    console.log("Lottery contract deployed at address:", SimpleLottery.address);
    saveFrontendFiles(SimpleLottery, "SimpleLottery");

}

function saveFrontendFiles(contract, name) {
    const fs = require("fs");
    const contractsDir = __dirname + "/../../frontend/contractsData";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir,{ recursive: true });
    }
  
    fs.writeFileSync(
      contractsDir + `/${name}-address.json`,
      JSON.stringify({ address: contract.address }, undefined, 2)
    );
  
    const contractArtifact = artifacts.readArtifactSync(name);
  
    fs.writeFileSync(
      contractsDir + `/${name}.json`,
      JSON.stringify(contractArtifact, null, 2)
    );
  }

main().catch((error) => {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
});

