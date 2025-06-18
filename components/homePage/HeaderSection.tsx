import Image from "next/image";
import React from "react";
import { InfoIcon, Rocket, Video } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderSection = () => {
  const router = useRouter();

  const handleLaunchApp = () => {
    router.push("/login");
  };

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-6">
              Fund Together, <br />
              <span className="text-indigo-600">Achieve Together</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-white mb-8">
              Create groups with friends to pool funds for shared goals. Our
              platform automatically manages payments, memberships, and day
              passes with smart wallet technology.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleLaunchApp}
                className="flex gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-button text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg cursor-pointer whitespace-nowrap"
              >
                <Rocket />
                Launch App
              </button>
              <button className="flex gap-2 bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600 px-6 py-3 rounded-button text-lg font-medium transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap">
                <Video />
                Watch Demo
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute inset-0 w-64 h-64 mx-auto bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <Image
                src="https://readdy.ai/api/search-image?query=A%20modern%20illustration%20of%20diverse%20people%20collaborating%20on%20a%20digital%20platform%2C%20showing%20virtual%20wallets%20and%20group%20funding%20for%20gym%20memberships%2C%20with%20a%20clean%20and%20minimalist%20design%2C%20soft%20gradient%20background%20in%20blue%20and%20purple%20tones%2C%20stylized%203D%20characters&width=600&height=400&seq=1&orientation=landscape"
                alt="Group funding illustration"
                className="relative rounded-lg shadow-2xl w-full object-cover"
                height={400}
                width={400}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
