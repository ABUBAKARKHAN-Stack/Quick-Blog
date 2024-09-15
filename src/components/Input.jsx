import React, { forwardRef } from 'react'
import { useId } from 'react'

function Input({
    label,
    labelText = "text-black",
    className = "",
    type = "text",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full text-sm'>
            {label && <label htmlFor={id} className={`block text-sm font-medium ${labelText} mb-0.5`}>{label} <span className='text-red-500'>*</span></label>}
            <input id={id} type={type} ref={ref} {...props}
                className={`border-[1px] w-full px-3 py-2 rounded-lg text-black bg-transparent ${className}`} />
        </div>
    )
}

export default forwardRef(Input)