"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
import { WalletConnect } from "@/lib/wallet-connect";

export function Header({
   activeView,
   setActiveView,
}: {
   activeView: "boomer" | "zoomer";
   setActiveView: (view: "boomer" | "zoomer") => void;
}) {
   const [isConnected, setIsConnected] = useState(false);
   const [walletAddress, setWalletAddress] = useState("");

   useEffect(() => {
      // Initialize WalletConnect
      const walletConnect = WalletConnect.getInstance({
         projectId: "YOUR_PROJECT_ID", // Replace with your actual project ID
         chains: [1], // Ethereum mainnet
         metadata: {
            name: "Agent9K",
            description: "Crypto swap interface",
            url: window.location.origin,
            icons: [`${window.location.origin}/icon.png`],
         },
      });

      // Check if already connected
      if (walletConnect.getIsConnected()) {
         setIsConnected(true);
         setWalletAddress(walletConnect.getAddress());
      }
   }, []);

   const connectWallet = async () => {
      try {
         const walletConnect = WalletConnect.getInstance({
            projectId: "YOUR_PROJECT_ID",
            chains: [1],
            metadata: {
               name: "Agent9K",
               description: "Crypto swap interface",
               url: window.location.origin,
               icons: [`${window.location.origin}/icon.png`],
            },
         });

         const { address } = await walletConnect.connect();
         setIsConnected(true);
         setWalletAddress(address);
      } catch (error) {
         console.error("Failed to connect wallet:", error);
      }
   };

   const disconnectWallet = async () => {
      try {
         const walletConnect = WalletConnect.getInstance({
            projectId: "YOUR_PROJECT_ID",
            chains: [1],
            metadata: {
               name: "Agent9K",
               description: "Crypto swap interface",
               url: window.location.origin,
               icons: [`${window.location.origin}/icon.png`],
            },
         });

         await walletConnect.disconnect();
         setIsConnected(false);
         setWalletAddress("");
      } catch (error) {
         console.error("Failed to disconnect wallet:", error);
      }
   };

   return (
      <header className="border-border/50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
         <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-6">
               <Link href="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded border border-primary/50 bg-background flex items-center justify-center overflow-hidden">
                     <span className="font-mono text-primary text-xs terminal-text">
                        A9K
                     </span>
                  </div>
                  <span className="text-xl font-mono text-primary">
                     Agent9K
                  </span>
               </Link>

               <nav className="hidden md:flex items-center gap-6">
                  <button
                     onClick={() => setActiveView("boomer")}
                     className={`text-base font-mono ${
                        activeView === "boomer"
                           ? "text-secondary"
                           : "text-muted-foreground hover:text-secondary/80"
                     }`}
                  >
                     boomer
                  </button>
                  <button
                     onClick={() => setActiveView("zoomer")}
                     className={`text-base font-mono ${
                        activeView === "zoomer"
                           ? "text-secondary"
                           : "text-muted-foreground hover:text-secondary/80"
                     }`}
                  >
                     zoomer
                  </button>
               </nav>
            </div>

            <div className="hidden md:flex items-center gap-4">
               <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                     type="search"
                     placeholder="$ search tokens"
                     className="w-full bg-muted/50 border-muted font-mono pl-9 text-sm"
                  />
               </div>

               <Button
                  onClick={isConnected ? disconnectWallet : connectWallet}
                  variant={isConnected ? "outline" : "default"}
                  className={`font-mono ${
                     isConnected
                        ? "border-primary/50 text-primary hover:bg-primary/10"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
               >
                  {isConnected ? `${walletAddress}` : "$ connect"}
               </Button>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden">
               <Menu className="h-6 w-6" />
               <span className="sr-only">Toggle menu</span>
            </Button>
         </div>
      </header>
   );
}
