// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import 'hardhat/console.sol';

contract SongRecoPortal {
    uint256 totalRecos;
    uint256 private seed;

    event NewReco(address indexed from, uint256 timestamp, string songReco);

    struct Reco {
        address sender;
        string songReco;
        uint256 timestamp;
    }

    Reco[] recos;

    mapping(address => uint256) public lastRecoSender;

    constructor() payable {
        seed = (block.timestamp + block.difficulty) % 100;
    }
    
    function recommend(string memory _songReco) public {
        require(lastRecoSender[msg.sender] + 30 seconds < block.timestamp, 'Must wait 30 seconds before waving again.');
        lastRecoSender[msg.sender] = block.timestamp;

        totalRecos += 1;
        console.log('Reco sender: %s', msg.sender);

        recos.push(Reco(msg.sender, _songReco, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log('Random # generated: %d', seed);

        if (seed <= 50) {
            console.log('%s won!', msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contract has.");
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewReco(msg.sender, block.timestamp, _songReco);
    }

    function getAllRecos() public view returns (Reco[] memory) {
        return recos;
    }

    function getTotalRecos() public view returns (uint256) {
        console.log('total recos: %d', totalRecos);
        return totalRecos;
    }
}