import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import configuration from '../appwrite/configuration';
import fileService from '../appwrite/fileServices';
import { useSelector } from 'react-redux';
import { Container, Spanner } from '../components';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit, MdDelete, MdDownloadForOffline } from "react-icons/md";
import '../Browser.css';

function Post() {
    const [post, setPost] = useState(null);
    const [showIconsMenu, setShowIconsMenu] = useState("opacity-0 h-0");
    const [icons, setIcons] = useState(false)
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const user = userData.user ? userData.user : userData;
    const isAuthor = post && user ? post.userID === user.$id : false;
    const authorName = post?.authorName ? post?.authorName : user?.name;
    const userName = authorName
        .split(' ')
        .map((name) => name.charAt(0).toUpperCase())
        .join('');

    // Fetch post based on slug
    useEffect(() => {
        if (slug) {
            configuration.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        if (post) {
            const deletePost = await configuration.deletePost(post.$id);
            if (deletePost) navigate('/');
        }
    };

    const downloadPost = () => {
        if (post && post.image) {
            fileService.downloadFile(post.image);
        }
    };



    // Utility function to format the date as "x minutes/hours/days ago"
    function timeAgo(date) {
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
  
    
        // If the date is in the future
        if (seconds < 0) {
            return '0 seconds ago';
        }
    
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
        };
    
        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const elapsed = Math.floor(seconds / secondsInUnit);
            if (elapsed > 0) {
                return `${elapsed} ${unit}${elapsed > 1 ? 's' : ''} ago`;
            }
        }
    
        // If no unit fits, return seconds ago
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
    

    // Formatted creation and update times
    const formattedCreateTime =
        post && post.$createdAt ? timeAgo(new Date(post.$createdAt)) : '';
    const formattedUpdateTime =
        post && post.$updatedAt ? timeAgo(new Date(post.$updatedAt)) : '';

    // Exact date and time for tooltips
    const createdDate =
        post && post.$createdAt ? new Date(post.$createdAt).toDateString() : '';
    const createdTime =
        post && post.$createdAt ? new Date(post.$createdAt).toLocaleTimeString() : '';
    const updatedDate =
        post && post.$updatedAt ? new Date(post.$updatedAt).toDateString() : '';
    const updatedTime =
        post && post.$updatedAt ? new Date(post.$updatedAt).toLocaleTimeString() : '';

    const toggleIconsMenu = () => {
        setShowIconsMenu((prev) => (prev === "opacity-0 h-0" ? "opacity-100 h-fit" : "opacity-0 h-0"));
        setIcons((prev) => !prev)
    };

    if (!post)
        return (
            <Container>
                <Spanner />
            </Container>
        ); // Show loading message or spinner if post is not yet available

    return (
        <Container className="px-0 my-10">
            <div className="w-full relative md:max-w-3xl mx-auto flex flex-col bg-white rounded-lg shadow-lg border border-gray-300 p-4 md:p-6 gap-y-4">
                {/* User Info and Time */}
                <div className="flex justify-between w-full items-center gap-x-4 px-1 md:px-4">
                    <div className='flex gap-x-4'>
                        <div
                            className="w-12 h-12 text-2xl rounded-full flex justify-center items-center bg-gray-200"
                            style={{ backgroundColor: post.profileColor }}
                        >
                            {/* Display author's initials */}
                            {userName}
                        </div>
                        <div>
                            <p className="text-base font-semibold text-gray-800">
                                {post.authorName || 'Unknown'}
                            </p>
                            {formattedCreateTime === formattedUpdateTime ? (
                                <p
                                    title={`Created on ${createdDate} at ${createdTime}`}
                                    className="text-xs text-gray-500 tooltip"
                                >
                                    Created at: {formattedCreateTime}
                                </p>
                            ) : (
                                <p
                                    title={`Updated on ${updatedDate} at ${updatedTime}`}
                                    className="text-xs text-gray-500 tooltip"
                                >
                                    Edited at: {formattedUpdateTime}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center flex-row-reverse'>
                        <HiOutlineDotsVertical
                            onClick={toggleIconsMenu}
                            className='text-black text-2xl cursor-pointer'
                        />
                        <div className={`flex absolute z-10 md:top-[5.5em] top-[5em] right-4 md:right-6 flex-col justify-center gap-2 w-32 p-2 transition-all duration-200 ease-in-out ${showIconsMenu} rounded-lg backdrop-blur-md bg-black/40 shadow-lg`}>
                            {/* Interaction Buttons */}
                            {isAuthor && (

                                <>
                                    <Link className={`${icons === false ? "hidden" : "flex"}  items-center gap-x-2 p-2 rounded-md transition-colors duration-200 ease-linear hover:bg-white hover:text-black`} to={`/edit-post/${post.$id}`}>
                                        <MdEdit className='text-xl' />
                                        <p className='text-xs font-semibold'>Edit Post</p>
                                    </Link>
                                    <button className={`${icons === false ? "hidden" : "flex"}  items-center gap-x-2 p-2 rounded-md transition-colors duration-200 ease-linear hover:bg-white hover:text-black`} onClick={deletePost}>
                                        <MdDelete className='text-xl' />
                                        <p className='text-xs font-semibold'>Delete Post</p>
                                    </button>
                                </>

                            )}
                            <button onClick={downloadPost} className={`${icons === false ? "hidden" : "flex"}  items-center gap-x-2 p-2 rounded-md transition-colors duration-200 ease-linear hover:bg-white hover:text-black`}>
                                <MdDownloadForOffline className='text-2xl' />
                                <p className='text-xs font-semibold'>Download</p>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Post Image */}
                <div className="w-full aspect-video overflow-hidden rounded-xl bg-gray-200 flex justify-center items-center">
                    <img
                        src={fileService.getFilePreview(post.image)}
                        alt={post.title}
                        className="object-contain w-full h-full"
                    />
                </div>

                {/* Post Title and Content */}
                <div className="px-1 md:px-4 text-black">
                    {/* Updated Title Styling */}
                    <h1 className="text-xl md:text-3xl font-bold tracking-wide mb-2 text-gray-900">
                        {post.title}
                    </h1>
                    <div className="browser-css">{parse(post.content)}</div>
                </div>
            </div>
        </Container>
    );
}

export default Post;
