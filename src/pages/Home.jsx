import React, { useEffect, useState, useRef } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, HeroSection } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Home() {
    const [posts, setPosts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [searchTerm, setSearchTerm] = useState("");
    const loaderRef = useRef(null);
    const authStatus = useSelector((state) => state.auth.status);

    // Fetch posts from Appwrite on mount
    useEffect(() => {
        appwriteService.getPosts().then((res) => {
            if (res) setPosts(res.documents);
        });
    }, []);

    // Filter posts by search term
    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Infinite scroll to load more posts
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + 6, filteredPosts.length));
                }
            },
            { threshold: 1 }
        );

        const loader = loaderRef.current;
        if (loader) observer.observe(loader);

        return () => {
            if (loader) observer.unobserve(loader);
        };
    }, [filteredPosts.length]);

    // If user is not authenticated, show call-to-action section
    if (!authStatus) {
        return (
            <div className="w-full mt-4 py-16 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
              <Container>
                <div className="flex flex-col items-center justify-center text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-extrabold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200"
                  >
                    Login to Read Amazing Posts
                  </motion.h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    Discover, read, and share interesting stories with the community.
                  </p>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-full shadow-lg 
                        hover:bg-blue-700 dark:hover:bg-blue-600 hover:shadow-xl transition-all duration-300"
                    >
                      Get Started for Free
                    </motion.button>
                  </Link>
                </div>
              </Container>
            </div>
          );
          
          
    }

    // Main home content if user is authenticated
    return (
        <div className="w-full py-8">
            <Container>
                <HeroSection />

                <div className="flex justify-center my-4">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="w-2/3 md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setVisibleCount(6); // Reset visible count on search
                        }}
                    />
                </div>

                <div className="flex flex-wrap">
                    {filteredPosts.slice(0, visibleCount).map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/3">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">No matching posts found</p>
                )}

                {visibleCount < filteredPosts.length && (
                    <div ref={loaderRef} className="h-10 mt-4 flex justify-center items-center">
                        <span className="text-sm text-gray-400">Loading more posts...</span>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
