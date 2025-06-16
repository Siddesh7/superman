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

      <div className="text-center space-y-2">
        <>
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">Your balance</p>
            <p className="text-2xl font-bold text-blue-600">0 ETH</p>
          </div>
        </>
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
