import React, { useId, forwardRef } from 'react';

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();

    return (
        <div className='w-full'>
            {label && (
                <label
                    className='inline-block mb-1 pl-1 text-sm font-medium text-gray-700 dark:text-gray-300'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                id={id}
                ref={ref}
                className={`
                    px-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600
                    shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    outline-none transition-all duration-200
                    focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                    dark:focus:ring-blue-500 dark:focus:border-blue-500
                    focus:bg-gray-50 dark:focus:bg-gray-700
                    hover:border-gray-400 dark:hover:border-gray-500
                    ${className}
                `}
                {...props}
            />
        </div>
    );
});

export default Input;
