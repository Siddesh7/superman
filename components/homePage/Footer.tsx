import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-users-gear text-indigo-400 text-2xl mr-2"></i>
              <span className="font-bold text-xl text-white">GroupFund</span>
            </div>
            <p className="text-gray-400">
              Simplifying group funding for shared experiences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Group Creation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Smart Wallets
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Day Passes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Fund Management
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2025 GroupFund. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
            >
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
