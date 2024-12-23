import React from "react";
import logo from "../../assets/logo.png"

const Spinner = () => 
{

  return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <div className="relative">
        {/* Spinner Animation */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#4BAF47] rounded-full animate-spin"></div>
        {/* Centered Image */}
        <img
          src={logo}
          alt="loading"
          className="absolute top-1/2 left-1/2 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default Spinner;
