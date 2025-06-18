import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, QrCode, Download, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { DayPass } from "@/types/dayPasses";

interface DayPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayPass: DayPass | null;
}

const DayPassModal: React.FC<DayPassModalProps> = ({
  isOpen,
  onClose,
  dayPass,
}) => {
  const handleDownloadQR = () => {
    if (!dayPass?.qrCode) return;

    const link = document.createElement("a");
    link.href = dayPass.qrCode;
    link.download = `daypass-${dayPass.passId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR code downloaded successfully!");
  };

  const handleCopyPassId = () => {
    if (!dayPass?.passId) return;

    navigator.clipboard.writeText(dayPass.passId);
    toast.success("Pass ID copied to clipboard!");
  };

  const isExpired = dayPass ? new Date() > new Date(dayPass.validUntil) : false;
  const isUsed = dayPass?.isUsed || false;

  const getStatusBadge = () => {
    if (isUsed) {
      return <Badge variant="destructive">Used</Badge>;
    }
    if (isExpired) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    return (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 border-green-200"
      >
        Valid
      </Badge>
    );
  };

  if (!dayPass) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Day Pass
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Pass ID */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pass ID
              </p>
              <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {dayPass.passId}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyPassId}
              className="text-xs"
            >
              Copy
            </Button>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Status
            </span>
            {getStatusBadge()}
          </div>

          {/* QR Code */}
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex flex-col items-center space-y-3">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Scan QR Code
                  </p>
                  <div className="bg-white p-4 rounded-lg border">
                    <Image
                      src={dayPass.qrCode}
                      alt="Day Pass QR Code"
                      className="w-48 h-48 object-contain"
                      height={48}
                      width={48}
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadQR}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download QR
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Validity Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Issued Date
                </p>
                <p className="text-sm">
                  {new Date(dayPass.issuedDate).toLocaleDateString()} at{" "}
                  {new Date(dayPass.issuedDate).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Valid Until
                </p>
                <p className="text-sm">
                  {new Date(dayPass.validUntil).toLocaleDateString()} at{" "}
                  {new Date(dayPass.validUntil).toLocaleTimeString()}
                </p>
              </div>
            </div>

            {dayPass.isUsed && dayPass.usedAt && (
              <div className="flex items-center gap-3">
                <X className="w-4 h-4 text-red-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Used At
                  </p>
                  <p className="text-sm">
                    {new Date(dayPass.usedAt).toLocaleDateString()} at{" "}
                    {new Date(dayPass.usedAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Warning if expired or used */}
          {(isExpired || isUsed) && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                {isUsed
                  ? "This day pass has already been used and cannot be used again."
                  : "This day pass has expired and is no longer valid."}
              </p>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DayPassModal;
