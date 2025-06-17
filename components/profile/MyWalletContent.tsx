import React from "react";
import { WalletData } from "@/types/wallet";
import { copyToClipboard, formatWalletAddress } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const MyWalletContent = ({ walletData }: { walletData: WalletData }) => {
  const address = walletData.account.address;

  const handleCopyAddress = async () => {
    try {
      await copyToClipboard(address);
      toast.success("Wallet address copied to clipboard");
    } catch (error) {
      console.error("Failed to copy wallet address:", error);
      toast.error("Failed to copy wallet address");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Add Funds</h2>
        <p className="text-sm text-muted-foreground">
          Scan this QR code to send funds to your wallet
        </p>
      </div>

      <div className="text-center space-y-2 w-full">
        <div className="mt-2">
          <p className="text-sm text-gray-500 mb-2">Your balances</p>
          <div className="space-y-2">
            {walletData.balances.map((balance) => (
              <div
                key={balance.contractAddress}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{balance.symbol}</span>
                  <span className="text-xs text-gray-500">{balance.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-blue-600">
                    {balance.humanReadable}
                  </span>
                  <span className="text-xs text-gray-500">
                    {balance.network}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <QRCodeSVG value={address} size={200} level="H" />
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm text-gray-600">
            {formatWalletAddress(address)}
          </p>
          <button
            onClick={handleCopyAddress}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            title="Copy address"
          >
            <Copy className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyWalletContent;
