// src/components/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center px-6 py-12">
        <h1 className="text-9xl font-extrabold text-yellow-500 animate-bounce">
          404
        </h1>
        <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-gray-800">
          Oops! Page not found.
        </h2>
        <p className="mt-2 text-gray-600">
          We can’t seem to find the page you’re looking for.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition"
        >
          Go Back Home
        </Link>
        {/* Optional illustration */}
        <div className="mt-10">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="Page not found"
            className="mx-auto w-80 sm:w-96"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
