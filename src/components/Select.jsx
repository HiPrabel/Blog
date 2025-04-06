import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-1 text-sm sm:text-base font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
    
            <select
                id={id}
                ref={ref}
                className={`w-full px-3 py-2 text-sm sm:text-base rounded-lg bg-white text-black border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-gray-100 transition-all duration-200`}
                {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
    
}

export default React.forwardRef(Select)