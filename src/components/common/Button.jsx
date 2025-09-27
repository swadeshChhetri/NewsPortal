import React, { useState } from "react";

export const Button = ({
  variant = "primary",
  disabled,
  children,
  ...props
}) => {
  const base = "px-4 py-2 rounded-sm font-medium transition-colors";
  const styles = {
    primary: "bg-yellow-600 text-white hover:bg-yellow-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-500",
    disabled: "bg-gray-400 text-gray-200 cursor-not-allowed",
  };
  return (
    <button
      className={`${base} ${disabled ? styles.disabled : styles[variant]}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
