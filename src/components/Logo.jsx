import React from 'react'
import { Link } from 'react-router-dom';


function Logo({
    className = "",
}) {
    return (
        <Link to={"/"}>
            <img src="/quickblog.webp" alt="" className={`rounded-full w-40 block mx-auto ${className}`} />
        </Link>
    )
}

export default Logo