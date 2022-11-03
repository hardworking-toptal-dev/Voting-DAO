# @nouns/contracts

## Background

Nouns are an experimental attempt to improve the formation of on-chain avatar communities. While projects such as CryptoPunks have attempted to bootstrap digital community and identity,  Nouns attempt to bootstrap identity, community, governance and a treasury that can be used by the community for the creation of long-term value.

One Social Noun is generated and auctioned every day, forever. All Social Noun artwork is stored and rendered on-chain. See more information at [socialnouns.wtf](https://socialnouns.wtf/).
## What is the Open Vote Network?
The Open Vote Network (OV-net) is a 2-round decentralized voting protocol with the following attractive features

* All communication is public - no secret channels between voters are required.
* The system is self-tallying - no tallying authorities are required.
* The voter's privacy protection is maximum - only a full collusion that involves all other voters in the election can uncover the voter's secret vote.
* The system is dispute-free - everybody can check whether all voters act according to the protocol, hence ensuring the the result is publicly verifiable.

A video tutorial on how to deploy and install the Open Vote Network can be found here:
https://youtu.be/5wch2_WhPvg

Our paper was published in Financial Cryptography and Data Security 2017:
http://fc17.ifca.ai/preproceedings/paper_80.pdf

Our third prize submission to the economist cyber security competition: http://www.economist.com/sites/default/files/newcastle.pdf

A description of the voting protocol can be found here: http://homepages.cs.ncl.ac.uk/feng.hao/files/OpenVote_IET.pdf

This program presents an efficient realization of this protocol over the Ethereum network.
How can I pick up this library and go?

Video tutorial: https://youtu.be/5wch2_WhPvg

You need to run 'Geth' in the background:

1. geth <OPTIONAL: --dev/testnet> --rpc --rpcapi="db,eth,net,web3,personal" --rpcport "8545" --rpcaddr "127.0.0.1" --rpccorsdomain "*" console

Example: ./geth --dev --rpc --ipcpath "~/Library/Ethereum/geth.ipc" --rpcapi="db,eth,net,web3,personal" --rpcport "8545" --rpcaddr "127.0.0.1" --rpccorsdomain "*" console
 
2. Compile the .SOL, and send it to the Ethereum Network.

3. Update vote.html, admin.html livetally.html with the correct abi/contract address.

4. Voters open vote.html, and the Election Admin opens admin.html

5. Each voter requires a voter.txt document that contains the following:
 * x - the private key for the voter's voting key,
 * xG - the voter's voting public key,
 * v - the random nonce for a single ZKP,
 * w,r,d - the random nonces for the 1 out of 2 ZKP.
 * All values should be seperated by commas (i.e. ",") in a .txt document.

6. Voters can register and cast their vote.

An example 'voter.txt' has been included, and a Java Program 'votingcodes.jar' is included that can compute these numbers for the voter.

Some photos of the voting system can be found here:

http://homepages.cs.ncl.ac.uk/patrick.mc-corry/openvotenetwork/

## What functions are available?

The voting protocol leverages the following libraries:

ECCMath and Secp256k1: https://github.com/androlo/standard-contracts/blob/master/contracts/src/crypto/Secp256k1.sol
DateTimePicker: http://xdsoft.net/jqplugins/datetimepicker/

We have implemented the following:

### Schnorr non-interactive ZKP:

* Function should ONLY be called locally. NEVER send transaction to network.
 * createZKP(uint x, uint v, uint[2] xG)  
* Send transaction to the network to allow Ethereum to verify
 * verifyZKP(uint[2] xG, uint r, uint[3] vG)

### 1 out of 2 ZKP:

* Function should ONLY be called locally. NEVER send transaction to network.
 * create1outof2ZKPYesVote(uint w, uint r1, uint d1, uint x)
* Function should ONLY be called locally. NEVER send transaction to network.
 * create1outof2ZKPNoVote(uint w, uint r2, uint d2, uint x)
* Send transaction to the network to allow Ethereum to verify.
 * verify1outof2ZKP(uint[4] params, uint[2] y, uint[2] a1, uint[2] b1, uint[2] a2, uint[2] b2)

### Election Functions:

SETUP

* White list a set of addresses. Only Election Admin can call.
 * setEligible(address[] addr)
* Set question and period of time for voters to sign up. Transition from SETUP to SIGNUP Phase. Only Election Admin can call.
 *   beginSignUp(string _question, bool enableCommitmentPhase, uint _finishSignupPhase, uint _endSignupPhase, uint _endCommitmentPhase, uint _endVotingPhase, uint _endRefundPhase, uint _depositrequired) inState(State.SETUP) onlyOwner returns (bool){


SIGNUP

* Voters register their voting key. All eligible voters can call.
 * register(uint[2] xG, uint[3] vG, uint r)
* Transition from SETUP to COMPUTE Phase.
 * finishRegistrationPhase()

COMMIT

* Voters send the hash of their vote. All registered voters can call.
* submitCommitment(bytes32 h) inState(State.COMMITMENT) {

VOTE

* Voters submit their vote. All registered voters can call.
 * submitVote(uint[4] params, uint[2] y, uint[2] a1, uint[2] b1, uint[2] a2, uint[2] b2) inState(State.VOTE) returns (bool) {

TALLY

* Compute the final tally. Anyone can call. Transition from VOTE Phase to FINISH Phase.
 * computeTally()

ANY Phase.

* Reset the entire election. Only Election Admin can call.
 * Reset()
## Changes to Nouns / Open Vote Network
Merge of Open Vote Network and nous dao. An poc version.
## Development

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
