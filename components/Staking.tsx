'use client';

import { client } from "@/app/client";
import { chain } from "@/app/chain";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../src/app/utils/contracts";
import { NFT, prepareContractCall, sendTransaction, Hex, readContract, sendAndConfirmTransaction } from "thirdweb";
import { useEffect, useState } from "react";
import { getNFTs, ownerOf, totalSupply, claimTo, getOwnedNFTs, approve, setApprovalForAll, getNFT } from "thirdweb/extensions/erc721";
import { NFTCard } from "./NFTCard";
import { getOwnedERC721s } from "./get"
import { StakedNFTCard } from "./StakedNFTCard";
import { StakeRewards } from "./StakeRewards";

export const Staking = () => {
    const account = useActiveAccount();
    
    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);

    const getOwnedNFTs = async () => {
        const nfts = await getOwnedERC721s({
            contract: NFT_CONTRACT,
            owner: account?.address as Hex,
            requestPerSec: 25,
        });

        setOwnedNFTs(nfts);
    };

    useEffect(() => {
        if (account) {
            getOwnedNFTs();
        }
    }, [account]);

    const {
        data: stakedInfo,
        refetch: refetchStakedInfo
    } = useReadContract({
        contract: STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || ""]
    });
    console.log(ownedNFTs)

    if (account) {
        return (

            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#151515",
                borderRadius: "8px",
                width: "500px",
                padding: "20px",
            }}>
                <ConnectButton
                    client={client}
                    chain={chain}
                />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "20px 0",
                    width: "100%",
                }}>
                    <h2 style={{ marginRight: "20px", color: "white", }}>Character NFTs</h2>
                    <div style={{ width: "50px", marginRight: "210px", padding: "10px"}}>
                    <TransactionButton
                                transaction={async () => {
                                    const transaction = setApprovalForAll({
                                        contract: NFT_CONTRACT,
                                        operator: STAKING_CONTRACT.address,
                                        approved: true
                                       });
                                    await sendAndConfirmTransaction({
                                        transaction,
                                        account
                                    })
                                    return prepareContractCall({
                                        contract: STAKING_CONTRACT,
                                        method: "stake",
                                        // @ts-ignore
                                        params: [ownedNFTs.map(nft => BigInt(nft.id))]
                                    })
                                }}
                                onTransactionConfirmed={() => {
                                    alert("Everything is Staked!");
                                    getOwnedNFTs();
                                    refetchStakedInfo();
                                    
                                }}
                                onError={(e) => {
                                    console.log(e)
                                }}
                                style={{
                                    width: "100%"
                                }}
                            >Stake All at Once</TransactionButton> </div>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }} />
                <div style={{
                    margin: "20px 0",
                    width: "100%"
                }}>

                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px" }}>                      

                        {ownedNFTs && ownedNFTs.length > 0 ? (
                            ownedNFTs.map((nft) => (
                                <NFTCard
                                    key={nft.id}
                                    nft={nft}
                                    refetchOwnedNFTs={getOwnedNFTs}
                                    refetchStakedInfo={refetchStakedInfo}
                                />
                            ))
                        ) : (
                            <p style={{ color: "white" }}>Loading... or You own 0 NFTs</p>
                        )}
                    </div>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }} />
                <div style={{ width: "100%", margin: "20px 0" }}>
                    <h2>Staked NFTs</h2>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px"}}>
                        {stakedInfo && stakedInfo[0].length > 0 ? (
                            stakedInfo[0].map((nft: any, index: number) => (
                                <StakedNFTCard
                                    key={index}
                                    tokenId={nft}
                                    refetchStakedInfo={refetchStakedInfo}
                                    refetchOwnedNFTs={getOwnedNFTs}
                                />
                            ))
                        ) : (
                            <p style={{ margin: "20px" }}>No NFTs staked</p>
                        )}
                    </div>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }}/>
                <StakeRewards />  
            </div>
        )
    }

}
