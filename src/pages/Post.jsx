import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaRegImage } from "react-icons/fa";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData?.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post)
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/all-posts");
            }
        });
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short", 
            day: "2-digit", 
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,  
        });
    };

    return post ? (
        <div className="py-8 bg-gray-50 flex justify-center">
            <Container>
                <div className="w-full flex flex-col items-center">
                    {isAuthor ? (
                        <div className="w-full max-w-3xl flex justify-end p-2 bg-white shadow-md rounded-t-lg">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button 
                                    borderColor="border-hidden" 
                                    textColor="text-blue-600 text-lg" 
                                    hoverEffect="hover:bg-blue-600 hover:text-white">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                borderColor="border-hidden"
                                textColor="text-red-600 text-lg"
                                hoverEffect="hover:bg-red-600 hover:text-white"
                                onClick={deletePost}
                                className="ml-2"
                            >
                                Delete
                            </Button>
                        </div>
                    ) : (
                        <div className="w-full max-w-3xl flex justify-end p-2 bg-white shadow-md rounded-t-lg">
                            <div className="text-gray-700 text-lg font-semibold">
                                Author: {post.author || "Loading..."}
                            </div>
                        </div>
                    )}
                    
                    {/* Post Image Section with Fallback */}
                    <div className="relative w-full max-w-3xl bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="absolute top-2 left-2 bg-black/60 text-white text-sm px-4 py-1 rounded-md backdrop-blur-md">
                            {formatDate(post.$updatedAt)}
                        </div>
    
                        {post.featuredImage ? (
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-auto max-h-[500px] object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-[300px] bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600">
                                <FaRegImage size={60} className="opacity-50" />
                            </div>
                        )}
                    </div>
    
                    <div className="w-full max-w-3xl text-center mt-6">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
    
                    <div className="w-full max-w-3xl mt-4 text-xl text-gray-800 leading-relaxed">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
    
    
}