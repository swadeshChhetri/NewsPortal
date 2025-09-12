// src/components/loaders/SpinnerLoader.jsx
import React from "react";

const SpinnerLoader = ({ size = 24, color = "yellow-400" }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-50 z-50">
      <div
        className={`border-8 border-dashed border-${color} rounded-full animate-spin`}
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
    </div>
  );
};

export default SpinnerLoader;

