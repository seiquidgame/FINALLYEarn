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
      <ConnectEmbed
        client={client}
        chain={chain}
      />
      <Staking />
    </div>
  );
}
