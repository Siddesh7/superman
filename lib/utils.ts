import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatWalletAddress = (address: string, visibleChars: number = 5): string => {
  if (!address) return '';
  if (address.length <= visibleChars * 2) return address;

  const start = address.slice(0, visibleChars);
  const end = address.slice(-visibleChars);
  return `${start}...${end}`;
}; 