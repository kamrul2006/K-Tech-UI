import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaRegFrownOpen } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6">
      {/* Decorative Icon */}
      <div className="text-8xl md:text-9xl">
        <FaRegFrownOpen />
      </div>

      {/* Error Heading */}
      <h1 className="text-6xl md:text-8xl font-bold mt-4">404</h1>

      {/* Subheading */}
      <h2 className="text-2xl md:text-3xl font-medium mt-2">
        Oops! Page Not Found
      </h2>

      {/* Description */}
      <p className="mt-4 text-center text-lg md:text-xl max-w-lg">
        The page you're looking for doesn't exist or has been removed. Please go back to the homepage and try again.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-6 inline-flex items-center px-6 py-3 bg-white text-blue-600 hover:text-indigo-600 font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
      >
        <FaHome className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
