"use client";

import React from "react";
import WorkSection from "./WorkSection";
import WalletSection from "./WalletSection";
import Footer from "./Footer";
import HeaderSection from "./HeaderSection";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <HeaderSection />
      <WorkSection />
      <WalletSection />
      <Footer />
    </div>
  );
};

export { LandingPage };
