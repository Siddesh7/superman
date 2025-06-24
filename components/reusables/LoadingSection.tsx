import React from 'react';

const LoadingSection = () => {
    return (
      <div className="glass profile-gradient min-h-screen flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  };

export {LoadingSection} ;