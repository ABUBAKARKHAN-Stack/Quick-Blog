import React from 'react'
import { Link } from 'react-router-dom'
import fileService from '../appwrite/fileServices'

function PostCard({ $id, title, image, authorName }) {

    return (

        <div className="flex flex-col w-full h-96 bg-white transition-all duration-300 ease-linear border border-gray-200 hover:border-gray-300 gap-4 rounded-xl shadow-xl hover:shadow-2xl overflow-hidden">
            <Link to={`/post/${$id}`} className='h-[60%] p-1 w-full'>
                    <img
                        loading='lazy'
                        src={fileService.getFilePreview(image)}
                        alt={title}
                        className="w-full p-px h-full object-contain bg-black hover:scale-[1.05] transition-transform duration-300 ease-linear  rounded-xl"
                    />
            </Link>
            <div className="flex flex-col gap-3 px-5 py-3">
                <h4 className="text-sm font-semibold text-black">Blog by {authorName.split(" ").map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(" ")}</h4>
                <h1 className="text-lg font-semibold text-black">{title.toUpperCase()}</h1>
                <Link to={`/post/${$id}`} className="text-sm flex justify-between items-center gap-x-2 text-blue-600 cursor-pointer">
                    <p className='hover:underline'>Read More</p>
                    <p className="text-lg hover:no-underline">→</p>
                </Link>

            </div>
        </div >



    )
}

export default PostCard
