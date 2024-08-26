import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../contractsData/SimpleLottery.json';

function Lottery() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [newEntryFee, setNewEntryFee] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const [players, setPlayers] = useState([]);
  const contractABI = abi.abi;
  const contractAddress = '0xa1A36799effd6bdb848D78E3c98Fc628af06f9e4';

  useEffect(() => {
    if (contract && account) {
      checkIfManager();
      getEntryFee();
    }
  }, [contract, account]);

  const checkIfManager = async () => {
    try {
      const manager = await contract.manager();
      setIsManager(manager.toLowerCase() === account.toLowerCase());
    } catch (error) {
      console.error('Error checking manager:', error);
    }
  };

  const pickWinner = async () => {
    if (contract) {
      try {
        const tx = await contract.pickWinner({ from: account });
        await tx.wait();
        console.log('Winner picked successfully');
      } catch (error) {
        console.error('Error picking winner:', error);
      }
    }
  }

  const enter = async () => {
    if (contract && newEntryFee) {
      try {
        const feeInWei = ethers.utils.parseEther(newEntryFee);
        const tx = await contract.enter({ from: account, value: feeInWei });
        await tx.wait();
        console.log('Entered the lottery successfully');
      } catch (error) {
        if (error.code === 4001) {
          console.error('Transaction denied by user');
          alert('Transaction was denied. Please try again.');
        } else {
          console.error('Error entering the lottery:', error);
        }
      }
    }
  };

  const getManager = async () => {
    if (contract) {
      try {
        const manager = await contract.manager();
        console.log('Manager:', manager);
      } catch (error) {
        console.error('Error getting manager:', error);
      }
    }
  };

  const getEntryFee = async () => {
    if (contract) {
      try {
        const fee = await contract.entryFee();
        setNewEntryFee(ethers.utils.formatEther(fee));
        console.log('Entry fee:', fee.toString());
      } catch (error) {
        console.error('Error getting entry fee:', error);
      }
    }
  };

  const setEntryFee = async () => {
    if (contract && newEntryFee) {
      try {
        const feeInWei = ethers.utils.parseEther(newEntryFee);
        const tx = await contract.setEntryFee(feeInWei, { from: account });
        await tx.wait();
        console.log('Entry fee set successfully');
      } catch (error) {
        console.error('Error setting entry fee:', error);
      }
    }
  };

  const getPlayers = async () => {
    if (contract) {
      try {
        const players = await contract.getPlayers();
        setPlayers(players);
        console.log('Players:', players);
      } catch (error) {
        console.error('Error getting players:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const userAccount = await signer.getAddress();
        setAccount(userAccount);
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contractInstance);
      } catch (error) {
        console.error('User denied account access or error occurred:', error);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask.');
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect MetaMask'}
      </button>
      <button onClick={getManager}>Get Manager</button>
      <button onClick={getEntryFee}>Get Entry Fee</button>
      <button onClick={getPlayers}>Get Players</button>
      <div>
        {isManager && (
          <div>
            <input
              type="number"
              value={newEntryFee}
              onChange={(e) => setNewEntryFee(e.target.value)}
              placeholder="New Entry Fee"
            />
            <button onClick={setEntryFee}>
              Set Entry Fee
            </button>
          </div>
        )}
      </div>
      <button onClick={enter}>Enter Lottery</button>
      <div>
        <h3>Players</h3>
        <ol>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ol>
      </div>
      {isManager && (
        <button onClick={pickWinner}>Pick Winner</button>
      )}
    </div>
  );
}

export default Lottery;
