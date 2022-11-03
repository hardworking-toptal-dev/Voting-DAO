import { task, types } from 'hardhat/config';
import { readFileSync, writeFileSync } from 'fs';
import { ContractName, ContractNameDescriptorV1, DeployedContract } from './types';
import { join } from 'path';

task('callcontractfunction', 'transfer all contracts and start auction')
  .setAction( async (
    {
      contracts,
    }: { contracts: Record<ContractName | ContractNameDescriptorV1, DeployedContract> },
    { ethers,run },
    ) => {
    const network = await ethers.provider.getNetwork();
    const sdkPath = join(__dirname, '../../nouns-sdk');
    const contractpath = join(sdkPath, 'src/contract/contractdata.json');

    const options = { gasLimit: network.name === 'hardhat' ? 30000000 : 1_000_000, };
    if(!contracts){
      console.log("Contracts not provided. Get from SDK");
      contracts = JSON.parse(readFileSync(contractpath, 'utf8'));
    }
    const NounsAuctionHouse = await ethers.getContractAt("NounsAuctionHouse","0x63D2f2D095cAc4C92d3C8be7bA5A28661eC16cd8");
    const NounsDescriptorV2 = await ethers.getContractAt("NounsDescriptorV2","0x3c124f8e676d2f3b5182B8DBeE8aE7431EAdE8E5");
    const NounsAuctionHouseProxyAdmin = await ethers.getContractAt("NounsAuctionHouseProxyAdmin","0xC4a22E530118cA4554c3C850034eC9dC58bDa218");
    const NounsToken = await ethers.getContractAt("NounsToken","0x2E5A7ea22C420B431811eCb9572e39106dDBd1D8");
    // Transfer ownership of all contract except for the auction house.
    // We must maintain ownership of the auction house to kick off the first auction.
    //console.log("Auctionhouse adress: " + NounsAuctionHouse.address);
    const auctionHouse = NounsAuctionHouse.attach(
      //Proxy
      "0x158A1E19Ca4a3E95dF1A03D317357aB7596E884D",
    );
    /*await NounsAuctionHouse.initialize(
      "0x2E5A7ea22C420B431811eCb9572e39106dDBd1D8", //token
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //weth
      300,
      1,
      2,
      28800,
      options,
      );*/
    /*
    await auctionHouse.unpause({
      gasLimit: 1_000_000,
    });*/
    const executorAddress = "0xa7C9A15AFD4fEB20bC2809D99f1334672ba12f5F";
    await auctionHouse.transferOwnership(executorAddress,options,);
    await NounsDescriptorV2.transferOwnership(executorAddress,options,);
    await NounsToken.transferOwnership(executorAddress,options,);
    await NounsAuctionHouseProxyAdmin.transferOwnership(executorAddress,options,);
    console.log(
      'Transferred ownership of the descriptor, token, and proxy admin contracts to the executor.',
    );
   // console.log('Verifying contracts on Etherscan...');
    /*await run('verify-etherscan', {
      contracts,
    });*/
    //console.log(await NounsDescriptorV2.glassesCount());
   /* await run('update-configs', {
      contracts,
    });
    */
    console.log('Complete.');
});