import { ArrowUpRight, Globe, Shield, Users, Zap } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeaderComponent = () => {
  return (
    <section className="h-screen md:h-auto md:min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Header section */}
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white leading-tight mb-6">
              Fund Together, <br />
              <span className="text-indigo-600">Achieve Together</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/80 mb-4 leading-relaxed max-w-3xl mx-auto">
              Create groups, share gym memberships, generate day passes and let
              AI handle payments automatically based on your actual gym visits.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8 text-white/60">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>Web3 Wallets</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-4 text-lg font-semibold animate-glow"
                >
                  Get Started
                  <Users className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="glass border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
              >
                Watch Demo
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeaderComponent };
