import React, {useId, forwardRef} from 'react'

const Input = forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            
            {label && <label 
            className='inline-block mb-1 pl-1 text-sm font-medium text-gray-700' 
            htmlFor={id}>
                {label}
            </label>
            }

            <input
            type={type}
            className={`px-4 py-2 w-full rounded-lg border border-gray-300 shadow-sm bg-white text-gray-900 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-gray-50 hover:border-gray-400 ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input