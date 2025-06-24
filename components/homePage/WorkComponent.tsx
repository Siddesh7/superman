import { QrCode, Users, Wallet } from "lucide-react";
import React from "react";

const WorkComponent = () => {
  return (
    <section className="min-h-screen md:min-h-0 md:h-[750px] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
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
  );
};

export { WorkComponent };
