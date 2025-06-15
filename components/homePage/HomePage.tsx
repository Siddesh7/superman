import { Link, Shield } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const HomePage = () => {
  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white mb-8 animate-fade-in">
          <Shield className="w-4 h-4 mr-2" />
          Powered by CDP Wallets & Smart Agents
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
          Save Together,
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Achieve More
          </span>
        </h1>

        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Create groups, pool funds, and let AI agents automatically purchase
          memberships. Use day passes and get refunds based on actual usage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
          <Link href="/auth">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 text-lg px-8 py-4"
            >
              Start Your Group
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              How It Works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
