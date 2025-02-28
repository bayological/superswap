"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowDown, Sparkles } from "lucide-react";

export default function CryptoSwap() {
   const [sellAmount, setSellAmount] = useState("6000");
   const [buyAmount, setBuyAmount] = useState("2.25");
   const [sellCurrency, setSellCurrency] = useState("USDC");
   const [buyCurrency, setBuyCurrency] = useState("ETH");

   return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
         <Card className="w-full max-w-md">
            <CardHeader>
               <CardTitle className="text-2xl font-bold">Swap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {/* Sell Section */}
               <div className="rounded-lg border">
                  <div className="p-4 pb-2">
                     <div className="text-lg text-gray-500 mb-2">Sell</div>
                     <div className="flex items-center">
                        <Input
                           type="text"
                           value={sellAmount}
                           onChange={(e) => setSellAmount(e.target.value)}
                           className="border-0 text-4xl p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button
                                 variant="outline"
                                 className="rounded-full bg-slate-100 border-0 flex items-center gap-2 px-4 h-10"
                              >
                                 <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-white text-sm">
                                       $
                                    </span>
                                 </div>
                                 <span>{sellCurrency}</span>
                                 <ChevronDown className="h-4 w-4" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent>
                              <DropdownMenuItem
                                 onClick={() => setSellCurrency("USDC")}
                              >
                                 USDC
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 onClick={() => setSellCurrency("USDT")}
                              >
                                 USDT
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 onClick={() => setSellCurrency("DAI")}
                              >
                                 DAI
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                     <div className="text-gray-500 mt-1">
                        ${Number.parseFloat(sellAmount).toLocaleString()}
                     </div>
                  </div>
                  <div className="flex items-center justify-center border-t border-b py-2">
                     <div className="bg-white p-2 rounded-full border">
                        <ArrowDown className="h-4 w-4 text-gray-500" />
                     </div>
                  </div>
                  <div className="p-4 pt-2">
                     <div className="text-lg text-gray-500 mb-2">Buy</div>
                     <div className="flex items-center">
                        <Input
                           type="text"
                           value={buyAmount}
                           onChange={(e) => setBuyAmount(e.target.value)}
                           className="border-0 text-4xl p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button
                                 variant="outline"
                                 className="rounded-full bg-slate-100 border-0 flex items-center gap-2 px-4 h-10"
                              >
                                 <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                                    <svg
                                       className="h-3 w-3 text-white"
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 2L6 12L12 16L18 12L12 2Z"
                                          fill="currentColor"
                                       />
                                       <path
                                          d="M12 16V22L18 12L12 16Z"
                                          fill="currentColor"
                                          opacity="0.6"
                                       />
                                       <path
                                          d="M12 16L6 12L12 22V16Z"
                                          fill="currentColor"
                                          opacity="0.6"
                                       />
                                    </svg>
                                 </div>
                                 <span>{buyCurrency}</span>
                                 <ChevronDown className="h-4 w-4" />
                              </Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent>
                              <DropdownMenuItem
                                 onClick={() => setBuyCurrency("ETH")}
                              >
                                 ETH
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 onClick={() => setBuyCurrency("BTC")}
                              >
                                 BTC
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                 onClick={() => setBuyCurrency("SOL")}
                              >
                                 SOL
                              </DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </div>
                     <div className="text-gray-500 mt-1">$5,999.99</div>
                  </div>
               </div>

               {/* You Receive Section */}
               <div className="flex justify-between items-center py-3 border-b">
                  <div className="text-gray-500">You receive (0% fee)</div>
                  <div className="font-medium">
                     {buyAmount} {buyCurrency}
                  </div>
               </div>

               {/* Superchain Optimized */}
               <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-2 text-pink-500">
                     <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center z-10">
                           <span className="text-white text-xs">S</span>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                           <span className="text-white text-xs">C</span>
                        </div>
                     </div>
                     <span>Superchain Optimized</span>
                     <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1 text-gray-700">
                     <span>&lt; 0.01</span>
                     <ChevronDown className="h-4 w-4" />
                  </div>
               </div>

               {/* Review Button */}
               <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-6 rounded-lg text-lg">
                  Review
               </Button>
            </CardContent>
         </Card>
      </div>
   );
}
