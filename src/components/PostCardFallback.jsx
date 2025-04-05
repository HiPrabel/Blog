import React from "react";
import { FaRegImage } from "react-icons/fa";

function PostCardFallback() {
  return (
    <div className="w-full relative rounded-lg shadow-lg bg-gray-200 animate-pulse">
      <div className="flex items-center justify-center w-full h-56 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600">
        <FaRegImage size={50} className="opacity-30" />
      </div>

      <div className="p-4">
        <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto"></div>
      </div>
    </div>
  );
}

export default PostCardFallback;
