import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../contractsData/Mines.json'; 

const Mines = ({ contractAddress }) => {
  const [grid, setGrid] = useState([]);
  const [size, setSize] = useState(5);
  const [gameOver, setGameOver] = useState(false);
  const [gems, setGems] = useState(0); 

  useEffect(() => {
    const initialGrid = generateGrid(size, size);
    setGrid(initialGrid);
  }, [size]);

  const handleCardClick = (index) => {
    if (gameOver || grid[index].revealed) return;

    const newGrid = [...grid];
    newGrid[index].revealed = true;

    if (newGrid[index].mine) {
      setGameOver(true);
      setGems(0); 
    } else {
      setGems(gems + 1);
    }

    setGrid(newGrid);
  };

  const handleCheckOut = async () => {
    if (gameOver) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = '0x1494E0a53844102E8Ebe7cAfDa756c6bDBc55E31';
        const contractABI = abi.abi;
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract.updateGems(gems); 
        await tx.wait();

        document.getElementById('result').innerText = 'Gems updated successfully!';
      } catch (error) {
        console.error('Error updating gems:', error);
        document.getElementById('result').innerText = 'Error updating gems.';
      }
    }
  };

  return (
    <div>
      <h1>Mine Game</h1>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 100px)` }}>
        {grid.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            style={{
              width: '100px',
              height: '100px',
              border: '1px solid black',
              backgroundColor: card.revealed ? (card.mine ? 'red' : 'green') : 'gray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: gameOver || card.revealed ? 'not-allowed' : 'pointer',
            }}
          >
            {card.revealed ? (card.mine ? 'boom' : '') : ''}
          </div>
        ))}
      </div>
      <button onClick={handleCheckOut} style={{ marginTop: '20px' }}>Check Out</button>
      <div id='result'></div>
    </div>
  );
};

// Define the generateGrid function
const generateGrid = (rows, cols) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid.push({ mine: Math.random() > 0.8, revealed: false }); // 20% chance of mine
    }
  }
  return grid;
};

export default Mines;