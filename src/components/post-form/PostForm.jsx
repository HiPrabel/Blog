import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import imageCompression from "browser-image-compression";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData?.userData);
    const [errorMessage, setErrorMessage] = useState("");

    const submit = useCallback(async (data) => {
        let newFileId = post?.featuredImage;
        const newImage = data.image?.[0];
        let fileForUpload = null;
    
        if (newImage) {
            
            const compressedImage = await imageCompression(newImage, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1280,
                useWebWorker: true,
            });
    
            // Convert to File
            fileForUpload = new File([compressedImage], newImage.name, {
                type: compressedImage.type,
            });
    
            if (post?.featuredImage) {
                await appwriteService.deleteFile(post.featuredImage);
            }
    
            const file = await appwriteService.uploadFile(fileForUpload);
            if (file) {
                newFileId = file.$id;
            } else {
                setErrorMessage("Failed to upload the new image. Please try again.");
                return;
            }
        }
    
        if (post) {
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: newFileId,
            });
    
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            } else {
                setErrorMessage("Failed to update post. Please try again.");
            }
        } else {
            const dbPost = await appwriteService.createPost({
                ...data,
                userId: userData.$id,
                author: userData.name,
                featuredImage: newFileId, 
            });
    
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            } else {
                setErrorMessage("Failed to create post. Please try again.");
            }
        }
    }, [navigate, post, userData]);
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div>
            {errorMessage && (
            <div className="w-full p-3 mb-4 text-red-600 bg-red-100 border border-red-400 rounded-lg">
                {errorMessage}
            </div>
        )}
        
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="(upto 1mb) Featured Image : "
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 mt-6 scale-y-105 border-gray-300 shadow-sm"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    borderColor={post ? "border-green-500" : "border-blue-600"}
                    textColor={post ? "text-green-500" : "text-blue-600"}
                    hoverEffect={post ? "hover:bg-green-200" : "hover:bg-blue-200"}
                    className="w-full mt-6"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
        </div>
    );
};