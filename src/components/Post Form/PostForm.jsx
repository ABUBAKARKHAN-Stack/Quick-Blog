import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Input, Button, RTE, Select, Footer } from '../index'
import { FaUpload } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import configuration from '../../appwrite/configuration'
import fileService from "../../appwrite/fileServices"

function PostForm({ post }) {
    const { register, handleSubmit, watch, control, reset, setValue , getValues } = useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const user = userData.user ? userData.user : userData;
    const userName = user?.name.split(" ").map(name => name.charAt(0).toUpperCase()).join("");
    const userProfileColor = user?.profileColor || "#000000";

    useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                slug: post.slug,
                content: post.content,
                status: post.status,
                authorName: post.authorName,
                profileColor: post.profileColor,
                image: post.image // This is for handling image files if needed
            });
        }
    }, [post, reset])

    useEffect(() => {
        setValue("profileColor", userProfileColor)
    }, [userProfileColor, setValue])

    useEffect(() => {
        setValue("authorName", user?.name)
    }, [user?.name, setValue])

    const submitPostHandler = async (data) => {
        try {
            setLoading(true)
            if (post) {
                const file = data.image[0] ? await fileService.uploadFile(data.image[0]) : null;

                if (file) {
                    configuration.deletePost(data.image);
                }

                const updatePost = await configuration.updatePost(post.$id, {
                    ...data,
                    image: file ? file.$id : undefined
                });
                if (updatePost) navigate(`/post/${updatePost.$id}`)
            } else {
                const file = await fileService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.image = fileId;
                    const createPost = await configuration.createPost({
                        ...data,
                        userID: user?.$id
                    });
                    if (createPost) navigate(`/post/${createPost.$id}`);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const slugTransform = (value) => {
        if (value && typeof value === "string") return value
            .trim()
            .toLowerCase()
            .replace(/\s/g, "-")
            .replace(/[^\w-]+/g, "");
        return "";
    }

    useEffect(() => {
        const subscribe = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug",  slugTransform(value.title) , { shouldValidate: true });
            }
        });

        return () => {
            subscribe.unsubscribe();
        }
    }, [slugTransform, watch, setValue]);

    return (
            <form
                className="w-full flex flex-col lg:flex-row bg-white gap-6 p-6 rounded-b-lg shadow-md"
                onSubmit={handleSubmit(submitPostHandler)}
            >
                {/* Left Section */}
                <div className="w-full lg:w-2/3 flex flex-col gap-6">

                    {/* Title Input */}
                    <Input
                        labelText="text-black"
                        type="text"
                        label="Title:"
                        placeholder="Enter Title "
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register("title", { required: true })}
                    />

                    {/* Slug Input */}
                    <Input
                        labelText="text-black"
                        type="text"
                        label="Slug:"
                        disabled
                        placeholder="Enter title to generate slug"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
                        {...register("slug", { required: true })}
                    />

                    {/* Rich Text Editor */}
                    <RTE
                        control={control}
                        label="Content:"
                        name="content"
                        defaultValue={getValues("content")}
                    />
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    {/* File Upload Input */}
                    <div className="relative mt-[21px]">
                        <input
                            type="file"
                            id="customFileInput"
                            className="hidden"
                            accept="image/*"
                            {...register("image")}
                        />
                        <label
                            htmlFor="customFileInput"
                            className="cursor-pointer w-full text-black border border-gray-300 rounded-md flex items-center justify-center px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <FaUpload className='text-black' />
                            <span className="ml-2 text-black text-sm">{post ? "Update Image" : "Upload Image"}</span>
                        </label>
                    </div>

                    {/* Image Preview */}
                    {post && post.image && (
                        <div className="w-full">
                            <img
                                src={fileService.getFilePreview(post.image)}
                                alt={post.title}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    )}

                    {/* Status Select */}
                    <Select
                        labelText="text-black"
                        option={["active", "inactive"]}
                        label="Status"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register("status", { required: true })}
                    />

                    {/* Submit Button */}
                    <Button
                        loading={loading}
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold max-h-12 h-12 rounded-lg shadow-md transition duration-300"
                    >
                        {post ? "Update Post" : "Create Post"}
                    </Button>
                </div>
            </form>
    )
}

export default PostForm
