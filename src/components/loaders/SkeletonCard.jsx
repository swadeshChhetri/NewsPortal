// src/components/Loader/SkeletonCard.jsx
import React from "react";

const SkeletonCard = ({ width = "w-full", height = "h-40", rounded = "rounded-lg" }) => {
  return <div className={`animate-pulse bg-gray-300 ${width} ${height} ${rounded}`}></div>;
};

export default SkeletonCard;
