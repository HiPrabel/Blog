import React from "react";

export default function Button({
    children,
    type = "button",
    borderColor = "border-blue-600",
    textColor = "text-blue-600",
    hoverEffect = "hover:shadow-lg",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`
                px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ease-in-out
                border ${borderColor} ${textColor} bg-transparent 
                hover:shadow-md hover:scale-102 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-blue-300
                dark:border-blue-400 dark:text-blue-400 dark:focus:ring-blue-500
                ${hoverEffect} ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}
