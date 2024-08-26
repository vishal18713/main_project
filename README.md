# Web3 DApp Project

This project includes four decentralized applications (DApps) built on the Ethereum blockchain, deployed on the Sepolia testnet. Each DApp serves a different purpose, ranging from music tokenization to gaming and lottery. The main focus of this project is the **Music Tokenization** contract using ERC-1155.

## Table of Contents
- [Music Tokenization](#music-tokenization)
- [BGMI Betting Contract](#bgmi-betting-contract)
- [Mines Contract](#mines-contract)
- [Lottery Contract](#lottery-contract)
- [Deployment and Interaction](#deployment-and-interaction)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)

## Music Tokenization

The Music Tokenization contract leverages the ERC-1155 standard to mint multiple NFTs with the same ID, representing ownership stakes in an upcoming song. Here's how it works:

1. **Minting NFTs**: The artist mints a set of NFTs with the same ID, each representing a fraction of the song’s revenue.
2. **Buying Stakes**: Fans and investors can buy these NFTs by staking ETH.
3. **Revenue Distribution**: Once the song is released, the contract owner (typically the artist) funds the NFTs with the generated revenue.
4. **NFT Destruction**: After revenue funding, the NFTs are destroyed, and each stakeholder receives their proportional share of the revenue.

This contract creates a unique opportunity for fans and investors to participate in an artist’s success.

## BGMI Betting Contract

The BGMI Betting Contract allows users to place bets on BGMI (Battle Grounds Mobile India) matches. Users can bet on various outcomes, and the contract handles the betting logic, including distributing winnings based on the outcome.

## Mines Contract

Inspired by the Stake platform, the Mines Contract is a gambling game where users place bets and uncover gems. The rewards depend on the number of gems uncovered, and players can claim their rewards at any time. The contract is managed by a single manager who can fund the contract and manage the betting process.

## Lottery Contract

The Lottery Contract is a simple lottery system where users can buy tickets to participate in a draw. The contract randomly selects a winner from the pool of participants, and the winner receives the accumulated prize pool.

## Deployment and Interaction

All contracts are deployed on the Sepolia testnet using Hardhat. We use Ether.js to interact with the smart contracts. Below are the addresses of the deployed contracts:

- **Music Tokenization**: `0x1494E0a53844102E8Ebe7cAfDa756c6bDBc55E31`
- **BGMI Betting**: `0x8a144188972F2C4F7C3E1E5C5529E53d31cF52E7`
- **Mines**: `0x1494E0a53844102E8Ebe7cAfDa756c6bDBc55E31`
- **Lottery**: `0xa1A36799effd6bdb848D78E3c98Fc628af06f9e4`

## Tech Stack

- **Solidity**: Smart contract development.
- **Hardhat**: Ethereum development environment.
- **Ether.js**: JavaScript library for interacting with the Ethereum blockchain.
- **Sepolia Testnet**: Ethereum test network for deployment.

## Setup and Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
