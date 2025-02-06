import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#FFFAF3] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#FF5341] border-t-transparent rounded-full animate-spin"></div>
        <div className="text-lg text-gray-600">Loading ...</div>
      </div>
    </div>
  );
};

export default LoadingScreen;