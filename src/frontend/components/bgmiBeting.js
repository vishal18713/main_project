import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from "../contractsData/BET.json";

const BetContract = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [team1Name, setTeam1Name] = useState('');
    const [team2Name, setTeam2Name] = useState('');
    const [minBetAmount, setMinBetAmount] = useState(0);
    const [betAmount, setBetAmount] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');
    const [owner, setOwner] = useState('');

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const _provider = new ethers.providers.Web3Provider(window.ethereum);
                const _signer = _provider.getSigner();
                const contractAddress = "0x8a144188972F2C4F7C3E1E5C5529E53d31cF52E7";
                const contractABI = abi.abi;
                const _contract = new ethers.Contract(contractAddress, contractABI, _signer);

                setProvider(_provider);
                setSigner(_signer);
                setContract(_contract);

                const _owner = await _contract.owner();
                setOwner(_owner);

                const _team1Name = await _contract.team1_name();
                setTeam1Name(_team1Name);

                const _team2Name = await _contract.team2_name();
                setTeam2Name(_team2Name);

                const _minBetAmount = await _contract.min_bet_amt();
                setMinBetAmount(ethers.utils.formatEther(_minBetAmount));
            } else {
                alert('Please install MetaMask');
            }
        };
        init();
    }, []);

    const handleBet = async () => {
        if (!selectedTeam || !betAmount) {
            alert("Please select a team and enter an amount");
            return;
        }
        try {
            const tx = await contract.put_bet(selectedTeam, {
                value: ethers.utils.parseEther(betAmount)
            });
            await tx.wait();
            alert('Bet placed successfully!');
        } catch (err) {
            console.error('Error placing bet:', err);
        }
    };

    const handleSetTeamNames = async () => {
        if (owner !== await signer.getAddress()) {
            alert('Only the owner can set team names.');
            return;
        }
        try {
            const tx = await contract.setTeamNames(team1Name, team2Name);
            await tx.wait();
            alert('Team names set successfully!');
        } catch (err) {
            console.error('Error setting team names:', err);
        }
    };

    const handleCloseBetting = async (result) => {
        try {
            const tx = await contract.close_betting(result);
            await tx.wait();
            alert('Betting closed successfully!');
        } catch (err) {
            console.error('Error closing betting:', err);
        }
    };

    const handleDeclareResults = async () => {
        try {
            const tx = await contract.declare_results();
            await tx.wait();
            alert('Results declared and winners paid!');
        } catch (err) {
            console.error('Error declaring results:', err);
        }
    };

    return (
        <div>
            <h1>Bet Contract</h1>

            <h2>Set Team Names</h2>
            <input
                type="text"
                placeholder="Team 1 Name"
                value={team1Name}
                onChange={(e) => setTeam1Name(e.target.value)}
            />
            <input
                type="text"
                placeholder="Team 2 Name"
                value={team2Name}
                onChange={(e) => setTeam2Name(e.target.value)}
            />
            <button onClick={handleSetTeamNames}>Set Team Names</button>

            <h2>Place a Bet</h2>
            <p>Minimum Bet Amount: {minBetAmount} ETH</p>
            <input
                type="number"
                placeholder="Bet Amount in ETH"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
            />
            <select onChange={(e) => setSelectedTeam(e.target.value)} value={selectedTeam}>
                <option value="">Select a Team</option>
                <option value="1">{team1Name}</option>
                <option value="2">{team2Name}</option>
            </select>
            <button onClick={handleBet}>Place Bet</button>

            <h2>Close Betting</h2>
            <button onClick={() => handleCloseBetting(1)}>Close Betting with {team1Name} as Winner</button>
            <button onClick={() => handleCloseBetting(2)}>Close Betting with {team2Name} as Winner</button>

            <h2>Declare Results</h2>
            <button onClick={handleDeclareResults}>Declare Results and Pay Winners</button>
        </div>
    );
};

export default BetContract;