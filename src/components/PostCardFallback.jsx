import React from "react";
import { FaRegImage } from "react-icons/fa";

function PostCardFallback() {
  return (
    <div className="w-full relative rounded-lg shadow-lg bg-gray-200 dark:bg-gray-800 animate-pulse">
      {/* Image placeholder */}
      <div className="flex items-center justify-center w-full h-56 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-400">
        <FaRegImage size={50} className="opacity-30" />
      </div>

      {/* Title placeholder */}
      <div className="p-4">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
      </div>
    </div>
  );
}

export default PostCardFallback;
