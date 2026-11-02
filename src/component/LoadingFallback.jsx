import React from "react";

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

export default LoadingFallback;
