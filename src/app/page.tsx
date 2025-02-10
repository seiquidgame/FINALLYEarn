import Image from "next/image";
import styles from "./page.module.css";
import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { Staking } from "../../components/Staking";

export default function Home() {
  return (
    <div style={{
      fontFamily: "fantasy",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px auto",
      width: "500px",
    }}>
      <h1 style={{color:"white"}}>SeiQuid Game Staking</h1>
      <div className="navbaro">
        <a href="https://seiquid.xyz">Home</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="https://magiceden.io/mint-terminal/sei/0x75873DD4a039691110A88aB7EeC107e645BA9aB5">Get More NFTs</a>
      </div>
      <ConnectEmbed
        client={client}
        chain={chain}
      />
      <Staking />
    </div>
  );
}
