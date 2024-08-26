import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import abi from "../contractsData/MyNFTCollection.json";
import address from "../contractsData/MyNFTCollection-address.json";

const CreateSong = () => {
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState("");
  const [tokenSupply, setTokenSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [_uri, setUri] = useState("");
  const [totalFractionalAmount, setTotalFractionalAmount] = useState(0);
  const [_tokenId, setTokenId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [contractBalance, setContractBalance] = useState("0"); // Add state for contract balance

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = address.address;
        const contractABI = abi.abi;
        const contractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(contractInstance);
      } else {
        alert("MetaMask not detected. Please install MetaMask.");
      }
    };

    init();
  }, []);

  const contractOwner = async () => {
    if (contract) {
      try {
        const owner = await contract.contractOwner();
        setOwner(owner);
        console.log(owner);
      } catch (error) {
        console.error("Error fetching contract owner:", error);
      }
    }
  };

  const _tokenSupply = async () => {
    if (contract) {
      try {
        const supply = await contract.tokenSupply(_tokenId);
        setTokenSupply(supply);
        console.log(supply);
      } catch (error) {
        console.error("Error fetching token supply:", error);
      }
    }
  };

  const _countOfTotalSupply = async () => {
    if (contract) {
      try {
        const supply = await contract.countoftotalsupply(_tokenId);
        setTotalSupply(supply);
        console.log(supply);
      } catch (error) {
        console.error("Error fetching token supply:", error);
      }
    }
  };

  const _mint = async () => {
    if (contract) {
      try {
        const tx = await contract.mintNFT(
          ethers.BigNumber.from(totalSupply),
          _uri,
          ethers.BigNumber.from(totalFractionalAmount)
        );
        await tx.wait();
        setTotalSupply(totalSupply);
        setTokenSupply(totalSupply);

        console.log("Minted successfully");
      } catch (error) {
        console.error("Error minting token:", error);
      }
    }
  };

  const _totalFractionalAmount = async () => {
    if (contract) {
      try {
        const FractionalAmount = await contract.totalFractionalAmount(_tokenId);
        console.log(FractionalAmount.toString());
        setTotalFractionalAmount(FractionalAmount);
      } catch (error) {
        console.error("Error fetching token supply:", error);
      }
    }
  };

  const _buyStake = async () => {
    if (contract) {
      try {
        console.log("totalSupply:", totalSupply);
        console.log("totalFractionalAmount:", totalFractionalAmount.toString());
        if (totalSupply === 0) {
          throw new Error("Total supply cannot be zero");
        }
        const amount = totalFractionalAmount.div(totalSupply);
        const tx = await contract.buyStake(_tokenId, {
          value: ethers.utils.parseEther(amount.toString()),
        });
        await tx.wait();
        console.log("Bought stake successfully");
      } catch (error) {
        console.error("Error buying stake:", error);
      }
    }
  };

  const _addFundsToNFT = async () => {
    if (contract) {
      try {
        console.log("totalSupply:", totalSupply);
        console.log("totalFractionalAmount:", totalFractionalAmount.toString());
        const tx = await contract.addFundsToNFT(_tokenId, {
          value: ethers.utils.parseEther(amount.toString()),
        });
        await tx.wait();
        console.log("Added funds to NFT successfully");
        setContractBalance(contractBalance + amount*1000000);
      } catch (error) {
        console.error("Error adding funds to NFT:", error);
      }
    }
  };

  const _distributeRevenue = async () => {
    if (contract) {
      try {
        const tx = await contract.distributeRevenue(_tokenId);
        await tx.wait();
        console.log("Distributed revenue successfully");
      } catch (error) {
        console.error("Error distributing revenue:", error);
      }
    }
  };

  const getContractBalance = async () => {
    if (contract) {
      try {
        const balance = await contract.provider.getBalance(contract.address);
        setContractBalance(ethers.utils.formatEther(balance));
        console.log("Contract balance:", ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Error fetching contract balance:", error);
      }
    }
  };

  return (
    <div>
      <h1>Create Song</h1>
      <button onClick={contractOwner}>Get Contract Owner</button>
      {owner && <p>Contract Owner: {owner}</p>}
      <div>
        <input
          type="number"
          value={_tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="tokenId"
        />
        <button onClick={_tokenSupply}>get tokenSupply</button>
        <p>tokenSupply: {tokenSupply.toString()}</p>
      </div>
      <div>
        <input
          type="number"
          value={_tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="tokenId"
        />
        <button onClick={_countOfTotalSupply}>get totalSupply</button>
        <p>counttokenSupply: {totalSupply.toString()}</p>
      </div>
      <div>
        <div>
          <input
            type="number"
            value={totalSupply}
            onChange={(e) => setTotalSupply(e.target.value)}
            placeholder="totalSupply"
          />
          <input
            type="number"
            value={totalFractionalAmount}
            onChange={(e) => setTotalFractionalAmount(e.target.value)}
            placeholder="totalFractionalAmount"
          />
          <input
            type="text"
            value={_uri}
            onChange={(e) => setUri(e.target.value)}
            placeholder="uri"
          />
          <button onClick={_mint}>mint</button>
        </div>
        <div>
          <input
            type="number"
            value={_tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="tokenId"
          />
          <button onClick={_totalFractionalAmount}>
            totalFractionalAmount
          </button>
          <p>totalFractionalAmount: {totalFractionalAmount.toString()}</p>
        </div>
        <div>
          <input
            type="number"
            value={_tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="tokenId"
          />
          <button onClick={_buyStake}>buyStake</button>
        </div>
        <div>
          <input
            type="number"
            value={_tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="tokenId"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="amount"
          />
          <button onClick={_addFundsToNFT}>addFundsToNFT</button>
        </div>
        <div>
          <input
            type="number"
            value={_tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="tokenId"
          />
          <button onClick={_distributeRevenue}>distributeRevenue</button>
        </div>
        <div>
          <button onClick={getContractBalance}>Get Contract Balance</button>
          <p>Contract Balance: {contractBalance} ETH</p>
        </div>
      </div>
    </div>
  );
};

export default CreateSong;