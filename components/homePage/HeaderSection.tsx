import React from "react";
import {
  ArrowUpRight,
  Globe,
  QrCode,
  Shield,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeaderSection = () => {
  return (
    <>
      {/* Full Viewport Header Section - Mobile Only */}
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
                Create groups, share gym memberships, generate day passes and
                let AI handle payments automatically based on your actual gym
                visits.
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

      {/* How it Works Section - Mobile Full Screen, Desktop Normal */}
      <section className="min-h-screen md:min-h-0 md:h-[750px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent to-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-12">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto animate-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  1. Create Your Group
                </h3>

                <p className="text-white/70 text-lg leading-relaxed">
                  Set a fitness goal, choose your group size, and invite friends
                  with a simple shareable link.
                </p>
              </div>

              <div className="text-center">
                <div
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto animate-glow"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  2. Smart Payments
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  Superman handles payments for your group, purhcase membership
                  and handles refunds
                </p>
              </div>

              <div className="text-center">
                <div
                  className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 mx-auto animate-glow"
                  style={{ animationDelay: "1s" }}
                >
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  3. Seamless Access
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  Generate day passes that integrate with Apple Wallet. Pay only
                  for the days you use and get refunds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Mobile Full Screen, Desktop Normal */}
      <section className="min-h-screen md:min-h-0 md:h-[550px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-black/20 to-black/40">
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
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-12">
              Our Impact
            </h2>

            <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
              <div className="glass profile-gradient rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300">
                <h4 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  70%
                </h4>
                <p className="text-white/70">Average Savings</p>
              </div>

              <div className="glass profile-gradient rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300">
                <h4 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  5+
                </h4>
                <p className="text-white/70">Active Groups</p>
              </div>

              <div className="glass profile-gradient rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300">
                <h4 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
                  98%
                </h4>
                <p className="text-white/70">User Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderSection;
