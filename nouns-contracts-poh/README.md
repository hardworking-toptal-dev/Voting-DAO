# @nouns/contracts

## Background

Nouns are an experimental attempt to improve the formation of on-chain avatar communities. While projects such as CryptoPunks have attempted to bootstrap digital community and identity,  Nouns attempt to bootstrap identity, community, governance and a treasury that can be used by the community for the creation of long-term value.

## Changes to Nouns

The changes to the contracts include adding ProofOfHumanityProxy contract. The interface should be enough, or it can also be moved from the ProofOfHumanityProxy.sol to the NounsDAOInterfaces.sol file. Feel free to recommend some changes.
The NounsDAOLogic contract know calls the .isregistered function, if the proposal creator selected to use proof of humanity.
There are 2 new parameters added:
1. unit256 poh -> should proof of humanity be used? (made this an int to allow different poh systems in the future)
2. ProofOfHumanityProxy -> contract of the Proof of humanity registery. (https://github.com/Proof-Of-Humanity/Proof-Of-Humanity)

### Install dependencies

```sh
yarn
```

### Compile typescript, contracts, and generate typechain wrappers

```sh
yarn build
```

### Run tests

```sh
yarn test
```

### Install forge dependencies

```sh
forge install
```

### Run forge tests

```sh
forge test -vvv
```

### Environment Setup

Copy `.env.example` to `.env` and fill in fields

### Commands

```sh
# Compile Solidity
yarn build:sol

# Command Help
yarn task:[task-name] --help

# Deploy & Configure for Local Development (Hardhat)
yarn task:run-local

# Deploy & Configure (Testnet/Mainnet)
# This task deploys and verifies the contracts, populates the descriptor, and transfers contract ownership.
# For parameter and flag information, run `yarn task:deploy-and-configure --help`.
yarn task:deploy-and-configure --network [network] --update-configs
```

### Automated Testnet Deployments

The contracts are deployed to Rinkeby on each push to master and each PR using the account `0x387d301d92AE0a87fD450975e8Aef66b72fBD718`. This account's mnemonic is stored in GitHub Actions as a secret and is injected as the environment variable `MNEMONIC`. This mnemonic _shouldn't be considered safe for mainnet use_.
