import React from "react";
import { WalletData } from "@/types/wallet";
import { copyToClipboard, formatWalletAddress } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Coins } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useRequestFaucet } from "@/lib/hooks/useRequestFaucet";

const MyWalletContent = ({ walletData }: { walletData: WalletData }) => {
  const address = walletData.account.address;
  const { theme } = useTheme();
  const requestFaucet = useRequestFaucet();

  const handleCopyAddress = async () => {
    try {
      await copyToClipboard(address);
      toast.success("Wallet address copied to clipboard");
    } catch (error) {
      console.error("Failed to copy wallet address:", error);
      toast.error("Failed to copy wallet address");
    }
  };

  const handleRequestFaucet = () => {
    requestFaucet.mutate(undefined, {
      onSuccess: () => {
        toast.success("Faucet request submitted successfully!");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to request faucet");
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight dark:text-white">
          Add Funds
        </h2>
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          Scan this QR code to send funds to your wallet
        </p>
      </div>

      <div className="text-center space-y-2 w-full">
        <div className="mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Your balances
          </p>
          <div className="space-y-2">
            {walletData.balances.map((balance) => (
              <div
                key={balance.contractAddress}
                className="flex items-center justify-between p-2 glass group-gradient rounded-lg"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium dark:text-white">
                    {balance.symbol}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {balance.name}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {balance.humanReadable}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {balance.network}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass profile-gradient flex flex-col gap-4 justify-center items-center p-4 rounded-lg shadow-lg ">
        <QRCodeSVG
          value={address}
          size={200}
          level="H"
          bgColor={theme === "dark" ? "#1f2937" : "#ffffff"}
          fgColor={theme === "dark" ? "#ffffff" : "#000000"}
        />
        <div className="flex items-center justify-center gap-2 mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
            {formatWalletAddress(address)}
          </p>
          <button
            onClick={handleCopyAddress}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Copy address"
          >
            <Copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="w-full">
        <Button
          onClick={handleRequestFaucet}
          disabled={requestFaucet.isPending}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Coins className="h-4 w-4" />
          {requestFaucet.isPending ? "Requesting..." : "Request Test Tokens"}
        </Button>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          Get test USDC tokens for Base Sepolia network
        </p>
      </div>
    </div>
  );
};

export default MyWalletContent;
