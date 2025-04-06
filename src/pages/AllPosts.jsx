import React, { useState, useEffect, useRef } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef(null);
  const userData = useSelector((state) => state.auth.userData?.userData);

  useEffect(() => {
    // console.log("userData: ", userData);
    if (userData && userData.$id) {
      appwriteService.getUserPosts(userData.$id).then((posts) => {
        // console.log("Raw Posts: ", posts);
        if (posts) setPosts(posts.documents || []);
      }).catch((err) => console.error("Error fetching user posts:", err));
    }
  }, [userData]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  // console.log("Filtered Posts: ", filteredPosts);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 6, filteredPosts.length));
        }
      },
      { threshold: 1 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [filteredPosts.length]);
  

  return (
    <div className="w-full py-8">
      <Container>
        {/* Search and Filter */}
        <div className="flex flex-wrap justify-center items-center gap-4 my-4">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-2/3 md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Posts</option>
            <option value="active">Active Posts</option>
            <option value="inactive">Inactive Posts</option>
          </select>
        </div>

        {/* Posts */}
        <div className="flex flex-wrap">
          {visiblePosts.length > 0 ? (
            visiblePosts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/3">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No matching posts found</p>
          )}
        </div>

        {/* Lazy Loader Trigger */}
        <div ref={loaderRef} className="h-10" />
      </Container>
    </div>
  );
}

export default AllPosts;
