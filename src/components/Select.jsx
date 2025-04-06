import React, { useId, forwardRef } from 'react';

const Select = forwardRef(function Select(
  {
    options = [],
    label,
    placeholder = "Select an option",
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        className="w-full px-3 py-2 text-sm sm:text-base rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-gray-100 dark:focus:bg-gray-700 transition-all duration-200"
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((option, idx) =>
          typeof option === "string" ? (
            <option key={option} value={option}>
              {option}
            </option>
          ) : (
            <option key={option.value || idx} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
});

export default Select;
