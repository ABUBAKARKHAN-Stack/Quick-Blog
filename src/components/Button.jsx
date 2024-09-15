import React from 'react';
import ButtonSpanner from '../components/ButtonSpanner';

function Button({
    children,
    className = "",
    textColor = 'text-black',
    loading,
    ...props
}) {
    return (
        <button
            disabled={loading}
            {...props}
            className={`px-6 py-3 h-10 max-h-10 flex justify-center items-center ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} rounded-xl ${textColor} ${className}`}
        >
            {loading ? <ButtonSpanner /> : children}
        </button>
    );
}

export default Button;
