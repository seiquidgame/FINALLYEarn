import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThirdwebProvider } from "@/app/thirdweb";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SeiQuid Game Staking",
  description: "NFT Staking of SeiQuid Game to earn $SQUID token",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThirdwebProvider>
        {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
