"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import ReactQueryProvider from "@/lib/react-query";
import { ProfileProvider } from "@/context/ProfileContext";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/config/wagmiConfig";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <WagmiProvider config={wagmiConfig}>
        <ReactQueryProvider>
          <ProfileProvider>{children}</ProfileProvider>
        </ReactQueryProvider>
      </WagmiProvider>
    </SessionProvider>
  );
};

export default Provider;
