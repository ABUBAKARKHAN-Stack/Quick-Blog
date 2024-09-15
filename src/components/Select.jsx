import React, { forwardRef, useId } from 'react'

function Select({
    option = [],
    label,
    labelText="text-black",
    className = "",
    ...props

}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className={`block text-sm font-medium ${labelText} mb-0.5`}>{label}</label>}
            <select
                ref={ref}
                id={id}
                {...props}
                className={`px-3 border-black py-2 rounded-lg bg-white text-black ${className}`}>
                {option?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select)