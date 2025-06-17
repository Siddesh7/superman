import React from "react";
import { signOut } from "next-auth/react";

const LogoutContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Are you sure you want to log out?
      </h2>
      <button
        onClick={() => signOut()}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Log Out
      </button>
    </div>
  );
};

export default LogoutContent;
