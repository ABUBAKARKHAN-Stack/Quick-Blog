import React from 'react'

function Container({
    children,
    className = "",
}
) {
    return (
        <div className={`w-full h-[calc(100vh-80px)] ${className} bg-[#242424] text-white font-poppins px-6`}>{children}</div>
    )
}

export default Container