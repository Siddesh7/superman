"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Copy, Loader2, LogOut } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { formatWalletAddress } from "@/lib/utils";
import { AddFunds } from "./AddFunds";
import { toast } from "sonner";

interface WalletData {
  address: string;
  balance: string;
}

const ConnectWallet = () => {
  const { data: session, status } = useSession();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/fetchWallet");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch wallet");
      }

      setWalletData(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch wallet");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Wallet address copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy wallet address");
    }
  };

  const handleDisconnect = async () => {
    try {
      await signOut({ callbackUrl: window.location.href });
      setWalletData(null);
    } catch (err) {
      toast.error("Failed to disconnect");
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchWallet();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center p-4">
        <Button
          onClick={() =>
            signIn("google", { callbackUrl: window.location.href })
          }
          className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        >
          <FcGoogle />
          Sign in with Google
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        {isLoading && (
          <div className="flex items-center gap-2 mt-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Connecting wallet...</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md">{error}</div>
        )}

        {walletData && (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg px-4 py-2 bg-blue-600 text-white cursor-pointer">
              {formatWalletAddress(walletData.address)}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => copyToClipboard(walletData.address)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Address
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Dialog>
                  <DialogTrigger onClick={(e) => e.stopPropagation()}>
                    Add Funds
                  </DialogTrigger>
                  <DialogContent>
                    <AddFunds address={walletData.address} />
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDisconnect}
                className="text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {!walletData && !error && !isLoading && (
          <div className="text-center text-gray-500">
            No wallet data available
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
