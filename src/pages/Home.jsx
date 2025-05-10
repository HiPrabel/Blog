import React, { useEffect, useState, useRef } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, HeroSection } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [searchTerm, setSearchTerm] = useState("");
    const loaderRef = useRef(null);

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

    // Main home content
    return (
        <div className="w-full py-8">
            <Container>
                <HeroSection />

                <div className="flex justify-center my-4">
                    <input
                        id="search"
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
