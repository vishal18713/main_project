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

