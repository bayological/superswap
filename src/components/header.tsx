"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ConnectButton } from "@rainbow-me/rainbowkit";


export function Header() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  // Mock function to simulate wallet connection
  const connectWallet = async () => {
    // In a real implementation, this would use WalletConnect or similar
    setIsConnected(true)
    setWalletAddress("0x1234...5678")
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  return (
     <header className="border-b sticky top-0 z-50 w-full bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
           <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                    <svg
                       width="20"
                       height="20"
                       viewBox="0 0 20 20"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                    >
                       <path
                          d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"
                          fill="#FF80BF"
                       />
                       <path
                          d="M13.5 8.5C13.5 9.88071 12.3807 11 11 11C9.61929 11 8.5 9.88071 8.5 8.5C8.5 7.11929 9.61929 6 11 6C12.3807 6 13.5 7.11929 13.5 8.5Z"
                          fill="white"
                       />
                       <path
                          d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
                          fill="white"
                       />
                    </svg>
                 </div>
                 <span className="text-xl font-semibold text-pink-500">
                    CryptoSwap
                 </span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                 <Link
                    href="/trade"
                    className="text-base font-medium text-gray-900"
                 >
                    Trade
                 </Link>
                 <Link
                    href="/explore"
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                 >
                    Explore
                 </Link>
              </nav>
           </div>

           <div className="hidden md:flex items-center gap-4">
              <div className="relative w-64">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                 <Input
                    type="search"
                    placeholder="Search tokens"
                    className="w-full bg-gray-100 border-0 pl-9 rounded-full"
                 />
              </div>
              <ConnectButton />

              <Button
                 onClick={isConnected ? disconnectWallet : connectWallet}
                 variant={isConnected ? "outline" : "default"}
                 className={
                    isConnected
                       ? "text-gray-700"
                       : "bg-pink-500 hover:bg-pink-600 text-white"
                 }
              >
                 {isConnected ? `${walletAddress}` : "Connect"}
              </Button>

              <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                       <MoreHorizontal className="h-5 w-5" />
                       <span className="sr-only">More</span>
                    </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end">
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Help</DropdownMenuItem>
                    <DropdownMenuItem>About</DropdownMenuItem>
                 </DropdownMenuContent>
              </DropdownMenu>
           </div>

           <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
           </Button>
        </div>
     </header>
  );
}

