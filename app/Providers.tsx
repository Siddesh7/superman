"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import ReactQueryProvider from "@/lib/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/config/wagmiConfig";
import GlobalContextProvider from "@/context/GlobalContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <WagmiProvider config={wagmiConfig}>
        <ReactQueryProvider>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </ReactQueryProvider>
      </WagmiProvider>
    </SessionProvider>
  );
};

export default Provider;
