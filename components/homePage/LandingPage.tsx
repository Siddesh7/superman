"use client";

import React from "react";
import { HeaderComponent } from "./HeaderComponent";
import { WorkComponent } from "./WorkComponent";
import { StatsComponent } from "./StatsComponent";

const LandingPage: React.FC = () => {
  return (
    <>
      <HeaderComponent />
      <WorkComponent />
      <StatsComponent />
    </>
  );
};

export { LandingPage };
