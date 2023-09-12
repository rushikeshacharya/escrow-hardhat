# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Project Layout

There are four top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/server` - contains the back-end application
4. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Back-End

`cd` into the `/server` directory and run `npm install`

To run the back-end application run `npm start` from the `/server` directory. The application will be running on [http://localhost:5000](http://localhost:5000)

## Blockchain Node

To run the blockchain node locally, run `npx hardhat node` command and use the provided address printed on the terminal by hardhat.