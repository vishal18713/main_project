import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CreateSong } from "./createSong";
import { useNavigate } from "react-router-dom";
import { BgmiBeting } from "./bgmiBeting";
import { Mines } from "./Mines";
import {Lottery} from "./Lottery";

function App() {
  const [account, setAccount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have MetaMask installed!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateSongClick = () => {
    navigate("/create-song");
    
  };

  const handleBgmiBetingClick = () => {
    navigate("/bgmi-beting");
  };

  const handleMinesClick = () => {
    navigate("/Mines");
  }

  const handleLotteryClick = () => {
    navigate("/lottery");
  }

  return (
    <div>
      <h1>Connect to MetaMask</h1>
      {account ? (
        <p>Connected Account: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      <button onClick={handleCreateSongClick}>Create Song</button>
      <button onClick={handleBgmiBetingClick}>BGMI Beting</button>
      <button onClick={handleMinesClick}>Mines</button>
      <button onClick={handleLotteryClick}>Lottery</button>
    </div>
  );
}

export default App;
