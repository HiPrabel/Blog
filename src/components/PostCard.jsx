import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";

function PostCard({ $id, title, featuredImage, status }) {
  const isActive = status === "active";

  return (
    <Link to={`/post/${$id}`} className="block">
      <div
        className={`w-full relative rounded-lg shadow-lg transition-all duration-300 transform
          ${
            isActive
              ? "bg-white hover:shadow-2xl hover:-translate-y-0.5 dark:bg-gray-800 dark:hover:shadow-xl"
              : "bg-orange-200 hover:bg-orange-300 dark:bg-orange-700 dark:hover:bg-orange-600"
          }`}
      >
        {/* Inactive Badge */}
        {!isActive && (
          <span className="absolute top-2 right-2 bg-orange-600 dark:bg-orange-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
            Inactive
          </span>
        )}

        {/* Featured Image or Fallback Icon */}
        {featuredImage ? (
          <div className="overflow-hidden rounded-t-lg">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-full h-56 object-cover transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-56 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 text-gray-600 dark:text-gray-300">
            <FaRegImage size={50} className="opacity-50" />
          </div>
        )}

        {/* Post Title */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center transition-colors duration-200">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
