import React from "react";

const StatsComponent = () => {
  return (
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
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
  );
};

export { StatsComponent };
