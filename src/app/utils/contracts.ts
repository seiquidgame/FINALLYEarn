import { client } from "@/app/client";
import { chain } from "@/app/chain";
import { getContract } from "thirdweb";
import { stakingContractABI } from "./stakingContractABI";

const nftContractAddress = "0x75873DD4a039691110A88aB7EeC107e645BA9aB5";
//const nftContractAddress = "sei19aayzzsqs8rj970cqlh2d23a50kew3k70h5frtwedk3spedlyx9s3ck89r";
const rewardTokenContractAddress = "0xf4a13Ed6adb46fc0B745f6d793a553A50a061226";
const stakingContractAddress = "0x413ef165D1Bf0ca90477Bfbf3307062F2c1a66d0";

export const NFT_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress,
    //owner: "0x2ce6EFBEa3a63ea8b17CEa369f416c9668e86e24";
});

export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: rewardTokenContractAddress,
});

export const STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress,
    abi: stakingContractABI,
});