/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";

const InputField = React.forwardRef(
  ({ placeholder, type, value, name, change, error, ...rest }, ref) => {
    return (
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={change}
        ref={ref}
        {...rest}
        className={`block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none ${
          error ? "br-red" : ""
        }`}
      />
    );
  }
);

export default InputField;
